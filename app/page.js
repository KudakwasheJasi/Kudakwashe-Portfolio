"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home", icon: "fa-home" },
  { id: "about", label: "About", icon: "fa-user" },
  { id: "admissions", label: "Academic Profile", icon: "fa-graduation-cap" },
  { id: "services", label: "Services", icon: "fa-list" },
  { id: "portfolio", label: "Portfolio", icon: "fa-briefcase" },
  { id: "contact", label: "Contact", icon: "fa-comments" },
];

const services = [
  ["fa-earth-americas", "Web Application", "I develop professional websites, blogs, portfolios, landing pages, and e-commerce platforms."],
  ["fa-code", "Clean Code", "I prioritize writing clean code following industry best practices during development."],
  ["fa-laptop-code", "High-Fidelity Interfaces", "I ensure that graphic elements meet the predefined requirements of the client."],
  ["fa-object-group", "Responsive Web Pages", "I work to harmonize page structure, balancing visual elements across different devices."],
  ["fa-search", "SEO", "I implement SEO best practices and techniques that improve website ranking on search engines."],
  ["fa-wand-sparkles", "Animations", "I create interactive animations that capture user attention, providing a modern and engaging experience."],
];

const skills = [
  ["HTML", 95],
  ["CSS", 90],
  ["JAVASCRIPT", 90],
  ["TAILWIND.CSS", 85],
  ["REACT.JS", 85],
];

const projects = [
  ["https://kudakwashe-jasi-academy.vercel.app/", "/images/portfolio/kudakwashe-jasi-academy.PNG", "Kudakwashe Jasi Academy"],
  ["https://petty-heating-solution.vercel.app/", "/images/portfolio/petty heating solution.PNG", "Petty Heating Solution"],
  ["https://react-admin-dashboard-master-fawn.vercel.app/", "/images/portfolio/Dashboard Pie chart.PNG", "React admin dashboard"],
  ["https://coffee-website-liart.vercel.app/", "/images/portfolio/Coffee Cafe.PNG", "Coffee cafe"],
  ["https://coffee-shop-website-main.vercel.app/", "/images/portfolio/coffee shop website.PNG", "Coffee shop website"],
  ["https://mern-stack-taskmanager-app.vercel.app/", "/images/portfolio/Task Manager img.PNG", "Task manager"],
];

const admissionsHighlights = [
  ["fa-graduation-cap", "Academic foundation", "Certificate in Software Engineering from Uncommon.org, completed in 2024."],
  ["fa-flask", "Practical learning", "Hands-on experience building responsive interfaces, web applications, dashboards, and task management tools."],
  ["fa-bullseye", "University goal", "Seeking an opportunity to deepen my knowledge through university-level studies in software engineering or computer science."],
  ["fa-people-group", "Collaborative mindset", "Comfortable contributing to team projects while also taking responsibility for independent technical work."],
  ["fa-lightbulb", "Areas of interest", "Full-stack development, web technologies, user-focused interfaces, and problem-solving through software."],
  ["fa-arrow-trend-up", "Growth mindset", "Committed to continuous learning, stronger computer science fundamentals, and responsible technology practice."],
];

function Section({ id, activeSection, previousSection, asideOpen, children }) {
  const isActive = activeSection === id;
  const sectionClass = id === "services" ? "service" : id;
  return (
    <section className={`${sectionClass} section ${isActive ? "active" : ""} ${previousSection === id ? "back-section" : ""} ${asideOpen ? "open" : ""}`} id={id}>
      {children}
    </section>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [previousSection, setPreviousSection] = useState("");
  const [asideOpen, setAsideOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [skin, setSkin] = useState("color-1");
  const [professionIndex, setProfessionIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ role: "assistant", text: "Hi, I can answer questions about Kudakwashe's skills, services, projects, and availability." }]);
  const [chatLoading, setChatLoading] = useState(false);
  const professions = ["Programmer Front-End", "Backend Developer", "Freelancer", "Full Stack Developer"];

  useEffect(() => {
    const profession = professions[professionIndex];
    const isComplete = typedText === profession;
    const isEmpty = typedText === "";
    const delay = isComplete && !isDeleting ? 1400 : isEmpty && isDeleting ? 350 : isDeleting ? 55 : 95;
    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setProfessionIndex((current) => (current + 1) % professions.length);
      } else {
        const nextLength = typedText.length + (isDeleting ? -1 : 1);
        setTypedText(profession.slice(0, nextLength));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [isDeleting, professionIndex, professions, typedText]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.documentElement.style.setProperty("--skin-color", {
      "color-1": "#ec1839",
      "color-2": "#fa5b0f",
      "color-3": "#37b182",
      "color-4": "#1854b4",
      "color-5": "#f021b2",
    }[skin]);
  }, [darkMode, skin]);

  function navigateTo(section) {
    if (section !== activeSection) {
      setPreviousSection(activeSection);
    }
    setActiveSection(section);
    setAsideOpen(false);
  }

  async function askAssistant(event) {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message || chatLoading) return;
    setChatInput("");
    setChatMessages((current) => [...current, { role: "user", text: message }]);
    setChatLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setChatMessages((current) => [...current, { role: "assistant", text: data.answer || data.error || "I could not answer that right now." }]);
    } catch {
      setChatMessages((current) => [...current, { role: "assistant", text: "The assistant is temporarily unavailable. Please use the Contact section instead." }]);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="main-container">
      <aside className={`aside ${asideOpen ? "open" : ""}`}>
        <div className="logo"><a href="#home" onClick={() => navigateTo("home")}><span>K</span>udakwashe</a></div>
        <button className={`nav-toggler ${asideOpen ? "open" : ""}`} onClick={() => setAsideOpen((open) => !open)} aria-label="Toggle navigation">
          <span />
        </button>
        <ul className="nav">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className={activeSection === section.id ? "active" : ""} onClick={() => navigateTo(section.id)}>
                <em className={`fa ${section.icon}`} />{section.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <Section id="home" activeSection={activeSection} previousSection={previousSection} asideOpen={asideOpen}>
          <div className="container"><div className="row">
            <div className="home-info padd-15">
              <h3 className="hello">Hello, my name is <span className="name">Kudakwashe Jasi</span></h3>
              <h3 className="my-profession">I am a <span className="typing">{typedText}</span></h3>
              <p>Versatile and motivated Full Stack Developer with a foundational understanding of both front-end and back-end technologies. Demonstrated ability to contribute to team projects with a collaborative spirit, while also being comfortable tackling challenges independently. Familiar with a range of programming languages and frameworks, and eager to continue learning and expanding technical skills. Passionate about building responsive and user-friendly applications, with a focus on delivering quality and efficiency.</p>
              <a href="https://github.com/kudakwasheJasi" className="btn" target="_blank" rel="noreferrer">View GitHub</a>
            </div>
            <div className="home-img padd-15"><img src="/images/portfolio/logo.webp" alt="Kudakwashe Jasi" /></div>
          </div></div>
        </Section>

        <Section id="about" activeSection={activeSection} previousSection={previousSection} asideOpen={asideOpen}>
          <div className="container">
            <div className="row"><div className="section-title padd-15"><h2>About</h2></div></div>
            <div className="row"><div className="about-content padd-15">
              <div className="row"><div className="about-text padd-15"><h3>I&apos;m Kudakwashe, a <span>Full Stack Developer</span></h3><p>As a dedicated Software Engineer with hands-on experience in full-stack development, I specialize in building scalable and efficient applications using modern technologies. From front-end design to back-end architecture, I have a strong track record of delivering high-quality solutions. Passionate about problem-solving and innovation, I continuously refine my skills to stay ahead in the ever-evolving tech landscape. I am currently open to new opportunities in software engineering, where I can contribute my expertise and collaborate on impactful projects. Let&apos;s connect and build something great.</p></div></div>
              <div className="row"><div className="personal-info padd-15"><div className="row">
                {[['Date of Birth', '16 07 2002'], ['Age', '23'], ['GitHub', 'github.com/kudakwasheJasi'], ['Email', 'Kudakwashejasi4@gmail.com'], ['Education', 'Certificate (Software Engineering)'], ['Phone', '+27 81 412 4329'], ['City', 'Harare, Zimbabwe'], ['Freelance', 'Available']].map(([label, value]) => <div className="info-item padd-15" key={label}><p>{label} : <span>{value}</span></p></div>)}
              </div><div className="row"><div className="buttons padd-15"><a href="#contact" className="btn hire-me" onClick={() => navigateTo("contact")}>Hire Me</a></div></div></div>
              <div className="skills padd-15"><div className="row">{skills.map(([label, percent]) => <div className="skill-item padd-15" key={label}><h5>{label}</h5><div className="progress"><div className="progress-in" style={{ width: `${percent}%` }} /><div className="skill-percent">{percent}%</div></div></div>)}</div></div></div>
              <div className="row"><Timeline title="Education" className="education" items={[["2024", "Certificate in Software Engineering", "Graduated with a Certificate in Software Engineering from Uncommon.org, covering key skills in front-end and back-end development, and web technologies."]]} /><Timeline title="Experience" className="experience" items={[["2023 - 2024", "Web Developer", "Worked as a Web Developer at Uncommon.org, developing interactive, responsive websites and engaging user interfaces while collaborating with a dynamic team."]]} /></div>
            </div></div>
          </div>
        </Section>

        <Section id="admissions" activeSection={activeSection} previousSection={previousSection} asideOpen={asideOpen}><div className="container"><div className="row"><div className="section-title padd-15"><h2>Academic Profile</h2></div></div><div className="row"><div className="admissions-intro padd-15"><h3>Preparing for the next level in <span>technology</span></h3><p>I am seeking admission to a university programme where I can strengthen my computer science foundations, learn from experienced lecturers, and contribute my practical software development experience to the campus community.</p></div></div><div className="row">{admissionsHighlights.map(([icon, title, text]) => <div className="service-item padd-15" key={title}><div className="service-item-inner admissions-card"><div className="icon"><em className={`fa ${icon}`} /></div><h4>{title}</h4><p>{text}</p></div></div>)}</div><div className="row"><div className="admissions-statement padd-15"><h3>Why I am ready to learn</h3><p>My projects show that I can turn ideas into working applications, learn unfamiliar tools, and keep improving through practice. University study is the next step I am pursuing to develop deeper knowledge in algorithms, software design, databases, and professional engineering.</p><a href="#contact" className="btn" onClick={() => navigateTo("contact")}>Discuss my application</a></div></div></div></Section>

        <Section id="services" activeSection={activeSection} previousSection={previousSection} asideOpen={asideOpen}><div className="container"><div className="row"><div className="section-title padd-15"><h2>Services</h2></div></div><div className="row">{services.map(([icon, title, text]) => <div className="service-item padd-15" key={title}><div className="service-item-inner"><div className="icon"><em className={`fa ${icon}`} /></div><h4>{title}</h4><p>{text}</p></div></div>)}</div></div></Section>

        <Section id="portfolio" activeSection={activeSection} previousSection={previousSection} asideOpen={asideOpen}><div className="container"><div className="row"><div className="section-title padd-15"><h2>Projects</h2></div><div className="portfolio-heading padd-15"><h2>My Projects:</h2></div></div><div className="row">{projects.map(([url, image, alt]) => <div className="portfolio-item padd-15" key={url}><div className="portfolio-item-inner shadow-dark"><div className="portfolio-img"><a href={url} target="_blank" rel="noreferrer"><img src={image} alt={alt} /></a></div></div></div>)}</div></div></Section>

        <Section id="contact" activeSection={activeSection} previousSection={previousSection} asideOpen={asideOpen}><div className="container"><div className="row"><div className="section-title padd-15"><h2>Contact</h2></div></div><h3 className="contact-title padd-15">Any Questions?</h3><h4 className="contact-sub-title padd-15">I&apos;M HERE TO HELP</h4><div className="row">{[["fa-phone", "Call Me", "+27 81 412 4329", "tel:+27814124329"], ["fa-whatsapp", "WhatsApp", "Message me on WhatsApp", "https://wa.me/27814124329"], ["fa-envelope", "Email", "kudakwashejasi4@gmail.com", "mailto:kudakwashejasi4@gmail.com"], ["fa-brands fa-github", "GitHub", "github.com/kudakwasheJasi", "https://github.com/kudakwasheJasi"], ["fa-brands fa-linkedin", "LinkedIn", "linkedin.com/in/kudakwashe-jasi-359ba22aa", "https://www.linkedin.com/in/kudakwashe-jasi-359ba22aa/"]].map(([icon, title, text, href]) => <div className="contact-info-item padd-15" key={title}><div className="icon"><em className={`fa ${icon}`} /></div><h4>{title}</h4><p><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{text}</a></p></div>)}</div><h3 className="contact-title padd-15">SEND ME AN EMAIL</h3><h4 className="contact-sub-title padd-15">I&apos;LL BE HAPPY TO RESPOND</h4><div className="row contact-content"><div className="map-container col-6 padd-15"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60306.75958789372!2d31.028548536137914!3d-17.824991498090595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4d7eac0f1e3!2sHarare%2C%20Zimbabwe!5e0!3m2!1sen!2s!4v1633617983243!5m2!1sen!2s" width="100%" height="100%" loading="lazy" allowFullScreen title="Harare map" /></div><div className="contact-form col-6 padd-15"><form action="https://formspree.io/f/your-form-id" method="POST"><div className="row"><div className="form-item col-6 padd-15"><input type="text" name="name" className="form-control" placeholder="Name" required /></div><div className="form-item col-6 padd-15"><input type="email" name="email" className="form-control" placeholder="Email" required /></div><div className="form-item col-12 padd-15"><input type="text" name="subject" className="form-control" placeholder="Subject" /></div><div className="form-item col-12 padd-15"><textarea name="message" className="form-control" placeholder="Message" required /></div><div className="form-item col-12 padd-15"><button type="submit" className="btn">Send Message</button></div></div></form></div></div></div></Section>
      </main>

      <section className={`ai-toolbox ${assistantOpen ? "open" : ""}`} aria-label="Portfolio AI assistant">
        {assistantOpen && <div className="ai-panel">
          <div className="ai-panel-header"><div><strong>Ask Kudakwashe</strong><span>Portfolio assistant</span></div><button onClick={() => setAssistantOpen(false)} aria-label="Close assistant">&times;</button></div>
          <div className="ai-messages">{chatMessages.map((chat, index) => <p className={`ai-message ${chat.role}`} key={`${chat.role}-${index}`}>{chat.text}</p>)}{chatLoading && <p className="ai-message assistant">Thinking...</p>}</div>
          <form className="ai-form" onSubmit={askAssistant}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about skills or projects" aria-label="Ask the portfolio assistant" maxLength={1000} /><button type="submit" disabled={chatLoading || !chatInput.trim()} aria-label="Send question"><em className="fa fa-arrow-up" /></button></form>
        </div>}
        <button className="ai-launcher" onClick={() => setAssistantOpen((open) => !open)} aria-label={assistantOpen ? "Close AI assistant" : "Open AI assistant"}><em className="fa fa-sparkles" /><span>Ask AI</span></button>
      </section>

      <div className={`style-switcher ${switcherOpen ? "open" : ""}`}><button className="style-switcher-toggler s-icon" onClick={() => setSwitcherOpen((open) => !open)} aria-label="Open style settings"><em className="fas fa-cog fa-spin" /></button><button className="day-night s-icon" onClick={() => setDarkMode((dark) => !dark)} aria-label="Toggle dark mode"><em className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`} /></button><h4>Theme Colors</h4><div className="colors">{["color-1", "color-2", "color-3", "color-4", "color-5"].map((color) => <button className={color} key={color} onClick={() => setSkin(color)} aria-label={`Use ${color}`} />)}</div></div>
    </div>
  );
}

function Timeline({ title, className, items }) {
  return <div className={`${className} padd-15`}><h3 className="title">{title}</h3><div className="row"><div className="timeline-box padd-15"><div className="timeline shadow-dark">{items.map(([date, itemTitle, text]) => <div className="timeline-item" key={itemTitle}><div className="circle-dot" /><h3 className="timeline-date"><em className="fa fa-calendar" /> {date}</h3><h4 className="timeline-title">{itemTitle}</h4><p className="timeline-text">{text}</p></div>)}</div></div></div></div>;
}
