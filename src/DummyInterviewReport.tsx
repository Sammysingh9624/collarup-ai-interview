import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/button';
import { useSocket } from './sokcet/SocketContext';
const contentKeys = ['questions', 'topic', 'jobDescription', 'technicalDebrief', 'summary', 'score'];
const DummyInterviewReport = () => {
    const [currnetActiveIndex, setCurrentActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [report, setReport] = useState(0);
    const content = contentKeys[currnetActiveIndex];
    const handleTabClick = (index: number) => {
        setCurrentActiveIndex(index);
    };
    const socket = useSocket();
    useEffect(() => {
        socket.on('report', (data) => {
            setReport(data);
        });
    }, []);
    const handleBackButtonClick = () => {
        navigate('/');
        window.location.reload();
    };
    console.log('report', report);
    if (!report) {
        return (
            <div className="p-2">
                <Button onClick={handleBackButtonClick} className="self-start">
                    Back To Home
                </Button>
                <h3 className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Waiting For Report...</h3>
            </div>
        );
    }

    return (
        <div className="w-full h-screen mx-auto max-w-[1440px] p-8 flex flex-col items-center gap-8">
            <Button onClick={handleBackButtonClick} className="self-start">
                Back To Home
            </Button>
            <div className="flex justify-between  gap-4 w-full">
                <div
                    className={`cursor-pointer ${currnetActiveIndex === 0 && 'font-bold'}`}
                    onClick={() => handleTabClick(0)}
                >
                    Question & Answers
                </div>
                <div
                    className={`cursor-pointer ${currnetActiveIndex === 1 && 'font-bold'}`}
                    onClick={() => handleTabClick(1)}
                >
                    Topic Highlights{' '}
                </div>
                <div
                    className={`cursor-pointer ${currnetActiveIndex === 2 && 'font-bold'}`}
                    onClick={() => handleTabClick(2)}
                >
                    Job Description Debrief
                </div>
                <div
                    className={`cursor-pointer ${currnetActiveIndex === 3 && 'font-bold'}`}
                    onClick={() => handleTabClick(3)}
                >
                    Technical Debrief
                </div>
                <div
                    className={`cursor-pointer ${currnetActiveIndex === 4 && 'font-bold'}`}
                    onClick={() => handleTabClick(4)}
                >
                    Summary{' '}
                </div>
                <div
                    className={`cursor-pointer ${currnetActiveIndex === 5 && 'font-bold'}`}
                    onClick={() => handleTabClick(5)}
                >
                    Scorecard{' '}
                </div>
            </div>
            <div className="w-full rounded-lg h-full p-4 ">
                <div className="">
                    <pre>{JSON.stringify(report[content], null, 5)}</pre>
                </div>
            </div>
        </div>
    );
};

export default DummyInterviewReport;
