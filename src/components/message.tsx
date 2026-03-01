import { useSearchParams, useNavigate } from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";
import data from "../data.json";

export default function Message() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const feeling = searchParams.get("feeling") ?? "";

  const entry = data.find(
    (d) => d.name.toLowerCase() === feeling.toLowerCase(),
  );

  if (!entry) {
    return (
      <main className="message-page">
        <div className="message-card">
          <h2>We couldn't find that feeling.</h2>
          <button type="button" onClick={() => navigate("/")}>
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="message-page">
      <div className="message-card">
        <h2 className="message-feeling">A gentle reminder</h2>
        <p className="message-text">
          {entry.message} <br /> <br />
          <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            Please take a moment to do these activities
          </span>
        </p>

        <div className="message-actions">
          <button
            type="button"
            className="btn-activity"
            onClick={() => {
              initScene("activityScene", (prevConfig) => {
                return {
                  ...prevConfig,
                  defaultSize: {
                    width: 300,
                    height: 650,
                  },
                };
              });
              window.open(
                `${typeof __XR_ENV_BASE__ !== "undefined" ? __XR_ENV_BASE__ : "/"}activity?feeling=${feeling}`,
                "activityScene",
              );
            }}
          >
            Suggestions
          </button>
          <button
            type="button"
            className="btn-relax"
            onClick={() => navigate(`/relax`)}
          >
            Short break
          </button>
          <button
            type="button"
            className="btn-video"
            onClick={() => navigate(`/video?feeling=${feeling}`)}
          >
            Watch a video
          </button>
        </div>
      </div>
    </main>
  );
}
