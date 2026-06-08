function validarFormulario() {
  let valido = true;
  limpiarErrores();

  const nombre = document.getElementById('nombre').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const password = document.getElementById('password').value.trim();
  const password2 = document.getElementById('password2').value.trim();
  const fecha = document.getElementById('fecha').value;

  // Validar nombre
  if (nombre === '') {
    mostrarError('error-nombre', 'El nombre completo es obligatorio');
    valido = false;
  }

  // Validar usuario
  if (usuario === '') {
    mostrarError('error-usuario', 'El nombre de usuario es obligatorio');
    valido = false;
  }

  // Validar correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo === '') {
    mostrarError('error-correo', 'El correo electrónico es obligatorio');
    valido = false;
  } else if (!regexCorreo.test(correo)) {
    mostrarError('error-correo', 'El correo no tiene un formato válido');
    valido = false;
  }

  // Validar contraseña
  const regexMayuscula = /[A-Z]/;
  const regexNumero = /[0-9]/;
  if (password === '') {
    mostrarError('error-password', 'La contraseña es obligatoria');
    valido = false;
  } else if (password.length < 6 || password.length > 18) {
    mostrarError('error-password', 'La contraseña debe tener entre 6 y 18 caracteres');
    valido = false;
  } else if (!regexMayuscula.test(password)) {
    mostrarError('error-password', 'La contraseña debe tener al menos una letra mayúscula');
    valido = false;
  } else if (!regexNumero.test(password)) {
    mostrarError('error-password', 'La contraseña debe tener al menos un número');
    valido = false;
  }

  // Validar repetir contraseña
  if (password2 === '') {
    mostrarError('error-password2', 'Debes repetir la contraseña');
    valido = false;
  } else if (password !== password2) {
    mostrarError('error-password2', 'Las contraseñas no coinciden');
    valido = false;
  }

  // Validar fecha de nacimiento
  if (fecha === '') {
    mostrarError('error-fecha', 'La fecha de nacimiento es obligatoria');
    valido = false;
  } else {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    if (edad < 13) {
      mostrarError('error-fecha', 'Debes tener al menos 13 años para registrarte');
      valido = false;
    }
  }

  if (!valido) return;

  // Verificar si el correo ya existe
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe = usuarios.find(u => u.correo === correo);
  if (existe) {
    mostrarError('error-correo', 'Ya existe una cuenta con ese correo');
    return;
  }

  // Guardar nuevo usuario
  const nuevoUsuario = {
    nombre: nombre,
    usuario: usuario,
    correo: correo,
    password: password,
    rol: "cliente",
    fechaNacimiento: fecha,
    direccion: document.getElementById('direccion').value.trim()
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Mostrar mensaje de éxito
  const exito = document.getElementById('mensaje-exito');
  exito.textContent = '¡Registro exitoso! Redirigiendo al login...';
  exito.style.display = 'block';

  setTimeout(() => {
    window.location.href = '../login.html';
  }, 2000);
}

function mostrarError(id, mensaje) {
  const elemento = document.getElementById(id);
  elemento.textContent = mensaje;
}

function limpiarErrores() {
  const errores = document.querySelectorAll('small.text-danger');
  errores.forEach(e => e.textContent = '');
  const exito = document.getElementById('mensaje-exito');
  exito.textContent = '';
  exito.style.display = 'none';
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('usuario').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password2').value = '';
  document.getElementById('fecha').value = '';
  document.getElementById('direccion').value = '';
  limpiarErrores();
}