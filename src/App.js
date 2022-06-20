import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red,purple } from '@mui/material/colors';



function App() {


  const [mode, setMode] = React.useState('light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            // Purple and green play nicely together.
            main: red[500],
          },
          secondary: {
            // This is green.A700 as hex.
            main: purple[500],
          },
        },
      }),
    [mode],
  );

  const toggleModo = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };



  return ( 
    <BrowserRouter>
  <ThemeProvider theme={theme}>

    <Routes>
   
      <Route path="/home"  element={<Home toggleModo={toggleModo}/>}   ></Route>
      <Route path="/" element={<Login />}></Route>
   
    </Routes>
    </ThemeProvider>

  </BrowserRouter>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //     esta es una prueba hola mundo  fernando michea  
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Fernando Javier Michea Marquez 
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
