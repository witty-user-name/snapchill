const yearEl = document.getElementById("year");
const waitlistForm = document.getElementById("waitlist-form");
const formMessage = document.getElementById("form-message");
const stats = document.querySelectorAll(".num");

yearEl.textContent = new Date().getFullYear();

const animateStat = (node) => {
  const target = Number(node.dataset.target);
  let value = 0;
  const step = Math.max(1, Math.ceil(target / 35));

  const timer = setInterval(() => {
    value += step;
    if (value >= target) {
      value = target;
      clearInterval(timer);
    }
    node.textContent = value;
  }, 35);
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

stats.forEach((stat) => observer.observe(stat));

waitlistForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();

  if (!email.includes("@") || !email.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  formMessage.textContent = `Thanks! ${email} is on the SnapChill waitlist.`;
  waitlistForm.reset();
});
