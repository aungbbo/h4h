import AnxiousImg from "../assets/Anxious.png";
import OverwhelmedImg from "../assets/Overwhelmed.png";
import LonelyImg from "../assets/Lonely.png";
import AngryImg from "../assets/Angry.png";

const feelings = ["Anxious", "Overwhelmed", "Lonely", "Angry"] as const;
const feelingsData: Record<
  (typeof feelings)[number],
  { image: string; color: string }
> = {
  // Anxious: { image: AnxiousImg, color: "#cda64d" },
  Anxious: { image: AnxiousImg, color: "#99936e" },
  Overwhelmed: { image: OverwhelmedImg, color: "#4e5781" },
  Lonely: { image: LonelyImg, color: "#8b8b8b" },
  // Angry: { image: AngryImg, color: "#c73535" },
  Angry: { image: AngryImg, color: "#8f4c4c" },
};

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-container">
        <h1 className="home-title">What are you carrying at this moment?</h1>
        <div className="home-buttons">
          {feelings.map((feeling) => (
            <button
              key={feeling}
              type="button"
              className="feeling-option"
              style={{ backgroundColor: feelingsData[feeling].color }}
            >
              <img
                src={feelingsData[feeling].image}
                alt={feeling}
                className="feeling-image"
              />
              <span className="feeling-text">{feeling}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
