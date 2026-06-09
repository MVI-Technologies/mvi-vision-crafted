import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LazyChatbot from '@/components/LazyChatbot';
import ScrollProgress from '@/components/common/ScrollProgress';
import BackToTop from '@/components/common/BackToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Stats />
        <Process />
        <Services />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Floating UI */}
      <BackToTop />
      <LazyChatbot />
    </div>
  );
};

export default Index;
