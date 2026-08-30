import { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 1500);

    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 1750);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2550);

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
      {/* subtle background atmosphere */}
      <div className="splash-ambient" />

      {/* main symbol */}
      <div className="healthscope-symbol">
        <div className="symbol-square">
          <div className="scan-glow" />
          <div className="scan-line" />
        </div>
      </div>

      {/* minimal brand reveal */}
      <div className="splash-brand">
        <span className="brand-name">HEALTHSCOPE</span>
        <span className="brand-tagline">UNDERSTAND · TRACK · STAY INFORMED</span>
      </div>
    </div>
  );
}
