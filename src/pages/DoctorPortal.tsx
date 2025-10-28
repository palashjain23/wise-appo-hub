import { useState } from "react";
import { Calendar, Clock, ArrowLeft, User, FileText, Plus, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
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
            <span className="text-sm font-medium">Dr. Sarah Johnson</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Doctor Portal</h1>
          <p className="text-muted-foreground">Manage appointments and patient records</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-sm mb-1">Today's Appointments</p>
            <p className="text-3xl font-bold text-primary">{pendingAppointments.length}</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-success">{completedAppointments.length}</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-sm mb-1">Pending Reports</p>
            <p className="text-3xl font-bold text-secondary">
              {pendingAppointments.filter(apt => !apt.hasPrescription).length}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setShowAvailability(!showAvailability)}
          className="mb-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          {showAvailability ? "Hide Availability" : "Manage Availability"}
        </button>

        {showAvailability && (
          <div className="mb-8">
            <AvailabilityManager />
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Pending Appointments</h2>
            {pendingAppointments.length === 0 ? (
              <div className="border border-border rounded-lg p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                <p className="text-muted-foreground">No pending appointments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                                weekday: 'short', month: 'short', day: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        Pending
                      </span>
                    </div>
                    
                    {selectedAppointment === appointment.id ? (
                      <PrescriptionForm 
                        appointmentId={appointment.id}
                        patientName={appointment.patientName}
                        onSubmit={handleAddPrescription}
                        onCancel={() => setSelectedAppointment(null)}
                      />
                    ) : (
                      <button 
                        onClick={() => setSelectedAppointment(appointment.id)}
                        className="px-4 py-2 bg-success text-success-foreground rounded-md font-medium hover:bg-success/90 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Prescription
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Completed Appointments</h2>
            {completedAppointments.length === 0 ? (
              <div className="border border-border rounded-lg p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No completed appointments yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-border rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                                weekday: 'short', month: 'short', day: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                        Completed
                      </span>
                    </div>
                    
                    <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Records
                    </button>
                  </div>
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
