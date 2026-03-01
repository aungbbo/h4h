import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import data from "../data.json";

export default function Video() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const feeling = searchParams.get("feeling") ?? "";

  const entry = data.find(
    (d) => d.name.toLowerCase() === feeling.toLowerCase(),
  );

  useEffect(() => {
    if (entry?.link) {
      window.open(entry.link, "_blank", "noopener,noreferrer");
    }
  }, [entry]);

  if (!entry) {
    return (
      <main className="message-page">
        <div className="message-card">
          <h2>We couldn't find a video for that feeling.</h2>
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

  return (
    <main className="message-page">
      <div className="message-card">
        <h2 className="message-feeling">Opening your video…</h2>
        <p className="message-text">
          A calming video should have opened in a new tab. If it didn't, you can{" "}
          <a href={entry.link} target="_blank" rel="noopener noreferrer">
            click here
          </a>
          .
        </p>
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate(-1 as never)}
        >
          Go back
        </button>
      </div>
    </main>
  );
}
