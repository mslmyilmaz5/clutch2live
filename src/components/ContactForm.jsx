import { useState } from "react";

function encode(data) {
  return encodeURIComponent(data.trim());
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm({ email }) {
  const [formData, setFormData] = useState({
    name: "",
    sender: "",
    message: ""
  });
  const [feedback, setFeedback] = useState("");

  function setField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { name, sender, message } = formData;

    if (!name.trim() || !sender.trim() || !message.trim()) {
      setFeedback("Please complete all contact fields.");
      return;
    }
    if (!isValidEmail(sender)) {
      setFeedback("Please provide a valid contact email.");
      return;
    }

    const subject = `Clutch2Live Contact | ${name}`;
    const body = `Name: ${name}\nEmail: ${sender}\n\nMessage:\n${message}`;
    const mailto = `mailto:${email}?subject=${encode(subject)}&body=${encode(body)}`;

    window.location.href = mailto;
    setFeedback("Redirecting to your email client...");
  }

  return (
    <section className="section panel" id="contact" data-section="contact">
      <div className="section-header">
        <span className="section-eyebrow">Direct Line</span>
        <h2>Contact with us</h2>
      </div>
      <p className="panel-copy">
        Partnerships, press, early playtests, or strategic collabs. Send your
        message and we will route it to the right channel.
      </p>
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="contact-name"
          value={formData.name}
          onChange={(event) => setField("name", event.target.value)}
          placeholder="Your name"
          required
        />

        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="contact-email"
          type="email"
          autoComplete="email"
          value={formData.sender}
          onChange={(event) => setField("sender", event.target.value)}
          placeholder="you@company.com"
          required
        />

        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="contact-message"
          rows={5}
          value={formData.message}
          onChange={(event) => setField("message", event.target.value)}
          placeholder="Tell us what you're thinking."
          required
        />

        <button className="button button-ghost" type="submit">
          Open Email Client
        </button>
        <p className="form-status is-idle" role="status">
          {feedback}
        </p>
      </form>
    </section>
  );
}
