// Usuarios simulados por defecto
const usuariosPorDefecto = [
  {
    nombre: "Administrador",
    usuario: "admin",
    correo: "admin@tabletop.cl",
    password: "Admin123",
    rol: "admin",
    fechaNacimiento: "1990-01-01",
    direccion: "Calle Admin 123"
  },
  {
    nombre: "Cliente Demo",
    usuario: "cliente",
    correo: "cliente@tabletop.cl",
    password: "Cliente123",
    rol: "cliente",
    fechaNacimiento: "2000-05-15",
    direccion: "Calle Cliente 456"
  }
];

// Cargar usuarios por defecto si no existen
if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(usuariosPorDefecto));
}

function iniciarSesion() {
  // Limpiar errores
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-password").textContent = "";
  document.getElementById("error-login").textContent = "";

  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  let valido = true;

  // Validar campos vacíos
  if (correo === "") {
    document.getElementById("error-correo").textContent = "El correo es obligatorio";
    valido = false;
  }

  if (password === "") {
    document.getElementById("error-password").textContent = "La contraseña es obligatoria";
    valido = false;
  }

  if (!valido) return;

  // Buscar usuario en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);

  if (!usuario) {
    document.getElementById("error-login").textContent = "Correo o contraseña incorrectos";
    return;
  }

  // Guardar sesión activa
  sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  sessionStorage.setItem("rolActivo", usuario.rol);

  // Redirigir según rol
  if (usuario.rol === "admin") {
    window.location.href = "pages/admin.html";
  } else {
    window.location.href = "index.html";
  }
}

function limpiarLogin() {
  document.getElementById("correo").value = "";
  document.getElementById("password").value = "";
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-password").textContent = "";
  document.getElementById("error-login").textContent = "";
}