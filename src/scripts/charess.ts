export const gameState = {
  franchise: "touhou",
  maxTime: "60",
  maxHints: 5,
  allowedOrigins: [] as string[]
};

const franchiseSelect = document.getElementById("franchise") as HTMLSelectElement;

franchiseSelect?.addEventListener("change", (event) => {
  gameState.franchise = (event.target as HTMLSelectElement).value;
  console.log("current franchise: ", gameState.franchise);
});

const maxTimeSelect = document.getElementById("maxTime") as HTMLSelectElement;

maxTimeSelect?.addEventListener("change", (event) => {
  gameState.maxTime = (event.target as HTMLSelectElement).value;
  console.log("current max time: ", gameState.maxTime);
});

const maxHintsInput = document.getElementById("maxHints") as HTMLInputElement;
const hintBreakdown = document.getElementById("hintBreakdown");

function updateHintDisplay() {
  if (!hintBreakdown || !maxHintsInput) return;
  
  const total = parseInt(maxHintsInput.value);
  let good = 0, better = 0, best = 0;

  switch (total) {
    case 1: good = 1; break;
    case 2: good = 2; break;
    case 3: good = 2; better = 1; break;
    case 4: good = 2; better = 2; break;
    case 5: good = 2; better = 2; best = 1; break;
    case 6: good = 3; better = 2; best = 1; break;
    case 7: good = 3; better = 2; best = 2; break;
    case 8: good = 3; better = 3; best = 2; break;
    default: good = total; // Fallback
  }

  // Helper to filter out zero values for a cleaner display
  const parts = [];
  if (good > 0) parts.push(`${good} good hints`);
  if (better > 0) parts.push(`${better} better hints`);
  if (best > 0) parts.push(`${best} best hints`);

  if (hintBreakdown) {
    hintBreakdown.innerText = parts.join("\n")
  }
}

maxHintsInput?.addEventListener("input", (e) => {
  gameState.maxHints = parseInt((e.target as HTMLInputElement).value);
  updateHintDisplay();
});

updateHintDisplay();