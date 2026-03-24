import { useState } from "react";
import { createJournalEntry } from "../api/journal";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function JournalBox({ onSaved }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!text.trim()) {
      setMessage("Please write something in your journal.");
      return;
    }

    try {
      setLoading(true);

      await createJournalEntry({
        day: getTodayDate(),
        text: text.trim(),
      });

      setText("");
      setMessage("Journal saved successfully.");

      if (onSaved) {
        onSaved();
      }
    } catch (error) {
      setMessage(error.message || "Failed to save journal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-card">
      <h2>Quick Journal</h2>
      <p>Reflect on your day, your emotions, and your progress.</p>

      <form onSubmit={handleSubmit} className="modern-auth-form">
        <div className="modern-form-group">
          <label>Today’s Reflection</label>
          <textarea
            rows="5"
            placeholder="What went well today? What challenged you? What did you learn?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
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
          {loading ? "Saving..." : "Save Journal"}
        </button>
      </form>
    </div>
  );
}