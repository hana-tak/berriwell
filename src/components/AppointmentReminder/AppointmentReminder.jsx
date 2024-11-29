import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentReminder = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("user_id");
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctor_name: "",
    appointment_type: "",
  });
  const [editId, setEditId] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/appointments?userId=${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId, apiUrl]);

  const handleAdd = () => {
    setEditId(null);
    setFormData({ date: "", time: "", doctor_name: "", appointment_type: "" });
    setShowForm(true);
  };

//   const handleEdit = (appointment) => {
//     setEditId(appointment.id);
//     setFormData({
//       date: appointment.date ? formatDate(appointment.date) : "", // Format current date
//       time: appointment.time || "",
//       doctor_name: appointment.doctor_name || "",
//       appointment_type: appointment.appointment_type || "",
//     });
//     setShowForm(true);
//   };

// const handleEdit = async (appointment) => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       if (!userId) {
//         console.error("Error: userId is not defined.");
//         return;
//       }
  
//       const response = await axios.put(
//         `${apiUrl}/appointments/${appointment.id}`,
//         {
//           date: appointment.date,
//           time: appointment.time,
//           doctor_name: appointment.doctor_name,
//           appointment_type: appointment.appointment_type,
//         },
//         { params: { userId } } // Pass userId as a query parameter
//       );
//
//       setAppointments((prev) =>
//         prev.map((appt) => (appt.id === appointment.id ? response.data : appt))
//       );
//     } catch (error) {
//       console.error("Error editing appointment:", error.response?.data || error.message);
//     }
//   };

  const handleEdit = (appointment) => {
    const formattedDate = appointment.date
      ? new Date(appointment.date).toISOString().split("T")[0]
      : "";
  
    setEditId(appointment.id);
    setFormData({
      date: formattedDate,
      time: appointment.time || "",
      doctor_name: appointment.doctor_name || "",
      appointment_type: appointment.appointment_type || "",
    });
    setShowForm(true);
  };


  const handleDelete = async (id) => {
    const userId = localStorage.getItem("user_id"); // Ensure this is correct
  
    try {
      const response = await axios.delete(`${apiUrl}/appointments`, {
        params: { id, userId }, // Pass id and userId correctly
      });
      console.log(response.data.message);
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      date: formData.date,
      time: formData.time,
      doctor_name: formData.doctor_name,
      appointment_type: formData.appointment_type,
      user_id: Number(userId),
    };
  
    try {
      setLoadingSubmit(true);
  
      if (editId) {
        // Edit appointment logic
        const response = await axios.put(`${apiUrl}/appointments`, payload, {
          params: { id: editId, userId },
        });
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === editId ? { ...appointment, ...payload } : appointment
          )
        );
        console.log(response.data.message);
      } else {
        // Add appointment logic
        const response = await axios.post(`${apiUrl}/appointments`, {
          ...payload,
          userId,
        });
        setAppointments((prev) => [...prev, response.data]);
      }
  
      setShowForm(false);
      setFormData({ date: "", time: "", doctor_name: "", appointment_type: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="appointment-reminder">
      <h2>Appointment Reminder</h2>
      <button onClick={handleAdd} className="add-appointment-btn">
        + Add Appointment
      </button>
      {loadingDelete && <p>Loading...</p>}
      <ul className="appointment-list">
        {appointments.length === 0 ? (
          <p>No appointments available. Add one!</p>
        ) : (
          appointments.map((appointment) => (
            <li key={appointment.id} className="appointment-item">
              <p><strong>{formatDate(appointment.date)}</strong></p>
              <p>{appointment.time}</p>
              <p>{appointment.doctor_name}</p>
              <p>{appointment.appointment_type}</p>
              <div className="appointment-actions">
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
      {showForm && (
        <form className="appointment-form" onSubmit={handleSubmit}>
          <h3>{editId ? "Edit Appointment" : "Add Appointment"}</h3>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time || ""}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </label>
          <label>
            Doctor:
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name || ""}
              onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
              placeholder="Dr. Naturopath"
              required
            />
          </label>
          <label>
            Appointment Type:
            <input
              type="text"
              name="appointment_type"
              value={formData.appointment_type || ""}
              onChange={(e) => setFormData({ ...formData, appointment_type: e.target.value })}
              placeholder="Follow-up Appointment"
              required
            />
          </label>
          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" disabled={loadingSubmit}>
              {loadingSubmit ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AppointmentReminder;