// Ensure DOM is ready before running
document.addEventListener("DOMContentLoaded", () => {
  // ----- References to sections -----
  const productGrid = document.getElementById("products");
  const outputBox = document.getElementById("output");
  const statsBox = document.getElementById("stats");
  const pidInput = document.getElementById("pid");
  const statsBtn = document.getElementById("statsBtn");

  // Small helper to render errors
  function renderError(container, msg) {
    container.innerHTML = `<p style="color:red;">${msg}</p>`;
  }

  // ------------------------------------------------
  // Fetch ALL products and render as product cards
  // ------------------------------------------------
  async function fetchAll() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const data = await res.json();
      productGrid.innerHTML = "";
      statsBox.innerHTML = "";
      outputBox.innerHTML = "";

      data.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${p.imageUrl}" alt="${p.name}" class="product-img" />
          <h3>${p.name}</h3>
          <p>${p.description || ""}</p>
          <h4>${p.price || ""}</h4>
        `;
        card.onclick = () => fetchProductById(p.id);
        productGrid.appendChild(card);
      });
    } catch (err) {
      renderError(statsBox, "⚠️ Error fetching products: " + err.message);
      console.error("fetchAll error", err);
    }
  }

  // ------------------------------------------------
  // Fetch SINGLE product by ID (manual input or click)
  // ------------------------------------------------
  async function fetchProduct() {
    const id = (pidInput && pidInput.value) ? pidInput.value : 1;
    fetchProductById(id);
  }

  async function fetchProductById(id) {
    try {
      const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const data = await res.json();
      if (data.error) {
        outputBox.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
        return;
      }

      outputBox.innerHTML = `
        <div class="card" style="
            max-width: 400px;
            margin: 20px auto;
            background: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;">
          <img src="${data.imageUrl || ""}" alt="${data.name || ""}"
               style="width:100%; height:220px; object-fit:cover; border-radius:8px;">
          <h3 style="color:#007bff; margin:15px 0 5px;">${data.name || "Unknown"}</h3>
          <p style="font-size:14px; color:#555;">${data.description || ""}</p>
          <h4 style="margin-top:10px; color:#28a745;">${data.price || ""}</h4>
          <p style="font-size:12px; color:#888;">Fetched from: ${data.fetchedFrom || "N/A"}</p>
        </div>
      `;
    } catch (err) {
      renderError(outputBox, "Error: " + err.message);
      console.error("fetchProductById error", err);
    }
  }

  // ------------------------------------------------
  // Fetch SYSTEM STATS (total requests, cache hits, etc.)
  // ------------------------------------------------
  async function fetchStats() {
    try {
      statsBox.innerHTML = `<p>Loading stats...</p>`;
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const data = await res.json();
      console.log("stats JSON:", data);

      // use safe defaults
      const totalRequests = (data && data.totalRequests !== undefined) ? data.totalRequests : 0;
      const cacheHits = (data && data.cacheHits !== undefined) ? data.cacheHits : 0;
      const dbHits = (data && data.dbHits !== undefined) ? data.dbHits : 0;
      const cacheHitRatio = (data && data.cacheHitRatio !== undefined) ? data.cacheHitRatio : "0.00%";
      const serverTime = (data && data.serverTime) ? data.serverTime : new Date().toISOString();

      statsBox.innerHTML = `
        <div style="
            background:white;
            max-width:400px;
            margin:20px auto;
            padding:20px;
            border-radius:10px;
            box-shadow:0 4px 10px rgba(0,0,0,0.1);
            text-align:left;">
          <h3 style="color:#007bff;">System Stats</h3>
          <p><strong>Total Requests:</strong> ${totalRequests}</p>
          <p><strong>Cache Hits:</strong> ${cacheHits}</p>
          <p><strong>DB Hits:</strong> ${dbHits}</p>
          <p><strong>Cache Hit Ratio:</strong> ${cacheHitRatio}</p>
          <p style="font-size:12px; color:#666;"><strong>Server Time:</strong> ${serverTime}</p>
        </div>
      `;
    } catch (err) {
      renderError(statsBox, "Fetch error: " + err.message);
      console.error("fetchStats error", err);
    }
  }

  // ------------------------------------------------
  // Attach button handler (if button exists)
  // ------------------------------------------------
  if (statsBtn) statsBtn.addEventListener("click", fetchStats);

  // Expose functions globally for onclick HTML attributes
  window.fetchAll = fetchAll;
  window.fetchProduct = fetchProduct;
  window.fetchStats = fetchStats;

  // Load products when page opens
  fetchAll();
});
