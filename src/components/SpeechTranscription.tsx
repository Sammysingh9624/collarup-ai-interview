/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import InformationIcon from '../assets/svg/information-icon';
import PeopleIcon from '../assets/svg/people';
import { getTimeFromDate } from '../utils/helper';
import { Button } from './button';
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const SpeechTranscription = ({
    transcript,
    setTranscript,
    recognition,
    setRecognition,
    handleTextToSpeech,
    jobTitle,
    setIsHumanSpeaking,
    isHumanSpeaking,
    setMessages,
}: // endInterview,
{
    transcript: string;
    setIsHumanSpeaking: Dispatch<SetStateAction<boolean>>;
    setTranscript: Dispatch<SetStateAction<string>>;
    recognition: any;
    setRecognition: Dispatch<SetStateAction<any>>;
    handleTextToSpeech: (text: string) => void;
    jobTitle: string;
    isHumanSpeaking: boolean;
    setMessages: Dispatch<SetStateAction<{ role: string; content: string }[]>>;
    // endInterview: () => void;
}) => {
    const time = useMemo(() => getTimeFromDate(), []);

    useEffect(() => {
        if (!recognition) {
            const newRecognition = new SpeechRecognition();
            newRecognition.continuous = true; // Keep recognizing speech continuously
            newRecognition.interimResults = true; // Get real-time transcription
            newRecognition.lang = 'en-US'; // Set language

            newRecognition.onresult = (event: any) => {
                if (!isHumanSpeaking) {
                    setIsHumanSpeaking(true);
                }
                let finalTranscript = '';
                // Loop through results
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const speechResult = event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        finalTranscript += speechResult + ' '; // Only add finalized results to the transcript
                        setMessages((prevMessages) => [...prevMessages, { role: 'user', content: finalTranscript }]);
                    }
                }
                // Only update the transcript with finalized results
                if (finalTranscript) {
                    setTranscript((prevTranscript) => prevTranscript + finalTranscript);
                    setIsHumanSpeaking(false);
                }
            };

            newRecognition.onerror = (event: any) => {
                console.error('Speech recognition error detected:', event.error);
                // Restart recognition on error
                newRecognition.stop();
                newRecognition.start();
            };

            newRecognition.onend = () => {
                console.log('Speech recognition ended. Restarting...');
                newRecognition.start(); // Restart recognition when it ends
            };

            setRecognition(newRecognition);
            newRecognition.start(); // Start recognition when created
        }
    }, [recognition, setTranscript]);

    const handleStartStop = () => {
        handleTextToSpeech(transcript);
    };

    return (
        <>
            <div className="p-4 w-full bg-white rounded-2xl font-medium relative flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <span>{time}</span>
                    <span>|</span>
                    <span>{jobTitle}</span>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-1">
                        <PeopleIcon />
                        <span className="px-2 py-1 bg-black text-white rounded-2xl">2 People</span>
                    </div>
                    <InformationIcon />
                </div>
                {!!transcript && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Button onClick={handleStartStop}>End Speaking</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SpeechTranscription;
