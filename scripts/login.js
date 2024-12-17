document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const authTabs = document.querySelectorAll(".auth-tab");

  // Переключение между вкладками
  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabType = tab.dataset.tab;

      // Активация таба
      authTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Показ соответствующей формы
      loginForm.classList.remove("active");
      registerForm.classList.remove("active");

      if (tabType === "login") {
        loginForm.classList.add("active");
      } else {
        registerForm.classList.add("active");
      }
    });
  });

  // Обработка формы входа
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Здесь будет логика авторизации
    console.log("Logowanie:", { email, password });
  });

  // Обработка формы регистрации
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const userType = document.getElementById("userType").value;

    if (password !== confirmPassword) {
      alert("Hasła nie są identyczne");
      return;
    }

    // Здесь будет логика регистрации
    console.log("Rejestracja:", { name, email, password, userType });
  });
});
