import { Calendar, Clock, FileText, Users, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-clinic.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">MediBook</span>
          </div>
          <div className="flex gap-3">
            <Link to="/user-portal" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors">
              Patient Portal
            </Link>
            <Link to="/doctor-portal" className="px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-muted transition-colors">
              Doctor Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern clinic reception" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Smart Appointment Booking
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Book appointments, manage schedules, and access medical records - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/user-portal" className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors text-center">
                Book Appointment
              </Link>
              <Link to="/doctor-portal" className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors text-center">
                Doctor Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
          <p className="text-muted-foreground">Simple healthcare management for patients and doctors</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
            <p className="text-muted-foreground text-sm">
              Book appointments in seconds with our simple interface.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Availability</h3>
            <p className="text-muted-foreground text-sm">
              View live doctor availability and get instant confirmation.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Doctors</h3>
            <p className="text-muted-foreground text-sm">
              Access qualified healthcare professionals.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Modifications</h3>
            <p className="text-muted-foreground text-sm">
              Reschedule or cancel appointments hassle-free.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Digital Records</h3>
            <p className="text-muted-foreground text-sm">
              Access prescriptions and medical reports digitally.
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-muted-foreground text-sm">
              Doctors can manage availability efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 MediBook. Your trusted healthcare partner.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
