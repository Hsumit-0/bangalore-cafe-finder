// Curated cafes (Bangalore)
const cafes = [
  {
    name: "Third Wave Coffee",
    price: 700,
    timing: "8:00–23:00",
    location: "Indiranagar, Bangalore",
    lat: 12.9719, lon: 77.6412,
    mustTry: ["Cold Brew", "Almond Croissant"],
    rating: 4.3,
    ambience: "modern",
    vegFriendly: true
  },
  {
    name: "Dyu Art Cafe",
    price: 850,
    timing: "10:00–22:30",
    location: "Koramangala, Bangalore",
    lat: 12.9352, lon: 77.6245,
    mustTry: ["Banoffee Pie", "Filter Coffee"],
    rating: 4.6,
    ambience: "artsy",
    vegFriendly: true
  },
  {
    name: "Matteo Coffea",
    price: 600,
    timing: "9:00–23:00",
    location: "Church Street, Bangalore",
    lat: 12.9752, lon: 77.6043,
    mustTry: ["Cappuccino", "Cheesecake"],
    rating: 4.2,
    ambience: "cozy",
    vegFriendly: false
  },
  {
    name: "Green Theory",
    price: 1500,
    timing: "11:00–23:00",
    location: "Ashok Nagar, Bangalore",
    lat: 12.9934, lon: 77.5946,
    mustTry: ["Burmese Khao Suey", "Pasta Primavera"],
    rating: 4.5,
    ambience: "outdoor",
    vegFriendly: true
  },
  {
    name: "Cafe Noir",
    price: 2000,
    timing: "8:00–23:00",
    location: "UB City Mall, Bangalore",
    lat: 12.9716, lon: 77.5963,
    mustTry: ["French Crepes", "Hot Chocolate"],
    rating: 4.4,
    ambience: "modern",
    vegFriendly: false
  },
  {
    name: "Art Blend Cafe",
    price: 500,
    timing: "9:00–21:00",
    location: "HSR Layout, Bangalore",
    lat: 12.9121, lon: 77.6446,
    mustTry: ["Pasta", "Hot Chocolate"],
    rating: 4.1,
    ambience: "artsy",
    vegFriendly: true
  }
];

// Initialize map
const map = L.map('map').setView([12.9716, 77.5946], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markers = [];
function clearMarkers(){
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

// Render cafes
function renderList(){
  clearMarkers();
  const listEl = document.getElementById('list');
  listEl.innerHTML = "";

  const priceF = document.getElementById('priceFilter').value;
  const ambF = document.getElementById('ambienceFilter').value;
  const vegOnly = document.getElementById('vegOnly').checked;

  const filtered = cafes.filter(c => {
    if (priceF === 'low' && c.price > 500) return false;
    if (priceF === 'mid' && (c.price <= 500 || c.price > 1200)) return false;
    if (priceF === 'high' && c.price <= 1200) return false;
    if (ambF !== 'all' && c.ambience !== ambF) return false;
    if (vegOnly && !c.vegFriendly) return false;
    return true;
  });

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cafe-card';
    card.innerHTML = `
      <div class="card-top"><span>${c.name}</span><span>₹${c.price}</span></div>
      <div>📍 ${c.location}</div>
      <div>⏰ ${c.timing}</div>
      <div class="tags">
        <span>${c.ambience}</span>
        ${c.vegFriendly ? "<span>Veg-Friendly</span>" : ""}
      </div>
      <div><em>Must-Try:</em> ${c.mustTry.join(", ")}</div>
      <div class="rating">${"★".repeat(Math.floor(c.rating))} (${c.rating})</div>
    `;
    card.onclick = () => {
      map.setView([c.lat, c.lon], 16);
      marker.openPopup();
    };
    listEl.appendChild(card);

    const marker = L.marker([c.lat, c.lon]).addTo(map)
      .bindPopup(`<b>${c.name}</b><br>₹${c.price}<br>⏰ ${c.timing}<br><em>Must-Try:</em> ${c.mustTry.join(", ")}<br>⭐ ${c.rating}`);
    markers.push(marker);
  });
}

// Filters
document.getElementById('priceFilter').onchange = renderList;
document.getElementById('ambienceFilter').onchange = renderList;
document.getElementById('vegOnly').onchange = renderList;
document.getElementById('showAll').onclick = renderList;

// Initial render
renderList();
