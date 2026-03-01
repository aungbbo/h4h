import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Message from "./components/message";
import Relax from "./components/relax";
import Result from "./components/result";
import Activity from "./components/activity";
import Video from "./components/video";
import Final from "./components/final";

function App() {
  // const basename =
  //   typeof __XR_ENV_BASE__ !== "undefined" ? __XR_ENV_BASE__ : "";
  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/message" element={<Message />} />
        <Route path="/relax" element={<Relax />} />
        <Route path="/result" element={<Result />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/video" element={<Video />} />
        <Route path="/final" element={<Final />} />
        {/* <Route path="/webspatial/avp" element={<StartPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:content" element={<Notepad />} />
        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/todos" element={<TodoList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
