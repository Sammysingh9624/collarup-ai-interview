/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import CollarupLogo from '../assets/svg/collarup-logo';
import Loader from '../components/speak-loader/Loader';
import { useSocket } from '../sokcet/SocketContext';
import { calculateRMS, getUserMessagesAfterLastAssistant, mergeBuffers } from '../utils/helper';
import SpeechTranscription from './SpeechTranscription';
const VOLUME_THRESHOLD = 400;

const audioContext = new window.AudioContext();
const WebcamRecorder = ({ videoData }: { videoData: any }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const overflowRef = useRef<HTMLDivElement | null>(null);
    const [isMicAllowed, setIsMicAllowed] = useState<boolean>(false);
    const [isHumanSpeaking, setIsHumanSpeaking] = useState<boolean>(false);

    const [messages, setMessages] = useState<{ role: string; content: string; isFinal?: boolean }[]>([]);
    const socket = useSocket();
    const { assistant: assistantId, threadId, jobTitle } = videoData;
    const [isBotSpeaking, setIsBotSpeaking] = useState<boolean>(false);
    const [report, setReport] = useState<any>('');

    useEffect(() => {
        const startRecording = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                const audioContext = new AudioContext({
                    sampleRate: 16_000,
                    latencyHint: 'balanced',
                });

                const source = audioContext.createMediaStreamSource(stream);
                await audioContext.audioWorklet.addModule('audio-processor.js');
                const audioWorkletNode = new AudioWorkletNode(audioContext, 'audio-processor');
                source.connect(audioWorkletNode);
                audioWorkletNode.connect(audioContext.destination);

                // Initialize an empty Int16Array to hold audio data
                let audioBufferQueue = new Int16Array();

                audioWorkletNode.port.onmessage = (event) => {
                    const currentBuffer = new Int16Array(event.data.audio_data);
                    audioBufferQueue = mergeBuffers(audioBufferQueue, currentBuffer);
                    console.log('audioBufferQueue', audioBufferQueue);
                    // Check if the buffer contains audio data
                    if (audioBufferQueue.length === 0) {
                        console.log('No audio data available in the buffer.');
                        return; // Skip further processing if no audio data is available
                    }

                    const rms = calculateRMS(audioBufferQueue);
                    console.log('RMS value:', rms);
                    console.log('rms > VOLUME_THRESHOLD', rms > VOLUME_THRESHOLD);
                    // Determine speaking status
                    if (rms > VOLUME_THRESHOLD) {
                        if (!isHumanSpeaking) {
                            console.log('User started speaking');
                            setIsHumanSpeaking(true);
                        }
                    } else {
                        setIsHumanSpeaking(false);
                    }

                    const bufferDuration = (audioBufferQueue.length / audioContext.sampleRate) * 1000;

                    // Wait until we have 100ms of audio data
                    if (bufferDuration >= 100) {
                        const totalSamples = Math.floor(audioContext.sampleRate * 0.1);
                        const finalBuffer = new Uint8Array(audioBufferQueue.subarray(0, totalSamples).buffer);

                        audioBufferQueue = audioBufferQueue.subarray(totalSamples);
                        socket.emit('voice', finalBuffer);
                    }
                };
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        // Call the startRecording function to start capturing audio
        startRecording();
    }, []);
    console.log('report', report);
    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error('Error accessing the webcam', error);
        }
    };

    useEffect(() => {
        // Request microphone permission when component loads
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
                setIsMicAllowed(true);
            })
            .catch(() => {
                setIsMicAllowed(false);
            });
    }, []);

    async function playStream(audio: Float32Array) {
        const audioData = new Uint8Array(audio);
        setIsBotSpeaking(true);
        audioContext.decodeAudioData(audioData.buffer, (buffer) => {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
            source.onended = () => {
                setIsBotSpeaking(false);
                console.log('Playback finished');
            };
        });
    }
    useEffect(() => {
        if (overflowRef.current) {
            overflowRef.current.scrollTop = overflowRef.current.scrollHeight; // Scroll to bottom
        }
    }, [messages]);
    const sendMessage = () => {
        const textArray = getUserMessagesAfterLastAssistant(messages);
        if (!textArray.length || !assistantId || !threadId) return;
        socket.emit('chat', { text: textArray, assistantId, threadId });
    };

    useEffect(() => {
        startWebcam();
        socket.on('chat', ({ speech, message }) => {
            console.log('message****', message);
            setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: message }]);
            console.log('speech', speech, message);
            playStream(speech);
        });
        socket.on('report', (report) => {
            console.log('   ', report);
        });
        socket.on('voice', (text) => {
            setMessages((prevMessages) => {
                if (
                    prevMessages.length > 0 &&
                    !prevMessages[prevMessages.length - 1].isFinal &&
                    prevMessages[prevMessages.length - 1].role === 'user'
                ) {
                    prevMessages.pop();
                }
                return [...prevMessages, { role: 'user', content: text }];
            });
        });
        socket.on('final', (text) => {
            setMessages((prevMessages) => {
                if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].role === 'user') {
                    prevMessages.pop();
                }
                return [...prevMessages, { role: 'user', content: text, isFinal: true }];
            });
        });
        socket.on('report', (report) => {
            console.log('report', report);
            setReport(report);
        });
    }, []);

    // const endInterview = () => {
    //     socket.emit('report', { assistantId });
    // };

    return (
        <div className="w-full h-screen bg-[#F5F5F5]">
            <div className="w-full flex">
                <div className={`w-full h-[calc(100vh_-_171px)] mt-[50px] pl-4 `}>
                    <div
                        className={`w-full h-full bg-black relative rounded-2xl flex justify-center items-center overflow-hidden border-[3px] ${
                            isHumanSpeaking ? 'border-[#AA66FF] ' : 'border-[#F5F5F5] '
                        }`}
                    >
                        <video className={`z-1 w-full `} ref={videoRef} autoPlay muted />

                        <>
                            <div
                                className={`absolute bottom-8 right-8 border-[3px] rounded-2xl backdrop-blur-[3px]  ${
                                    isBotSpeaking ? ' border-[#AA66FF] ' : 'border-white'
                                }`}
                            >
                                <div
                                    className={`relative w-[200px] h-[134px] flex justify-center items-center flex-col`}
                                ></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <div className=" w-[64px] h-[64px] bg-white rounded-full flex justify-center items-center">
                                        <CollarupLogo size={38} />
                                    </div>
                                    <div className="flex mt-2 gap-2">
                                        <span className="text-white font-medium">Morgan</span>
                                        {isBotSpeaking && <Loader />}
                                    </div>
                                </div>
                            </div>
                        </>

                        <div className="absolute bottom-8 left-8 flex gap-2">
                            <span className="text-white font-semibold">You</span>
                            {isHumanSpeaking && <Loader />}
                        </div>
                    </div>
                </div>

                <div className="w-[340px]  p-4 pr-6 bg-transparent">
                    <div className="bg-[#AA66FF] h-full w-full rounded-2xl">
                        <div className="px-5 py-4 flex gap-2 justify-start items-center">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <CollarupLogo />
                            </div>
                            <span className="text-white font-medium">Morgan</span>
                        </div>
                        <div className="w-full h-[calc(100vh_-_176px)] bg-white rounded-2xl p-4 ">
                            <div className="overflow-auto no-scrollbar h-full" ref={overflowRef}>
                                <div className="space-y-4">
                                    {messages.map((message, index) => {
                                        const isUser = message.role === 'user';
                                        return (
                                            <div
                                                key={index}
                                                className={`w-full flex flex-col gap-1 ${
                                                    isUser ? 'items-end' : 'items-start'
                                                } `}
                                            >
                                                <div className={`text-[#808080] w-full ${isUser ? 'text-right' : ''}`}>
                                                    {isUser ? 'You' : 'Morgan'}
                                                </div>
                                                <div
                                                    className={`py-2 px-3 text-sm rounded-2xl mx-w-[90%] ${
                                                        isUser
                                                            ? ' text-[#06000D] bg-[#F5F5F5]'
                                                            : ' bg-[#AA66FF] text-white'
                                                    }`}
                                                >
                                                    {message.content}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-transparent pl-4 pr-6">
                {isMicAllowed ? (
                    <SpeechTranscription
                        handleTextToSpeech={sendMessage}
                        jobTitle={jobTitle}
                        isBotSpeaking={isBotSpeaking}
                        // endInterview={endInterview}
                    />
                ) : (
                    <p>Microphone permission is required to use this feature.</p>
                )}
            </div>
        </div>
    );
};

export default WebcamRecorder;
