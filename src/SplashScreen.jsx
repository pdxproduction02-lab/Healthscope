import { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
  const [isComplete, setIsComplete] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2400);

    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 2850);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 4300);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(leaveTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`healthscope-splash
        ${isComplete ? "scan-complete" : ""}
        ${isLeaving ? "splash-leave" : ""}`}
    >
      <div className="splash-bg-glow" />

      <div className="scanner-wrap">
        <div className="scanner-frame">
          <div className="scanner-grid" />
          <div className="scan-area" />
          <div className="scan-beam" />
          <div className="scan-core" />
        </div>
      </div>

      <div className="splash-brand">
        <span className="brand-name">HEALTHSCOPE</span>
        <span className="brand-tagline">
          UNDERSTAND · TRACK · STAY INFORMED
        </span>
      </div>
    </div>
  );
}
