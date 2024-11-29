import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import './HealthPlan.scss';

Modal.setAppElement("#root");

const HealthPlan = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("user_id");
  const [healthPlans, setHealthPlans] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    task: "",
    amount: "",
    frequency: "",
  });
  const [editId, setEditId] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchHealthPlans = async () => {
      try {
        const response = await axios.get(`${apiUrl}/health-plan?userId=${userId}`);
        setHealthPlans(response.data);
      } catch (error) {
        console.error("Error fetching health plans:", error);
      }
    };

    fetchHealthPlans();
  }, [userId, apiUrl]);

  const openModal = (type, plan = null) => {
    setModalType(type);
    if (type === "Edit" && plan) {
      setEditId(plan.id);
      setFormData({
        task: plan.task || "",
        amount: plan.amount || "",
        frequency: plan.frequency || "",
      });
    } else {
      setEditId(null);
      setFormData({ task: "", amount: "", frequency: "" });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditId(null);
    setFormData({ task: "", amount: "", frequency: "" });
  };

const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      await axios.delete(`${apiUrl}/health-plan`, {
        params: { id, userId },
      });
      setHealthPlans((prev) => prev.filter((plan) => plan.id !== id));
      closeModal();
    } catch (error) {
      console.error("Error deleting health plan:", error.response?.data || error.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      task: formData.task,
      amount: formData.amount,
      frequency: formData.frequency,
      user_id: Number(userId),
    };

    try {
      setLoadingSubmit(true);

      if (editId) {
        // Edit
        await axios.put(`${apiUrl}/health-plan`, payload, { params: { id: editId, userId } });
        setHealthPlans((prev) =>
          prev.map((plan) => (plan.id === editId ? { ...plan, ...payload } : plan))
        );
      } else {
        // Add
        const response = await axios.post(`${apiUrl}/health-plan`, payload);
        setHealthPlans((prev) => [...prev, response.data]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving health plan:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="health-plan">
      <h2>Health Plan</h2>
      <button onClick={() => openModal("Add")} className="add-plan-btn">
        + Add Task
      </button>
      <ul className="health-plan-list">
        {healthPlans.length === 0 ? (
          <p>You don't have any tasks to complete. Would you like to add one?</p>
        ) : (
          healthPlans.map((plan) => (
            <li key={plan.id} className="health-plan-item">
              <p>
                <strong>{plan.task}</strong>
              </p>
              <p>Amount: {plan.amount}</p>
              <p>Frequency: {plan.frequency}</p>
              <div className="health-plan-actions">
                <button onClick={() => openModal("Edit", plan)}>Edit</button>
                <button onClick={() => handleDelete(plan.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={`${modalType} Health Plan`}
        className="modal"
        overlayClassName="modal-overlay"
      >
        {modalType === "Add" || modalType === "Edit" ? (
          <form className="health-plan-form" onSubmit={handleSubmit}>
            <h3>{modalType === "Add" ? "Add Health Plan" : "Edit Health Plan"}</h3>
            <label>
              Task:
              <input
                type="text"
                name="task"
                value={formData.task || ""}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                placeholder="E.g., Take Vitamin D"
                required
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                name="amount"
                value={formData.amount || ""}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="E.g., 600IU"
                required
              />
            </label>
            <label>
              Frequency:
              <input
                type="text"
                name="frequency"
                value={formData.frequency || ""}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                placeholder="E.g., Daily"
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
            <p>Are you sure you want to delete this health plan?</p>
            <div className="modal-actions">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={() => handleDelete(editId)} disabled={loadingDelete}>
                {loadingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default HealthPlan;