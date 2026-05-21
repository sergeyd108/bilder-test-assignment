import { BrowserRouter, Route, Routes } from 'react-router'
import IndexPage from './pages/IndexPage'
import FeesPage from './pages/FeesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/fees' element={<FeesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
