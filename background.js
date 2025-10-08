chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getEpisodes") {
    const url = chrome.runtime.getURL("all_seasons.json");
    fetch(url)
      .then(res => res.json())
      .then(data => sendResponse({ ok: true, data }))
      .catch(err => {
        sendResponse({ ok: false, error: err.toString() });
      });
    return true; 
  }
});
