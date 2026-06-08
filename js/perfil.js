// Verificar que hay sesión activa
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {
  window.location.href = "login.html";
}

// Cargar datos del perfil
document.getElementById("nombre").value = usuarioActivo.nombre;
document.getElementById("usuario").value = usuarioActivo.usuario;
document.getElementById("correo").value = usuarioActivo.correo;
document.getElementById("fecha").value = usuarioActivo.fechaNacimiento;
document.getElementById("direccion").value = usuarioActivo.direccion || "";

function guardarPerfil() {
  // Limpiar errores
  document.getElementById("error-nombre").textContent = "";
  document.getElementById("error-usuario").textContent = "";
  document.getElementById("error-password").textContent = "";
  document.getElementById("error-password2").textContent = "";
  document.getElementById("error-fecha").textContent = "";
  document.getElementById("mensaje-perfil").style.display = "none";

  const nombre = document.getElementById("nombre").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const password2 = document.getElementById("password2").value.trim();
  const fecha = document.getElementById("fecha").value;
  const direccion = document.getElementById("direccion").value.trim();

  let valido = true;

  // Validar nombre
  if (nombre === "") {
    document.getElementById("error-nombre").textContent = "El nombre es obligatorio";
    valido = false;
  }

  // Validar usuario
  if (usuario === "") {
    document.getElementById("error-usuario").textContent = "El nombre de usuario es obligatorio";
    valido = false;
  }

  // Validar contraseña solo si se ingresó algo
  const regexMayuscula = /[A-Z]/;
  const regexNumero = /[0-9]/;
  if (password !== "") {
    if (password.length < 6 || password.length > 18) {
      document.getElementById("error-password").textContent = "La contraseña debe tener entre 6 y 18 caracteres";
      valido = false;
    } else if (!regexMayuscula.test(password)) {
      document.getElementById("error-password").textContent = "La contraseña debe tener al menos una letra mayúscula";
      valido = false;
    } else if (!regexNumero.test(password)) {
      document.getElementById("error-password").textContent = "La contraseña debe tener al menos un número";
      valido = false;
    } else if (password !== password2) {
      document.getElementById("error-password2").textContent = "Las contraseñas no coinciden";
      valido = false;
    }
  }

  // Validar fecha
  if (fecha === "") {
    document.getElementById("error-fecha").textContent = "La fecha de nacimiento es obligatoria";
    valido = false;
  }

  if (!valido) return;

  // Actualizar datos en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex(u => u.correo === usuarioActivo.correo);

  if (index !== -1) {
    usuarios[index].nombre = nombre;
    usuarios[index].usuario = usuario;
    usuarios[index].fechaNacimiento = fecha;
    usuarios[index].direccion = direccion;
    if (password !== "") {
      usuarios[index].password = password;
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Actualizar sesión activa
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));
  }

  // Mostrar mensaje de éxito
  const mensaje = document.getElementById("mensaje-perfil");
  mensaje.textContent = "¡Perfil actualizado exitosamente!";
  mensaje.style.display = "block";
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "login.html";
}