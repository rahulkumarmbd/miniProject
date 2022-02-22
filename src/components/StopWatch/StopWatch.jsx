import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Button, Heading } from "@chakra-ui/react";

export const StopWatch = () => {
  const { auth } = useSelector((store) => store);
  const [stopWatch, setStopWatch] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hide, setHide] = useState(false);
  const stopWatchRef = useRef();
  const handleStart = () => {
    if (isActive) {
      return;
    }
    setIsActive(true);
    setIsPaused(false);
    stopWatchRef.current = setInterval(() => {
      setStopWatch((timer) => timer + 1);
    }, 10);
  };

  const handleStop = () => {
    if (isPaused) {
      return;
    }
    setIsPaused(true);
    setIsActive(false);
    clearInterval(stopWatchRef.current);
  };

  const handleReset = () => {
    setIsPaused(false);
    setIsActive(false);
    clearInterval(stopWatchRef.current);
    setStopWatch(0);
  };

  const handleHide = () => {
    setHide((prev) => !prev);
  };

  const sec = Math.floor(stopWatch / 100);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  if (!auth.auth) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Heading m={3}>StopWatch</Heading>
      <div>
        {hide ? (
          <Heading m={3}>"Hiden Stop Watch"</Heading>
        ) : (
          <Heading m={3}>
            {hour % 24 < 10 ? "0" + String(hour % 2) : hour % 24}h{" "}
            {min % 60 < 10 ? "0" + String(min % 60) : min % 60}m{" "}
            {sec % 60 < 10 ? "0" + String(sec % 60) : sec % 60}s{" "}
            {stopWatch % 100 < 10
              ? "0" + String(stopWatch % 100)
              : stopWatch % 100}
          </Heading>
        )}
      </div>
      <div>
        <Button m={1} onClick={handleStart}>
          Start
        </Button>
        <Button m={1} onClick={handleStop}>
          Pause
        </Button>
        <Button m={1} onClick={handleReset}>
          Reset
        </Button>
        <Button m={1} onClick={handleHide}>
          {hide ? "Show StopWatch" : "Hide"}
        </Button>
      </div>
    </div>
  );
};
