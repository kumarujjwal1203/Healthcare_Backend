# Hospital Management API

A simple backend API to manage users, patients, doctors, and patient-doctor assignments. Below is the full API reference with sample requests.

---

## **APIs to be Implemented**

### **1. Authentication APIs**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register a new user with name, email, and password. |
| POST | `/api/auth/login/` | Log in a user and return a JWT token. |

**Sample Requests:**

**Register**
```json
POST /api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}


Login

POST /api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}



2. Patient Management APIs

| Method | Endpoint              | Description                                              |
| ------ | --------------------- | -------------------------------------------------------- |
| POST   | `/api/patients/`      | Add a new patient (Authenticated users only).            |
| GET    | `/api/patients/`      | Retrieve all patients created by the authenticated user. |
| GET    | `/api/patients/<id>/` | Get details of a specific patient.                       |
| PUT    | `/api/patients/<id>/` | Update patient details.                                  |
| DELETE | `/api/patients/<id>/` | Delete a patient record.                                 |

Sample Request:
POST /api/patients
{
  "name": "Ujjwal Doe",
  "age": 30,
  "gender": "Male",
  "contact": "9876543210",
  "address": "Delhi"
}


3. Doctor Management APIs

| Method | Endpoint             | Description                                  |
| ------ | -------------------- | -------------------------------------------- |
| POST   | `/api/doctors/`      | Add a new doctor (Authenticated users only). |
| GET    | `/api/doctors/`      | Retrieve all doctors.                        |
| GET    | `/api/doctors/<id>/` | Get details of a specific doctor.            |
| PUT    | `/api/doctors/<id>/` | Update doctor details.                       |
| DELETE | `/api/doctors/<id>/` | Delete a doctor record.                      |


Sample Request:

POST /api/doctors
{
  "name": "Dr. Priya Sharma",
  "specialization": "Cardiologist",
  "contact": "9876543211"
}


4. Patient-Doctor Mapping APIs

| Method | Endpoint                      | Description                                     |
| ------ | ----------------------------- | ----------------------------------------------- |
| POST   | `/api/mappings/`              | Assign a doctor to a patient.                   |
| GET    | `/api/mappings/`              | Retrieve all patient-doctor mappings.           |
| GET    | `/api/mappings/<patient_id>/` | Get all doctors assigned to a specific patient. |
| DELETE | `/api/mappings/<id>/`         | Remove a doctor from a patient.                 |


Sample Request:
POST /api/mappings
{
  "patientId": "<patient_id>",
  "doctorId": "<doctor_id>"
}
