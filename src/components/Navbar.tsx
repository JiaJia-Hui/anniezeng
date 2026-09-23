export default function Navbar() {
  return (
    <nav style={{
      position: "fixed", inset: "0 0 auto", zIndex: 50,
      display: "grid", gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      padding: "22px clamp(32px, 4.5vw, 72px)",
      background: "linear-gradient(to bottom, rgba(232,224,204,0.5) 0%, transparent 100%)",
    }}>
      <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 400, color: "var(--fg)", textDecoration: "none", letterSpacing: "-.01em", justifySelf: "start" }}>
        JZ
      </a>

      <ul style={{ justifySelf: "center", display: "flex", listStyle: "none", gap: "clamp(26px, 3.5vw, 56px)", margin: 0, padding: 0 }}>
        {["About","Projects","Skills","Contact"].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 400,
              color: "var(--fg-muted)", textDecoration: "none", letterSpacing: ".01em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={{
        justifySelf: "end",
        fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: ".05em",
        padding: "13px 28px",
        background: "var(--fg)", color: "#faf8f4",
        border: "none", borderRadius: 3, textDecoration: "none",
        transition: "transform .3s cubic-bezier(.23,1,.32,1), box-shadow .3s",
        display: "inline-block",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
      >
        Let&apos;s Talk
      </a>
    </nav>
  );
}
