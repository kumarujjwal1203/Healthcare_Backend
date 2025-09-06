const Patient = require("../models/Patient");

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient({
      ...req.body,
      createdBy: req.user._id,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error("Create patient error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id });
    res.json(patients);
  } catch (err) {
    console.error("Get patients error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    console.error("Get patient error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    console.error("Update patient error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("Delete patient error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
