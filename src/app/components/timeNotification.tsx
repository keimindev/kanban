"use client";
import { useEffect } from "react";
import { useTimeStore } from "../store/timeStore";

const TimeNotifier = () => {
  const { entries, markNotified } = useTimeStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const current = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      entries.forEach((entry) => {
        if (!entry.notified && entry.time === current) {
          console.log("🔔 on time!", entry.id, current);
          markNotified(entry.id);

          Notification.requestPermission().then(() => {
            new Notification("⏰ Time to do", {
              body: `${entry.title}`,
            });
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [entries, markNotified]);

  return null;
};

export default TimeNotifier;
