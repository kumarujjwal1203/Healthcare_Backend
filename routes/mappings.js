const express = require("express");
const router = express.Router();
const mappingController = require("../controllers/mappingController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, mappingController.assignDoctor);
router.get("/", auth, mappingController.getMappings);
router.get("/:patientId", auth, mappingController.getDoctorsForPatient);
router.delete("/:id", auth, mappingController.removeMapping);

module.exports = router;
