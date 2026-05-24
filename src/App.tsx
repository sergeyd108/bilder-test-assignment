import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import IndexPage from '@/pages/IndexPage'
import FeesPage from '@/pages/FeesPage'
import { RatesProvider } from '@/features/rates'
import { FeesProvider } from '@/features/fees'

function App() {
  return (
    <RatesProvider>
      <FeesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<IndexPage />} />
              <Route path='/fees' element={<FeesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FeesProvider>
    </RatesProvider>
  )
}

export default App
