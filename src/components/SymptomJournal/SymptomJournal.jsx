import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import './SymptomJournal.scss';

Modal.setAppElement("#root");

const SymptomJournal = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("user_id");
  const [entries, setEntries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    pain_scale: "",
    symptoms: "",
    notes: "",
  });
  const [viewEntry, setViewEntry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/symptom-journal`, {
          params: { userId },
        });
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching symptom journal entries:", error);
      }
    };

    fetchEntries();
  }, [userId, apiUrl]);

  const openModal = (type, entry = null) => {
    setModalType(type);
    if (type === "View" && entry) {
      setViewEntry(entry);
    } else if (type === "Edit" && entry) {
      const formattedDate = new Date(entry.date).toISOString().split("T")[0];
      setFormData({
        date: formattedDate,
        pain_scale: entry.pain_scale,//.toString(),
        symptoms: entry.symptoms.join(", "),
        notes: entry.notes || "",
      });
      setViewEntry(entry);
    } else if (type === "Delete" && entry) {
        setDeleteId(entry.id)
    } else if (type === "Add") {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        pain: "",
        symptoms: "",
        notes: "",
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setViewEntry(null);
    setFormData({ date: "", pain_scale: "", symptoms: "", notes: "" });
    setDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: Number(userId),
      date: formData.date,
      pain_scale: Number(formData.pain_scale),
      symptoms: formData.symptoms.split(",").map((s) => s.trim()),
      notes: formData.notes || null,
    };

    try {
      if (modalType === "Add") {
        const response = await axios.post(`${apiUrl}/symptom-journal`, payload);
        setEntries((prev) => [...prev, { ...payload, id: response.data.id }]);
      } else if (modalType === "Edit") {
        const response = await axios.put(`${apiUrl}/symptom-journal`, payload, {
          params: { id: viewEntry.id, userId },
        });
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === viewEntry.id ? { ...entry, ...payload } : entry
          )
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setLoadingDelete(true);
      await axios.delete(`${apiUrl}/symptom-journal`, {
        params: { id: deleteId, userId },
      });
      setEntries((prev) => prev.filter((entry) => entry.id !== deleteId));
      closeModal();
    } catch (error) {
      console.error("Error deleting entry:", error);
    } finally {
      setLoadingDelete(false);
    }
  };
  
  return (
    <div className="symptom-journal">
      <h2>Symptom Journal</h2>
      <button onClick={() => openModal("Add")}>+ Add Entry</button>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} onClick={() => openModal("View", entry)}>
            <p>{entry.date}</p>
            <p>Pain: {entry.pain_scale}</p>
            <p>Symptoms: {entry.symptoms.join(", ")}</p>
            <div className="entry-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("Edit", entry);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("Delete", entry);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={`${modalType} Entry`}
        className="modal"
        overlayClassName="modal-overlay"
      >
        {modalType === "View" && viewEntry ? (
          <div>
            <h3>View Entry</h3>
            <p>Date: {viewEntry.date}</p>
            <p>Pain: {viewEntry.pain_scale}</p>
            <p>Symptoms: {viewEntry.symptoms.join(", ")}</p>
            <p>Notes: {viewEntry.notes || "No notes"}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        ) : modalType === "Delete" ? (
          <div>
            <h3>Delete Entry</h3>
            <p>Are you sure you want to delete this entry?</p>
            <div className="form-actions">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleDelete} disabled={loadingDelete}>
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>{modalType === "Add" ? "Add Entry" : "Edit Entry"}</h3>
            <label>
              Date:
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </label>
            <label>
              Pain Scale:
              <input
                type="number"
                min="1"
                max="10"
                value={formData.pain_scale}
                onChange={(e) =>
                  setFormData({ ...formData, pain_scale: e.target.value })
                }
                required
              />
            </label>
            <label>
              Symptoms:
              <input
                type="text"
                value={formData.symptoms}
                onChange={(e) =>
                  setFormData({ ...formData, symptoms: e.target.value })
                }
                placeholder="Comma-separated symptoms"
                required
              />
            </label>
            <label>
              Notes:
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Optional notes"
              ></textarea>
            </label>
            <div className="form-actions">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit">
                {modalType === "Add" ? "Add" : "Save"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default SymptomJournal;