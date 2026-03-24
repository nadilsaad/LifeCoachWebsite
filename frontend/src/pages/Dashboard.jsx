import { useEffect, useMemo, useState } from "react";
import { getTodayHabits, updateHabitLog } from "../api/habits";
import { getJournalEntries } from "../api/journal";
import AddHabit from "../components/AddHabit";
import HabitList from "../components/HabitList";
import JournalBox from "../components/JournalBox";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function Dashboard({ onLogout }) {
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("life_coach_tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Wake up early", done: false },
          { id: 2, title: "Study for 1 hour", done: false },
          { id: 3, title: "Avoid distractions", done: false },
        ];
  });

  const [newTask, setNewTask] = useState("");
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("life_coach_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let timer;

    if (timerRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      setTimerRunning(false);
      alert("Focus session completed.");
    }

    return () => clearInterval(timer);
  }, [timerRunning, secondsLeft]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const habitData = await getTodayHabits().catch(() => []);
      const journalData = await getJournalEntries().catch(() => []);

      setHabits(Array.isArray(habitData) ? habitData : []);
      setEntries(Array.isArray(journalData) ? journalData : []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleHabit = async (habit) => {
    try {
      await updateHabitLog(habit.id, {
        day: getTodayDate(),
        done: !habit.done,
      });

      setHabits((prev) =>
        prev.map((item) =>
          item.id === habit.id ? { ...item, done: !item.done } : item
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update habit.");
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      done: false,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  const completedHabits = useMemo(
    () => habits.filter((habit) => habit.done).length,
    [habits]
  );

  const productivityScore = useMemo(() => {
    const totalHabits = habits.length || 1;
    const totalTasks = tasks.length || 1;

    const habitScore = (completedHabits / totalHabits) * 50;
    const taskScore = (completedTasks / totalTasks) * 50;

    return Math.round(habitScore + taskScore);
  }, [habits, tasks, completedHabits, completedTasks]);

  const startTimer = () => {
    setSecondsLeft(focusMinutes * 60);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(focusMinutes * 60);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="dashboard-modern">
      <div className="dashboard-topbar">
        <div>
          <h1>{getGreeting()}, Welcome to Life Coach</h1>
          <p>{getTodayDate()} • Build discipline, manage time, and grow daily.</p>
        </div>
        <button onClick={onLogout} className="modern-secondary-btn">
          Logout
        </button>
      </div>

      {error && <div className="modern-alert-error">{error}</div>}
      {loading && <div className="modern-card">Loading dashboard...</div>}

      <div className="dashboard-modern-grid">
        <div className="dashboard-main-column">
          <div className="modern-card hero-card">
            <h2>Today’s Progress</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <h3>{completedHabits}</h3>
                <p>Completed Habits</p>
              </div>
              <div className="stat-box">
                <h3>{completedTasks}</h3>
                <p>Completed Tasks</p>
              </div>
              <div className="stat-box">
                <h3>{productivityScore}%</h3>
                <p>Productivity Score</p>
              </div>
            </div>
          </div>

          <HabitList habits={habits} onToggle={handleToggleHabit} />

          <JournalBox onSaved={loadData} />

          <div className="modern-card">
            <h2>Recent Journal Entries</h2>

            {entries.length === 0 ? (
              <p>No journal entries yet.</p>
            ) : (
              <div className="entries-list">
                {entries.slice(0, 6).map((entry) => (
                  <div key={entry.id} className="journal-entry-modern">
                    <small>{entry.day}</small>
                    <p>{entry.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-side-column">
          <AddHabit onAdded={loadData} />

          <div className="modern-card">
            <h2>Time Management</h2>

            <div className="timer-section">
              <label>Focus Session (minutes)</label>
              <input
                type="number"
                min="1"
                value={focusMinutes}
                onChange={(e) => {
                  const value = Number(e.target.value) || 25;
                  setFocusMinutes(value);
                  setSecondsLeft(value * 60);
                }}
              />

              <div className="timer-display">{formatTime(secondsLeft)}</div>

              <div className="timer-buttons">
                <button onClick={startTimer} className="modern-primary-btn">
                  Start
                </button>
                <button onClick={pauseTimer} className="modern-secondary-btn">
                  Pause
                </button>
                <button onClick={resetTimer} className="modern-secondary-btn">
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="modern-card">
            <h2>Daily Task Planner</h2>

            <div className="task-input-row">
              <input
                type="text"
                placeholder="Add a task for today"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={addTask} className="modern-primary-btn">
                Add
              </button>
            </div>

            <div className="task-list-modern">
              {tasks.length === 0 ? (
                <p>No tasks yet.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="task-item-modern">
                    <div className="task-left">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className={task.done ? "task-done" : ""}>
                        {task.title}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="task-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="modern-card">
            <h2>Motivation</h2>
            <p>
              Discipline is choosing what you want most over what you want now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}