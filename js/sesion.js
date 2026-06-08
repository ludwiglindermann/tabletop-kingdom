// Verificar sesión activa y mostrar opciones según rol
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));
const menuSesion = document.getElementById("menu-sesion");

if (usuarioActivo) {
  // Usuario con sesión iniciada
  if (usuarioActivo.rol === "admin") {
    menuSesion.innerHTML = `
      <div class="sesion-info">
        <span class="sesion-nombre">👑 ${usuarioActivo.nombre}</span>
      </div>
      <div class="sesion-botones">
        <a href="pages/admin.html" class="btn-registro">Panel Admin</a>
        <a href="perfil.html" class="btn-limpiar">Mi perfil</a>
        <button onclick="cerrarSesion()" class="btn-limpiar">Cerrar sesión</button>
      </div>
    `;
  } else {
    menuSesion.innerHTML = `
      <div class="sesion-info">
        <span class="sesion-nombre">👤 ${usuarioActivo.nombre}</span>
      </div>
      <div class="sesion-botones">
        <a href="perfil.html" class="btn-registro">Mi perfil</a>
        <button onclick="cerrarSesion()" class="btn-limpiar">Cerrar sesión</button>
      </div>
    `;
  }
} else {
  // Sin sesión iniciada
  menuSesion.innerHTML = `
    <div class="sesion-botones">
      <a href="login.html" class="btn-registro">Iniciar sesión</a>
      <a href="pages/registro.html" class="btn-limpiar">Crear cuenta</a>
    </div>
  `;
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "login.html";
}