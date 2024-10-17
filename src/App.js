import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login'
import Register from './components/Register'
import Movies from './components/Movies'

import './App.css'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<Movies/>} />
    </Routes>
  </Router>
)

export default App