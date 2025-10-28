import { useState } from "react";
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

    setDiagnosis("");
    setMedicines("");
    setInstructions("");
    setNotes("");
  };

  return (
    <div className="border-2 border-border rounded-lg p-6 bg-muted/30 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Add Prescription for {patientName}</h4>
        <button onClick={onCancel} className="p-1 hover:bg-muted rounded transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Diagnosis *</label>
          <input
            type="text"
            placeholder="Enter diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Medicines *</label>
          <textarea
            placeholder="List prescribed medicines with dosage"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Instructions</label>
          <textarea
            placeholder="Special instructions for the patient"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <textarea
            placeholder="Any additional notes or observations"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            type="submit" 
            className="flex-1 px-4 py-2 bg-success text-success-foreground rounded-md font-medium hover:bg-success/90 transition-colors"
          >
            Save Prescription
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 border border-border rounded-md font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;
