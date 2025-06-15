import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar-ai';
import Hero from './components/Hero-new-ai';
import Services from './components/Services-ai';
import AboutUs from './components/AboutUs-ai';
import TechnologyFeatures from './components/TechnologyFeatures-ai';
import Contact from './components/Contact';
import Footer from './components/Footer-ai';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import RefundPolicy from './components/RefundPolicy';
import CancellationPolicy from './components/CancellationPolicy';
import Pricing from './components/Pricing';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;
