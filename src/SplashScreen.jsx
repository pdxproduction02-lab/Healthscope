import { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen() {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 1200);

    return () => clearTimeout(leaveTimer);
  }, []);

  return (
    <div className={`healthscope-splash ${isLeaving ? "splash-leave" : ""}`}>
      <div className="scan-square">
        <div className="scan-line"></div>
      </div>
    </div>
  );
}
