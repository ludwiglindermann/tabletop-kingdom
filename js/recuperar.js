function recuperarPassword() {
  // Limpiar errores
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-password").textContent = "";
  document.getElementById("error-confirmar").textContent = "";
  document.getElementById("mensaje-recuperar").textContent = "";
  document.getElementById("mensaje-recuperar").style.display = "none";

  const correo = document.getElementById("correo").value.trim();
  const nuevaPassword = document.getElementById("nuevaPassword").value.trim();
  const confirmarPassword = document.getElementById("confirmarPassword").value.trim();

  let valido = true;

  // Validar correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo === "") {
    document.getElementById("error-correo").textContent = "El correo es obligatorio";
    valido = false;
  } else if (!regexCorreo.test(correo)) {
    document.getElementById("error-correo").textContent = "El correo no tiene un formato válido";
    valido = false;
  }

  // Validar nueva contraseña
  const regexMayuscula = /[A-Z]/;
  const regexNumero = /[0-9]/;
  if (nuevaPassword === "") {
    document.getElementById("error-password").textContent = "La contraseña es obligatoria";
    valido = false;
  } else if (nuevaPassword.length < 6 || nuevaPassword.length > 18) {
    document.getElementById("error-password").textContent = "La contraseña debe tener entre 6 y 18 caracteres";
    valido = false;
  } else if (!regexMayuscula.test(nuevaPassword)) {
    document.getElementById("error-password").textContent = "La contraseña debe tener al menos una letra mayúscula";
    valido = false;
  } else if (!regexNumero.test(nuevaPassword)) {
    document.getElementById("error-password").textContent = "La contraseña debe tener al menos un número";
    valido = false;
  }

  // Validar confirmación
  if (confirmarPassword === "") {
    document.getElementById("error-confirmar").textContent = "Debes confirmar la contraseña";
    valido = false;
  } else if (nuevaPassword !== confirmarPassword) {
    document.getElementById("error-confirmar").textContent = "Las contraseñas no coinciden";
    valido = false;
  }

  if (!valido) return;

  // Buscar usuario en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex(u => u.correo === correo);

  if (index === -1) {
    document.getElementById("error-correo").textContent = "No existe una cuenta con ese correo";
    return;
  }

  // Actualizar contraseña
  usuarios[index].password = nuevaPassword;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Mostrar mensaje de éxito
  const mensaje = document.getElementById("mensaje-recuperar");
  mensaje.textContent = "¡Contraseña actualizada exitosamente! Ya puedes iniciar sesión.";
  mensaje.style.display = "block";

  // Limpiar campos
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
}

function limpiarRecuperar() {
  document.getElementById("correo").value = "";
  document.getElementById("nuevaPassword").value = "";
  document.getElementById("confirmarPassword").value = "";
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-password").textContent = "";
  document.getElementById("error-confirmar").textContent = "";
  document.getElementById("mensaje-recuperar").textContent = "";
  document.getElementById("mensaje-recuperar").style.display = "none";
}