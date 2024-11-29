import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./AppointmentReminder.scss"

Modal.setAppElement("#root");

const AppointmentReminder = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("user_id");
  const [appointments, setAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
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
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modalIsOpen]);

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

  const openModal = (type, appointment = null) => {
    setModalType(type);
    if (type === "Edit" && appointment) {
      setEditId(appointment.id);
      setFormData({
        date: formatDate(appointment.date),
        time: appointment.time || "",
        doctor_name: appointment.doctor_name || "",
        appointment_type: appointment.appointment_type || "",
      });
    } else {
      setEditId(null);
      setFormData({ date: "", time: "", doctor_name: "", appointment_type: "" });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditId(null);
    setFormData({ date: "", time: "", doctor_name: "", appointment_type: "" });
  };

  const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      await axios.delete(`${apiUrl}/appointments`, {
        params: { id, userId },
      });
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
      closeModal();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setLoadingDelete(false);
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
        await axios.put(`${apiUrl}/appointments`, payload, {
          params: { id: editId, userId },
        });
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === editId ? { ...appointment, ...payload } : appointment
          )
        );
      } else {
        // Add appointment logic
        const response = await axios.post(`${apiUrl}/appointments`, payload);
        setAppointments((prev) => [...prev, response.data]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="appointment-reminder">
      <h2>Appointment Reminder</h2>
      <button onClick={() => openModal("Add")} className="add-appointment-btn">
        + Add Appointment
      </button>
      <ul className="appointment-list">
        {appointments.length === 0 ? (
          <p>You don't have any upcoming appointments. Would you like to add one?</p>
        ) : (
          appointments.map((appointment) => (
            <li key={appointment.id} className="appointment-item">
              <p>
                <strong>{formatDate(appointment.date)}</strong>
              </p>
              <p>{appointment.time}</p>
              <p>{appointment.doctor_name}</p>
              <p>{appointment.appointment_type}</p>
              <div className="appointment-actions">
                <button onClick={() => openModal("Edit", appointment)}>Edit</button>
                <button onClick={() => openModal("Delete", appointment)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={`${modalType} Appointment`}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {modalType === "Add" || modalType === "Edit" ? (
          <form className="appointment-form" onSubmit={handleSubmit}>
            <h3>{modalType === "Add" ? "Add Appointment" : "Edit Appointment"}</h3>
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
                onChange={(e) =>
                  setFormData({ ...formData, appointment_type: e.target.value })
                }
                placeholder="Follow-up Appointment"
                required
              />
            </label>
            <div className="form-actions">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" disabled={loadingSubmit}>
                {loadingSubmit ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        ) : modalType === "Delete" ? (
          <div>
            <p>Are you sure you want to delete this appointment?</p>
            <div className="modal-actions">
              <button type="button" onClick={closeModal}>Cancel</button>
              <button type="submit" onClick={() => handleDelete(editId)} disabled={loadingDelete}>
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AppointmentReminder;