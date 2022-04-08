import { Box, Fab } from "@mui/material";
import React, { useEffect, useRef, useState, VFC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { AudioControlsProps } from "../types";

const AudioControls: VFC<AudioControlsProps> = ({ song, guessNum }) => {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(1);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    setTime((t) => t + guessNum + 1);
  }, [guessNum]);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
      setTimeout(() => {
        setPlaying(!playing);
      }, time * 1000);
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <Box sx={{ margin: "20px" }}>
      <audio
        ref={audioRef}
        src={song.link}
        onCanPlayThrough={() => setLoaded(true)}
      />
      {loaded && (
        <Fab onClick={() => setPlaying(!playing)}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </Fab>
      )}
      <Box sx={{ marginTop: "10px" }}>
        <span>Time: {time}s</span>
      </Box>
    </Box>
  );
};

export default AudioControls;