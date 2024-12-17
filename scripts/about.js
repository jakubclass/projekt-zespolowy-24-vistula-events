document.addEventListener("DOMContentLoaded", function () {
  // Анимация liczników
  function animateCounters() {
    const counters = document.querySelectorAll(".achievement-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000; // 2 sekundy
      const step = (target / duration) * 10;
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          setTimeout(updateCounter, 10);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Анимация для feature-cards при прокрутке
  const featureCards = document.querySelectorAll(".feature-card");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  featureCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  // Запускаем анимацию liczników
  animateCounters();
});
