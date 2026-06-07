const root = document.documentElement;
const currentPage = window.location.pathname.split('/').pop();
const darkPages = ['index.html', 'informatica.html', 'electromecanica.html', 'construcciones.html', 'basico.html'];
let isDarkMode = false;
let boton = null;

function getBoton() {
  if (!boton) boton = document.body.querySelector('.darkmode-btn');
  return boton;
}

const cssVarsToToggle = [
  '--background-header',
  '--background-primario',
  '--background-secundario',
  '--background-terciario',
  '--texto-primario',
  '--texto-secundario',
  '--background',
  '--sombra'
];

// Función para activar modo oscuro
function activateDarkMode() {
  const styles = getComputedStyle(root);
  cssVarsToToggle.forEach(v => {
    const darkProp = `${v}-dark`;
    const darkValue = styles.getPropertyValue(darkProp).trim();
    if (darkValue) root.style.setProperty(v, darkValue);
  });
  root.classList.add('-dark');
  document.querySelectorAll('table').forEach(tabla => {
    tabla.classList.add('table-dark');
  });
  const card = document.getElementsByClassName('card')[0];
  if (card) card.classList.add('text-bg-dark', 'border-light');
  localStorage.setItem('theme', 'dark');
  console.warn('%c⬛ Modo oscuro activado', 'font-size: 17px; color: green; text-shadow: 1px 1px 2px black;');
  isDarkMode = true;
  const b = getBoton();
  if (b) b.innerHTML = '☀️';

  actualizarImagenPorTema();
}

// Función para activar modo claro
function activateLightMode() {
  const inlineStyles = root.style;
  const toRemove = [];
  for (let i = 0; i < inlineStyles.length; i++) {
    const prop = inlineStyles[i];
    if (prop.startsWith('--')) toRemove.push(prop);
  }
  toRemove.forEach(prop => inlineStyles.removeProperty(prop));
  root.classList.remove('-dark');
  document.querySelectorAll('table').forEach(tabla => {
    tabla.classList.remove('table-dark');
  });
  const card = document.getElementsByClassName('card')[0];
  if (card) card.classList.remove('text-bg-dark', 'border-light');
  localStorage.setItem('theme', 'light');
  console.warn('%c⬜ Modo claro activado', 'font-size: 17px; color: orange; text-shadow: 1px 1px 2px black;');
  isDarkMode = false;
  const b = getBoton();
  if (b) b.innerHTML = '🌙';

  actualizarImagenPorTema();
}

// Alternar entre modos
function toggleTheme() {
  if (!isDarkMode) {
    activateDarkMode();
  } else {
    activateLightMode();
  }
}

// 🔹 Detectar si hay un tema guardado
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  activateDarkMode();
} else if (savedTheme === 'light') {
  activateLightMode();
} else {
  // Si no hay preferencia guardada, consultar al sistema
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDarkScheme) {
    activateDarkMode();
  } else {
    activateLightMode();
  }
}


function actualizarImagenPorTema() {
  const imagenes = document.querySelectorAll('[data-theme-img]');

  imagenes.forEach(img => {
    const path = img.getAttribute('src');
    if (!path) return;

    const nuevaImagen = isDarkMode ? 'default-dark.png' : 'default.png';
    const nuevoSrc = path.replace(/[^\/]+$/, nuevaImagen);

    img.setAttribute('src', nuevoSrc);
  });
}