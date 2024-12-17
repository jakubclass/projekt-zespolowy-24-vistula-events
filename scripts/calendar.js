document.addEventListener("DOMContentLoaded", function () {
  const calendarDays = document.getElementById("calendarDays");
  const currentMonthElement = document.getElementById("currentMonth");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const viewButtons = document.querySelectorAll(".view-controls button");
  const addEventModal = document.getElementById("addEventModal");
  const addEventForm = document.getElementById("addEventForm");

  let currentDate = new Date();
  let selectedDate = null;

  // Обновляем тестовые данные событий на 2025 год
  const events = {
    "2025-04-24": [
      { title: "Dzień otwartych drzwi", time: "10:00", category: "academic" },
    ],
    "2025-05-15": [
      {
        title: "Międzynarodowa konferencja IT",
        time: "09:00",
        category: "scientific",
      },
    ],
    "2025-06-01": [{ title: "Lato", time: "12:00", category: "cultural" }],
    "2025-06-05": [
      {
        title: "Mistrzowska lekcja UI/UX designu",
        time: "14:00",
        category: "workshop",
      },
    ],
    "2025-06-08": [
      {
        title: "Międzynarodowy klub językowy",
        time: "15:00",
        category: "language",
      },
    ],
    "2025-06-12": [
      {
        title: "Seminarium z przedsiębiorczości",
        time: "11:00",
        category: "business",
      },
    ],
    "2025-06-15": [
      { title: "Maraton uniwersytecki", time: "09:00", category: "sport" },
    ],
    "2025-06-18": [{ title: "Wystawa sztuki", time: "13:00", category: "art" }],
    "2025-06-22": [
      { title: "Dzień kariery", time: "10:00", category: "career" },
    ],
  };

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Обновляем заголовок с текущим месяцем
    const monthNames = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;

    // Очищаем календарь
    calendarDays.innerHTML = "";

    // Получаем первый день месяца
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Получаем день недели для первого дня (0 - воскресенье, 1 - понедельник, и т.д.)
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Преобразуем для недели, начинающейся с понедельника

    // Добавляем пустые ячейки в начале
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "calendar-day";
      calendarDays.appendChild(emptyDay);
    }

    // Добавляем дни месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "calendar-day";

      const dateElement = document.createElement("span");
      dateElement.className = "date";
      dateElement.textContent = day;

      // Правильное форматирование даты для проверки событий
      const currentDateString = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      // Проверяем, есть ли события на этот день
      if (events[currentDateString]) {
        dayElement.classList.add("has-events");

        // Добавляем индикаторы событий
        const eventIndicators = document.createElement("div");
        eventIndicators.className = "event-indicators";

        // Добавляем только уникальные категории
        const uniqueCategories = [
          ...new Set(events[currentDateString].map((event) => event.category)),
        ];
        uniqueCategories.forEach((category) => {
          const indicator = document.createElement("div");
          indicator.className = `event-indicator ${category}`;
          eventIndicators.appendChild(indicator);
        });

        dayElement.appendChild(eventIndicators);
      }

      // Проверяем, является ли день текущим
      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      dayElement.appendChild(dateElement);

      // Добавляем обработчик клика для отображения событий
      dayElement.addEventListener("click", () => showEvents(currentDateString));

      calendarDays.appendChild(dayElement);
    }
  }

  function showEvents(dateString) {
    const selectedDateEvents = document.getElementById("selectedDateEvents");
    selectedDateEvents.innerHTML = "";

    if (events[dateString]) {
      events[dateString].forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.className = `event-item ${event.category}`;
        eventElement.innerHTML = `
                    <h4>${event.title}</h4>
                    <p>${event.time}</p>
                `;
        selectedDateEvents.appendChild(eventElement);
      });
    } else {
      selectedDateEvents.innerHTML =
        '<p class="no-events">Brak wydarzeń w tym dniu</p>';
    }
  }

  // Обработчики для кнопок навигации
  prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Обработчики для кнопок переключения вида
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      viewButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      // Здесь можно добавить логику для переключения видов календаря
    });
  });

  // Инициализация календаря
  renderCalendar(currentDate);

  // Добавить функцию экспорта
  function exportCalendar() {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\n";

    for (let date in events) {
      events[date].forEach((event) => {
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `DTSTART:${date.replace(/-/g, "")}T${event.time.replace(
          ":",
          ""
        )}00\n`;
        icsContent += `SUMMARY:${event.title}\n`;
        icsContent += `CATEGORIES:${event.category}\n`;
        icsContent += `END:VEVENT\n`;
      });
    }

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vistula-events.ics";
    a.click();
  }

  document
    .getElementById("exportCalendar")
    .addEventListener("click", exportCalendar);

  function checkUpcomingEvents() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowString = tomorrow.toISOString().split("T")[0];

    if (events[tomorrowString]) {
      showNotification(
        `Jutro odbędzie się ${events[tomorrowString].length} wydarzeń`
      );
    }
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });
  }

  // Добавить функцию фильтрации
  function filterCalendarEvents() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const searchText = document
      .getElementById("eventSearch")
      .value.toLowerCase();

    const days = document.querySelectorAll(".calendar-day");
    days.forEach((day) => {
      if (day.classList.contains("has-events")) {
        const dateString = getDateStringFromDay(day); // Нужно реализовать эту функцию
        const dayEvents = events[dateString];

        let showDay = true;

        if (
          selectedCategory &&
          !dayEvents.some((event) => event.category === selectedCategory)
        ) {
          showDay = false;
        }

        if (
          searchText &&
          !dayEvents.some(
            (event) =>
              event.title.toLowerCase().includes(searchText) ||
              event.category.toLowerCase().includes(searchText)
          )
        ) {
          showDay = false;
        }

        day.style.opacity = showDay ? "1" : "0.3";
      }
    });
  }

  // Добавить слушатели событий
  document
    .getElementById("categoryFilter")
    .addEventListener("change", filterCalendarEvents);
  document
    .getElementById("eventSearch")
    .addEventListener("input", filterCalendarEvents);

  // Добавить функцию открытия модального окна
  function openAddEventModal() {
    addEventModal.style.display = "block";
    // Установить текущую дату по умолчанию
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("eventDate").value = today;
  }

  // Добавить функцию закрытия модального окна
  function closeAddEventModal() {
    addEventModal.style.display = "none";
    addEventForm.reset();
  }

  // Добавить обработчик отправки формы
  addEventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const category = document.getElementById("eventCategory").value;
    const description = document.getElementById("eventDescription").value;

    // Добавляем новое событие в объект events
    if (!events[date]) {
      events[date] = [];
    }

    events[date].push({
      title: title,
      time: time,
      category: category,
      description: description,
    });

    // Перерисовываем календарь
    renderCalendar(currentDate);

    // Показываем уведомление
    showNotification("Wydarzenie zostało dodane pomyślnie");

    // Закрываем модальное окно
    closeAddEventModal();
  });

  // Добавить обработчики для кнопки "Добавить w kalendarz"
  document
    .querySelector(".add-to-calendar")
    .addEventListener("click", openAddEventModal);

  // Добавить обработчик для закрытия модального окна
  document
    .querySelector(".close-modal")
    .addEventListener("click", closeAddEventModal);

  // Добавить закрытие по клику вне модального окна
  window.addEventListener("click", function (event) {
    if (event.target === addEventModal) {
      closeAddEventModal();
    }
  });

  // Добавить закрытие по Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && addEventModal.style.display === "block") {
      closeAddEventModal();
    }
  });
});
