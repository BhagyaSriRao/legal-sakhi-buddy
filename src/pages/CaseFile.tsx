import { useState } from "react";
import jsPDF from "jspdf";

export default function CaseFile() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    policeStation: "",
    district: "",
    state: "",
    incidentDate: "",
    incidentPlace: "",
    issueType: "",
    description: "",
    evidence: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    const content = `
FIRST INFORMATION REPORT (FIR)

TO  
The Station House Officer (SHO)  
${form.policeStation} Police Station  
${form.district}, ${form.state}

SUBJECT: Complaint regarding ${form.issueType}

1. COMPLAINANT DETAILS  
Name: ${form.name}  
Address: ${form.address}

2. DETAILS OF OCCURRENCE  
Date of Incident: ${form.incidentDate}  
Place of Incident: ${form.incidentPlace}

3. FACTS OF THE CASE  
${form.description}

4. NATURE OF OFFENCE  
The acts described above disclose cognizable offences punishable under applicable provisions of law.

5. EVIDENCE AVAILABLE  
${form.evidence}

6. PRAYER  
I respectfully request you to register this complaint as an FIR and take necessary legal action.

7. VERIFICATION  
I hereby verify that the facts stated above are true to the best of my knowledge.

Place: ${form.district}  
Date: ${new Date().toDateString()}

Yours faithfully,  
${form.name}
(Signature)
`;

    doc.text(doc.splitTextToSize(content, 180), 15, 20);
    doc.save("FIR_Complaint.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* HEADER */}
        <div className="border-b px-8 py-6 bg-slate-100">
          <h1 className="text-2xl font-serif font-bold text-center">
            FIRST INFORMATION REPORT (FIR)
          </h1>
          <p className="text-center text-sm text-gray-600 mt-1">
            Generated for legal awareness & police submission
          </p>
        </div>

        {/* FORM BODY */}
        <div className="p-8 space-y-8">

          {/* SECTION 1 */}
          <Section title="1. Complainant Details">
            <Input name="name" label="Full Name" onChange={handleChange} />
            <Input name="address" label="Residential Address" onChange={handleChange} />
          </Section>

          {/* SECTION 2 */}
          <Section title="2. Police Jurisdiction">
            <Input name="policeStation" label="Police Station" onChange={handleChange} />
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="district" label="District" onChange={handleChange} />
              <Input name="state" label="State" onChange={handleChange} />
            </div>
          </Section>

          {/* SECTION 3 */}
          <Section title="3. Incident Details">
            <div className="grid md:grid-cols-2 gap-4">
              <Input type="date" name="incidentDate" label="Date of Incident" onChange={handleChange} />
              <Input name="incidentPlace" label="Place of Incident" onChange={handleChange} />
            </div>
            <Input name="issueType" label="Nature of Complaint" onChange={handleChange} />
          </Section>

          {/* SECTION 4 */}
          <Section title="4. Facts of the Case">
            <Textarea
              name="description"
              placeholder="Write the complete facts of the incident in chronological order..."
              onChange={handleChange}
              rows={6}
            />
          </Section>

          {/* SECTION 5 */}
          <Section title="5. Evidence Available">
            <Textarea
              name="evidence"
              placeholder="List documents, screenshots, witnesses, call records, etc."
              onChange={handleChange}
              rows={4}
            />
          </Section>

          {/* ACTION */}
          <div className="border-t pt-6 flex justify-end">
            <button
              onClick={generatePDF}
              className="bg-slate-900 text-white px-6 py-2 rounded hover:bg-black transition"
            >
              Download FIR as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }: any) {
  return (
    <div className="border rounded-md p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
    </div>
  );
}

function Textarea(props: any) {
  return (
    <textarea
      {...props}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
    />
  );
}
