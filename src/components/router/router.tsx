import { Button } from "react-bootstrap";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import SingleTutorial from "../../singleTutorial";
import CreateTutorial from "../createTutorial/createTutorial";
import CollapsibleExample from "../navbar/navbar";

import SinglePlaylist from "../playlist/playlist";

export const ErrorPage = () => {
  return (
    <>
      <div className='something-wrong'>
        <span>Oooops Something went wrong</span>
        <Button>Back</Button>
      </div>
      ;
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/tutorial",
    children: [
      {
        path: "createnew",
        element: <CreateTutorial />,
      },
      {
        path: "tutorial/:tutorialId",
        element: <SingleTutorial />,
      },
    ],
  },

  { path: "/prova", element: <CollapsibleExample /> },
  {
    path: "/playlist/:playlistId",
    element: <SinglePlaylist />,
  },
  // { path: "/record", element: <Recorder /> },
  // { path: "/recordbutton", element: <RecorderButton /> },
]);
