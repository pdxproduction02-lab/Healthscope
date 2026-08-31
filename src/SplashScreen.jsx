import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Keep the cinematic intro alive for the full sequence.
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5400);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="hs-splash">

      {/* Soft cinematic background atmosphere */}
      <div className="hs-atmosphere" />

      {/* Main logo reveal */}
      <div className="hs-logo-stage">

        {/* Actual HealthScope logo */}
        <img
          src="/healthscope-logo-transparent.png"
          alt="HealthScope"
          className="hs-logo"
        />

        {/* Optical scanning light */}
        <div className="hs-scan-beam">
          <span />
        </div>

        {/* Subtle light sweep */}
        <div className="hs-light-sweep" />

      </div>

      {/* Tiny launch indicator */}
      <div className="hs-loading">
        <span />
        <span />
        <span />
      </div>

    </div>
  );
}
