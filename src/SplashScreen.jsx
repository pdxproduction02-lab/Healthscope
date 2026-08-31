import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5400);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="hs-splash">

      <div className="hs-atmosphere" />

      <div className="hs-logo-stage">

        {/* Faint silhouette — logo exists before the scan */}
        <img
          src="/healthscope-logo-transparent.png"
          alt=""
          className="hs-logo hs-logo-base"
        />

        {/* This copy is progressively revealed by the scanner */}
        <div className="hs-logo-reveal">
          <img
            src="/healthscope-logo-transparent.png"
            alt="HealthScope"
            className="hs-logo hs-logo-revealed"
          />
        </div>

        {/* Scanning beam */}
        <div className="hs-scan-beam">
          <span />
        </div>

        {/* Cinematic light sweep */}
        <div className="hs-light-sweep" />

      </div>

      <div className="hs-loading">
        <span />
        <span />
        <span />
      </div>

    </div>
  );
}
