import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Check, FileText, ArrowRight, ChevronDown, Home, TrendingUp, BarChart, Key, Briefcase, Lightbulb, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  const appRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Section headers — fade in + slide up
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.fromTo(header,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      // Service cards — staggered reveal
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      // Benefits image — parallax on scroll
      const benefitsImg = document.querySelector('.benefits-intro-img');
      if (benefitsImg) {
        gsap.fromTo(benefitsImg,
          { y: 60, scale: 1.08 },
          {
            y: -60, scale: 1, ease: 'none',
            scrollTrigger: { trigger: benefitsImg, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
          }
        );
      }

      // Benefits points — staggered from left
      gsap.utils.toArray('.benefits-intro-point').forEach((point, i) => {
        gsap.fromTo(point,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.7, delay: i * 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: point, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      // Expert section — image slides in from left, text from right
      const expertImg = document.querySelector('.expert-image-wrapper');
      if (expertImg) {
        gsap.fromTo(expertImg,
          { opacity: 0, x: -80 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: expertImg, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }
      const expertText = document.querySelector('.expert-text');
      if (expertText) {
        gsap.fromTo(expertText,
          { opacity: 0, x: 80 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: expertText, start: 'top 80%', toggleActions: 'play none none none' }
          }
        );
      }

      // Expert portrait — subtle parallax
      const expertPortrait = document.querySelector('.expert-portrait');
      if (expertPortrait) {
        gsap.fromTo(expertPortrait,
          { y: 40, scale: 1.05 },
          {
            y: -40, scale: 1, ease: 'none',
            scrollTrigger: { trigger: expertPortrait, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
          }
        );
      }

      // Contact process steps — stagger up
      gsap.utils.toArray('.contact-process-step').forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 40, rotateX: 10 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

      // FAQ items — fade in
      gsap.utils.toArray('.faq-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

      // Property cards — scale up reveal
      gsap.utils.toArray('.property-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      // Contact form — fade in
      const contactForm = document.querySelector('.contact-form-wrapper');
      if (contactForm) {
        gsap.fromTo(contactForm,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: contactForm, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      }

      // Separator lines — grow from center
      gsap.utils.toArray('.separator-center').forEach((sep) => {
        gsap.fromTo(sep,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: sep, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

      // Buttons — subtle fade in
      gsap.utils.toArray('.section-cta, .contact-process-cta').forEach((cta) => {
        gsap.fromTo(cta,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: cta, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });

    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-wrapper" ref={appRef}>

      {/* Header */}
      <header className={`app-header ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="container header-content">
          <div className="brand-group">
            <a href="#" className="brand-logo">
              <img src="/knc_logo_gold.webp" alt="KNC Consulting" className="brand-logo-img" />
            </a>
          </div>

          <nav className="nav-desktop">
            {['Leistungen', 'Vorteile', 'Über Uns', 'Projekte', 'Kontakt'].map((item) => (
              <a key={item} href={`#${item === 'Über Uns' ? 'profil' : item.toLowerCase()}`} className="nav-link">
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
              {['Leistungen', 'Vorteile', 'Über Uns', 'Projekte', 'Kontakt'].map((item) => (
                <a key={item} href={`#${item === 'Über Uns' ? 'profil' : item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          <div className="hero-brand">
            <img src="/knc_hero.webp" alt="KNC" className="hero-logo-img" />
            <span className="hero-consulting">CONSULTING</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-details"
          >
            <div className="hero-divider"></div>

            <p className="hero-subhead">
              Immobilien-Investment mit Weitblick. Ihr Partner für nachhaltige Werte.
            </p>

            <p className="hero-tagline">
              Seit über zwei Jahrzehnten unterstützen wir unsere Klienten dabei, die richtigen Entscheidungen in einem komplexen Markt zu treffen – von der strategischen Investition bis zur erfolgreichen Vermittlung.
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

      {/* Services / Leistungen Section */}
      <section id="leistungen" className="section bg-white">
        <div className="container">
          <div className="section-header text-center">
            <h2>KNC Immobilien & Consulting KG</h2>
            <div className="separator-center"></div>
            <p className="services-intro">
              Ob Sie eine Immobilie kaufen, verkaufen, vermieten oder eine strategische Anlageentscheidung treffen möchten – wir bieten Ihnen ein umfassendes Leistungsspektrum, das auf Ihre individuellen Bedürfnisse zugeschnitten ist.
            </p>
          </div>

          <div className="grid-2-cols">
            {[
              { icon: <TrendingUp size={32} />, title: "Immobilien-Investmentberatung", text: "Sie suchen ein längerfristiges Investment zum Vermögensaufbau oder eine steueroptimierte Anlagemöglichkeit? Gemeinsam finden wir die Immobilie, die perfekt zu Ihren langfristigen Zielen passt." },
              { icon: <Home size={32} />, title: "Verkauf & Vermittlung", text: "Wir platzieren Ihre Immobilie optimal am Markt und sorgen für einen reibungslosen Verkaufsprozess. Dank unseres Netzwerks erreichen wir die richtigen Käufer." },
              { icon: <Key size={32} />, title: "Vermietung & Betreuung", text: "Sie besitzen bereits Immobilien, aber sind sich unschlüssig ob Sie vermieten oder verkaufen sollen? Wir beraten Sie umfassend und übernehmen auf Wunsch auch die professionelle Vermietung." },
              { icon: <BarChart size={32} />, title: "Monitoring & Projektbegleitung", text: "Für Immobiliengesellschaften und private Investoren unterstützen wir bei der Auswahl, über die Finanzierung, vertragliche Abwicklung bis hin zur Auswahl einer individuellen Verwaltung (Subverwaltung) Ihrer Immobilien." }
            ].map((service, i) => (
              <div
                key={i}
                className="card service-card"
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            ))}
          </div>
          <div className="section-cta" style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="#kontakt" className="btn">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="vorteile" className="section bg-off-white benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Warum KNC Consulting</h2>
            <div className="separator-center"></div>
            <p className="benefits-intro-lead text-center">
              In einem unübersichtlichen Markt ist Vertrauen die wichtigste Währung. Unsere Klienten schätzen vor allem diese Qualitäten:
            </p>
          </div>

          <div className="benefits-intro-content">
            <div className="benefits-intro-image" style={{ overflow: 'hidden' }}>
              <img src="/vertrauen_expertise.webp" alt="Vertrauen & Expertise" className="benefits-intro-img" />
            </div>
            <div className="benefits-intro-text">
              <div className="benefits-intro-points">
                <div className="benefits-intro-point">
                  <strong>Netzwerk</strong>
                  Über 20 Jahre in der Branche haben ein starkes Netzwerk aus Notaren, Rechtsanwälten, Finanzierungsexperten und großen Immobilienunternehmen geschaffen. Dieses Netzwerk ist Ihr Kapital.
                </div>
                <div className="benefits-intro-point">
                  <strong>Erfahrung</strong>
                  Wir kennen den Markt aus der Perspektive des Investors als Käufer einer Immobilie und des Verkäufers, genauso die Wünsche und Anforderungen an eine Immobilie seitens der Mieter. Diese 360-Grad-Sicht ermöglicht es uns, Chancen zu erkennen, wo andere nur Objekte sehen.
                </div>
                <div className="benefits-intro-point">
                  <strong>Unabhängigkeit</strong>
                  Wir sind nicht an ein bestimmtes Unternehmen gebunden. Unsere Beratung ist unabhängig und ausschließlich Ihren Interessen verpflichtet. Sie bekommen eine ehrliche Einschätzung und eine maßgeschneiderte Strategie.
                </div>
                <div className="benefits-intro-point">
                  <strong>Diskretion & Vertraulichkeit</strong>
                  Vollständige Vertraulichkeit in allen Angelegenheiten. Ihre Daten und Vorhaben bleiben bei uns – ohne Ausnahme.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Karl Noé - Über Uns Section */}
      <section id="profil" className="section bg-white expert-section">
        <div className="container">
          <div className="expert-content">
            <div className="expert-image-wrapper" style={{ overflow: 'hidden' }}>
              <img src="/uebermich.webp" alt="Karl Noé - KNC Consulting" className="expert-portrait" />
            </div>
            <div className="expert-text">
              <h2>Karl Noé</h2>
              <p className="expert-role">Geschäftsführender Gesellschafter</p>
              <p>Seit mehr als 20 Jahren ist Karl Noé ein vertrauensvoller Partner in der Immobilienbranche. Sein Weg begann nicht im klassischen Maklergeschäft, sondern auf der Seite der Investoren. Diese Perspektive prägt die Arbeit von KNC Consulting bis heute: Wir sehen Immobilien nicht nur als Objekte, sondern als wertvolle Bausteine für Ihre finanzielle Zukunft.</p>
              <p>Lange Zeit agierte er im Hintergrund, angedockt an große Immobilien-Unternehmungen, die seine Expertise für sich nutzten. Mit KNC Consulting ist es an der Zeit, dieses über Jahrzehnte aufgebaute Wissen direkt an unsere Klienten weiterzugeben. Wir sind keine gewöhnlichen Makler – wir sind Ihr Berater, Ihr Stratege und Ihr Begleiter bei allen Immobilienangelegenheiten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Process Section */}
      <section className="section bg-off-white contact-process">
        <div className="container">
          <div className="section-header text-center">
            <h2>So starten wir zusammen</h2>
            <div className="separator-center"></div>
          </div>
          <div className="contact-process-steps">
            {[
              { icon: <FileText size={32} />, text: "Schreiben Sie uns Ihr Anliegen" },
              { icon: <Briefcase size={32} />, text: "In einem ersten Informationsgespräch besprechen wir Ihre Vorstellungen und mögliches Potenzial" },
              { icon: <Lightbulb size={32} />, text: "Wir entwickeln eine maßgeschneiderte Strategie" },
              { icon: <CheckCircle size={32} />, text: "Gemeinsam setzen wir Ihr Vorhaben um" }
            ].map((step, i) => (
              <div
                key={i}
                className="contact-process-step"
              >
                <div className="contact-process-icon">{step.icon}</div>
                <div className="contact-process-number">{i + 1}</div>
                <p>{step.text}</p>
                {i < 3 && <div className="contact-process-arrow"><ArrowRight size={24} /></div>}
              </div>
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
                question: "Welche Erfahrung hat KNC Consulting?",
                answer: "Mit über 20 Jahren Erfahrung in der Immobilienbranche bieten wir echte Expertise aus der Praxis. Unsere Arbeit basiert auf tiefem Marktkenntnis und persönlicher Betreuung – ob Großprojekt oder private Kleinwohnung."
              },
              {
                question: "Welche Dienstleistungen werden angeboten?",
                answer: "Wir bieten vier Kernleistungen an: Investmentberatung (steueroptimierte Anlagen und langfristiger Vermögensaufbau), Verkauf & Vermittlung (marktgerechte Platzierung und professionelle Abwicklung), Vermietung & Betreuung (Beratung und professionelle Vermietung) sowie Monitoring & Projektbegleitung (Begleitung und Optimierung von Immobilienportfolios)."
              },
              {
                question: "Für wen ist die Dienstleistung geeignet?",
                answer: "Für alle, die Wert auf Diskretion, Expertise und persönliche Betreuung legen – egal ob Investor, Privatperson oder Unternehmen mit Immobilienportfolio. Jeder Kunde erhält 100% persönliche Aufmerksamkeit, unabhängig von der Projektgröße."
              },
              {
                question: "Was unterscheidet KNC Consulting von anderen Anbietern?",
                answer: "Unsere Beratung ist unabhängig und ausschließlich Ihren Interessen verpflichtet. Wir kommen aus der Investorenseite, nicht aus dem klassischen Maklergeschäft – das gibt uns eine 360-Grad-Sicht auf den Markt. Dazu kommt ein starkes Netzwerk aus Notaren, Rechtsanwälten und Immobilienunternehmen."
              },
              {
                question: "Wie kann ich KNC Consulting kontaktieren?",
                answer: "Per Telefon unter +43 664 237 7 237, per E-Mail an knc@noe.immobilien oder über das Kontaktformular auf dieser Seite. Wir antworten schnell und diskret auf alle Anfragen."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Aktuelle Projekte Section */}
      <section id="projekte" className="section bg-white text-center">
        <div className="container">
          <div className="section-header">
            <h2>Aktuelle Projekte</h2>
            <div className="separator-center"></div>
            <p className="projects-intro">
              Hier finden Sie eine Auswahl an Immobilien, die wir aktuell vermitteln. Für weitere Informationen oder ein persönliches Gespräch stehen wir Ihnen jederzeit zur Verfügung.
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
              <div
                key={i}
                className="property-card"
              >
                <div className="property-image-wrapper">
                  <img src={item.img} alt={item.title} className="property-image" loading="lazy" />
                </div>
                <h4 className="property-title">{item.title}</h4>
                <div className="property-location">{item.loc}</div>
                <a href="#" className="property-link">Extern Ansehen</a>
              </div>
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
                Sie haben Fragen, ein konkretes Anliegen oder möchten einfach nur über die Möglichkeiten sprechen, die der Immobilienmarkt für Sie bereithält? Wir freuen uns darauf, von Ihnen zu hören.
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
                <a href="mailto:knc@noe.immobilien" className="btn">
                  E-Mail
                </a>
                <a href="tel:+436642377237" className="btn">
                  Anrufen
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-copy">&copy; 2026 KNC Immobilien & Consulting KG</div>
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
                <p><strong>Angaben gemäß § 5 ECG (E-Commerce-Gesetz)</strong></p>
                <p>
                  <strong>Firma:</strong> KNC Immobilien &amp; Consulting KG<br />
                  <strong>Rechtsform:</strong> Kommanditgesellschaft<br />
                  <strong>Firmenbuchnummer:</strong> FN 530498 w<br />
                  <strong>Firmenbuchgericht:</strong> Landesgericht für Zivilrechtssachen Graz
                </p>
                <p>
                  <strong>Geschäftsanschrift:</strong><br />
                  Grillparzerstraße 8/8<br />
                  8010 Graz, Österreich
                </p>
                <p>
                  <strong>Kontakt:</strong><br />
                  Telefon: +43 664 237 7 237<br />
                  E-Mail: knc@noe.immobilien
                </p>
                <p>
                  <strong>Geschäftszweig:</strong><br />
                  Ausübung des Immobilienmaklergewerbes, Hausverwaltung, Vermögensverwaltung
                </p>
                <p>
                  <strong>Unbeschränkt haftender Gesellschafter:</strong><br />
                  Karl Noé
                </p>
                <p>
                  <strong>Verantwortlich für den Inhalt:</strong><br />
                  Karl Noé<br />
                  Grillparzerstraße 8/8<br />
                  8010 Graz
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
                  <strong>KNC Immobilien &amp; Consulting KG</strong><br />
                  Karl Noé<br />
                  Grillparzerstraße 8/8<br />
                  8010 Graz, Österreich
                </p>
                <p>
                  <strong>Telefon:</strong> +43 664 237 7 237<br />
                  <strong>E-Mail:</strong> knc@noe.immobilien
                </p>

                <h3>3. Datenerfassung auf dieser Website</h3>
                <h4>Kontaktformular</h4>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>

                <h3>4. Ihre Rechte</h3>
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
                </p>
                <p>
                  Sie haben zudem das Recht, sich bei der österreichischen Datenschutzbehörde (dsb.gv.at) zu beschweren.
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
