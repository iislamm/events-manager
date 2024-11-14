import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetails from "./components/EventDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
