import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom' // consultar info browser
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx';
import NavBar from './components/NavBar';
import PokemonCreate from './components/PokemonCreate'
import Detail from './components/Detail'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={[<NavBar />, <Home />]} />
          <Route path='/pokemon/create' element={<PokemonCreate />} />
          <Route path='/pokemon/:id' element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
