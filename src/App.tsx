import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientScrollBar from './components/ClientScrollBar';
import Services from './components/Services';
import BrandWeek from './components/BrandWeek';
import MVPService from './components/MVPService';
import CloudDeployments from './components/CloudDeployments';
import ContentToConversion from './components/ContentToConversion';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ComingSoon from './components/ComingSoon';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ClientScrollBar />
      <Services />
      <BrandWeek />
      <MVPService />
      <CloudDeployments />
      <ContentToConversion />
      <Portfolio />
      <Testimonials />
      <ComingSoon />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;