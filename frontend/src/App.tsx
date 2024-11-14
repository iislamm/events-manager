import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventDetails from "./components/EventDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <EventsList />,
    },
    {
      path: "/events/:id",
      element: <EventDetails />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
