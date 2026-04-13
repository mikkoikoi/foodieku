import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Landing from '../pages/Landing'
import Products from '../pages/Products'
import Detail from '../pages/Detail'
import Seller from '../pages/Seller'
import Sellers from '../pages/Sellers'
import About from '../pages/About'
import Contact from '../pages/Contact'
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
        <Route path="/sellers" element={<Layout><Sellers /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
