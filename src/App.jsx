import { Hero } from "./components/Hero";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

const contactEmail = "contact@clutch2live.com";

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="page-shell">
      <div className="ambient-layer ambient-grid" aria-hidden />
      <div className="ambient-layer ambient-glow" aria-hidden />
      <div className="storm-layer rain-soft" aria-hidden />
      <div className="storm-layer rain-fine" aria-hidden />
      <div className="storm-layer lightning-flash" aria-hidden />
      <main className="content">
        <Hero />
        <ContactForm email={contactEmail} />
      </main>
      <Footer year={year} email={contactEmail} />
    </div>
  );
}
