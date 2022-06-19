import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/" element={<Login />}></Route>
    </Routes>
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
