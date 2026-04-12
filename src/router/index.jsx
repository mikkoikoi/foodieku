import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Landing from '../pages/Landing'
import Products from '../pages/Products'
import Detail from '../pages/Detail'
import Seller from '../pages/Seller'
import ScrollToTop from './ScrollToTop'

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/products/:id" element={<Layout><Detail /></Layout>} />
        <Route path="/seller/:id" element={<Layout><Seller /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
