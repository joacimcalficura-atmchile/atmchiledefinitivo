import { useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { AdmissionAgent } from './components/AdmissionAgent';
import logoAtm from './assets/logo_atm.jpg';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Smooth scroll setup
    lenisRef.current = new Lenis();

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="App">
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '15px 40px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="nav-logo-wrapper">
          <img src={logoAtm} alt="Future Solution SpA" className="nav-logo-img" />
        </div>
        <button
          onClick={() => document.getElementById('admission')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'transparent',
            border: '1px solid rgba(0,242,255,0.4)',
            color: 'var(--accent-color)',
            padding: '10px 25px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          className="nav-btn"
        >
          POSTULAR
        </button>
      </nav>

      <Hero />
      <BentoGrid />
      <AdmissionAgent />

      <footer style={{
        textAlign: 'center',
        padding: '100px 20px',
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="footer-logo-wrapper">
            <img src={logoAtm} alt="Footer Logo" className="footer-logo-img" />
          </div>
          <p style={{
            marginBottom: '30px',
            color: '#666',
            fontSize: '0.95rem',
            lineHeight: '1.8',
            fontWeight: 300,
            maxWidth: '650px',
            margin: '0 auto 30px'
          }}>
            Liderando la ingeniería de software y la transformación digital empresarial en Chile.
            Especialistas en IA avanzada, Automatización de Procesos y Cloud Computing de alto rendimiento.
          </p>
          <div style={{
            height: '1px',
            width: '60px',
            background: 'var(--accent-color)',
            margin: '0 auto 40px',
            opacity: 0.3
          }}></div>
          <p style={{
            color: '#333',
            fontSize: 'max(0.7rem, 0.8vw)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            © 2024 <span className="notranslate" translate="no">Future Solution SpA</span>. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </footer>

      <style>{`
        .nav-btn:hover {
          background: var(--accent-color);
          color: #000;
          box-shadow: 0 0 25px rgba(0,242,255,0.4);
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          nav {
            padding: 15px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
