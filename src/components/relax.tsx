import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MeditateGif from "../assets/Meditate.gif";

const BREATHE_CYCLE = [
  { text: "Breathe in…", duration: 4000 },
  { text: "Hold…", duration: 4000 },
  { text: "Breathe out…", duration: 4000 },
  { text: "Pause…", duration: 2000 },
];

const DURATION_OPTIONS = [
  { label: "15 sec", seconds: 15 },
  { label: "30 sec", seconds: 30 },
  { label: "60 sec", seconds: 60 },
  { label: "180 sec", seconds: 180 },
];

export default function Relax() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const feeling = searchParams.get("feeling") ?? "";

  const [totalSeconds, setTotalSeconds] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(true);

  const started = totalSeconds !== null;
  const timerDone = started && secondsLeft <= 0;

  const cycleBreath = useCallback(() => {
    setFading(false);
    setTimeout(() => {
      setPhase((p) => (p + 1) % BREATHE_CYCLE.length);
      setFading(true);
    }, 400);
  }, []);

  useEffect(() => {
    if (!started || timerDone) return;
    setFading(true);
    const interval = setInterval(cycleBreath, BREATHE_CYCLE[phase].duration);
    return () => clearInterval(interval);
  }, [started, timerDone, phase, cycleBreath]);

  useEffect(() => {
    if (!started || timerDone) return;
    const tick = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(tick);
  }, [started, timerDone]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleStart = (seconds: number) => {
    setTotalSeconds(seconds);
    setSecondsLeft(seconds);
    setPhase(0);
    setFading(true);
  };

  if (!started) {
    return (
      <main className="relax-page">
        <div className="relax-container">
          <div className="relax-hero">
            <h2 className="relax-prompt">
              How long would you like to meditate?
            </h2>
            <img src={MeditateGif} alt="Meditation" className="relax-gif" />
          </div>
          <div className="relax-options">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.seconds}
                type="button"
                className="relax-option btn-activity"
                onClick={() => handleStart(opt.seconds)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relax-page">
      <div className="relax-container">
        <div className="relax-hero-after">
          <span className={`relax-breathe ${fading ? "visible" : "hidden"}`}>
            {timerDone ? "Well done." : BREATHE_CYCLE[phase].text}
          </span>

          <img src={MeditateGif} alt="Meditation" className="relax-gif" />

          <span className="relax-timer" style={{ visibility: timerDone ? "hidden" : "visible" }}>
            {formatTime(secondsLeft)}
          </span>
        </div>

        <button
          type="button"
          className="relax-next btn-activity"
          style={{ visibility: timerDone ? "visible" : "hidden" }}
          onClick={() =>
            feeling
              ? navigate(`/activity?feeling=${feeling}`)
              : navigate("/result")
          }
        >
          Continue
        </button>
      </div>
    </main>
  );
}
