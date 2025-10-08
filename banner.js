(async function () {
    const SHOW_ID = "entity-cac75c8f-a9e2-4d95-ac73-1cf1cc7b9568";
  
    async function getEpisodes() {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "getEpisodes" }, (res) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
            return;
          }
          if (res?.ok) resolve(res.data.temporadas);
          else reject(res?.error || "Error desconocido al obtener JSON");
        });
      });
    }
  
    async function injectBanner() {
      if (document.querySelector("#show-random-banner")) return;

  
      let temporadas;
      try {
        temporadas = await getEpisodes();
      } catch (e) {
        console.error("No se pudo cargar el JSON:", e);
        return;
      }
  
      // Banner principal
      const banner = document.createElement("div");
      banner.id = "show-random-banner";
      banner.textContent = "🎲 Episodio aleatorio";
      Object.assign(banner.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#ffd90f",
        color: "#000",
        fontWeight: "900",
        fontFamily: "Arial, sans-serif",
        fontSize: "20px",
        padding: "16px 28px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
        zIndex: "999999",
        cursor: "pointer",
        letterSpacing: "0.5px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      });
      
      // efecto hover
      banner.addEventListener("mouseenter", () => {
        banner.style.transform = "scale(1.08)";
        banner.style.boxShadow = "0 6px 16px rgba(0,0,0,0.4)";
      });
      banner.addEventListener("mouseleave", () => {
        banner.style.transform = "scale(1)";
        banner.style.boxShadow = "0 4px 12px rgba(0,0,0,0.35)";
      });
      
  
      // Panel oculto
      const panel = document.createElement("div");
      panel.id = "show-random-panel";
      Object.assign(panel.style, {
        display: "none",
        position: "fixed",
        bottom: "70px",
        right: "20px",
        backgroundColor: "#fffbe6",
        border: "2px solid #ffd90f",
        borderRadius: "8px",
        padding: "12px",
        width: "260px",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: "999999"
      });
  
      panel.innerHTML = `
        <label><input type="radio" name="mode" value="all" checked> Todas las temporadas</label><br>
        <label><input type="radio" name="mode" value="range"> Rango de temporadas:</label>
        <input type="number" id="fromSeason" min="1" placeholder="De" style="width:50px"> -
        <input type="number" id="toSeason" min="1" placeholder="A" style="width:50px"><br>
        <label><input type="radio" name="mode" value="multiple"> Seleccion de temporadas:</label>
        <input type="text" id="multipleSeasons" placeholder="Ej: 1,4,6,10" style="width:160px"><br>
        <button id="playRandom" style="margin-top:8px;width:100%;padding:6px;background:#ffd90f;border:none;font-weight:bold;cursor:pointer;">▶ Reproducir</button>
      `;
  
      document.body.appendChild(banner);
      document.body.appendChild(panel);
  
      banner.addEventListener("click", () => {
        panel.style.display = panel.style.display === "none" ? "block" : "none";
      });
  
      document.addEventListener("click", (e) => {
        if (!panel.contains(e.target) && e.target !== banner) {
          panel.style.display = "none";
        }
      });
  
      function getSelectedSeasons() {
        const mode = document.querySelector('input[name="mode"]:checked').value;
        if (mode === "all") return "all";
        if (mode === "single") return [parseInt(document.getElementById("singleSeason").value)];
        if (mode === "range") {
          const from = parseInt(document.getElementById("fromSeason").value);
          const to = parseInt(document.getElementById("toSeason").value);
          return Array.from({ length: to - from + 1 }, (_, i) => from + i);
        }
        if (mode === "multiple") {
          return document.getElementById("multipleSeasons").value
            .split(",")
            .map(n => parseInt(n.trim()))
            .filter(n => !isNaN(n));
        }
      }
  
      panel.querySelector("#playRandom").addEventListener("click", () => {
        const selection = getSelectedSeasons();
        let pool = [];
  
        if (selection === "all") {
          pool = temporadas.flatMap(t => t.episodios);
        } else {
          pool = temporadas
            .filter(t => selection.includes(t.numero))
            .flatMap(t => t.episodios);
        }
  
        if (pool.length === 0) {
          alert("⚠️ No hay episodios disponibles para esas temporadas.");
          return;
        }
  
        const randomEp = pool[Math.floor(Math.random() * pool.length)];
        const url = `https://www.disneyplus.com/es-419/play/${randomEp.id}`;
        window.open(url, "_blank");
      });
    }
  
    let lastURL = location.href;
    const observer = new MutationObserver(() => {
      if (location.href !== lastURL) {
        lastURL = location.href;
        if (location.href.includes(SHOW_ID)) {
          injectBanner();
        } else {
          document.querySelector("#show-random-banner")?.remove();
          document.querySelector("#show-random-panel")?.remove();
        }
      }
    });
    observer.observe(document, { subtree: true, childList: true });
  
    if (location.href.includes(SHOW_ID)) {
      injectBanner();
    }
  })();
  