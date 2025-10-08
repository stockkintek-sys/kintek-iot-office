import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import DeviceCard from "./DeviceCard";
import { db } from "../services/firebaseConfig";
import { ref, onValue, set } from "firebase/database";

export default function Dashboard() {
  const [lamps, setLamps] = useState({});

  // Fetch lamp data from Firebase
  useEffect(() => {
    const lampRef = ref(db, "LAMP/");
    onValue(lampRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLamps(data);
      console.log("Firebase LAMP data:", data);
    });
  }, []);

  // Toggle lamp ON/OFF
  const toggleLamp = (lampName) => {
    const newState = lamps[lampName] === "ON" ? "OFF" : "ON";
    set(ref(db, `LAMP/${lampName}`), newState);
  };

  return (
    <div className="dashboard">
      <WeatherCard />

      <div className="device-grid">
        {Object.keys(lamps).map((lamp) => (
          <DeviceCard
            key={lamp}
            name={lamp}
            state={lamps[lamp]}
            onToggle={() => toggleLamp(lamp)}
          />
        ))}
      </div>
    </div>
  );
}
