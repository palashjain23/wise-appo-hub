import { useState } from "react";

interface BookingFormProps {
  onSubmit: (data: any) => void;
}

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
  { id: "2", name: "Dr. Michael Chen", specialty: "General Physician" },
  { id: "3", name: "Dr. Emily Parker", specialty: "Dermatologist" },
  { id: "4", name: "Dr. James Wilson", specialty: "Orthopedic" },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const BookingForm = ({ onSubmit }: BookingFormProps) => {
  const [date, setDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedDoctor || !selectedTime) {
      alert("Please fill all fields");
      return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctor);
    onSubmit({
      doctorName: doctor?.name,
      specialty: doctor?.specialty,
      date: date,
      time: selectedTime
    });

    setDate("");
    setSelectedDoctor("");
    setSelectedTime("");
  };

  return (
    <div className="border border-border rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-2">Book New Appointment</h3>
      <p className="text-muted-foreground text-sm mb-6">Select a doctor, date, and time</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Doctor</label>
          <select 
            value={selectedDoctor} 
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Choose a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Time</label>
          <select 
            value={selectedTime} 
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Choose a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
