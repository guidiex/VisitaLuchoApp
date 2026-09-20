/* =========================================================
   ROCA CON LUCHO · 2026
   APP.JS · VERSIÓN SIMPLIFICADA
   ========================================================= */


/* =========================================================
   VIAJE
   ========================================================= */

const trip = {
  departure:
    new Date("2026-10-09T19:55:00-03:00"),

  arrivalNeuquen:
    new Date("2026-10-09T21:55:00-03:00"),

  // Hora estimada de llegada a General Roca
  arrivalRoca:
    new Date("2026-10-09T23:30:00-03:00"),

  returnDeparture:
    new Date("2026-10-12T17:35:00-03:00"),

  returnArrival:
    new Date("2026-10-12T19:15:00-03:00")
};


/* =========================================================
   LANDING
   ========================================================= */

const landingMessages = [
  "Emilio ya se está preparando…",
  "El Doc ya está listo...",
  "Banco Provincia autorizó el viaje...",
  "VTV lista...",
  "Cargando combustible al avión…",
  "Tribunales puede esperar...",
  "Faso confirmadisimo...",
  "Creatina OK...",
  "Subiendo pulsaciones...",
  "Birra fría...",
  "Fernet listo...",
  "Hielo en camino…",
  "Balance APROBADO en Key Biscayne...",
  "Carne OK..."
];


/* =========================================================
   DOM
   ========================================================= */

const landing =
  document.getElementById("landing");

const landingImage =
  document.getElementById("landingImage");

const landingStatus =
  document.getElementById("landingStatus");

const landingPercent =
  document.getElementById("landingPercent");

const landingProgressFill =
  document.getElementById("landingProgressFill");

const mainApp =
  document.getElementById("mainApp");

const groupImage =
  document.getElementById("groupImage");

const daysEl =
  document.getElementById("days");

const hoursEl =
  document.getElementById("hours");

const minutesEl =
  document.getElementById("minutes");

const secondsEl =
  document.getElementById("seconds");

const countdownLabel =
  document.getElementById("countdownLabel");

const countdownUnit =
  document.getElementById("countdownUnit");

const tripPhase =
  document.getElementById("tripPhase");

const statusMessage =
  document.getElementById("statusMessage");

const themeToggle =
  document.getElementById("themeToggle");


/* =========================================================
   HELPERS
   ========================================================= */

function pad(value) {
  return String(value).padStart(2, "0");
}


function getTimeParts(milliseconds) {

  const totalSeconds =
    Math.max(
      0,
      Math.floor(milliseconds / 1000)
    );

  return {
    days:
      Math.floor(
        totalSeconds / 86400
      ),

    hours:
      Math.floor(
        (totalSeconds % 86400) / 3600
      ),

    minutes:
      Math.floor(
        (totalSeconds % 3600) / 60
      ),

    seconds:
      totalSeconds % 60
  };
}


function shuffle(array) {

  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [copy[i], copy[j]] =
      [copy[j], copy[i]];
  }

  return copy;
}


/* =========================================================
   FOTO GRUPAL DINÁMICA
   ========================================================= */

function getCurrentGroupImage(
  now = new Date()
) {

  if (now >= trip.arrivalRoca) {
    return "assets/images/grupal-caricatura-lu.jpg";
  }

  return "assets/images/grupal-caricatura.jpg";
}


function updateGroupImages(
  now = new Date()
) {

  const imagePath =
    getCurrentGroupImage(now);

  if (landingImage) {
    landingImage.src = imagePath;
  }

  if (groupImage) {
    groupImage.src = imagePath;
  }
}


/* =========================================================
   LANDING 0 → 100
   ========================================================= */

function runLanding() {

  if (!landing || !mainApp) {

    if (mainApp) {
      mainApp.classList.remove(
        "appHidden"
      );

      mainApp.classList.add(
        "appVisible"
      );
    }

    return;
  }


  const now =
    new Date();

  const inRoca =
    now >= trip.arrivalRoca;


  updateGroupImages(now);


  const messages =
    shuffle(landingMessages);

  let progress = 0;
  let lastMessageIndex = -1;


  if (landingPercent) {
    landingPercent.textContent = "0%";
  }

  if (landingProgressFill) {
    landingProgressFill.style.width =
      "0%";
  }

  if (landingStatus) {
    landingStatus.textContent =
      inRoca
        ? "Luciano entrando en cuadro…"
        : messages[0];
  }


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const intervalTime =
    reducedMotion
      ? 20
      : 240;


  const interval =
    setInterval(() => {

      const increment =
        reducedMotion
          ? 18
          : Math.floor(
              Math.random() * 3
            ) + 1;


      progress =
        Math.min(
          progress + increment,
          100
        );


      if (landingPercent) {
        landingPercent.textContent =
          `${progress}%`;
      }

      if (landingProgressFill) {
        landingProgressFill.style.width =
          `${progress}%`;
      }


      if (
        progress < 94 &&
        landingStatus
      ) {

        const messageIndex =
          Math.min(
            Math.floor(
              progress /
              (94 / messages.length)
            ),
            messages.length - 1
          );


        if (
          messageIndex !==
          lastMessageIndex
        ) {

          lastMessageIndex =
            messageIndex;

          landingStatus.textContent =
            messages[messageIndex];
        }
      }


      if (
        progress >= 94 &&
        progress < 100 &&
        landingStatus
      ) {

        landingStatus.textContent =
          inRoca
            ? "Lucho se suma a la banda…"
            : "Roca, allá vamos…";
      }


      if (progress === 100) {

        clearInterval(interval);


        if (landingStatus) {
          landingStatus.textContent =
            inRoca
              ? "LUCHO SE UNIÓ A LA BANDA."
              : "ROCA, ALLÁ VAMOS.";
        }


        const exitDelay =
          reducedMotion
            ? 50
            : 1500;


        setTimeout(() => {

          landing.classList.add(
            "landingHidden"
          );

          mainApp.classList.remove(
            "appHidden"
          );

          mainApp.classList.add(
            "appVisible"
          );

        }, exitDelay);
      }

    }, intervalTime);
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function renderCountdown(
  target,
  now
) {

  const difference =
    target - now;

  const parts =
    getTimeParts(difference);


  if (daysEl) {
    daysEl.textContent =
      parts.days;
  }

  if (hoursEl) {
    hoursEl.textContent =
      pad(parts.hours);
  }

  if (minutesEl) {
    minutesEl.textContent =
      pad(parts.minutes);
  }

  if (secondsEl) {
    secondsEl.textContent =
      pad(parts.seconds);
  }
}


/* =========================================================
   ESTADOS DEL VIAJE
   ========================================================= */

function stateBeforeTrip(now) {

  if (tripPhase) {
    tripPhase.textContent =
      "PREVIA";
  }

  if (countdownLabel) {
    countdownLabel.textContent =
      "FALTAN";
  }

  if (countdownUnit) {
    countdownUnit.textContent =
      "DÍAS";
  }


  renderCountdown(
    trip.departure,
    now
  );


  const hoursRemaining =
    (trip.departure - now) /
    3600000;


  if (!statusMessage) {
    return;
  }


  if (
    hoursRemaining <= 24 &&
    hoursRemaining > 0
  ) {

    statusMessage.textContent =
      "HOY NOS VAMOS.";

    return;
  }


  const daysRemaining =
    (trip.departure - now) /
    86400000;


  if (daysRemaining <= 7) {

    statusMessage.textContent =
      "Lucho ya nos espera.";

  } else if (daysRemaining <= 30) {

    statusMessage.textContent =
      "Esto se empieza a sentir.";

  } else {

    statusMessage.textContent =
      "Cada vez falta menos.";
  }
}


function stateFlightOut(now) {

  if (tripPhase) {
    tripPhase.textContent =
      "IDA";
  }

  if (countdownLabel) {
    countdownLabel.textContent =
      "EN VUELO";
  }

  if (countdownUnit) {
    countdownUnit.textContent =
      "PARA LLEGAR";
  }


  renderCountdown(
    trip.arrivalNeuquen,
    now
  );


  if (statusMessage) {
    statusMessage.textContent =
      "Ahora sí. Nos fuimos.";
  }
}


function stateTransfer(now) {

  if (tripPhase) {
    tripPhase.textContent =
      "TRASLADO";
  }

  if (countdownLabel) {
    countdownLabel.textContent =
      "RUMBO A ROCA";
  }

  if (countdownUnit) {
    countdownUnit.textContent =
      "PARA LLEGAR";
  }


  renderCountdown(
    trip.arrivalRoca,
    now
  );


  if (statusMessage) {
    statusMessage.textContent =
      "Lucho nos espera.";
  }
}


function stateInRoca(now) {

  if (tripPhase) {
    tripPhase.textContent =
      "EN ROCA";
  }

  if (countdownLabel) {
    countdownLabel.textContent =
      "QUEDAN";
  }

  if (countdownUnit) {
    countdownUnit.textContent =
      "DÍAS";
  }


  renderCountdown(
    trip.returnDeparture,
    now
  );


  if (statusMessage) {
    statusMessage.textContent =
      "Lucho se incorporó.";
  }
}


function stateReturnFlight(now) {

  if (tripPhase) {
    tripPhase.textContent =
      "VUELTA";
  }

  if (countdownLabel) {
    countdownLabel.textContent =
      "VOLVIENDO";
  }

  if (countdownUnit) {
    countdownUnit.textContent =
      "PARA LLEGAR";
  }


  renderCountdown(
    trip.returnArrival,
    now
  );


  if (statusMessage) {
    statusMessage.textContent =
      "Roca queda atrás.";
  }
}


function stateFinished() {

  if (tripPhase) {
    tripPhase.textContent =
      "FIN";
  }

  if (countdownLabel) {
    countdownLabel.textContent =
      "VIAJE";
  }

  if (countdownUnit) {
    countdownUnit.textContent =
      "COMPLETADO";
  }


  if (daysEl) {
    daysEl.textContent = "0";
  }

  if (hoursEl) {
    hoursEl.textContent = "00";
  }

  if (minutesEl) {
    minutesEl.textContent = "00";
  }

  if (secondsEl) {
    secondsEl.textContent = "00";
  }


  if (statusMessage) {
    statusMessage.textContent =
      "Valió la pena.";
  }
}


/* =========================================================
   MOTOR DEL VIAJE
   ========================================================= */

function updateTrip() {

  const now =
    new Date();


  updateGroupImages(now);


  if (now < trip.departure) {

    stateBeforeTrip(now);

  } else if (
    now < trip.arrivalNeuquen
  ) {

    stateFlightOut(now);

  } else if (
    now < trip.arrivalRoca
  ) {

    stateTransfer(now);

  } else if (
    now < trip.returnDeparture
  ) {

    stateInRoca(now);

  } else if (
    now < trip.returnArrival
  ) {

    stateReturnFlight(now);

  } else {

    stateFinished();
  }
}


/* =========================================================
   MODO CLARO / OSCURO
   ========================================================= */

const themeKey =
  "rocaConLuchoTheme";


function applyTheme(theme) {

  const themeMeta =
    document.querySelector(
      'meta[name="theme-color"]'
    );


  if (theme === "dark") {

    document.documentElement.setAttribute(
      "data-theme",
      "dark"
    );

    themeMeta?.setAttribute(
      "content",
      "#101010"
    );

  } else {

    document.documentElement.removeAttribute(
      "data-theme"
    );

    themeMeta?.setAttribute(
      "content",
      "#f3f1eb"
    );
  }
}


function loadTheme() {

  const savedTheme =
    localStorage.getItem(
      themeKey
    );


  if (savedTheme) {

    applyTheme(savedTheme);
    return;
  }


  const prefersDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  applyTheme(
    prefersDark
      ? "dark"
      : "light"
  );
}


function toggleTheme() {

  const isDark =
    document.documentElement.getAttribute(
      "data-theme"
    ) === "dark";


  const nextTheme =
    isDark
      ? "light"
      : "dark";


  localStorage.setItem(
    themeKey,
    nextTheme
  );


  applyTheme(nextTheme);
}


themeToggle?.addEventListener(
  "click",
  toggleTheme
);


/* =========================================================
   INICIO
   ========================================================= */

loadTheme();

updateTrip();

runLanding();


setInterval(
  updateTrip,
  1000
);


/* =========================================================
   SERVICE WORKER · PWA
   ========================================================= */

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register(
          "./service-worker.js"
        )
        .then(registration => {

          console.log(
            "Roca con Lucho PWA activa:",
            registration.scope
          );

        })
        .catch(error => {

          console.error(
            "Error registrando Service Worker:",
            error
          );

        });
    }
  );
}