import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <CardTitle>Manage Weekly Availability</CardTitle>
        <CardDescription>Set your working hours for each day of the week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {availability.map((day, index) => (
          <div 
            key={day.day}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border-2 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 flex-1">
              <Switch
                checked={day.enabled}
                onCheckedChange={() => toggleDay(index)}
              />
              <div className="flex-1">
                <Label className="text-base font-semibold">{day.day}</Label>
                {day.enabled && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{day.startTime} - {day.endTime}</span>
                  </div>
                )}
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={day.enabled 
                ? "bg-success/10 text-success border-success/20" 
                : "bg-muted text-muted-foreground"
              }
            >
              {day.enabled ? "Available" : "Unavailable"}
            </Badge>
          </div>
        ))}
        
        <div className="pt-4">
          <Button onClick={handleSave} variant="hero" size="lg" className="w-full">
            Save Availability
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityManager;
