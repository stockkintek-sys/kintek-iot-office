import { useEffect, useState } from "react";
import { db, ref, set, onValue } from "../services/firebaseConfig";
import "../index.css";

export default function LampControl() {
  const [lamps, setLamps] = useState({ L1: "OFF", L2: "OFF", L3: "OFF" });

  useEffect(() => {
    const lampRef = ref(db, "LAMP/");
    onValue(lampRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLamps(data);
    });
  }, []);

  const toggleLamp = (lampName) => {
    const newState = lamps[lampName] === "ON" ? "OFF" : "ON";
    set(ref(db, `LAMP/${lampName}`), newState);
  };

  return (
    <div className="lamp-container">
      <h1 className="lamp-title">💡 Smart Lamp Control Panel</h1>
      <div className="lamp-grid">
        {Object.keys(lamps).map((lamp) => (
          <div key={lamp} className="lamp-card">
            <div
              className={`lamp-bulb ${lamps[lamp] === "ON" ? "on" : "off"}`}
            ></div>
            <h3>{lamp}</h3>

            <label className="switch">
              <input
                type="checkbox"
                checked={lamps[lamp] === "ON"}
                onChange={() => toggleLamp(lamp)}
              />
              <span className="slider"></span>
            </label>

            <p className="lamp-status">{lamps[lamp] === "ON" ? "ON" : "OFF"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
