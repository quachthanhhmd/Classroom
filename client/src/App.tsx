import React, { useState } from 'react';

import './App.css';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";

import ThemeMode from "./components/ThemeMode";
import Main from "./pages/Main";
import { useSelector } from 'react-redux'
import { AppState } from "./reducers";

function App() {
  const themeMode = useSelector((state: AppState) => state.themeMode?.toggleMode);
  // const dispatch = useDispatch();

  // const [toggleDark, settoggleDark] = useState(false);
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#26a27b"
      },
      secondary: {
        main: "#fafafa"
      },
      background: {
        default: "#18191a"
      }
    }
  });
  const lightTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#000000"
      },
      secondary: {
        main: "#000000"
      },
      background: {
        default: "#f2f2f2"
      }
    }
  })

  return (

    // Wrapping code in ThemeProvider
    <ThemeProvider theme={themeMode ?  darkTheme: lightTheme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}


export default App;
