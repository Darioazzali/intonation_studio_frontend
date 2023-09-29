import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleTutorial from "./singleTutorial";
import { Button } from "react-bootstrap";
import Recorder from "./components/record/record";
import RecorderButton from "./components/record_button/recorderbutton";
import CreateTutorial from "./components/createTutorial/createTutorial";
import { router } from "./components/router/router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
