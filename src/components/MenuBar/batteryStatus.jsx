import { useEffect, useState } from "react";

function BatteryStatus() {
  const [level, setLevel] = useState(null);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    if (!navigator.getBattery) return;

    navigator.getBattery().then((battery) => {
      setLevel(Math.floor(battery.level * 100));
      setCharging(battery.charging);

      battery.addEventListener("levelchange", () => {
        setLevel(Math.floor(battery.level * 100));
      });

      battery.addEventListener("chargingchange", () => {
        setCharging(battery.charging);
      });
    });
  }, []);

  if (level === null) return null;

  return (
    <div className="text-sm text-gray-300">
      {charging ? "🔋" : "🪫"} {level}%
    </div>
  );
}

export default BatteryStatus;