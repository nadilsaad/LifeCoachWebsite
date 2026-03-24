import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero-section hero-bg">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <span className="hero-badge">Grow Daily • Stay Focused • Live Better</span>
            <h1>Plant Better Habits, Grow a Better Life</h1>
            <p>
              Life Coach helps you break unhealthy patterns, build discipline,
              manage your time, and stay committed to personal growth every day.
            </p>

            <div className="hero-actions">
              <button
                onClick={() => navigate("/register")}
                className="modern-primary-btn"
              >
                Start Your Journey
              </button>

              <button
                onClick={() => navigate("/login")}
                className="modern-secondary-btn light-btn"
              >
                Login
              </button>
            </div>
          </div>

          <div className="hero-side-card fade-in-up delay-1">
            <div className="preview-card">
              <h3>Today’s Growth Plan</h3>
              <ul>
                <li>Wake up early</li>
                <li>Read for 20 minutes</li>
                <li>Stay away from distractions</li>
                <li>Write today’s journal</li>
              </ul>
              <div className="preview-score">Mindset Score: 82%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header fade-in-up">
          <h2>Everything You Need to Improve Yourself</h2>
          <p>
            A calm, practical, and motivating space for personal development.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🌱</div>
            <h3>Habit Building</h3>
            <p>
              Create good routines and track your progress one day at a time.
            </p>
          </div>

          <div className="feature-card fade-in-up delay-1">
            <div className="feature-icon">⏳</div>
            <h3>Time Management</h3>
            <p>
              Stay productive using a focus timer and a daily task planner.
            </p>
          </div>

          <div className="feature-card fade-in-up delay-2">
            <div className="feature-icon">📔</div>
            <h3>Daily Journal</h3>
            <p>
              Reflect on your emotions, progress, lessons, and daily wins.
            </p>
          </div>

          <div className="feature-card fade-in-up">
            <div className="feature-icon">📈</div>
            <h3>Progress Dashboard</h3>
            <p>
              View completed habits, tasks, and your personal growth score.
            </p>
          </div>

          <div className="feature-card fade-in-up delay-1">
            <div className="feature-icon">🧠</div>
            <h3>Self-Discipline</h3>
            <p>
              Reduce unhealthy behavior and strengthen focus and consistency.
            </p>
          </div>

          <div className="feature-card fade-in-up delay-2">
            <div className="feature-icon">✨</div>
            <h3>Motivational Space</h3>
            <p>
              A peaceful and attractive interface that keeps users comfortable.
            </p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-card fade-in-up">
          <div className="story-text">
            <h2>Growth Starts Small</h2>
            <p>
              Just like a seed grows with time, your habits shape your future.
              The small positive actions you repeat today become the stronger
              version of yourself tomorrow.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="modern-primary-btn"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section-header fade-in-up">
          <h2>Designed to Make Growth Feel Real</h2>
          <p>Simple tools, strong discipline, real progress.</p>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card fade-in-up">
            <p>
              “The platform gives a peaceful environment that makes me want to
              stay consistent.”
            </p>
            <strong>- Growth User</strong>
          </div>

          <div className="testimonial-card fade-in-up delay-1">
            <p>
              “The focus timer and habit tracker helped me reduce distractions.”
            </p>
            <strong>- Student User</strong>
          </div>

          <div className="testimonial-card fade-in-up delay-2">
            <p>
              “The journal section helped me think deeper and stay accountable.”
            </p>
            <strong>- Personal Development User</strong>
          </div>
        </div>
      </section>
    </div>
  );
}