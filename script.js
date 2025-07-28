const itemsData = [
  { id: "book1", type: "bookshelf", emoji: "📚" },
  { id: "book2", type: "bookshelf", emoji: "📖" },
  { id: "book3", type: "bookshelf", emoji: "📙" },
  { id: "toy1", type: "toyShelf", emoji: "🧸" },
  { id: "toy2", type: "toyShelf", emoji: "🎲" },
  { id: "toy3", type: "toyShelf", emoji: "🚂" },
  { id: "kitchen1", type: "kitchenShelf", emoji: "🍳" },
  { id: "kitchen2", type: "kitchenShelf", emoji: "🍴" },
  { id: "kitchen3", type: "kitchenShelf", emoji: "🥣" },
  { id: "bath1", type: "bathShelf", emoji: "🛁" },
  { id: "bath2", type: "bathShelf", emoji: "🧴" },
  { id: "bath3", type: "bathShelf", emoji: "🧽" },
  { id: "art1", type: "artShelf", emoji: "🎨" },
  { id: "art2", type: "artShelf", emoji: "🖌️" },
  { id: "art3", type: "artShelf", emoji: "🖼️" },
  { id: "tech1", type: "techShelf", emoji: "💻" },
  { id: "tech2", type: "techShelf", emoji: "📱" },
  { id: "tech3", type: "techShelf", emoji: "⌨️" },
];

// Raf tipleri ve isimleri
const shelvesData = [
  { id: "bookshelf", label: "Bookshelf" },
  { id: "toyShelf", label: "Toy Shelf" },
  { id: "kitchenShelf", label: "Kitchen Shelf" },
  { id: "bathShelf", label: "Bath Shelf" },
  { id: "artShelf", label: "Art Shelf" },
  { id: "techShelf", label: "Technology Shelf" },
];

const itemsContainer = document.getElementById("items");
const shelvesContainer = document.getElementById("shelves");

// Oluşturma fonksiyonları
function createItemElement(item) {
  const div = document.createElement("div");
  div.classList.add("item");
  div.textContent = item.emoji;
  div.setAttribute("draggable", "true");
  div.id = item.id;

  div.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.id);
  });

  return div;
}

function createShelfElement(shelf) {
  const div = document.createElement("div");
  div.classList.add("shelf");
  div.id = shelf.id;

  // Emoji span
  const emojiSpan = document.createElement("span");
  emojiSpan.classList.add("shelf-emoji");

  // Raf türüne göre emoji atama
  const shelfEmojis = {
    bookshelf: "📚",
    toyShelf: "🧸",
    kitchenShelf: "🍳",
    bathShelf: "🛁",
    artShelf: "🎨",
    techShelf: "💻",
  };
  emojiSpan.textContent = shelfEmojis[shelf.id] || "📦";

  // Raf adı span
  const labelSpan = document.createElement("span");
  labelSpan.classList.add("shelf-label");
  labelSpan.textContent = shelf.label;

  // Stil için div içine ekle
  div.appendChild(emojiSpan);
  div.appendChild(labelSpan);

  div.addEventListener("dragover", (e) => {
    e.preventDefault();
    div.classList.add("drag-over");
  });

  div.addEventListener("dragleave", () => {
    div.classList.remove("drag-over");
  });

  div.addEventListener("drop", (e) => {
    e.preventDefault();
    div.classList.remove("drag-over");
    const itemId = e.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(itemId);

    if (!draggedItem) return;

    // Doğru raf kontrolü
    const itemType = itemsData.find(i => i.id === itemId)?.type;
    if (itemType === shelf.id) {
      div.appendChild(draggedItem);
      draggedItem.style.cursor = "default";
      draggedItem.setAttribute("draggable", "false");
    } else {
      alert("Wrong shelf! Please drop the item on the correct shelf.");
    }
  });

  return div;
}

// Sayfa yüklendiğinde içerik oluştur
function init() {
  itemsData.forEach(item => {
    const el = createItemElement(item);
    itemsContainer.appendChild(el);
  });

  shelvesData.forEach(shelf => {
    const el = createShelfElement(shelf);
    shelvesContainer.appendChild(el);
  });
}

window.addEventListener("DOMContentLoaded", init);
