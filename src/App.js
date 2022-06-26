import React, { useContext } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Home from './Pages/Main/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, purple } from '@mui/material/colors';

import { UsuarioContext, UsuarioProvider } from './Provider/UsuarioContext';
import Progressbar from './Pages/Home/Progressbar';
import GastosHome from './Pages/Gastos/GastosHome';
import Index from './Pages/Main/Index'

function App(props) {


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
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <UsuarioProvider>
       
          <UsuarioContext.Consumer>
            {value => {
              if (value == null) {
                  
                return (
                  <div style={{position: 'absolute',
                    left: '50%',
                    top: '50%',
                    WebkitTransform:'translate(-50%, -50%)',
                    transform: 'translate(-50%, -50%)'}}>
                  <div style={{
                    margin: 'auto',
                    width: '40px',
                    padding: '10px'
                  }}>
                    <Progressbar></Progressbar>
                  </div>
                  </div>)
          }else{

            if (value == false) {
                return (
                  <Routes>     
                      <Route path="/" element={<Login />}></Route>
                      <Route path="*" element={<Login />}></Route>
                  </Routes>
                )      
            }else{
               return (
                <Routes>     
                    <Route path="/" element={ <Index theme={theme} toggleModo={toggleModo}></Index>}>
                         
                          <Route path="/gastos" element={<GastosHome />}/>
                          <Route index element={<Home/>} />
                    </Route>
                 </Routes>
                )     

            }
              
            }}}
          </UsuarioContext.Consumer>


        
      </UsuarioProvider>

    </BrowserRouter>
    </ThemeProvider>        

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
