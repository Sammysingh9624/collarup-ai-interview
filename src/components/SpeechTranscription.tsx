import { useMemo } from 'react';
import InformationIcon from '../assets/svg/information-icon';
import PeopleIcon from '../assets/svg/people';
import { getTimeFromDate } from '../utils/helper';
import { Button } from './button';

const SpeechTranscription = ({
    handleTextToSpeech,
    jobTitle,
    endInterview,
    disableButton,
}: {
    handleTextToSpeech: () => void;
    jobTitle: string;
    endInterview: () => void;
    disableButton: boolean;
}) => {
    const time = useMemo(() => getTimeFromDate(), []);

    const handleStartStop = () => {
        handleTextToSpeech();
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

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex gap-4">
                        <Button onClick={handleStartStop} disabled={disableButton}>
                            End Speaking
                        </Button>
                        <Button onClick={endInterview}>End Interview</Button>
                        {/* <Button onClick={onStop}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpeechTranscription;
