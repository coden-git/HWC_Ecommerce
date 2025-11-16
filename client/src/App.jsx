import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Products, PrivacyPolicy, TermsOfService, ReturnRefundPolicy, ProductDetails, Cart, ShippingDashboard } from './pages'
import { Header, Footer } from './components'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-green-50 to-emerald-50">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:identifier" element={<ProductDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping/23466290732-35324234-43242" element={<ShippingDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
