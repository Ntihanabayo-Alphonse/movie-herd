import './App.css'
import Header from './components/Header/Header'
import MainNav from './components/MainNav/MainNav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Trending from './pages/Trending/Trending'
import Movies from './pages/Movies/Movies'
import Series from './pages/Series/Series'
import Search from './pages/Search/Search'

function App() {
  return (
    <Router>
      <Header />
      <div className='app'>
        <div className="container">
          <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </div>
      </div>
      <MainNav />
    </Router>
  )
}

export default App;