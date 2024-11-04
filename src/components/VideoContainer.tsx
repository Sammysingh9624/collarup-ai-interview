/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollarupLogo from '../assets/svg/collarup-logo';
import Loader from '../components/speak-loader/Loader';
import { useSocket } from '../sokcet/SocketContext';
import { calculateRMS, getUserMessagesAfterLastAssistant, mergeBuffers } from '../utils/helper';
import AiLoader from './CommanLoader/loader/Loader';
import SpeechTranscription from './SpeechTranscription';
let mediaRecorder: MediaRecorder;
let audioWorkletNode: any;
const VOLUME_THRESHOLD = 400;
let isProcessing = false;
let audioBufferQueue = new Int16Array();
let audioContext;
let audioStream;
let mediaStream = null; // To hold the media stream

const WebcamRecorder = ({ videoData }: { videoData: any }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const overflowRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    // const [isMicAllowed, setIsMicAllowed] = useState<boolean>(false);
    const [isHumanSpeaking, setIsHumanSpeaking] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(true);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
    const [messages, setMessages] = useState<{ role: string; content: string; isFinal?: boolean }[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const socket = useSocket();
    const { assistant: assistantId, threadId, jobTitle } = videoData;
    const [isBotSpeaking, setIsBotSpeaking] = useState<boolean>(false);
    const [aiLoader, setAiLoader] = useState<boolean>(false);

    // const [isRecording, setIsRecording] = useState<boolean>(true);

    const mediaRef = useRef<any>(null);
    const startMic = async () => {
        try {
            if (audioStream) {
                audioStream.getAudioTracks().forEach((track) => {
                    track.enabled = true; //
                });
                return;
            }
            audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Create and start the media recorder
            mediaRecorder = new MediaRecorder(audioStream);
            mediaRecorder.start();

            mediaRecorder.onstop = () => {
                // Stop all audio tracks when recording stops
                audioStream.getAudioTracks().forEach((track) => track.stop());
            };

            // Initialize the audio context and worklet node
            audioContext = new AudioContext({ sampleRate: 16000, latencyHint: 'balanced' });
            const source = audioContext.createMediaStreamSource(audioStream);

            await audioContext.audioWorklet.addModule('audio-processor.js');
            audioWorkletNode = new AudioWorkletNode(audioContext, 'audio-processor');

            // Connect nodes
            source.connect(audioWorkletNode);
            audioWorkletNode.connect(audioContext.destination);

            // Set up the worklet’s onmessage handler
            audioWorkletNode.port.onmessage = (event) => processAudioData(event);
        } catch (error) {
            handleMediaError(error, 'Microphone');
        }
    };

    const processAudioData = (event: any) => {
        if (isProcessing) return;

        const currentBuffer = new Int16Array(event.data.audio_data);
        audioBufferQueue = mergeBuffers(audioBufferQueue, currentBuffer);

        // Check if there's any audio data in the buffer
        if (audioBufferQueue.length === 0) {
            console.log('No audio data available in the buffer.');
            return;
        }

        const rms = calculateRMS(audioBufferQueue);
        console.log('RMS value:', rms);

        if (rms > VOLUME_THRESHOLD) {
            if (!isHumanSpeaking) {
                console.log('isHumanSpeaking', isHumanSpeaking);
                console.log('User started speaking');
                setIsHumanSpeaking(true);
            }
        } else {
            setIsHumanSpeaking(false);
        }

        const bufferDuration = (audioBufferQueue.length / audioContext.sampleRate) * 1000;

        if (bufferDuration >= 100) {
            const totalSamples = Math.floor(audioContext.sampleRate * 0.1);
            const finalBuffer = new Uint8Array(audioBufferQueue.subarray(0, totalSamples).buffer);
            audioBufferQueue = audioBufferQueue.subarray(totalSamples);

            socket.emit('voice', finalBuffer);
        }
    };

    const stopMic = () => {
        // if (mediaRecorder) {
        //     mediaRecorder.stop();
        //     setIsRecording(false);
        //     console.log('Microphone stopped.');
        // }
        // if (audioContext) {
        //     audioContext.close();
        //     audioContext = null;
        // }
        // audioBufferQueue = new Int16Array();
        if (audioStream) {
            audioStream.getAudioTracks().forEach((track) => {
                track.enabled = false; // This mutes the microphone
            });
            console.log('Microphone muted.');
        }
    };

    useEffect(() => {
        // Call the startRecording function to start capturing audio
        startMic();
    }, []);

    const startWebcam = async () => {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setIsCameraOn(true);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }
        } catch (error) {
            handleMediaError(error, 'Camera');
        }
    };

    const toggleCamera = () => {
        if (!mediaStream) return;

        const videoTrack = mediaStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setIsCameraOn(videoTrack.enabled);
            console.log(`Camera ${isCameraOn ? 'enabled' : 'disabled'}`);
        }
    };

    const handleMediaError = (error: any, value: string) => {
        if (error.name === 'NotAllowedError') {
            setErrorMessage((prev) => prev + ` Please allow access to ${value}.`);
            console.error('Permission denied. Please allow access to the camera and microphone.');
        } else if (error.name === 'NotFoundError') {
            console.error(`${value} not found`);
            setErrorMessage((prev) => prev + ` ${value} not found`);
        } else if (error.name === 'NotReadableError') {
            console.error('The camera or microphone is already in use by another application.');
            setErrorMessage((prev) => prev + ` ${value} is already in use by another application.`);
        } else if (error.name === 'OverconstrainedError') {
            console.error('The requested camera or microphone constraints could not be met.');
        } else {
            console.error('An unknown error occurred:', error);
        }
    };

    async function playStream(audio: Float32Array) {
        setIsBotSpeaking(true);
        
        const audioData = new Uint8Array(audio);
        audioContext.decodeAudioData(audioData.buffer, (buffer) => {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
            source.onended = () => {
                setIsBotSpeaking(false);
                setDisableButton(false);
                startMic();
                console.log('Playback finished');
            };
        });
    }

    useEffect(() => {
        if (overflowRef.current) {
            overflowRef.current.scrollTop = overflowRef.current.scrollHeight; // Scroll to bottom
        }
    }, [messages,aiLoader]);
    const sendMessage = () => {
        const textArray = getUserMessagesAfterLastAssistant(messages);
        setDisableButton(true);
        stopMic();
        setAiLoader(true);
        if (!textArray.length || !assistantId || !threadId) return;
        socket.emit('chat', { text: textArray, assistantId, threadId });
    };

    const toggleMic = () => {
        if (!isBotSpeaking) {
            if (isRecording) {
                stopMic();
                setIsRecording(false);
            } else {
                startMic();
                setIsRecording(true);
            }
        }
    };

    useEffect(() => {
        startWebcam();
        socket.on('chat', ({ speech, message }) => {
            console.log('message****', message);
            setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: message }]);
            console.log('speech', speech, message);
            playStream(speech);
            setAiLoader(false);
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
    }, []);

    const endInterview = () => {
        socket.emit('report', { assistantId });
        isProcessing = true;
        mediaRef?.current?.stop();
        navigate('/report');
    };

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
                                    {aiLoader && (
                                        <div className="w-full flex flex-col gap-1 items-start px-2 py-2">
                                            <AiLoader />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-transparent pl-4 pr-6">
                {!errorMessage && (
                    <SpeechTranscription
                        handleTextToSpeech={sendMessage}
                        jobTitle={jobTitle}
                        endInterview={endInterview}
                        disableButton={disableButton}
                        stopMic={toggleMic}
                        isRecording={isRecording}
                        isCameraOn={isCameraOn}
                        toggleCamera={toggleCamera}
                        isBotSpeaking={disableButton}
                    />
                )}
            </div>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        </div>
    );
};

export default WebcamRecorder;
