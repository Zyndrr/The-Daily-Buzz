import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import SignUp from "./components/SignUp.js";
import MenuPage from "./components/menu_page.js";
import SearchByName from "./components/searchByName.js";
import SearchByIngredients from "./components/searchByIngredient.js";
import ResultsPage from "./components/resultsPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong Page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/menu",
        element: <MenuPage />,
      },
      {
        path: "search-name",
        element: <SearchByName/>
      },
      {
        path: "search-ingredient",
        element: <SearchByIngredients/>
      },
      {
        path: "results",
        element: <ResultsPage/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
