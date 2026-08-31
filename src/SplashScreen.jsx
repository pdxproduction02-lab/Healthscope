import { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("scanning"), 700),
      setTimeout(() => setPhase("lock"), 2300),
      setTimeout(() => setPhase("reveal"), 3100),
      setTimeout(() => onFinish(), 4700),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div className={`healthscope-splash phase-${phase}`}>
      <div className="splash-orbit splash-orbit-one" />
      <div className="splash-orbit splash-orbit-two" />

      <div className="scope-stage">
        <div className="scope-glass">
          <div className="scope-lens">
            <div className="lens-grid" />

            <div className="health-data">
              <div className="data-pulse">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="data-dots">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className="data-bars">
                <b />
                <b />
                <b />
                <b />
              </div>
            </div>

            <div className="scan-trail" />
            <div className="scan-beam" />
            <div className="lens-shine" />
          </div>

          <div className="scope-handle" />
        </div>
      </div>

      <div className="scope-brand">
        <div className="scope-name">HEALTHSCOPE</div>
        <div className="scope-tagline">
          UNDERSTAND · TRACK · STAY INFORMED
        </div>
      </div>
    </div>
  );
}
