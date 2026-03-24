export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Life Coach</h1>
        <p>
          Life Coach is a personal development web platform designed to help users
          improve discipline, reduce unhealthy habits, manage time effectively,
          and create better routines.
        </p>

        <div className="about-grid">
          <div className="about-box">
            <h3>Our Mission</h3>
            <p>
              To empower people with simple digital tools that support growth,
              self-awareness, and daily improvement.
            </p>
          </div>

          <div className="about-box">
            <h3>What We Offer</h3>
            <p>
              Habit tracking, journaling, task planning, focus timer, and a
              personal dashboard for monitoring progress.
            </p>
          </div>

          <div className="about-box">
            <h3>Who It Helps</h3>
            <p>
              Students, professionals, and anyone who wants to become more
              organized, focused, and disciplined.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}