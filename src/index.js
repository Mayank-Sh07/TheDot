import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Firebase, { FirebaseContext } from "./Components/Firebase";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
    text: {
      primary: "#000000",
    },
    divider: "#000000",
  },
});
ReactDOM.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={new Firebase()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </FirebaseContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
