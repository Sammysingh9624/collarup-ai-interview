/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import FormContainer from "./components/Form";
import VideoContainer from "./components/VideoContainer";
import { useState } from "react";
import { SocketProvider } from "./sokcet/SocketContext";

const App = () => {
  const [videoData, setVideoData] = useState(null);

  const handleData = (data: any) => {
    setVideoData(data);
  };

  return (
    <SocketProvider>
      <Routes>
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
      </Routes>
    </SocketProvider>
  );
};

export default App;
