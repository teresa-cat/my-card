const abilityButton = document.querySelector(".ability-button");
const buttonLabel = document.querySelector(".button-label");
const activationMessage = document.querySelector(".activation-message");
const battle = document.querySelector(".battle");
const battleButton = document.querySelector(".battle-button");
const playerScoreDisplay = document.querySelector("#player-score");
const opponentScoreDisplay = document.querySelector("#opponent-score");
const battleResult = document.querySelector(".battle-result");

abilityButton.addEventListener("click", () => {
  const isActive = abilityButton.getAttribute("aria-pressed") === "true";

  abilityButton.setAttribute("aria-pressed", String(!isActive));
  buttonLabel.textContent = isActive ? "Activate ability" : "Ability activated!";
  activationMessage.textContent = isActive
    ? ""
    : "Just Keep Swimming is activated. Snack break recommended!";
});

// Return a random whole number from 1 up to the given maximum.
function rollScore(maximum) {
  return Math.floor(Math.random() * maximum) + 1;
}

battleButton.addEventListener("click", () => {
  // Read each stat's maximum directly from the card.
  const statMaximums = [...document.querySelectorAll(".stat-track")].map((stat) =>
    Number(stat.getAttribute("aria-valuenow"))
  );

  // Roll once for every card stat and add the results together.
  const playerTotal = statMaximums.reduce(
    (total, maximum) => total + rollScore(maximum),
    0
  );

  // Give the opponent three random stats from 1 to 100 as well.
  const opponentTotal = Array.from({ length: statMaximums.length }, () =>
    rollScore(100)
  ).reduce((total, score) => total + score, 0);

  battleButton.disabled = true;
  battle.classList.add("is-rolling");
  playerScoreDisplay.textContent = "…";
  opponentScoreDisplay.textContent = "…";
  battleResult.textContent = "Rolling the scores…";

  // Wait briefly so the dice animation plays before showing the result.
  window.setTimeout(() => {
    playerScoreDisplay.textContent = playerTotal;
    opponentScoreDisplay.textContent = opponentTotal;
    battle.classList.remove("is-rolling");
    battleButton.disabled = false;

    if (playerTotal > opponentTotal) {
      battleResult.textContent = "You win!";
    } else if (playerTotal < opponentTotal) {
      battleResult.textContent = "You lose!";
    } else {
      battleResult.textContent = "It's a tie!";
    }
  }, 750);
});
