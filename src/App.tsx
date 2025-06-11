import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientScrollBar from './components/ClientScrollBar';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ClientScrollBar />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;