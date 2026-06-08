// Verificar que hay sesión activa y que es admin
const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {
  window.location.href = "../login.html";
}

if (usuarioActivo.rol !== "admin") {
  window.location.href = "../index.html";
}

// Mostrar nombre del admin
document.getElementById("nombreAdmin").textContent = usuarioActivo.nombre;

// Cargar usuarios
function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const tbody = document.getElementById("tablaUsuarios");
  const totalUsuarios = document.getElementById("totalUsuarios");

  totalUsuarios.textContent = usuarios.length + " usuarios registrados";

  tbody.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.usuario}</td>
      <td>${usuario.correo}</td>
      <td>
        <span class="badge ${usuario.rol === 'admin' ? 'descuento' : 'sin-descuento'}">
          ${usuario.rol === 'admin' ? '👑 Admin' : '👤 Cliente'}
        </span>
      </td>
      <td>
        <button onclick="eliminarUsuario(${index})" 
          class="btn btn-sm btn-danger"
          ${usuario.rol === 'admin' ? 'disabled' : ''}>
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Eliminar usuario
function eliminarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios[index].rol === "admin") {
    alert("No puedes eliminar al administrador");
    return;
  }

  if (confirm("¿Estás seguro de eliminar este usuario?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cargarUsuarios();
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "../login.html";
}

// Iniciar
cargarUsuarios();