import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Phone, ChevronRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-wrapper">

      {/* Header */}
      <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <div className="brand-group">
            <a href="#" className="brand-logo">Kari Noé</a>
            <span className="brand-sub">Immobilien & Beratung</span>
          </div>

          <nav className="nav-desktop">
            {['Profil', 'Leistungen', 'Objekte', 'Netzwerk', 'Kontakt'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </nav>

          <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-links">
              {['Profil', 'Leistungen', 'Objekte', 'Netzwerk', 'Kontakt'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial="initial" animate="animate" variants={stagger}
          className="hero-content"
        >
          <motion.h1 variants={fadeInUp}>Kari Noé</motion.h1>

          <motion.div variants={fadeInUp} className="hero-details">
            <div className="hero-divider"></div>

            <p className="hero-subhead">
              Immobilien & Investmentberatung
            </p>

            <p className="hero-tagline">
              Vertrauen · Erfahrung · Netzwerk
            </p>

            <div className="hero-cta">
              <a href="#kontakt" className="btn">Kontakt aufnehmen</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About / Profil Section */}
      <section id="profil" className="section centered-text">
        <div className="container max-w-medium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Über Mich</h2>
            <div className="separator-center"></div>
            <p className="lead-text">
              "Exzellenz ist keine Handlung, sondern eine Gewohnheit. Mit über 20 Jahren Erfahrung biete ich Ihnen eine Immobilienberatung, die auf Diskretion, Wissen und einem exklusiven Netzwerk basiert – egal ob Großprojekt oder private Kleinwohnung."
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Jahre Erfahrung</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Persönlich</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services / Leistungen Section */}
      <section id="leistungen" className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Leistungen</h2>
            <div className="separator-center"></div>
          </div>

          <div className="grid-2-cols">
            {[
              { title: "Verkauf & Vermittlung", text: "Marktgerechte Platzierung und professionelle Abwicklung." },
              { title: "Investmentberatung", text: "Steuerschonende Anlagen und langfristige Strategien für Investoren." },
              { title: "Portfolio Monitoring", text: "Begleitung und Optimierung von Immobilienbeständen." },
              { title: "Kooperationen", text: "Zugang zu exklusiven Partnern und Netzwerken (z. B. Captura)." }
            ].map((service, i) => (
              <motion.div
                key={i}
                className="card service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Aktuelle Objekte Section */}
      <section id="objekte" className="section bg-white text-center">
        <div className="container">
          <div className="section-header">
            <h2>Aktuelle Objekte</h2>
            <div className="separator-center"></div>
          </div>

          <div className="grid-3-cols">
            {[
              {
                title: "Stilvolle Altbauwohnung",
                loc: "Wien Innere Stadt",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
              },
              {
                title: "Modernes Penthouse",
                loc: "Wien Döbling",
                img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
              },
              {
                title: "Exklusive Gartenvilla",
                loc: "Wien Hietzing",
                img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="property-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="property-image-wrapper">
                  <img src={item.img} alt={item.title} className="property-image" />
                </div>
                <h4 className="property-title">{item.title}</h4>
                <div className="property-location">{item.loc}</div>
                <a href="#" className="property-link">Extern Ansehen</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Netzwerk Section */}
      <section id="netzwerk" className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Vertrauen & Netzwerk</h2>
            <div className="separator-center"></div>
          </div>

          <div className="grid-4-cols">
            {[
              { label: "Erfahrung", desc: "Echte Expertise statt Hochglanzblasen. Über 20 Jahre Marktkenntnis." },
              { label: "Netzwerk", desc: "Zugang zu Notaren und Experten als echter Mehrwert für Ihr Projekt." },
              { label: "Fokus", desc: "Persönliche Betreuung – nicht nur bei Großvolumen-Deals." },
              { label: "Diskretion", desc: "Ihr Anliegen bleibt unser Geheimnis. Garantiert." }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="value-card-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="value-card-title">{item.label}</div>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="section dark-section">
        <div className="container centered-text">
          <h2 className="display-heading">Lassen Sie uns sprechen.</h2>
          <p className="contact-sub">
            Gerne berate ich Sie persönlich.
          </p>

          <div className="contact-actions">
            <a href="mailto:office@karinoe.at" className="btn btn-outline-white">
              E-Mail
            </a>
            <a href="tel:+4312345678" className="btn btn-white">
              Anrufen
            </a>
          </div>

          <div className="footer-links">
            <div className="footer-copy">© 2026 Kari Noé</div>
            <div className="footer-nav">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
