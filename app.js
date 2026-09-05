/* =========================================================
   ROCA CON LUCHO · 2026
   APP.JS
   ========================================================= */


/* =========================================================
   VIAJE
   ========================================================= */

const trip = {
  countdownStart:
    new Date("2026-09-04T00:00:00-03:00"),

  departure:
    new Date("2026-10-09T19:55:00-03:00"),

  arrivalNeuquen:
    new Date("2026-10-09T21:55:00-03:00"),

  // Hora estimada provisoria de llegada a Roca
  arrivalRoca:
    new Date("2026-10-09T23:30:00-03:00"),

  returnDeparture:
    new Date("2026-10-12T17:35:00-03:00"),

  returnArrival:
    new Date("2026-10-12T19:15:00-03:00")
};


/* =========================================================
   UBICACIONES
   ========================================================= */

const locations = {

  hotel: {
    name: "Bardas del Sur",
    lat: -39.034455080303665,
    lng: -67.57722179136542
  },

  luciano: {
    name: "Casa de Luciano",
    lat: -39.038888889,
    lng: -67.557722222
  },

  nqn: {
    name: "Aeropuerto Neuquén",
    lat: -38.95126542520285,
    lng: -68.13999625994903
  },

  aep: {
    name: "Aeroparque Jorge Newbery",
    lat: -34.55837828768513,
    lng: -58.41575316629089
  },

  lions: {
    name: "Heladería Lion's",
    lat: -39.031284317295054,
    lng: -67.57615013295612
  },

  oktober: {
    name: "Oktober Bar",
    lat: -39.031811079992615,
    lng: -67.57640102146632
  }

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


const progressLabel =
  document.getElementById("progressLabel");

const progressTitle =
  document.getElementById("progressTitle");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

const progressMessage =
  document.getElementById("progressMessage");


const prepPercent =
  document.getElementById("prepPercent");

const prepFill =
  document.getElementById("prepFill");

const prepStatus =
  document.getElementById("prepStatus");


const nextEventIcon =
  document.getElementById("nextEventIcon");

const nextTitle =
  document.getElementById("nextTitle");

const nextDate =
  document.getElementById("nextDate");

const nextDetail =
  document.getElementById("nextDetail");


const themeToggle =
  document.getElementById("themeToggle");

const routeButton =
  document.getElementById("routeButton");

const timeline =
  document.getElementById("timeline");


/* =========================================================
   HELPERS
   ========================================================= */

function pad(value) {
  return String(value).padStart(2, "0");
}


function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
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
   DISTANCIAS
   ========================================================= */

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}


function calculateDistanceKm(
  pointA,
  pointB
) {

  const earthRadiusKm = 6371;

  const dLat =
    toRadians(
      pointB.lat - pointA.lat
    );

  const dLng =
    toRadians(
      pointB.lng - pointA.lng
    );

  const lat1 =
    toRadians(pointA.lat);

  const lat2 =
    toRadians(pointB.lat);


  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
    Math.cos(lat2) *
    Math.sin(dLng / 2) ** 2;


  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );


  return earthRadiusKm * c;
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
    landingImage.src =
      imagePath;
  }


  if (groupImage) {
    groupImage.src =
      imagePath;
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


  landingPercent.textContent =
    "0%";

  landingProgressFill.style.width =
    "0%";


  landingStatus.textContent =
    inRoca
      ? "Luciano entrando en cuadro…"
      : messages[0];


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


      landingPercent.textContent =
        `${progress}%`;

      landingProgressFill.style.width =
        `${progress}%`;


      if (progress < 94) {

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
        progress < 100
      ) {

        landingStatus.textContent =
          inRoca
            ? "Lucho se suma a la banda…"
            : "Roca, allá vamos…";

      }


      if (progress === 100) {

        clearInterval(interval);


        landingStatus.textContent =
          inRoca
            ? "LUCHO SE UNIÓ A LA BANDA."
            : "ROCA, ALLÁ VAMOS.";


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
   PROGRESO
   ========================================================= */

function setProgress(
  start,
  end,
  now
) {

  const total =
    end - start;


  if (total <= 0) {
    return 0;
  }


  const elapsed =
    now - start;


  const value =
    clamp(
      (elapsed / total) * 100,
      0,
      100
    );


  if (progressFill) {

    progressFill.style.width =
      `${value}%`;

  }


  if (progressText) {

    progressText.textContent =
      `${Math.round(value)}%`;

  }


  return value;
}


/* =========================================================
   PREVIA
   ========================================================= */

function stateBeforeTrip(now) {

  tripPhase.textContent =
    "PREVIA";


  countdownLabel.textContent =
    "FALTAN";

  countdownUnit.textContent =
    "DÍAS";


  renderCountdown(
    trip.departure,
    now
  );


  const value =
    setProgress(
      trip.countdownStart,
      trip.departure,
      now
    );


  progressLabel.textContent =
    "PROGRESO AL VIAJE";

  progressTitle.textContent =
    "La previa";


  if (value < 25) {

    statusMessage.textContent =
      "La cuenta regresiva empezó.";

    progressMessage.textContent =
      "Roca todavía parece lejos.";

  }

  else if (value < 50) {

    statusMessage.textContent =
      "Cada vez falta menos.";

    progressMessage.textContent =
      "Ya arrancamos.";

  }

  else if (value < 75) {

    statusMessage.textContent =
      "Esto se empieza a sentir.";

    progressMessage.textContent =
      "Mitad de camino.";

  }

  else if (value < 90) {

    statusMessage.textContent =
      "Entramos en zona viaje.";

    progressMessage.textContent =
      "Roca está cada vez más cerca.";

  }

  else {

    statusMessage.textContent =
      "Esto ya está encima.";

    progressMessage.textContent =
      "Último tramo.";

  }


  const hoursRemaining =
    (trip.departure - now) /
    3600000;


  if (
    hoursRemaining <= 24 &&
    hoursRemaining > 0
  ) {

    statusMessage.textContent =
      "HOY NOS VAMOS.";

    progressMessage.textContent =
      "Últimas horas.";

  }


  nextEventIcon.textContent =
    "✈";

  nextTitle.textContent =
    "Vuelo AEP → NQN";

  nextDate.textContent =
    "VIE 9 OCT · 19:55";

  nextDetail.textContent =
    "Llegada 21:55 · duración 2 h";

}


/* =========================================================
   VUELO DE IDA
   ========================================================= */

function stateFlightOut(now) {

  tripPhase.textContent =
    "IDA";

  countdownLabel.textContent =
    "EN VUELO";

  countdownUnit.textContent =
    "PARA LLEGAR";


  renderCountdown(
    trip.arrivalNeuquen,
    now
  );


  setProgress(
    trip.departure,
    trip.arrivalNeuquen,
    now
  );


  progressLabel.textContent =
    "VUELO";

  progressTitle.textContent =
    "AEP → NQN";

  progressMessage.textContent =
    "Rumbo a Neuquén.";

  statusMessage.textContent =
    "Ahora sí. Nos fuimos.";


  nextEventIcon.textContent =
    "↓";

  nextTitle.textContent =
    "Llegada a Neuquén";

  nextDate.textContent =
    "21:55 · NQN";

  nextDetail.textContent =
    "Después: rumbo a General Roca";

}


/* =========================================================
   TRASLADO A ROCA
   ========================================================= */

function stateTransfer(now) {

  tripPhase.textContent =
    "TRASLADO";

  countdownLabel.textContent =
    "RUMBO A ROCA";

  countdownUnit.textContent =
    "PARA LLEGAR";


  renderCountdown(
    trip.arrivalRoca,
    now
  );


  setProgress(
    trip.arrivalNeuquen,
    trip.arrivalRoca,
    now
  );


  progressLabel.textContent =
    "ÚLTIMO TRAMO";

  progressTitle.textContent =
    "Neuquén → Roca";

  progressMessage.textContent =
    "Ya estamos cerca.";

  statusMessage.textContent =
    "Lucho nos espera.";


  nextEventIcon.textContent =
    "●";

  nextTitle.textContent =
    "General Roca";

  nextDate.textContent =
    "RÍO NEGRO";

  nextDetail.textContent =
    "Empieza Roca con Lucho.";

}


/* =========================================================
   EN ROCA
   ========================================================= */

function stateInRoca(now) {

  tripPhase.textContent =
    "EN ROCA";

  countdownLabel.textContent =
    "QUEDAN";

  countdownUnit.textContent =
    "DÍAS";


  renderCountdown(
    trip.returnDeparture,
    now
  );


  const value =
    setProgress(
      trip.arrivalRoca,
      trip.returnDeparture,
      now
    );


  progressLabel.textContent =
    "VIAJE VIVIDO";

  progressTitle.textContent =
    "Roca con Lucho";


  if (value < 25) {

    statusMessage.textContent =
      "Esto recién empieza.";

    progressMessage.textContent =
      "Llegamos.";

  }

  else if (value < 50) {

    statusMessage.textContent =
      "Que dure.";

    progressMessage.textContent =
      "Roca mode.";

  }

  else if (value < 75) {

    statusMessage.textContent =
      "Mitad del viaje.";

    progressMessage.textContent =
      "Estamos en el corazón del finde.";

  }

  else if (value < 90) {

    statusMessage.textContent =
      "Hay que aprovechar.";

    progressMessage.textContent =
      "Último tramo.";

  }

  else {

    statusMessage.textContent =
      "ÚLTIMAS HORAS.";

    progressMessage.textContent =
      "Se viene la vuelta.";

  }


  nextEventIcon.textContent =
    "✈";

  nextTitle.textContent =
    "Regreso NQN → AEP";

  nextDate.textContent =
    "LUN 12 OCT · 17:35";

  nextDetail.textContent =
    "Llegada 19:15 · duración 1 h 40";

}


/* =========================================================
   VUELTA
   ========================================================= */

function stateReturnFlight(now) {

  tripPhase.textContent =
    "VUELTA";

  countdownLabel.textContent =
    "VOLVIENDO";

  countdownUnit.textContent =
    "PARA LLEGAR";


  renderCountdown(
    trip.returnArrival,
    now
  );


  setProgress(
    trip.returnDeparture,
    trip.returnArrival,
    now
  );


  progressLabel.textContent =
    "VUELO DE REGRESO";

  progressTitle.textContent =
    "NQN → AEP";

  progressMessage.textContent =
    "Rumbo a Buenos Aires.";

  statusMessage.textContent =
    "Roca queda atrás.";


  nextEventIcon.textContent =
    "⌂";

  nextTitle.textContent =
    "Buenos Aires";

  nextDate.textContent =
    "19:15 · AEP";

  nextDetail.textContent =
    "Fin del viaje.";

}


/* =========================================================
   FINAL
   ========================================================= */

function stateFinished() {

  tripPhase.textContent =
    "FIN";

  countdownLabel.textContent =
    "VIAJE";

  countdownUnit.textContent =
    "COMPLETADO";


  daysEl.textContent =
    "0";

  hoursEl.textContent =
    "00";

  minutesEl.textContent =
    "00";

  secondsEl.textContent =
    "00";


  if (progressFill) {
    progressFill.style.width =
      "100%";
  }


  if (progressText) {
    progressText.textContent =
      "100%";
  }


  progressLabel.textContent =
    "ROCA CON LUCHO";

  progressTitle.textContent =
    "Viaje completado";

  progressMessage.textContent =
    "09—12 OCT 2026";

  statusMessage.textContent =
    "Valió la pena.";


  nextEventIcon.textContent =
    "✓";

  nextTitle.textContent =
    "Roca con Lucho";

  nextDate.textContent =
    "VIAJE COMPLETADO";

  nextDetail.textContent =
    "Hasta la próxima.";

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

  }

  else if (
    now < trip.arrivalNeuquen
  ) {

    stateFlightOut(now);

  }

  else if (
    now < trip.arrivalRoca
  ) {

    stateTransfer(now);

  }

  else if (
    now < trip.returnDeparture
  ) {

    stateInRoca(now);

  }

  else if (
    now < trip.returnArrival
  ) {

    stateReturnFlight(now);

  }

  else {

    stateFinished();

  }

}


/* =========================================================
   CHECKLIST
   ========================================================= */

const checklistInputs =
  [
    ...document.querySelectorAll(
      "[data-check]"
    )
  ];


const checklistStorageKey =
  "rocaConLuchoChecklist";


function loadChecklist() {

  let saved = {};


  try {

    saved =
      JSON.parse(
        localStorage.getItem(
          checklistStorageKey
        ) || "{}"
      );

  }

  catch {

    saved = {};

  }


  checklistInputs.forEach(
    input => {

      input.checked =
        Boolean(
          saved[input.dataset.check]
        );

    }
  );


  updatePreparation();

}


function saveChecklist() {

  const state = {};


  checklistInputs.forEach(
    input => {

      state[input.dataset.check] =
        input.checked;

    }
  );


  localStorage.setItem(
    checklistStorageKey,
    JSON.stringify(state)
  );


  updatePreparation();

}


function updatePreparation() {

  const total =
    checklistInputs.length;


  const completed =
    checklistInputs.filter(
      input => input.checked
    ).length;


  const percent =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );


  if (prepFill) {

    prepFill.style.width =
      `${percent}%`;

  }


  if (prepPercent) {

    prepPercent.textContent =
      `${percent}%`;

  }


  if (!prepStatus) {
    return;
  }


  if (percent === 0) {

    prepStatus.textContent =
      "Todavía no marcaste nada.";

  }

  else if (percent < 50) {

    prepStatus.textContent =
      `${completed} de ${total} cosas listas.`;

  }

  else if (percent < 100) {

    prepStatus.textContent =
      "La valija empieza a tomar forma.";

  }

  else {

    prepStatus.textContent =
      "TODO LISTO ✓";

  }

}


checklistInputs.forEach(
  input => {

    input.addEventListener(
      "change",
      saveChecklist
    );

  }
);


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

  }

  else {

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
   HOJA DE RUTA
   ========================================================= */

let routeVisible = true;


function toggleTimeline() {

  if (
    !timeline ||
    !routeButton
  ) {
    return;
  }


  routeVisible =
    !routeVisible;


  timeline.style.display =
    routeVisible
      ? "block"
      : "none";


  routeButton.textContent =
    routeVisible
      ? "OCULTAR"
      : "VER TODO";

}


routeButton?.addEventListener(
  "click",
  toggleTimeline
);


/* =========================================================
   DISTANCIAS · DEBUG
   ========================================================= */

function logUsefulDistances() {

  const hotel =
    locations.hotel;


  const targets = [
    locations.oktober,
    locations.lions,
    locations.luciano,
    locations.nqn
  ];


  console.group(
    "Roca con Lucho · Distancias"
  );


  targets.forEach(
    location => {

      const distance =
        calculateDistanceKm(
          hotel,
          location
        );


      console.log(
        `${location.name}: ${distance.toFixed(2)} km aprox.`
      );

    }
  );


  console.groupEnd();

}


/* =========================================================
   INICIO
   ========================================================= */

loadTheme();

loadChecklist();

updateTrip();

logUsefulDistances();

runLanding();


setInterval(
  updateTrip,
  1000
);

/* =========================================================
   SERVICE WORKER · PWA
   ========================================================= */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
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
  });
}
