import React, { useRef, useState, useEffect } from "react";
import Icon from "./icon/icon.component";

const FloatingAudioPlayer: React.FC<{ src: string; onClose: () => void }> = ({
  src,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false); // فایل آماده شده
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("canplaythrough", () => setIsLoading(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("canplaythrough", () => setIsLoading(false));
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    try {
      if (!isPlaying) {
        await audio.play();
        setIsPlaying(true);
        setError(null);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.warn("Playback Error:", err);
      setError("پخش خودکار مسدود شده است. لطفاً روی دکمه پلی کلیک کنید.");
    }
  };

  const seekAudio = (seconds: number) => {
    if (!audioRef.current || isLoading) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      duration
    );
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const changeVolume = (value: number) => {
    if (!audioRef.current) return;
    setVolume(value);
    audioRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  return (
    <div className="absolute w-full left-0 bottom-0 bg-gray-900 text-white p-3 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in z-50">
      {/* دکمه بستن */}
      <div className="tooltip text-sm font-extralight" data-tip="بستن">
        <button
          onClick={onClose}
          className="text-gray-400 h-6 w-6 p-2 bg-gray-50/20 flex justify-center items-center rounded-full hover:text-white text-xl"
        >
          <Icon name={"close2"} />
        </button>
      </div>
      {/* عقب ۱۰ ثانیه */}
      <div className="tooltip text-sm font-extralight" data-tip="10 ثانیه به عقب">
        <button
          onClick={() => seekAudio(-10)}
          disabled={isLoading}
          className={`text-gray-400 h-8 w-8 p-2 bg-gray-50/20 flex justify-center items-center rounded-full hover:text-white text-xl ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon name={"back10s"} />
        </button>
      </div>
      {/* دکمه پخش/توقف */}
      <div className="tooltip text-sm font-extralight" data-tip="پخش یا توقف">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`bg-gray-700 h-12 w-12 p-2 rounded-full text-white ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <Icon name={"loading"} className="size-5 animate-spin" />
          ) : (
            <Icon name={isPlaying ? "pause" : "play"} />
          )}
        </button>
      </div>
      {/* جلو ۱۰ ثانیه */}
      <div className="tooltip text-sm font-extralight" data-tip="10 ثانیه به جلو">
        <button
          onClick={() => seekAudio(10)}
          disabled={isLoading}
          className={`text-gray-400 h-8 w-8 p-2 bg-gray-50/20 flex justify-center items-center rounded-full hover:text-white text-xl ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon name={"next10s"} />
        </button>
      </div>
      {/* تایملاین */}
      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          disabled={isLoading}
          onChange={(e) =>
            (audioRef.current!.currentTime = Number(e.target.value))
          }
          className="range range-xs"
        />
        <div className="text-xs text-gray-400 flex justify-between mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* دکمه بی‌صدا/حجم صدا */}
      <button
        onClick={toggleMute}
        disabled={isLoading}
        className={`text-gray-400 h-8 w-8 p-2 bg-gray-50/20 flex justify-center items-center rounded-full hover:text-white text-xl ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Icon name={isMuted ? "mute" : "unmute"} />
      </button>

      {/* کنترل حجم صدا */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        disabled={isLoading}
        onChange={(e) => changeVolume(Number(e.target.value))}
        className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
};

export default FloatingAudioPlayer;
