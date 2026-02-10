async function loadItems() {
    const res = await fetch('/api/items');
    const items = await res.json();
    const container = document.getElementById('list');
    container.innerHTML = intems.map(i => 
        `
        <div class="item">
            <span>${i.name}</span>
            <small>ID: ${i.id}</small>
        </div>
        `
    ).join('');
}

async function addItem(){
    const input = document.getElementById('itemName');
    if (!input.value) return; 
    await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.value })
    });
    input.value = '';
    loadItems();
}
loadItems();