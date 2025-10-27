import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, User, FileText, Plus, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import AvailabilityManager from "@/components/AvailabilityManager";
import PrescriptionForm from "@/components/PrescriptionForm";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: "pending" | "completed";
  hasPrescription: boolean;
}

const DoctorPortal = () => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "John Doe",
      date: "2025-11-02",
      time: "10:00 AM",
      status: "pending",
      hasPrescription: false
    },
    {
      id: "2",
      patientName: "Emma Wilson",
      date: "2025-11-02",
      time: "11:30 AM",
      status: "pending",
      hasPrescription: false
    },
    {
      id: "3",
      patientName: "Michael Brown",
      date: "2025-10-28",
      time: "02:30 PM",
      status: "completed",
      hasPrescription: true
    }
  ]);

  const handleAddPrescription = (appointmentId: string, prescription: any) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, hasPrescription: true, status: "completed" as const }
        : apt
    ));
    setSelectedAppointment(null);
  };

  const pendingAppointments = appointments.filter(apt => apt.status === "pending");
  const completedAppointments = appointments.filter(apt => apt.status === "completed");

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
              <span className="text-sm font-medium">Dr. Sarah Johnson</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Doctor Portal</h1>
          <p className="text-muted-foreground">Manage your appointments and patient records</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription>Today's Appointments</CardDescription>
              <CardTitle className="text-3xl text-primary">{pendingAppointments.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription>Completed This Week</CardDescription>
              <CardTitle className="text-3xl text-success">{completedAppointments.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription>Pending Reports</CardDescription>
              <CardTitle className="text-3xl text-secondary">
                {pendingAppointments.filter(apt => !apt.hasPrescription).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex gap-3 flex-wrap">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => setShowAvailability(!showAvailability)}
          >
            <Calendar className="mr-2" />
            {showAvailability ? "Hide Availability" : "Manage Availability"}
          </Button>
        </div>

        {/* Availability Manager */}
        {showAvailability && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <AvailabilityManager />
          </div>
        )}

        {/* Appointments Section */}
        <div className="space-y-8">
          {/* Pending Appointments */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Pending Appointments</h2>
            {pendingAppointments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No pending appointments</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingAppointments.map((appointment) => (
                  <Card 
                    key={appointment.id}
                    className="border-2 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{appointment.patientName}</CardTitle>
                              <div className="flex flex-wrap gap-3 mt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Pending
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedAppointment === appointment.id ? (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                          <PrescriptionForm 
                            appointmentId={appointment.id}
                            patientName={appointment.patientName}
                            onSubmit={handleAddPrescription}
                            onCancel={() => setSelectedAppointment(null)}
                          />
                        </div>
                      ) : (
                        <Button 
                          variant="success"
                          onClick={() => setSelectedAppointment(appointment.id)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Prescription / Report
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Completed Appointments */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Completed Appointments</h2>
            {completedAppointments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No completed appointments yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedAppointments.map((appointment) => (
                  <Card 
                    key={appointment.id}
                    className="border-2"
                  >
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-success" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{appointment.patientName}</CardTitle>
                              <div className="flex flex-wrap gap-3 mt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20">
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Records
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
