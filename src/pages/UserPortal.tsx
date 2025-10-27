import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, User, Stethoscope, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "@/components/BookingForm";
import { Badge } from "@/components/ui/badge";

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

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: "bg-primary/10 text-primary border-primary/20",
      completed: "bg-success/10 text-success border-success/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MediBook
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Patient Portal</h1>
          <p className="text-muted-foreground">Manage your appointments and health records</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="w-full sm:w-auto"
          >
            <Calendar className="mr-2" />
            {showBookingForm ? "Close Booking Form" : "Book New Appointment"}
          </Button>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <BookingForm onSubmit={handleBookAppointment} />
          </div>
        )}

        {/* Appointments List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>
          
          {appointments.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-4">No appointments yet</p>
                <Button variant="default" onClick={() => setShowBookingForm(true)}>
                  Book Your First Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card 
                  key={appointment.id} 
                  className="border-2 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Stethoscope className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{appointment.doctorName}</CardTitle>
                            <CardDescription className="text-base">
                              {appointment.specialty}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    
                    {appointment.status === "upcoming" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Modify
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
