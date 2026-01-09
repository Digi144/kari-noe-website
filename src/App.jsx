import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Phone, ChevronRight, Check, Search, Target, Zap, Users, Trophy, FileText, ArrowRight, ChevronDown, Home, TrendingUp, BarChart, Handshake, Award, Network, Lock, Key, Shield, Heart, Briefcase, Lightbulb, UserCheck, Sparkles, CheckCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <ChevronDown className={`faq-icon ${isOpen ? 'open' : ''}`} size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="faq-answer"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Parallax effect for Netzwerk section - image moves slower than scroll
      const netzwerkSection = document.getElementById('netzwerk');
      if (netzwerkSection) {
        const rect = netzwerkSection.getBoundingClientRect();
        const sectionTop = netzwerkSection.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        // Calculate when section is visible in viewport
        const sectionVisible = rect.top < windowHeight && rect.bottom > 0;
        
        if (sectionVisible) {
          // Calculate how much we've scrolled relative to section entry point
          // When section enters viewport (top of section at bottom of viewport)
          const entryPoint = sectionTop - windowHeight;
          const scrollDistance = scrollY - entryPoint;
          
          // Move image at 0.5x speed (slower than scroll) for noticeable parallax
          // Image moves in opposite direction to create depth effect
          const offset = scrollDistance * 0.5;
          setParallaxOffset(-offset);
        } else {
          setParallaxOffset(0);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-wrapper">

      {/* Header */}
      <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <div className="brand-group">
            <a href="#" className="brand-logo">Kari Noé</a>
            <span className="brand-sub">Immobilien & Investmentberatung</span>
          </div>

          <nav className="nav-desktop">
            {['Leistungen', 'Vorteile', 'Projekte', 'Netzwerk', 'Über Mich', 'Kontakt'].map((item) => (
              <a key={item} href={`#${item === 'Über Mich' ? 'profil' : item.toLowerCase()}`} className="nav-link">
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
              {['Leistungen', 'Vorteile', 'Projekte', 'Netzwerk', 'Über Mich', 'Kontakt'].map((item) => (
                <a key={item} href={`#${item === 'Über Mich' ? 'profil' : item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-section bg-white">
        <motion.div
          initial="initial" animate="animate" variants={stagger}
          className="hero-content"
        >
          <motion.h1 variants={fadeInUp}>Kari Noé</motion.h1>

          <motion.div variants={fadeInUp} className="hero-details">
            <div className="hero-divider"></div>

            <p className="hero-subhead">
              Immobilien-Investment mit Weitblick. Ihr Experte für nachhaltige Werte.
            </p>

            <p className="hero-tagline">
              Seit über zwei Jahrzehnten unterstütze ich meine Klienten dabei, die richtigen Entscheidungen in einem komplexen Markt zu treffen – von der strategischen Investition bis zur erfolgreichen Vermittlung.
            </p>

            <div className="hero-cta">
              <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
            </div>
            <div className="hero-bullets">
              <div className="hero-bullet-item">
                <Check size={20} />
                <span>Über 20 Jahre Marktkenntnis</span>
              </div>
              <div className="hero-bullet-item">
                <Check size={20} />
                <span>100% persönliche Betreuung</span>
              </div>
              <div className="hero-bullet-item">
                <Check size={20} />
                <span>Exklusives Netzwerk</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services / Leistungen Section - 2. Section */}
      <section id="leistungen" className="section bg-white">
        <div className="container">
          <div className="section-header text-center">
            <h2>Meine Leistungen</h2>
            <div className="separator-center"></div>
            <p className="services-intro">
              Ob Sie eine Immobilie kaufen, verkaufen, vermieten oder eine strategische Anlageentscheidung treffen möchten – ich biete Ihnen ein umfassendes Leistungsspektrum, das auf Ihre individuellen Bedürfnisse zugeschnitten ist.
            </p>
          </div>

          <div className="grid-2-cols">
            {[
              { icon: <TrendingUp size={32} />, title: "Immobilien-Investmentberatung", text: "Sie suchen eine steuerschonende Anlagemöglichkeit oder eine Vorsorgewohnung für Ihre Kinder? Gemeinsam finden wir die Immobilie, die perfekt zu Ihren langfristigen Zielen passt." },
              { icon: <Home size={32} />, title: "Verkauf & Vermittlung", text: "Ich platziere Ihre Immobilie optimal am Markt und sorge für einen reibungslosen Verkaufsprozess. Dank meines Netzwerks erreiche ich die richtigen Käufer." },
              { icon: <Key size={32} />, title: "Vermietung & Betreuung", text: "Sie haben eine Wohnung gekauft und wissen nicht, ob Sie vermieten oder verkaufen sollen? Ich berate Sie und übernehme auf Wunsch auch die professionelle Vermietung." },
              { icon: <BarChart size={32} />, title: "Monitoring & Projektbegleitung", text: "Für Immobiliengesellschaften und private Investoren übernehme ich das Monitoring von Portfolios und begleite Projekte von der Auswahl bis zur Verwaltungskoordination." }
            ].map((service, i) => (
              <motion.div
                key={i}
                className="card service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="section-cta" style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>

      {/* Benefits Section - 3. Section */}
      <section id="vorteile" className="section bg-off-white benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Ihr Vorteil</h2>
            <div className="separator-center"></div>
          </div>

          {/* Introduction Text */}
          <div className="benefits-intro">
            <p className="benefits-intro-lead text-center">
              In einem unübersichtlichen Markt ist Vertrauen die wichtigste Währung. Meine Klienten schätzen vor allem drei Dinge an unserer Zusammenarbeit:
            </p>
            <div className="benefits-intro-points">
              <div className="benefits-intro-point">
                <strong>Mein Netzwerk:</strong> Über 20 Jahre in der Branche haben ein starkes Netzwerk aus Notaren, Rechtsanwälten, Finanzierungsexperten und großen Immobiliengruppen geschaffen. Dieses Netzwerk ist Ihr Kapital.
              </div>
              <div className="benefits-intro-point">
                <strong>Meine Erfahrung:</strong> Ich kenne den Markt aus der Perspektive des Investors und des Vermittlers. Diese 360-Grad-Sicht ermöglicht es mir, Chancen zu erkennen, wo andere nur Objekte sehen.
              </div>
              <div className="benefits-intro-point">
                <strong>Meine Unabhängigkeit:</strong> Ich bin nicht an ein bestimmtes Unternehmen gebunden. Meine Beratung ist unabhängig und ausschließlich Ihren Interessen verpflichtet. Sie bekommen eine ehrliche Einschätzung und eine maßgeschneiderte Strategie.
              </div>
            </div>
            <div className="benefits-intro-image">
              <img src="/vertrauen_expertise.png" alt="Vertrauen & Expertise" className="benefits-intro-img" />
            </div>
          </div>
          <div className="grid-3-cols">
            {[
              { 
                icon: <Award size={32} />, 
                title: "Expertise", 
                text: "20+ Jahre Marktkenntnis und Erfahrung" 
              },
              { 
                icon: <Network size={32} />, 
                title: "Netzwerk", 
                text: "Zugang zu Experten, Notaren und exklusiven Partnern" 
              },
              { 
                icon: <UserCheck size={32} />, 
                title: "Persönlich", 
                text: "100% persönliche Betreuung von Kari Noé" 
              },
              { 
                icon: <Shield size={32} />, 
                title: "Diskret", 
                text: "Vollständige Vertraulichkeit und Geheimhaltung" 
              },
              { 
                icon: <Sparkles size={32} />, 
                title: "Flexibel", 
                text: "Services nach Ihren individuellen Bedürfnissen" 
              },
              { 
                icon: <Trophy size={32} />, 
                title: "Erfolgreich", 
                text: "Bewährte Strategien und langfristige Erfolge" 
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="section-cta" style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>

      {/* Portfolio / Aktuelle Projekte Section */}
      <section id="projekte" className="section bg-off-white text-center">
        <div className="container">
          <div className="section-header">
            <h2>Aktuelle Projekte</h2>
            <div className="separator-center"></div>
            <p className="projects-intro">
              Hier finden Sie eine Auswahl an Immobilien, die ich aktuell vermittle. Für weitere Informationen oder ein persönliches Gespräch stehe ich Ihnen jederzeit zur Verfügung.
            </p>
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
      <section id="netzwerk" className="section bg-white netzwerk-section">
        <div className="parallax-background-wrapper">
          <div 
            className="parallax-background"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          >
            <img src="/netzwerk_parallax.png" alt="Netzwerk" />
          </div>
        </div>
        <div className="container">
          <div className="section-header text-center">
            <h2>Vertrauen & Netzwerk</h2>
            <div className="separator-center"></div>
          </div>

          <div className="grid-4-cols">
            {[
              { icon: <Award size={32} />, label: "Erfahrung", desc: "Echte Expertise statt Hochglanzblasen. Über 20 Jahre Marktkenntnis." },
              { icon: <Network size={32} />, label: "Netzwerk", desc: "Zugang zu Notaren und Experten als echter Mehrwert für Ihr Projekt." },
              { icon: <Target size={32} />, label: "Fokus", desc: "Persönliche Betreuung – nicht nur bei Großvolumen-Deals." },
              { icon: <Lock size={32} />, label: "Diskretion", desc: "Ihr Anliegen bleibt mein Geheimnis. Garantiert." }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="value-card-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="value-card-icon">{item.icon}</div>
                <div className="value-card-title">{item.label}</div>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="section-cta" style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>

      {/* Process Visualization Section */}
      <section className="section bg-off-white process-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Wie läuft eine Zusammenarbeit mit Kari Noé ab?</h2>
            <div className="separator-center"></div>
          </div>
          <div className="process-steps">
            {[
              { icon: <Search size={32} />, text: "Kari Noé analysiert Ihre Situation und Ziele" },
              { icon: <Lightbulb size={32} />, text: "Ich entwickle eine individuelle Strategie" },
              { icon: <Zap size={32} />, text: "Professionelle Umsetzung mit Kari Noés exklusivem Netzwerk" },
              { icon: <Heart size={32} />, text: "Kontinuierliche Begleitung und Optimierung durch Kari Noé" },
              { icon: <CheckCircle size={32} />, text: "Langfristige Partnerschaft und nachhaltiger Erfolg" }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="process-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="process-step-icon">{step.icon}</div>
                <div className="process-step-number">{i + 1}</div>
                <p>{step.text}</p>
                {i < 4 && <div className="process-arrow"><ArrowRight size={24} /></div>}
              </motion.div>
            ))}
          </div>
          <div className="section-cta" style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>

      {/* Kari Noé - The Expert Section */}
      <section className="section bg-white expert-section">
        <div className="container">
          <div className="expert-content">
            <div className="expert-image-wrapper">
              <img src="/Kari_Noe-web.jpg" alt="Kari Noé" className="expert-portrait" />
            </div>
            <div className="expert-text">
              <h2>Über mich</h2>
              <p>Mein Name ist Kari Noé, und seit mehr als 20 Jahren bin ich Ihr vertrauensvoller Partner in der Immobilienbranche. Mein Weg begann nicht im klassischen Maklergeschäft, sondern auf der Seite der Investoren. Diese Perspektive prägt meine Arbeit bis heute: Ich sehe Immobilien nicht nur als Objekte, sondern als wertvolle Bausteine für Ihre finanzielle Zukunft.</p>
              <p>Lange Zeit agierte ich im Hintergrund, angedockt an große Immobilien-Unternehmungen, die meine Expertise für sich nutzten. Jetzt ist es an der Zeit, meine Identität und mein über Jahrzehnte aufgebautes Wissen direkt an meine Klienten weiterzugeben. Ich bin kein gewöhnlicher Makler – ich bin Ihr Berater, Ihr Strategie und Ihr Begleiter bei allen Immobilienangelegenheiten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Contact Process Section */}
      <section className="section bg-off-white contact-process">
        <div className="container">
          <div className="section-header text-center">
            <h2>Tritt mit Kari Noé in Kontakt</h2>
            <div className="separator-center"></div>
          </div>
          <div className="contact-process-steps">
            {[
              { icon: <FileText size={32} />, text: "Füllen Sie mein kurzes Formular aus" },
              { icon: <Briefcase size={32} />, text: "Kari Noé analysiert Ihr Potenzial" },
              { icon: <Target size={32} />, text: "Ich entwickle eine maßgeschneiderte Strategie" }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="contact-process-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="contact-process-icon">{step.icon}</div>
                <div className="contact-process-number">{i + 1}</div>
                <p>{step.text}</p>
                {i < 2 && <div className="contact-process-arrow"><ArrowRight size={24} /></div>}
              </motion.div>
            ))}
          </div>
          <div className="contact-process-cta">
            <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white faq-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Häufig gestellte Fragen</h2>
            <div className="separator-center"></div>
          </div>
          <div className="faq-list">
            {[
              {
                question: "Welche Erfahrung hat Kari Noé in der Immobilienberatung?",
                answer: "Mit über 20 Jahren Erfahrung biete ich echte Expertise statt Hochglanzblasen. Meine Arbeit basiert auf tiefem Marktkenntnis und persönlicher Betreuung. Exzellenz ist keine Handlung, sondern eine Gewohnheit – diese Philosophie prägt meine Beratung bei jedem Projekt, ob Großprojekt oder private Kleinwohnung."
              },
              {
                question: "Welche Dienstleistungen werden angeboten?",
                answer: "Ich biete vier Hauptdienstleistungen an: Verkauf & Vermittlung (marktgerechte Platzierung und professionelle Abwicklung), Investmentberatung (steuerschonende Anlagen und langfristige Strategien), Portfolio Monitoring (Begleitung und Optimierung von Immobilienbeständen) und Kooperationen (Zugang zu exklusiven Partnern und Netzwerken wie Captura)."
              },
              {
                question: "Wie unterscheidet sich die Beratung von anderen Anbietern?",
                answer: "Meine Beratung basiert auf vier Kernwerten: Erfahrung (echte Expertise statt Hochglanzblasen), Netzwerk (Zugang zu Notaren und Experten), Fokus (persönliche Betreuung bei allen Projektgrößen) und Diskretion (vollständige Vertraulichkeit). Diese Kombination ermöglicht es mir, für jeden Kunden die bestmögliche Lösung zu finden."
              },
              {
                question: "Für wen ist die Dienstleistung geeignet?",
                answer: "Meine Dienstleistung ist für alle geeignet – egal ob Großprojekt oder private Kleinwohnung. Ich biete personalisierte Beratung für Investoren, Privatpersonen, Unternehmen mit Immobilienportfolios und alle, die Wert auf Diskretion, Expertise und persönliche Betreuung legen. Jeder Kunde erhält 100% persönliche Aufmerksamkeit, unabhängig von der Projektgröße."
              },
              {
                question: "Wie funktioniert die Investmentberatung?",
                answer: "Die Investmentberatung bietet steuerschonende Anlagen und langfristige Strategien speziell für Investoren. Dies umfasst: Analyse Ihrer aktuellen Immobiliensituation, Entwicklung einer individuellen Anlagestrategie, Portfolio Monitoring – kontinuierliche Begleitung und Optimierung Ihrer Immobilienbestände, und Zugang zu exklusiven Investitionsmöglichkeiten über mein Partnernetzwerk. Ziel ist es, Ihre Investitionen zu maximieren und langfristig zu sichern."
              },
              {
                question: "Welche Immobilien werden aktuell angeboten?",
                answer: "Derzeit biete ich drei exklusive Immobilien an: Stilvolle Altbauwohnung in Wien Innere Stadt (klassischer Wiener Charme mit modernem Komfort), Modernes Penthouse in Wien Döbling (zeitgenössisches Design mit Premium-Ausstattung) und Exklusive Gartenvilla in Wien Hietzing (großzügige Wohnfläche mit privatem Garten). Alle Objekte sind sorgfältig ausgewählt und repräsentieren das höchste Qualitätsniveau."
              },
              {
                question: "Wie kann ich Kari Noé kontaktieren?",
                answer: "Sie können mich auf mehreren Wegen erreichen: Per E-Mail für schriftliche Anfragen, per Telefon für ein direktes Gespräch, oder für ein persönliches Gespräch. Alle Kontaktoptionen finden Sie auf der Kontaktseite dieser Website. Ich antworte schnell und diskret auf alle Anfragen. Ihr Anliegen bleibt mein Geheimnis – garantiert."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="section bg-off-white">
        <div className="container">
          <div className="contact-content">
            <div className="contact-header centered-text">
              <h2 className="display-heading">Nehmen Sie Kontakt auf</h2>
              <p className="contact-sub">
                Sie haben Fragen, ein konkretes Anliegen oder möchten einfach nur über die Möglichkeiten sprechen, die der Immobilienmarkt für Sie bereithält? Ich freue mich darauf, von Ihnen zu hören.
              </p>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-Mail *</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Nachricht *</label>
                  <textarea id="message" name="message" rows="6" required></textarea>
                </div>
                <button type="submit" className="btn btn-submit">
                  Nachricht senden
                </button>
              </form>
            </div>

            <div className="contact-actions centered-text">
              <p className="contact-or">oder</p>
              <div className="contact-buttons">
                <a href="mailto:office@karinoe.at" className="btn">
                  E-Mail
                </a>
                <a href="tel:+4312345678" className="btn">
                  Anrufen
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-copy">© 2026 Kari Noé</div>
              <div className="footer-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); setShowImpressum(true); }}>Impressum</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setShowDatenschutz(true); }}>Datenschutz</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impressum Modal */}
      <AnimatePresence>
        {showImpressum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="legal-modal-overlay"
            onClick={() => setShowImpressum(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="legal-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="legal-modal-close" onClick={() => setShowImpressum(false)}>
                <X size={24} />
              </button>
              <h2>Impressum</h2>
              <div className="legal-content">
                <p><strong>Angaben gemäß § 5 TMG</strong></p>
                <p>
                  <strong>Name:</strong> [PLATZHALTER: Name]<br />
                  <strong>Firma:</strong> [PLATZHALTER: Firmenname]<br />
                  <strong>Adresse:</strong> [PLATZHALTER: Straße und Hausnummer]<br />
                  [PLATZHALTER: Postleitzahl] [PLATZHALTER: Ort]
                </p>
                <p>
                  <strong>Kontakt:</strong><br />
                  Telefon: [PLATZHALTER: Telefonnummer]<br />
                  E-Mail: [PLATZHALTER: E-Mail-Adresse]
                </p>
                <p>
                  <strong>Umsatzsteuer-ID:</strong><br />
                  Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                  [PLATZHALTER: USt-IdNr.]
                </p>
                <p>
                  <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
                  [PLATZHALTER: Name]<br />
                  [PLATZHALTER: Adresse]
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Datenschutz Modal */}
      <AnimatePresence>
        {showDatenschutz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="legal-modal-overlay"
            onClick={() => setShowDatenschutz(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="legal-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="legal-modal-close" onClick={() => setShowDatenschutz(false)}>
                <X size={24} />
              </button>
              <h2>Datenschutzerklärung</h2>
              <div className="legal-content">
                <h3>1. Datenschutz auf einen Blick</h3>
                <h4>Allgemeine Hinweise</h4>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>

                <h3>2. Verantwortliche Stelle</h3>
                <p>
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p>
                  <strong>Name:</strong> [PLATZHALTER: Name]<br />
                  <strong>Firma:</strong> [PLATZHALTER: Firmenname]<br />
                  <strong>Adresse:</strong> [PLATZHALTER: Straße und Hausnummer]<br />
                  [PLATZHALTER: Postleitzahl] [PLATZHALTER: Ort]
                </p>
                <p>
                  <strong>Telefon:</strong> [PLATZHALTER: Telefonnummer]<br />
                  <strong>E-Mail:</strong> [PLATZHALTER: E-Mail-Adresse]
                </p>

                <h3>3. Datenerfassung auf dieser Website</h3>
                <h4>Kontaktformular</h4>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>

                <h3>4. Ihre Rechte</h3>
                <p>
                  Sie haben jederzeit das Recht, Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten. Des Weiteren haben Sie ein Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Widerspruchsrecht gegen die Verarbeitung.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
