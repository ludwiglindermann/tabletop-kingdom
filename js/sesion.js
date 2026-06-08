// Verificar sesión activa y mostrar opciones según rol
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
const menuSesion = document.getElementById("menu-sesion");

if (usuarioActivo) {
  // Usuario con sesión iniciada
  if (usuarioActivo.rol === "admin") {
    menuSesion.innerHTML = `
      <span style="color: var(--color-acento);">👑 ${usuarioActivo.nombre}</span>
      <a href="pages/admin.html" class="btn-registro ms-3">Panel Admin</a>
      <a href="perfil.html" class="btn-limpiar ms-2">Mi perfil</a>
      <button onclick="cerrarSesion()" class="btn-limpiar ms-2">Cerrar sesión</button>
    `;
  } else {
    menuSesion.innerHTML = `
      <span style="color: var(--color-acento);">👤 ${usuarioActivo.nombre}</span>
      <a href="perfil.html" class="btn-registro ms-3">Mi perfil</a>
      <button onclick="cerrarSesion()" class="btn-limpiar ms-2">Cerrar sesión</button>
    `;
  }
} else {
  // Sin sesión iniciada
  menuSesion.innerHTML = `
    <a href="login.html" class="btn-registro">Iniciar sesión</a>
    <a href="pages/registro.html" class="btn-limpiar ms-2">Crear cuenta</a>
  `;
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "login.html";
}