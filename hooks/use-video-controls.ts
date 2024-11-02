"use client";

import { useEffect } from "react";

interface UseVideoKeyboardControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export function useVideoKeyboardControls({
  videoRef,
  containerRef,
  volume,
  setVolume,
  isPlaying,
  setIsPlaying,
}: UseVideoKeyboardControlsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (video.paused) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          video.currentTime += 5;
          break;

        case "ArrowLeft":
          e.preventDefault();
          video.currentTime -= 5;
          break;

        case "ArrowUp":
          e.preventDefault();
          const newVolumeUp = Math.min(1, volume + 0.1);
          setVolume(newVolumeUp);
          video.volume = newVolumeUp;
          break;

        case "ArrowDown":
          e.preventDefault();
          const newVolumeDown = Math.max(0, volume - 0.1);
          setVolume(newVolumeDown);
          video.volume = newVolumeDown;
          break;

        case "Enter":
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            containerRef.current?.requestFullscreen();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videoRef, containerRef, volume, setVolume, isPlaying, setIsPlaying]);
}