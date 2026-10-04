// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the nav link for the section being viewed
const links = document.querySelectorAll("nav a:not(.nav-donate)");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => {
      const on = a.getAttribute("href") === "#" + e.target.id;
      a.style.color = on ? "var(--navy)" : "";
      a.style.textDecoration = on ? "underline" : "";
      a.style.textUnderlineOffset = "6px";
    });
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => observer.observe(s));

// Donation amounts show what each gift does (edit the text to match real costs)
const impacts = {
    "100": "R100 gives a student printed workbooks and templates for their career and study planning.",
    "250": "R250 covers a student's place at an EmpowerMe workshop, including materials and refreshments.",
    "500": "R500 funds a one-on-one mentorship session between a student and an experienced mentor.",
    "1000": "R1000 helps bring a full seminar or school visit to a group of learners.",
    "other": "Every rand counts. Give what you can and empower a learner to take their next step."
  };
  
  const tiers = document.querySelectorAll(".tier");
  const impactBox = document.getElementById("impact");
  
  tiers.forEach(btn => btn.addEventListener("click", () => {
    tiers.forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
  
    const key = (btn.dataset.amount || "other").toLowerCase();
    impactBox.textContent = impacts[key] || impacts["other"];
  }));

// Contact form: sends straight to the organisation's inbox using Web3Forms (free).

const ACCESS_KEY = "d12146ef-7b1b-4e86-913f-df7e6aa50e12";
 
const contactForm = document.getElementById("contact-form");
const formMsg = document.getElementById("status");
const sendBtn = contactForm.querySelector("button[type=submit]");
 
contactForm.addEventListener("submit", async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(contactForm));
  const payload = {
    access_key: ACCESS_KEY,
    subject: "New message from " + d.name + " (" + d.role + ") via the EmpowerMe website",
    from_name: "EmpowerMe Website",
    name: d.name,
    email: d.email,
    role: d.role,
    message: d.message,
    botcheck: d.botcheck || ""
  };
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  formMsg.style.color = "#2f6b12";
  formMsg.textContent = "";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    const out = await res.json();
    if (!out.success) throw new Error(out.message || "The message could not be sent.");
    contactForm.reset();
    formMsg.textContent = "Thank you! Your message has been sent. We will get back to you soon.";
  } catch (err) {
    console.error(err);
    formMsg.style.color = "#b3261e";
    formMsg.textContent = "Sorry, we could not send that. " + err.message + " You can also email us at empowermeyouthinitiativengo@gmail.com.";
  }
  sendBtn.disabled = false;
  sendBtn.textContent = "Send message";
});
