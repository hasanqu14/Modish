const designers = [
  {
    id: 1,
    name: "Epic Designs",
    stars: 3.5,
    projects: 57,
    years: 8,
    price: "$$",
    phones: ["+91 - 984532853", "+91 - 984532854"]
  },
  {
    id: 2,
    name: "Studio - D3",
    stars: 4.5,
    projects: 43,
    years: 6,
    price: "$$$",
    phones: ["+91 - 984532853", "+91 - 984532854"]
  }
];

const shortlistedIds = new Set();

function renderStars(stars) {
  const full = Math.floor(stars);
  const half = stars % 1 >= 0.5 ? "⭑" : "";
  return "★".repeat(full) + half + "☆".repeat(5 - full - (half ? 1 : 0));
}

function render(showShortlistedOnly = false) {
  const container = document.getElementById("designers");
  container.innerHTML = "";

  const list = showShortlistedOnly
    ? designers.filter(d => shortlistedIds.has(d.id))
    : designers;

  list.forEach((d) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-content">
        <h3>${d.name}</h3>
        <div class="stars">${renderStars(d.stars)}</div>
        <p>Passionate team of 4 designers working out of Bangalore with an experience of ${d.years} years.</p>
        <div class="stats">
          <div class="stat">${d.projects}<br><small>Projects</small></div>
          <div class="stat">${d.years}<br><small>Years</small></div>
          <div class="stat">${d.price}<br><small>Price</small></div>
        </div>
        <div class="phones">
          ${d.phones.map(p => `<div>${p}</div>`).join('')}
        </div>
      </div>
      <div class="card-actions">
        <button class="details-btn">➡️<br>Details</button>
        <button class="hide-btn">🙈<br>Hide</button>
        <button class="shortlist-btn">${shortlistedIds.has(d.id) ? "✅" : "🔖"}<br>Shortlist</button>
        <button class="call-btn">📞<br>Call</button>
        <button class="report-btn">❗<br>Report</button>
      </div>
    `;
    container.appendChild(card);

    card.querySelector(".details-btn").onclick = () => {
      alert(`Details for ${d.name}:\nProjects: ${d.projects}\nYears: ${d.years}\nPrice: ${d.price}`);
    };

    card.querySelector(".hide-btn").onclick = () => {
      card.style.display = "none";
    };

    card.querySelector(".shortlist-btn").onclick = (e) => {
      const btn = e.currentTarget;
      if (shortlistedIds.has(d.id)) {
        shortlistedIds.delete(d.id);
        btn.innerHTML = "🔖<br>Shortlist";
      } else {
        shortlistedIds.add(d.id);
        btn.innerHTML = "✅<br>Shortlist";
      }
    };

    card.querySelector(".call-btn").onclick = () => {
      window.location.href = `tel:${d.phones[0].replace(/[^+\d]/g, "")}`;
    };

    card.querySelector(".report-btn").onclick = () => {
      alert(`Reported ${d.name}. Thank you for your feedback!`);
    };
  });
}

// SINGLE DOMContentLoaded block to avoid duplication
document.addEventListener("DOMContentLoaded", () => {
  const mapTab = document.getElementById("map-tab");
  const sortTab = document.getElementById("sort-tab");
  const shortlistTab = document.getElementById("shortlist-tab");

  mapTab.addEventListener("click", () => {
    const address = encodeURIComponent("#151, 5th Main Rd, Rajiv Gandhi Nagar, 7th Sector, HSR Layout, Bengaluru, Karnataka 560102");
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, "_blank");
  });

  sortTab.addEventListener("click", () => {
    designers.sort((a, b) => b.stars - a.stars);
    render();
  });

  shortlistTab.addEventListener("click", () => {
    render(true); // Only shortlisted
  });

  render();
});
document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.currentTarget.parentElement.classList.add('active');
  });
});
