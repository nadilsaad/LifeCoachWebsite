export default function HabitList({ habits, onToggle }) {
  const completed = habits.filter((habit) => habit.done).length;

  return (
    <div className="modern-card">
      <div className="row-between">
        <div>
          <h2>Today’s Habits</h2>
          <p>Track your discipline one habit at a time.</p>
        </div>
        <div className="stat-badge">
          {completed}/{habits.length} done
        </div>
      </div>

      {habits.length === 0 ? (
        <p>No habits yet. Add your first habit to begin.</p>
      ) : (
        <div className="habit-list-modern">
          {habits.map((habit) => (
            <div key={habit.id} className="habit-item-modern">
              <div className="habit-info">
                <h3>{habit.title}</h3>
                <p>{habit.is_good ? "Good Habit" : "Bad Habit to Avoid"}</p>
              </div>

              <button
                onClick={() => onToggle(habit)}
                className={habit.done ? "habit-done-btn" : "modern-primary-btn"}
              >
                {habit.done ? "Completed" : "Mark Done"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}