const techIcons = {
  WordPress: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.8 15.6L6.4 7.2h2.2l1.6 6.4 1.6-6.4h2.2l-2.4 10.4H10.2zm3.6 0l1.2-3.6 1.2 3.6h-2.4zm3-5.2h-2.2l1.6-5.2h-2l-1 3.2-.8-3.2H9.6l2.2 7.2-.6 2c-.2.6.2 1 .8 1h1.8l2-6.4z"/></svg>
  ),
  Elementor: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">E</text></svg>
  ),
  WooCommerce: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2-9h4v2h-4v-2zm0 4h4v2h-4v-2z"/></svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="currentColor" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold">PHP</text></svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><ellipse cx="12" cy="6" rx="8" ry="4" opacity="0.3"/><path d="M4 6v6c0 2.2 3.6 4 8 4s8-1.8 8-4V6" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M4 2l1.6 18L12 22l6.4-2L20 2H4zm13 6H8.4l.2 2.4h8l-.6 6-4 1.4-4-1.4-.3-3.4h2l.1 1.6 2.2.6 2.2-.6.2-2.6H8.2L7.6 6h8.8l-.4 4z"/></svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">N</text></svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2l-8 5v10l8 5 8-5V7l-8-5zm0 2.5L17 8v8l-5 2.5L7 16V8l5-3.5z"/></svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="currentColor" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold">TS</text></svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.47 12 7 12z"/></svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><ellipse cx="12" cy="6" rx="8" ry="4" opacity="0.3"/><path d="M4 6v6c0 2.2 3.6 4 8 4s8-1.8 8-4V6" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22 10.5c-.5-.3-1.5-.7-3-.7h-1l.5-2.5c.1-.5-.2-1-.7-1.1-.5-.1-1 .2-1.1.7l-.5 2.5h-2l.5-2.5c.1-.5-.2-1-.7-1.1-.5-.1-1 .2-1.1.7l-.5 2.5h-2l.5-2.5c.1-.5-.2-1-.7-1.1-.5-.1-1 .2-1.1.7L8.5 9h-1c-1.5 0-2.5.4-3 .7C3 10.3 2 11.5 2 13v5c0 1.7 1.3 3 3 3h14c2.2 0 4-1.8 4-4v-3.5c0-1-.5-2-1-2.5z"/></svg>
  ),
  'Google Search Console': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.15"/><path d="M12 4a8 8 0 100 16 8 8 0 000-16zm-1 11.5v-2h2v2h-2zm0-4V7h2v4.5h-2z"/></svg>
  ),
  'Google Analytics': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="10" y="10" width="4" height="10" rx="1"/><rect x="17" y="6" width="4" height="14" rx="1"/></svg>
  ),
  Ahrefs: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold">A</text></svg>
  ),
  SEMrush: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold">S</text></svg>
  ),
  'Screaming Frog': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/><path d="M8 15c1 1.5 3 2.5 4 2.5s3-1 4-2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
  ),
  'PageSpeed Insights': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.15"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M4 2l1.6 18L12 22l6.4-2L20 2H4zm13 6H8.4l.2 2.4h8l-.6 6-4 1.4-4-1.4-.3-3.4h2l.1 1.6 2.2.6 2.2-.6.2-2.6H8.2L7.6 6h8.8l-.4 4z"/></svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" fill="currentColor" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold">JS</text></svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="8" cy="4" r="3"/><circle cx="16" cy="4" r="3"/><circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><circle cx="8" cy="20" r="3"/><path d="M16 12a3 3 0 01-3-3v-3h3a3 3 0 010 6z"/></svg>
  ),
  'ACF Pro': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold">ACF</text></svg>
  ),
  UpdraftPlus: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.15"/><path d="M12 6v6l3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="1.5"/></svg>
  ),
  Wordfence: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2L4 6v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z" opacity="0.2"/><path d="M10 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  UptimeRobot: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.15"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
  ),
  cPanel: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><rect width="24" height="24" rx="4" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight="bold">cP</text></svg>
  ),
  'Google PageSpeed': (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.15"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  GTmetrix: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M7 14l3-4 2 2 3-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
}

export default techIcons
