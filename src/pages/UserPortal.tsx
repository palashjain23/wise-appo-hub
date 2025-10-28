import { useState } from "react";
import { Calendar, Clock, ArrowLeft, User, Stethoscope, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "@/components/BookingForm";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const UserPortal = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2025-11-02",
      time: "10:00 AM",
      status: "upcoming"
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "General Physician",
      date: "2025-10-28",
      time: "02:30 PM",
      status: "completed"
    }
  ]);

  const handleBookAppointment = (appointmentData: any) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: "upcoming" as const
    };
    setAppointments([newAppointment, ...appointments]);
    setShowBookingForm(false);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">MediBook</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Portal</h1>
          <p className="text-muted-foreground">Manage your appointments</p>
        </div>

        <button 
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="mb-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          {showBookingForm ? "Close Form" : "Book New Appointment"}
        </button>

        {showBookingForm && (
          <div className="mb-8">
            <BookingForm onSubmit={handleBookAppointment} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>
          
          {appointments.length === 0 ? (
            <div className="border border-border rounded-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No appointments yet</p>
              <button onClick={() => setShowBookingForm(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium">
                Book Your First Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === "upcoming" ? "bg-primary/10 text-primary" :
                      appointment.status === "completed" ? "bg-success/10 text-success" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  
                  {appointment.status === "upcoming" && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                        <Edit2 className="w-4 h-4" />
                        Modify
                      </button>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
