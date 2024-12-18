/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FormContainer from "./components/Form";
import VideoContainer from "./components/VideoContainer";
import { SocketProvider } from "./sokcet/SocketContext";
import DummyInterviewReport from "./DummyInterviewReport";

const App = () => {
  const [videoData, setVideoData] = useState(null);

  const handleData = (data: any) => {
    setVideoData(data);
  };

  return (
    <SocketProvider>
      <Routes>
        {/* <Route path="/report" element={<Report />} /> */}
        <Route
          path="/"
          element={
            videoData ? (
              <VideoContainer videoData={videoData} />
            ) : (
              <FormContainer handleData={handleData} />
            )
          }
        />
        <Route path="/report" element={<DummyInterviewReport />} />
      </Routes>
    </SocketProvider>
  );
};

export default App;
