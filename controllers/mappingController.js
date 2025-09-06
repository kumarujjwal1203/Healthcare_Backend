const Mapping = require("../models/Mapping");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    if (!patientId || !doctorId)
      return res
        .status(400)
        .json({ message: "PatientId and DoctorId are required" });

    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!patient || !doctor)
      return res.status(404).json({ message: "Patient or Doctor not found" });

    const existing = await Mapping.findOne({
      patient: patientId,
      doctor: doctorId,
    });
    if (existing)
      return res.status(400).json({ message: "Mapping already exists" });

    const mapping = await Mapping.create({
      patient: patientId,
      doctor: doctorId,
      createdBy: req.user._id,
    });

    res.status(201).json(mapping);
  } catch (err) {
    console.error("Assign doctor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find()
      .populate("patient", "name")
      .populate("doctor", "name specialization");
    res.json(mappings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getDoctorsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const mappings = await Mapping.find({ patient: patientId }).populate(
      "doctor",
      "name specialization contact"
    );
    res.json(mappings.map((m) => m.doctor));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const mapping = await Mapping.findById(id);
    if (!mapping) return res.status(404).json({ message: "Mapping not found" });

    await mapping.deleteOne();
    res.json({ message: "Mapping removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
