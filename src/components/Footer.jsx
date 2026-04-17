export function Footer({ year, email }) {
  return (
    <footer className="footer">
      <p>© {year} Clutch2Live. All rights reserved.</p>
      <a href={`mailto:${email}`}>{email}</a>
    </footer>
  );
}
