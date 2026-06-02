import { useState, useEffect } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const FACULTIES = [
  {
    id: "socs",
    name: "SOCS",
    full: "School of Computer Science",
    tagline: "Code-ing Nerds? Here's the People",
    color: "#00C9A7",
    members: [
      { name: "Natasha Pratiwi Rahardja", major: "Computer Science", photo: "/photos/nat.webp" },
      { name: "Stevin Grace", major: "Computer Science", photo: "/photos/stevin.webp" },
      { name: "Sylvester Luigi Hidayat", major: "Computer Science", photo: "/photos/luigi.webp" },
      
    ],
  },
  {
    id: "sois",
    name: "SOIS",
    full: "School of Information Systems",
    tagline: "Why SQL, Python Feels Like Nuts?",
    color: "#FFD600",
    members: [
      { name: "Dicky Valentino Chen", major: "Information System", photo: "/photos/diki.webp" },
      { name: "Grace Magdalena", major: "Information System", photo: "/photos/grace.webp" },
    ],
  },
  {
    id: "foe",
    name: "FOE",
    full: "Faculty of Engineering",
    tagline: "Build Things, Break Sleep Schedules",
    color: "#FF6B6B",
    members: [
      { name: "Azharia Ayuni Lestari", major: "Food Technology", photo: "/photos/aza.webp" },
    ],
  },
  {
    id: "foh",
    name: "FOH",
    full: "Faculty of Humanities",
    tagline: "Feelings, Thoughts, and Deep Dives",
    color: "#C084FC",
    members: [
      { name: "Ciara Gabrielle", major: "Global Business Chinnese", photo: "/photos/rae.webp" },
    ],
  },
  {
    id: "soa",
    name: "SOA",
    full: "School of Accounting",
    tagline: "Numbers Whisper, We Make Sense",
    color: "#34D399",
    members: [
      { name: "Keren Hana Syalomitha Sumajow", major: "Accounting", photo: "/photos/keren.webp" },
    ],
  },
  {
    id: "bbs",
    name: "BBS",
    full: "BINUS Business School",
    tagline: "Where Group Projects Test Friendships",
    color: "#F59E0B",
    members: [
      { name: "Axel Rae Kho", major: "Business Creation", photo: "/photos/axel.webp" },
      { name: "Josephina Audrey Soedargo", major: "Global Business Marketing", photo: "/photos/audrey.webp" },
      { name: "Gisella Alicia Laloan", major: "Management", photo: "/photos/gisel.webp" },
      { name: "Nikita Natania Wibawa", major: "International Business Management - Global Class", photo: "/photos/niki.webp" },
      { name: "Victoria Christie Salem", major: "International Business Management", photo: "/photos/vc.webp" },
      { name: "Ivan Raditya Hardianto", major: "International Business Management", photo: "/photos/ivan.webp" },
    ],
  },
  {
    id: "fdcht",
    name: "FDCHT",
    full: "F.O.D. Communication, Hotel & Tourism",
    tagline: "Talk Smooth, Host Cooler than Ice",
    color: "#60A5FA",
    members: [
      { name: "Amelia Alfieta Deliar", major: "Marketing Communication", photo: "/photos/fita.webp" },
    ],
  },
  {
    id: "sod",
    name: "SOD",
    full: "School of Design",
    tagline: "Sleep? Sorry, Deadlines Need Love",
    color: "#F472B6",
    members: [
      { name: "Louisa Emily Setiawan", major: "Visual Communication Design - New Media", photo: "/photos/mily.webp" },
      { name: "Atanasius Moses Hakim", major: "Film", photo: "/photos/moses.webp" },
      { name: "Anjani Rafika", major: "Fashion", photo: "/photos/jane.webp" },
    ],
  },
];

const TIMELINE = [
  { phase: "01", label: "Kick Off", title: "FYPL · FL · FP Kick Off", desc: "Dimulai dengan kick off seluruh jajaran FYPL, FL, dan FP untuk mempersiapkan FYP B30.", date: "6 Juli 2026" },
  { phase: "02", label: "Training", title: "Training FL & FP", desc: "Pelatihan intensif untuk semua Freshmen Leader dan Freshmen Peer sebelum orientasi dimulai.", date: "13 Juli - 17 Juli 2026" },
  { phase: "03", label: "Briefing", title: "Briefing FL & FYPL", desc: "Final briefing sebelum FYP. Semua siap menyambut mahasiswa baru BINUSIAN 30!", date: "Juli" },
  { phase: "04", label: "Opening", title: "Opening FYP B30", desc: "Pembukaan resmi FYP B30 Alam Sutera — welcome to the Binusian journey!", date: "21 Juli & 4 Agustus 2026" },
  { phase: "05", label: "NEXT", title: "New Student Experience & Transition", desc: "Dua minggu penuh orientasi dipimpin FL. Kenalan, eksplorasi, dan settle in di BINUS Alam Sutera.", date: "Juli - Agustus" },
  { phase: "06", label: "AE", title: "Academic Experience", desc: "Pengenalan kehidupan akademik, sistem belajar, dan lingkungan kampus BINUS secara menyeluruh.", date: "Agustus" },
  { phase: "07", label: "Inauguration", title: "Inauguration", desc: "Puncak dari FYP — peresmian resmi sebagai Binusian. Selamat datang, mahasiswa baru!", date: "4 September 2026" },
];

const FAQS = [
  {
    q: "Apa itu FL dan FP?",
    a: "Freshmen Leader (FL) merupakan pihak yang berperan penting dalam rangkaian NEXT dan menjadi orang pertama yang berinteraksi dengan mahasiswa baru. FL membantu mahasiswa baru beradaptasi dengan lingkungan kampus serta memastikan kegiatan berjalan lancar. Selain itu, terdapat Freshmen Partner (FP) yang membantu memfasilitasi materi EESE dan mendampingi B30 dalam CSA project. Baik FL maupun FP sama-sama membimbing mahasiswa baru dalam memahami nilai-nilai BINUS seperti BGA dan SPIRIT.",
  },
  {
    q: "Apa keuntungan menjadi FL atau FP?",
    a: "Banyak keuntungannya! Ada sertifikat, poin SAT (untuk FL), community service hours (untuk FP), dan banyak soft skill yang akan kamu kembangkan. Kamu juga mendapat lanyard, kaos (untuk FL), apparel eksklusif (untuk FP), dan parkir gratis selama menjadi FL atau FP.",
  },
  {
    q: "Bagaimana cara mendaftar sebagai FL atau FP?",
    a: "Login ke freshmen.apps.binus.ac.id (jika lambat/error, coba incognito atau browser lain). Lalu ke 'orientation registration' dan pilih 'student registration' pastikan role di atas diset ke 'freshmen chaperone', klik 'search'. Scroll ke bawah dan kamu akan melihat poster rekrutmen terbuka untuk FL dan FP. Isi form personal info, pilih role, upload CV, dan submit. Jangan lupa pilih jadwal interview di menu 'schedule selection'.",
  },
  {
    q: "Bagaimana proses seleksi FL dan FP?",
    a: "Setelah mengisi 'schedule selection', kamu akan diundang ke grup oleh FYPL fakultas kamu. Mereka akan memberikan detail jadwal interview, ruangan, dan teknis lainnya. Setelah interview, hasil akan di umumkan setelah seluruh proses rekrutmen selesai.",
  },
  {
    q: "Apa perbedaan FL dan FP?",
    a: "Perbedaan utama adalah waktu tugas. FL bekerja selama NEXT sampai Inaugurasi, sedangkan FP aktif sepanjang Excellent Program selama semester 1 dan 2 mahasiswa baru.",
  },
  {
    q: "Kapan NEXT B30 diadakan?",
    a: "NEXT (New Student Experience & Transition) B30 akan diadakan dari 20 Juli - 1 Agustus (Batch 1) dan 3 - 15 Agustus (Batch 2), dilanjutkan dengan Academic Experience 18-29 Agustus dan Inauguration pada 4 September.",
  },
  {
    q: "Apakah mahasiswa B28 yang nanti akan magang bisa daftar FP?",
    a: "Bisa! Meskipun sedang magang, kamu tetap perlu memonitoring sesi EESE 1, tapi pertemuannya tidak F2F seperti EESE 1. Kamu cukup perlu memonitoring secara online freshmen kalian!",
  },
];

// ─── PIXEL COMPONENTS ──────────────────────────────────────────────────────
const PixelBorder = ({ children, color = "#FFD600", style = {} }) => (
  <div style={{
    position: "relative",
    background: "#1A0000",
    border: `3px solid ${color}`,
    boxShadow: `4px 4px 0 ${color}`,
    imageRendering: "pixelated",
    ...style,
  }}>
    {children}
  </div>
);

const PixelBtn = ({ children, onClick, href, color = "#FFD600", textColor = "#1A0000", style = {} }) => {
  const btnStyle = {
    display: "inline-block",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.6rem",
    letterSpacing: "1px",
    padding: "0.75rem 1.5rem",
    background: color,
    color: textColor,
    border: `3px solid ${textColor === "#1A0000" ? "#1A0000" : color}`,
    boxShadow: `4px 4px 0 rgba(0,0,0,0.5)`,
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.1s, box-shadow 0.1s",
    imageRendering: "pixelated",
    ...style,
  };
  const handleHover = (e, enter) => {
    e.currentTarget.style.transform = enter ? "translate(-2px,-2px)" : "translate(0,0)";
    e.currentTarget.style.boxShadow = enter ? `6px 6px 0 rgba(0,0,0,0.5)` : `4px 4px 0 rgba(0,0,0,0.5)`;
  };
  if (href) return <a href={href} target="_blank" rel="noopener" style={btnStyle} onMouseEnter={e=>handleHover(e,true)} onMouseLeave={e=>handleHover(e,false)}>{children}</a>;
  return <button onClick={onClick} style={btnStyle} onMouseEnter={e=>handleHover(e,true)} onMouseLeave={e=>handleHover(e,false)}>{children}</button>;
};

const PixelTag = ({ children, color = "#FFD600" }) => (
  <span style={{
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.45rem",
    letterSpacing: "2px",
    color,
    display: "block",
    marginBottom: "0.5rem",
  }}>
    {children}
  </span>
);

const SectionTitle = ({ tag, title, accent }) => (
  <div style={{ marginBottom: "3rem" }}>
    <PixelTag color="#00C9A7">{tag}</PixelTag>
    <h2 style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
      color: "#ffffff",
      lineHeight: 1.4,
      marginBottom: "1rem",
    }}>
      {title}<span style={{ color: "#FFD600" }}>{accent}</span>
    </h2>
    <div style={{
      width: "40px", height: "6px",
      background: "#FFD600",
      boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
    }} />
  </div>
);

// ─── SECTIONS ──────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "2px solid rgba(0, 0, 0, 0.15)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.35s ease",
        padding: "0 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 84 : 96, transition: "height 0.35s ease" }}>

          {/* LOGO */}
          <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <img
              src="/logoheader.png"
              alt="FYPL B30 Alsut"
              style={{
                height: scrolled ? 68 : 80,
                width: "auto",
                objectFit: "contain",
                transition: "height 0.35s ease, filter 0.35s ease",
                filter: scrolled
                  ? "drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff)"
                  : "drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff)",
              }}
            />
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="nav-desktop">
            {["fyp","timeline","fypl","faq"].map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.5rem", letterSpacing: "1px",
                background: "transparent", border: "none",
                color: scrolled ? "#1A0000" : "#FAFAF5",
                cursor: "pointer", padding: "0.5rem 0.85rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#8B0000"}
              onMouseLeave={e => e.target.style.color = scrolled ? "#1A0000" : "#FAFAF5"}
              >{id.toUpperCase()}</button>
            ))}
            <a href="https://freshmen.apps.binus.ac.id" target="_blank" rel="noopener" style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.5rem", letterSpacing: "1px",
              background: "#FFD600", color: "#1A0000",
              border: "2px solid #1A0000", boxShadow: "3px 3px 0 #00C9A7",
              padding: "0.5rem 0.85rem", textDecoration: "none",
              marginLeft: "0.5rem",
            }}>REGISTER</a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", cursor:"pointer", display:"none", flexDirection:"column", gap:5, padding:4 }} className="hamburger">
            <div style={{ width:22, height:2, background: scrolled ? "#1A0000" : "#FFD600", transition:"all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }}/>
            <div style={{ width:22, height:2, background: scrolled ? "#1A0000" : "#FFD600", transition:"all 0.3s", opacity: menuOpen ? 0 : 1 }}/>
            <div style={{ width:22, height:2, background: scrolled ? "#1A0000" : "#FFD600", transition:"all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:"fixed", top:72, left:0, right:0, zIndex:99,
          background:"rgba(255,255,255,0.97)", borderBottom:"2px solid rgba(0,0,0,0.1)",
          backdropFilter:"blur(8px)",
          display:"flex", flexDirection:"column", padding:"1rem",
        }}>
          {["fyp","timeline","fypl","faq"].map(id=>(
            <button key={id} onClick={()=>scrollTo(id)} style={{
              fontFamily:"'Press Start 2P',monospace", fontSize:"0.6rem",
              background:"transparent", border:"none", color:"#1A0000",
              cursor:"pointer", padding:"1rem 0", borderBottom:"1px solid rgba(0,0,0,0.1)",
              textAlign:"left", letterSpacing:"1px",
            }}>{id.toUpperCase()}</button>
          ))}
          <a href="https://freshmen.apps.binus.ac.id" target="_blank" rel="noopener" style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:"0.6rem",
            background:"#FFD600", color:"#1A0000", border:"2px solid #1A0000",
            padding:"1rem", textDecoration:"none", marginTop:"0.75rem", textAlign:"center",
            boxShadow:"3px 3px 0 #00C9A7",
          }}>REGISTER NOW</a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const [blink, setBlink] = useState(true);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "80px 2rem 4rem",
        background: "#8B0000",
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"24px 24px", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15) 2px,transparent 2px,transparent 4px)", zIndex:1, pointerEvents:"none" }}/>

        <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:900 }}>
          <div style={{
            display:"inline-block", fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem",
            letterSpacing:"3px", color:"#1A0000", background:"#FFD600",
            padding:"0.5rem 1.5rem", marginBottom:"2rem",
            border:"3px solid #1A0000", boxShadow:"4px 4px 0 rgba(0,0,0,0.4)",
          }}>BINUS ALAM SUTERA · B30</div>

          <h1 style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:"clamp(2rem,8vw,5.5rem)",
            lineHeight:1.3, color:"#FAFAF5", textShadow:"4px 4px 0 rgba(0,0,0,0.5)", marginBottom:"1.5rem",
          }}>
            <span style={{ color:"#FFD600", display:"block" }}>FYP</span>
            <span style={{ color:"#00C9A7", display:"block", fontSize:"0.55em" }}>LEADERS</span>
            <span style={{ display:"block", fontSize:"0.45em" }}>B30</span>
          </h1>

          <p style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem",
            color:"rgba(255,255,255,0.8)", lineHeight:2.2,
            maxWidth:600, margin:"0 auto 2.5rem", letterSpacing:"0.5px",
          }}>
            Meet the amazing people who'll guide your first step as a Binusian.
          </p>

          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <PixelBtn onClick={() => document.getElementById("fypl")?.scrollIntoView({behavior:"smooth"})}>
              MEET THE FYPL
            </PixelBtn>
            <PixelBtn
              onClick={() => document.getElementById("timeline")?.scrollIntoView({behavior:"smooth"})}
              color="transparent" textColor="#FFD600"
              style={{ border:"3px solid #FFD600", boxShadow:"4px 4px 0 rgba(0,0,0,0.4)" }}
            >
              SEE TIMELINE
            </PixelBtn>
          </div>

          <div style={{
            marginTop:"3rem", fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem",
            color: blink ? "rgba(255,255,255,0.6)" : "transparent",
            letterSpacing:"2px", transition:"color 0.1s",
          }}>▼ SCROLL DOWN ▼</div>
        </div>
      </section>
    );
  }

  // DESKTOP
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "80px 2rem 4rem",
      background: "linear-gradient(rgba(139, 0, 0, 0), rgba(80,0,0,0.6)), url('/SEMUAA.png') center 100%/100% no-repeat",
    }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"24px 24px", zIndex:0 }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15) 2px,transparent 2px,transparent 4px)", zIndex:1, pointerEvents:"none" }}/>

      {/* Badge + tagline stacked di atas */}
      <div style={{
        position:"absolute", top:"5.5rem", left:0, right:0,
        display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem", zIndex:3,
      }}>
        <div style={{
          display:"inline-block", fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem",
          letterSpacing:"3px", color:"#1A0000", background:"#FFD600",
          padding:"0.5rem 1.5rem",
          border:"3px solid #1A0000", boxShadow:"4px 4px 0 rgba(0,0,0,0.4)",
        }}>BINUS ALAM SUTERA · FYP B30</div>
        <p style={{
          fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem",
          color:"rgba(255,255,255,0.9)", lineHeight:2.2,
          maxWidth:600, margin:0, textAlign:"center", letterSpacing:"0.5px",
          textShadow:"2px 2px 6px rgba(0,0,0,0.9)",
        }}>
          Meet the amazing people who'll guide your first step as a Binusian.
        </p>
      </div>

      {/* Buttons + scroll di bawah */}
      <div style={{
        position:"absolute", bottom:"3rem", left:0, right:0,
        display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem", zIndex:3, padding:"0 2rem",
      }}>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <PixelBtn onClick={() => document.getElementById("fypl")?.scrollIntoView({behavior:"smooth"})}>
            MEET THE FYPL
          </PixelBtn>
          <PixelBtn
            onClick={() => document.getElementById("timeline")?.scrollIntoView({behavior:"smooth"})}
            color="transparent" textColor="#FFD600"
            style={{ border:"3px solid #FFD600", boxShadow:"4px 4px 0 rgba(0,0,0,0.4)" }}
          >
            SEE TIMELINE
          </PixelBtn>
        </div>
        <div style={{
          fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem",
          color: blink ? "rgba(255,255,255,0.6)" : "transparent",
          letterSpacing:"2px", transition:"color 0.1s",
        }}>▼ SCROLL DOWN ▼</div>
      </div>
    </section>
  );
}


function WhatIsFYP() {
  return (
    <section id="fyp" style={{ padding:"5rem 2rem", maxWidth:1100, margin:"0 auto" }}>
      <SectionTitle tag="// WHAT IS" title="FYP" accent="?" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2rem" }}>
        <div>
          <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem", color:"rgba(255,255,255,0.8)", lineHeight:2.5, marginBottom:"1.5rem" }}>
            FYP is your first step into the Binusian journey — a space to explore, connect, and grow.
          </p>
          <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem", color:"rgba(255,255,255,0.7)", lineHeight:2.5 }}>
            Meet awesome friends, discover new passions, and get a feel for what uni life is really like.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {[
            { label:"FL", full:"Freshmen Leader", desc:"Guides freshmen during orientation week. First point of contact for new students.", color:"#FFD600" },
            { label:"FP", full:"Freshmen Partner", desc:"Mentors freshmen for ~1 academic year through the Excellent Program.", color:"#00C9A7" },
            { label:"FYPL", full:"FYP Leader", desc:"Faculty representatives who lead and coordinate the entire FYP program.", color:"#FF6B6B" },
          ].map(r=>(
            <PixelBorder key={r.label} color={r.color} style={{ padding:"1rem 1.25rem" }}>
              <div style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                <div style={{
                  width:40, height:40, flexShrink:0,
                  background:r.color,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem", color:"#1A0000",
                  border:"2px solid #1A0000", boxShadow:"2px 2px 0 rgba(0,0,0,0.5)",
                }}>{r.label}</div>
                <div>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem", color:r.color, marginBottom:"0.5rem" }}>{r.full}</div>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.45rem", color:"rgba(255,255,255,0.7)", lineHeight:2 }}>{r.desc}</div>
                </div>
              </div>
            </PixelBorder>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" style={{ padding:"5rem 2rem", background:"rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <SectionTitle tag="// PROGRAM" title="TIME" accent="LINE" />
        <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", position:"relative" }}>
          <div style={{
            position:"absolute", left:32, top:0, bottom:0, width:3,
            background:"rgba(255,214,0,0.3)",
            backgroundImage:"repeating-linear-gradient(#FFD600 0,#FFD600 8px,transparent 8px,transparent 16px)",
          }}/>
          {TIMELINE.map((item,i)=>(
            <div key={i} style={{ display:"flex", gap:"1.5rem", alignItems:"flex-start" }}>
              <div style={{
                width:64, height:64, flexShrink:0,
                background:"#FFD600",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                border:"3px solid #1A0000", boxShadow:"4px 4px 0 rgba(0,0,0,0.5)",
                fontFamily:"'Press Start 2P',monospace", color:"#1A0000",
                zIndex:1,
              }}>
                <div style={{ fontSize:"0.5rem", opacity:0.7 }}>PHASE</div>
                <div style={{ fontSize:"0.9rem", fontWeight:"bold" }}>{item.phase}</div>
              </div>
              <PixelBorder color="rgba(255,255,255,0.15)" style={{ flex:1, padding:"1rem 1.25rem", background:"rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.45rem", color:"#00C9A7", marginBottom:"0.4rem", letterSpacing:"1px" }}>{item.date} · {item.label}</div>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.65rem", color:"#FFD600", marginBottom:"0.6rem" }}>{item.title}</div>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.45rem", color:"rgba(255,255,255,0.7)", lineHeight:2.2 }}>{item.desc}</div>
              </PixelBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FYPL ──────────────────────────────────────────────────────────────────

function MemberCard({ m, fac, onClick }) {
  return (
    <div
      onClick={() => onClick(m, fac)}
      style={{
        cursor: "pointer",
        border: `2px solid ${fac.color}44`,
        background: "rgba(0,0,0,0.25)",
        overflow: "hidden",
        transition: "all 0.2s",
        boxShadow: "none",
        width: "100%",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = fac.color;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 8px 0 ${fac.color}55`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${fac.color}44`;
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Foto */}
      <div style={{ width:"100%", aspectRatio:"1/1", overflow:"hidden", background:"#1A0000", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <img
          src={m.photo}
          alt={m.name}
          loading="lazy"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.innerHTML = `<span style="font-family:'Press Start 2P',monospace;font-size:2rem;color:${fac.color}">${m.name[0]}</span>`;
          }}
        />
      </div>
      {/* Info */}
      <div style={{ padding:"0.75rem 0.9rem", borderTop:`1px solid ${fac.color}33` }}>
        <div style={{
          display:"inline-block",
          fontFamily:"'Press Start 2P',monospace", fontSize:"0.35rem",
          background:`${fac.color}22`, color:fac.color,
          padding:"0.2rem 0.4rem", marginBottom:"0.4rem",
          border:`1px solid ${fac.color}66`,
        }}>{fac.name}</div>
        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", color:"#FAFAF5", lineHeight:1.8, marginBottom:"0.3rem", minHeight:"3.2rem" }}>{m.name}</div>
        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.38rem", color:fac.color,minHeight:"1.5rem" }}>{m.major}</div>
      </div>
    </div>
  );
}

function FYPLSection() {
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [selectedFac, setSelectedFac] = useState(null);

  const handleCardClick = (m, fac) => { setSelected(m); setSelectedFac(fac); };

  const allMembers = FACULTIES.flatMap(fac => fac.members.map(m => ({ m, fac })));
  const displayed = filter === "ALL"
    ? allMembers
    : allMembers.filter(({ fac }) => fac.id === filter);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="fypl" style={{ padding:"5rem 2rem", maxWidth:1200, margin:"0 auto" }}>
      <SectionTitle tag="// MEET THE" title="FYP" accent="L" />

      {/* Filter tabs */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"2.5rem", justifyContent:"center" }}>
        <button
          onClick={() => setFilter("ALL")}
          style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", letterSpacing:"1px",
            padding:"0.5rem 1rem", cursor:"pointer", transition:"all 0.1s",
            background: filter==="ALL" ? "#FAFAF5" : "transparent",
            color: filter==="ALL" ? "#1A0000" : "#FAFAF5",
            border:"2px solid #FAFAF5",
            boxShadow: filter==="ALL" ? "3px 3px 0 rgba(0,0,0,0.4)" : "none",
          }}
        >ALL</button>
        {FACULTIES.map(fac => (
          <button
            key={fac.id}
            onClick={() => setFilter(fac.id)}
            style={{
              fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", letterSpacing:"1px",
              padding:"0.5rem 1rem", cursor:"pointer", transition:"all 0.1s",
              background: filter===fac.id ? fac.color : "transparent",
              color: filter===fac.id ? "#1A0000" : fac.color,
              border:`2px solid ${fac.color}`,
              boxShadow: filter===fac.id ? `3px 3px 0 rgba(0,0,0,0.4)` : "none",
            }}
          >{fac.name}</button>
        ))}
      </div>

      {/* Grid — semua center */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.25rem",
        justifyContent: "center",
      }}>
        {displayed.map(({ m, fac }, i) => (
          <div key={`${fac.id}-${i}`} style={{ width: 180, flexShrink: 0 }}>
            <MemberCard m={m} fac={fac} onClick={handleCardClick} />
          </div>
        ))}
      </div>

      <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.38rem", color:"rgba(255,255,255,0.3)", marginTop:"2rem", lineHeight:2, textAlign:"center" }}>
        * Klik kartu untuk melihat detail
      </p>

      {/* Modal */}
      {selected && selectedFac && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position:"fixed", inset:0, zIndex:200,
            background:"rgba(0,0,0,0.88)",
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"2rem",
            backdropFilter:"blur(4px)",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:"#1A0000",
              border:`3px solid ${selectedFac.color}`,
              boxShadow:`6px 6px 0 ${selectedFac.color}, 12px 12px 0 rgba(0,0,0,0.4)`,
              maxWidth:360, width:"100%",
              overflow:"hidden",
              position:"relative",
              animation:"popIn 0.15s ease-out",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position:"absolute", top:10, right:10,
                background:selectedFac.color, color:"#1A0000",
                border:"2px solid #1A0000",
                fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem",
                width:32, height:32, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                zIndex:1, boxShadow:"2px 2px 0 rgba(0,0,0,0.5)",
              }}
            >✕</button>

            <div style={{ width:"100%", aspectRatio:"3/4", overflow:"hidden", background:"#2A0000", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img
                src={selected.photo}
                alt={selected.name}
                loading="eager"
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }}
                onError={e => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML = `<span style="font-family:'Press Start 2P',monospace;font-size:4rem;color:${selectedFac.color}">${selected.name[0]}</span>`;
                }}
              />
            </div>

            <div style={{ padding:"1.5rem" }}>
              <div style={{
                display:"inline-block",
                fontFamily:"'Press Start 2P',monospace", fontSize:"0.4rem", letterSpacing:"1px",
                background:selectedFac.color, color:"#1A0000",
                padding:"0.3rem 0.75rem", marginBottom:"1rem",
                border:"2px solid #1A0000",
              }}>{selectedFac.name} · FYPL</div>

              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.7rem", color:"#FAFAF5", lineHeight:1.8, marginBottom:"0.5rem" }}>{selected.name}</div>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", color:selectedFac.color, marginBottom:"1.5rem" }}>{selected.major}</div>

              <button
                onClick={() => setSelected(null)}
                style={{
                  width:"100%",
                  fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", letterSpacing:"1px",
                  background:"transparent", color:selectedFac.color,
                  border:`2px solid ${selectedFac.color}`,
                  boxShadow:`3px 3px 0 ${selectedFac.color}55`,
                  padding:"0.75rem", cursor:"pointer", transition:"all 0.1s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = selectedFac.color; e.currentTarget.style.color = "#1A0000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = selectedFac.color; }}
              >CLOSE ✕</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.92) translateY(8px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding:"5rem 2rem", background:"rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <SectionTitle tag="// GOT QUESTIONS?" title="FA" accent="Q" />
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          {FAQS.map((item,i)=>(
            <div key={i}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{
                width:"100%", background:"rgba(255,255,255,0.04)",
                border:`2px solid ${open===i?"#FFD600":"rgba(255,255,255,0.1)"}`,
                boxShadow:open===i?"3px 3px 0 #FFD600":"none",
                color:"#FAFAF5", cursor:"pointer",
                padding:"1.1rem 1.5rem", textAlign:"left",
                display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem",
                transition:"all 0.2s",
              }}>
                <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem", lineHeight:1.8, flex:1 }}>{item.q}</span>
                <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"1rem", color:"#FFD600", flexShrink:0, transform:open===i?"rotate(45deg)":"none", transition:"transform 0.3s" }}>+</span>
              </button>
              {open===i && (
                <div style={{
                  background:"rgba(255,214,0,0.05)",
                  border:"2px solid #FFD600", borderTop:"none",
                  padding:"1.25rem 1.5rem",
                }}>
                  <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", color:"rgba(255,255,255,0.8)", lineHeight:2.5 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop:"2.5rem", textAlign:"center" }}>
          <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.45rem", color:"rgba(255,255,255,0.5)", marginBottom:"1rem", lineHeight:2 }}>Masih ada pertanyaan?</p>
          <a href="https://www.instagram.com/efwaipiel.alsut" target="_blank" rel="noopener" style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:"0.55rem",
            color:"#00C9A7", textDecoration:"none",
            border:"2px solid #00C9A7", padding:"0.6rem 1.2rem",
            boxShadow:"3px 3px 0 rgba(0,0,0,0.4)", display:"inline-block",
          }}>@efwaipiel.alsut ▶</a>
        </div>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section style={{ background:"linear-gradient(135deg,#4A0000 0%,#8B0000 50%,#4A0000 100%)", borderTop:"3px solid #FFD600", borderBottom:"3px solid #FFD600", padding:"6rem 2rem", textAlign:"center" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"1.5rem", color:"#FFD600", marginBottom:"1rem", letterSpacing:"4px" }}>★ ★ ★</div>
        <h2 style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"clamp(1.5rem,5vw,3rem)", color:"#FAFAF5", lineHeight:1.4, marginBottom:"1rem" }}>
          REGISTER<br/><span style={{ color:"#FFD600" }}>NOW!</span>
        </h2>
        <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.5rem", color:"rgba(255,255,255,0.8)", lineHeight:2.5, maxWidth:500, margin:"0 auto 2.5rem" }}>
          Mau jadi FL atau FP? Daftarkan dirimu sekarang di Freshmen Apps BINUS!
        </p>
        <PixelBtn href="https://freshmen.apps.binus.ac.id" style={{ fontSize:"0.65rem", padding:"1rem 2.5rem" }}>
          GO TO FRESHMEN APPS ▶
        </PixelBtn>
        <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.4rem", color:"rgba(255,255,255,0.4)", marginTop:"1.5rem", lineHeight:2 }}>
          freshmen.apps.binus.ac.id · Jika error, coba incognito atau browser lain
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#0D0000", borderTop:"1px solid rgba(255,214,0,0.2)", padding:"2.5rem 2rem", textAlign:"center" }}>
      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.8rem", color:"#FFD600", letterSpacing:"2px", marginBottom:"1rem" }}>FYPL B30 ALSUT</div>
      <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.4rem", color:"rgba(255,255,255,0.4)", lineHeight:2.5 }}>
        FYP B30 · BINUS University Alam Sutera<br/>
        <a href="https://www.instagram.com/efwaipiel.alsut" target="_blank" rel="noopener" style={{ color:"#00C9A7", textDecoration:"none" }}>@efwaipiel.alsut</a>
        {" · "}
        <a href="mailto:sso.alamsutera@binus.edu" style={{ color:"#00C9A7", textDecoration:"none" }}>sso.alamsutera@binus.edu</a>
      </p>
      <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"0.35rem", color:"rgba(255,255,255,0.2)", marginTop:"1rem" }}>© 2025 FYPL B30 Alam Sutera</p>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background:"#8B0000", minHeight:"100vh", color:"#FAFAF5" }}>
      <Navbar />
      <div style={{ paddingTop:0 }}>
        <Hero />
        <WhatIsFYP />
        <Timeline />
        <FYPLSection />
        <FAQ />
        <Register />
        <Footer />
      </div>
    </div>
  );
}