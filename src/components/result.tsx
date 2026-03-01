import { useNavigate } from "react-router-dom";
import SmileImg from "../assets/Smile.png";
import SadImg from "../assets/Sad.png";

export default function Result() {
  const navigate = useNavigate();

  return (
    <main className="result-page">
      <div className="result-container">
        <h1 className="result-title">Feel a little lighter now?</h1>
        <div className="result-buttons">
          <button
            type="button"
            className="result-btn"
            onClick={() => navigate("/final")}
          >
            <img
              src={SmileImg}
              alt="Yes, feeling better"
              className="result-img"
            />
          </button>
          <button
            type="button"
            className="result-btn"
            onClick={() => navigate("/")}
          >
            <img src={SadImg} alt="Not yet" className="result-img" />
          </button>
        </div>
      </div>
    </main>
  );
}
