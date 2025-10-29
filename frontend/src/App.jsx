import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css'

// Importando todas as páginas que são acessadas pela Navbar
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Servicos from './pages/Servicos/Servicos'
import Clima from './pages/Clima/Clima'
import Financeiro from './pages/Financeiro/Financeiro'
import Sobre from './pages/Sobre/Sobre'

function App() {
  return (
    <>
      {/* 2. Coloque a Navbar FORA do <Routes> */}
      {/* Ela será renderizada uma vez e permanecerá na tela sempre */}
      <Navbar />
      <main>
        {/* O componente Routes define a área onde as páginas serão trocadas */}
        <Routes>
          {/* Cada Route define uma URL e o componente que será renderizado */}
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/clima" element={<Clima />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
