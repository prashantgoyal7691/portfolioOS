import { useEffect, useState } from "react";

function Clock() {

  const [time, setTime] = useState("");

  useEffect(() => {

    const updateTime = () => {

      const now = new Date();

      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      setTime(formatted);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      {time}
    </div>
  );
}

export default Clock;