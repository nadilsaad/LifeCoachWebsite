import { useState } from "react";
import { createHabit } from "../api/habits";

export default function AddHabit({ onAdded }) {
  const [title, setTitle] = useState("");
  const [isGood, setIsGood] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a habit title.");
      return;
    }

    try {
      setLoading(true);

      await createHabit({
        title: title.trim(),
        is_good: isGood,
      });

      setTitle("");
      setIsGood(true);
      setMessage("Habit added successfully.");

      if (onAdded) {
        onAdded();
      }
    } catch (error) {
      setMessage(error.message || "Failed to add habit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-card">
      <h2>Add Habit</h2>

      <form onSubmit={handleSubmit} className="modern-auth-form">
        <div className="modern-form-group">
          <label>Habit Title</label>
          <input
            type="text"
            placeholder="e.g. Read 10 pages"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="modern-form-group">
          <label>Habit Type</label>
          <select
            value={isGood ? "good" : "bad"}
            onChange={(e) => setIsGood(e.target.value === "good")}
          >
            <option value="good">Good Habit</option>
            <option value="bad">Bad Habit to Avoid</option>
          </select>
        </div>

        {message && (
          <p
            className={
              message.toLowerCase().includes("success")
                ? "modern-success"
                : "modern-error"
            }
          >
            {message}
          </p>
        )}

        <button type="submit" disabled={loading} className="modern-primary-btn">
          {loading ? "Saving..." : "Add Habit"}
        </button>
      </form>
    </div>
  );
}