import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import renderRoutes from "./configs/routes";
import { AppState } from "./reducers";

function App() {
  const themeMode = useSelector((state: AppState) => state.themeMode?.toggleMode);

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
    <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          {/* <Course /> */}
          <Suspense fallback={<Loading />}>
            {renderRoutes}
            {/* <Route exact path="/" component={Course} />
            <Route exact path="/auth" component={Authenticate } />
            <Route exact path="/member" component={Authenticate} />
            <Redirect from="/" to="/" /> */}
          </Suspense>
        </BrowserRouter>
        <Notification />
      </div >
    </ThemeProvider>
  );
}

export default App;
