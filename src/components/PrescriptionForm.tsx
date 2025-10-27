import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface PrescriptionFormProps {
  appointmentId: string;
  patientName: string;
  onSubmit: (appointmentId: string, data: any) => void;
  onCancel: () => void;
}

const PrescriptionForm = ({ appointmentId, patientName, onSubmit, onCancel }: PrescriptionFormProps) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosis || !medicines) {
      alert("Please fill required fields");
      return;
    }

    onSubmit(appointmentId, {
      diagnosis,
      medicines,
      instructions,
      notes,
      date: new Date().toISOString()
    });

    // Reset form
    setDiagnosis("");
    setMedicines("");
    setInstructions("");
    setNotes("");
  };

  return (
    <Card className="border-2 bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Add Prescription for {patientName}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis *</Label>
            <Input
              id="diagnosis"
              placeholder="Enter diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicines">Medicines *</Label>
            <Textarea
              id="medicines"
              placeholder="List prescribed medicines with dosage"
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Special instructions for the patient"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes or observations"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" variant="success" className="flex-1">
              Save Prescription
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrescriptionForm;
