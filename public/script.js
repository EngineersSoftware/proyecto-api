const form = document.getElementById('itemForm');
const input = document.getElementById('itemName');
const listContainer = document.getElementById('list');

/**
 * Función para cargar los datos desde nuestra API
 */
// 1. Modifica la función loadItems para añadir el botón de borrar
async function loadItems() {
  try {
    const res = await fetch(`/api/items?t=${Date.now()}`);
    const items = await res.json();

    // Dentro de loadItems()
    listContainer.innerHTML = items.map(i => 
    `
    <div class="item">
        <div>
            <strong>${i.name}</strong><br>
            <small>ID: ${i.id}</small>
        </div>
        <div>
            <button class="btn-edit" onclick="editItem(${i.id}, '${i.name}')">Editar</button>
            <button class="btn-delete" onclick="deleteItem(${i.id})">Eliminar</button>
        </div>
    </div>
    `).join('');
  } catch (error) {
    console.error("Error:", error);
  }
}

// 2. Crea la nueva función deleteItem
async function deleteItem(id) {
  if (!confirm("¿Seguro que quieres eliminar este item?")) return;

  try {
    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      await loadItems(); // Recargamos la lista para ver el cambio
    } else {
      alert("No se pudo eliminar en el servidor");
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
}

/**
 * Función para agregar un nuevo elemento
 */
async function addItem(event) {
  event.preventDefault(); // Evita que la página se recargue

  const name = input.value.trim();
  if (!name) return alert("¡Escribe algo primero!");

  try {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      input.value = ""; // Limpiar input
      await loadItems(); // Recargar la lista
    }
  } catch (error) {
    console.error("Error al guardar:", error);
  }
}

// 3. Crea la función editItem
async function editItem(id, oldName) {
    const newName = prompt("Edita el nombre:", oldName);
    
    if (!newName || newName === oldName) return;

    try {
        const res = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });

        if (res.ok) {
            await loadItems();
        }
    } catch (error) {
        console.error('Error al editar:', error);
    }
}

// Escuchar el evento submit del formulario
form.addEventListener("submit", addItem);

// Cargar datos al iniciar la página
loadItems();
