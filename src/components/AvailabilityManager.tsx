import { useState } from "react";
import { Clock } from "lucide-react";

interface DayAvailability {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const AvailabilityManager = () => {
  const [availability, setAvailability] = useState<DayAvailability[]>([
    { day: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Friday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Saturday", enabled: false, startTime: "09:00", endTime: "13:00" },
    { day: "Sunday", enabled: false, startTime: "09:00", endTime: "13:00" },
  ]);

  const toggleDay = (index: number) => {
    setAvailability(prev => prev.map((day, i) => 
      i === index ? { ...day, enabled: !day.enabled } : day
    ));
  };

  const handleSave = () => {
    alert("Availability updated successfully!");
  };

  return (
    <div className="border border-border rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-2">Manage Weekly Availability</h3>
      <p className="text-muted-foreground text-sm mb-6">Set your working hours for each day</p>
      
      <div className="space-y-3 mb-6">
        {availability.map((day, index) => (
          <div 
            key={day.day}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                checked={day.enabled}
                onChange={() => toggleDay(index)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-semibold">{day.day}</p>
                {day.enabled && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{day.startTime} - {day.endTime}</span>
                  </div>
                )}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              day.enabled 
                ? "bg-success/10 text-success" 
                : "bg-muted text-muted-foreground"
            }`}>
              {day.enabled ? "Available" : "Unavailable"}
            </span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleSave} 
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Save Availability
      </button>
    </div>
  );
};

export default AvailabilityManager;
