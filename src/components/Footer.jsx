export function Footer({ year, email }) {
  return (
    <footer className="footer">
      <p>© {year} Clutch2Live. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy-policy.html">Privacy Policy</a>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </footer>
  );
}
