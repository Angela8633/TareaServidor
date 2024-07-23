document.getElementById('formularioContacto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    const response = await fetch('/contactos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, telefono })
    });

    if (response.ok) {
      document.getElementById('nombre').value = '';
      document.getElementById('telefono').value = '';
      cargarContactos();
    } else {
      alert('Error al agregar el contacto');
    }
  });

  async function cargarContactos() {
    const response = await fetch('/contactos');
    const contactos = await response.json();

    const tbody = document.querySelector('#tablaContactos tbody');
    tbody.innerHTML = '';

    contactos.forEach(contacto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${contacto.nombre}</td>
        <td>${contacto.telefono}</td>
      `;
      tbody.appendChild(row);
    });
  }


  window.onload = cargarContactos;