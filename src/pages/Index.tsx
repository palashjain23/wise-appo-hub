import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-clinic.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MediBook
            </span>
          </div>
          <div className="flex gap-3">
            <Link to="/user-portal">
              <Button variant="ghost" size="default">
                Patient Portal
              </Button>
            </Link>
            <Link to="/doctor-portal">
              <Button variant="outline" size="default">
                Doctor Portal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern clinic reception" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Smart Appointment Booking for Modern Clinics
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Streamline your healthcare experience with our intelligent booking system. 
              Book appointments, manage schedules, and access medical records - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/user-portal">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Book Appointment <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/doctor-portal">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm">
                  Doctor Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our comprehensive system makes healthcare management effortless for both patients and doctors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>
                Book appointments in seconds. Choose your preferred doctor, date, and time slot with our intuitive interface.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Real-time Availability</CardTitle>
              <CardDescription>
                View live doctor availability and get instant confirmation. No more waiting for callbacks.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Multiple Doctors</CardTitle>
              <CardDescription>
                Access a network of qualified healthcare professionals across various specializations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Easy Modifications</CardTitle>
              <CardDescription>
                Need to reschedule? Modify or cancel appointments hassle-free through your dashboard.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Digital Records</CardTitle>
              <CardDescription>
                Access prescriptions and medical reports digitally. Your health records, always at your fingertips.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Smart Scheduling</CardTitle>
              <CardDescription>
                Doctors can manage their availability and appointments efficiently with our intelligent scheduler.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust our platform for seamless appointment management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/user-portal">
              <Button variant="hero" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover:scale-105">
                Book Your First Appointment
              </Button>
            </Link>
            <Link to="/doctor-portal">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm">
                Join as Healthcare Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 MediBook. Your trusted healthcare appointment partner.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
