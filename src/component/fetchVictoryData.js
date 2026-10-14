
const API_URL =
  "https://script.google.com/macros/s/AKfycbz7UciPAZXCSdbKjIk8G6ga9xG0-4Of-2vPxwQM8mzVd0C0X-3Aza-e8Ft3FZSTKLj1/exec";

function fetchVictoryData() {
  return new Promise((resolve, reject) => {
    const callbackName =
      "__victoryCallback_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2);

    const script = document.createElement("script");
    let timeoutId;

    const cleanup = () => {
      clearTimeout(timeoutId);
      script.remove();
      delete window[callbackName];
    };

    window[callbackName] = (data) => {
      cleanup();

      if (data?.success === false) {
        reject(new Error(data.error || "API request failed"));
      } else if (Array.isArray(data)) {
        resolve(data);
      } else {
        reject(new Error("Invalid API response"));
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Unable to load Google Apps Script"));
    };

    timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("Request timed out"));
    }, 20000);

    script.src =
      API_URL + "?callback=" + encodeURIComponent(callbackName);

    script.async = true;
    document.body.appendChild(script);
  });
}

export default fetchVictoryData;
