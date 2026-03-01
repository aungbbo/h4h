import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import data from "../data.json";

export default function Activity() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const feeling = searchParams.get("feeling") ?? "";
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const entry = data.find(
    (d) => d.name.toLowerCase() === feeling.toLowerCase(),
  );

  if (!entry) {
    return (
      <main className="activity-page">
        <div className="activity-container">
          <h2>We couldn't find activities for that feeling.</h2>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  const total = entry.activities.length;
  const selected = selectedIdx !== null ? entry.activities[selectedIdx] : null;

  const goPrev = () => setSelectedIdx((prev) => (prev! - 1 + total) % total);
  const goNext = () => setSelectedIdx((prev) => (prev! + 1) % total);

  if (selected) {
    return (
      <main className="activity-page">
        <div className="activity-container">
          <div className="activity-nav">
            <i
              className="fa-solid fa-arrow-left activity-arrow"
              onClick={goPrev}
            ></i>
            <h2 className="activity-title">{selected.title}</h2>
            <i
              className="fa-solid fa-arrow-right activity-arrow"
              onClick={goNext}
            ></i>
          </div>
          <p className="activity-details">{selected.details}</p>
          <button
            type="button"
            className="activity-back"
            onClick={() => setSelectedIdx(null)}
          >
            Back to activities
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="activity-page">
      <div className="activity-container">
        <h2 className="activity-heading">Try one of these</h2>
        <ul className="activity-list">
          {entry.activities.map((activity, idx) => (
            <li key={idx}>
              <button
                type="button"
                className="activity-item"
                onClick={() => setSelectedIdx(idx)}
              >
                {activity.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
