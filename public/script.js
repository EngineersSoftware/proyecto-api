const form = document.getElementById('itemForm');
const listContainer = document.getElementById('list');
const input = document.getElementById('itemName');

/**
 * Función para cargar los datos desde nuestra API
 */
async function loadItems() {
    try {
        const res = await fetch('/api/items');
        if (!res.ok) throw new Error('Error al obtener datos');
        
        const items = await res.json();
        
        // Renderizar los elementos en el HTML
        listContainer.innerHTML = items.map(i => `
            <div class="item">
                <span>${i.name}</span>
                <small>ID: ${i.id}</small>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error en el frontend:', error);
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
        const res = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (res.ok) {
            input.value = ''; // Limpiar input
            loadItems();      // Recargar la lista
        }
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}

// Escuchar el evento submit del formulario
form.addEventListener('submit', addItem);

// Cargar datos al iniciar la página
loadItems();