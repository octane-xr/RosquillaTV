async function loadEpisodes() {
    const response = await fetch(chrome.runtime.getURL("all_seasons.json"));
    const data = await response.json();
    return data.temporadas;
  }
  
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
  
  document.getElementById("playRandom").addEventListener("click", async () => {
    const temporadas = await loadEpisodes();
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
      document.getElementById("status").textContent = "⚠️ No hay episodios disponibles.";
      return;
    }
  
    const randomEp = pool[Math.floor(Math.random() * pool.length)];
    const url = `https://www.disneyplus.com/es-419/play/${randomEp.id}`;
    document.getElementById("status").textContent = `🎬 Reproduciendo: ${randomEp.titulo}`;
  
    chrome.tabs.create({ url });
  });
  