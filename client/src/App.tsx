import React, {useState} from 'react';

import './App.css';
import Main from "./pages/Main";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ThemeMode from "./components/ThemeMode";

function App() {
  const [toggleDark, settoggleDark] = useState(false);
  const myTheme = createTheme({
    // Theme settings
    palette: {
      type: toggleDark ? "dark" : "light",
    },
  });
  
  
  return (
    
    // Wrapping code in ThemeProvider
    <ThemeProvider theme={myTheme}>
      <Main 
        toggleDark={toggleDark}
        settoggleDark={settoggleDark}
        />
    </ThemeProvider>
  );
}

export default App;
