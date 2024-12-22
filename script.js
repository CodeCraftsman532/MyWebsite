let count = 0;
let clickPower = 1;
let autoPower = 0;
let autoDelay = 1000;
let autoClickInterval;

let usedCodes = [];

function upgradeAuto(amount, cost) {
  autoPower += amount;
  updateMoney(-cost)
  updateAutoPowerDisplay();
}

function updateMoney(amount) {
  const countElement = document.getElementById("count");
  if (count + amount < 0) {
    countElement.classList.add("insufficient");
    return false;
  } else {
    count += amount;
    countElement.innerText = count;
    if (count == "1") {
      addCheatCode("1uoenjg85124ngf");
    } else if (count == "9999999") {
      addCheatCode("9a0d8fyhunjo#iasud0!#$%^T!@#$")
    } else if (count == "100000") {
      addCheatCode("asuhbjn%1598yckj")
    }
    updateUpgrades();
    return true;
  }
}

function addCheatCode(code) {
  let listElement = document.getElementById("cheatCodeList")
  let liElement = document.createElement("li");
  liElement.textContent = code;
  listElement.appendChild(liElement);
  displayInfo("Cheat Code Added: " + code)
}

function upgradeAutoDelay(amount, cost) {
  if (updateMoney(-cost)) {
    autoDelay *= amount;
  }
  updateAutoDelayDisplay();
  updateAutoClickInterval();
}

function onClick() {
  updateMoney(clickPower)
}

function upgradeClick(amount, cost) {
  if (updateMoney(-cost)) {
    clickPower += amount;
  }
  updateClickPowerDisplay();
}

function updateAutoDelayDisplay() {
  document.getElementById("auto-delay").innerText = `Auto Click Delay: ${autoDelay}ms`;
}

function updateAutoPowerDisplay() {
  document.getElementById("auto-power").innerText = `Auto Power: ${autoPower}`;
}

function updateClickPowerDisplay() {
  document.getElementById("click-power").innerText = `Click Power: ${clickPower}`;
}

document.getElementById("count").addEventListener("animationend", function () {
  this.classList.remove("insufficient");
});

function toggleShop() {
  const shop = document.getElementById("shop");
  shop.classList.toggle("visible");
}

function toggleSettings() {
  const settings = document.getElementById("settings");
  settings.classList.toggle("visible");
}

function closeShopAndSettings() {
  const shop = document.getElementById("shop");
  shop.classList.remove("visible");
  const settings = document.getElementById("settings");
  settings.classList.remove("visible");
}

function resetGame() {
  count = 0;
  clickPower = 1;
  autoPower = 0;
  autoDelay = 1000;
  usedCodes = [];
  updateMoney(0);
  updateAutoPowerDisplay();
  updateAutoDelayDisplay();
  updateClickPowerDisplay();
  updateUpgrades();
  displayInfo("Game Reset");
  // CLEARS THE CHEAT CODE LIST
  const listElement = document.getElementById("cheatCodeList");
  listElement.innerHTML = "";
  document.getElementById("count").innerText = count;
  updateClickPowerDisplay();
  updateAutoPowerDisplay();
  updateAutoDelayDisplay();
  updateAutoClickInterval();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function updateAutoClickInterval() {
  if (autoClickInterval) {
    clearInterval(autoClickInterval);
  }
  autoClickInterval = setInterval(function () {
    if (autoPower != 0) {
      count += autoPower;
      document.getElementById("count").innerText = count;
      document.getElementById("auto-power").classList.add("active");
      setTimeout(() => {
        document.getElementById("auto-power").classList.remove("active");
      }, 300);
      updateUpgrades();
    }
  }, autoDelay);
}

function updateUpgrades() {
  const upgrades = document.querySelectorAll("#shop .upgrade");
  upgrades.forEach((upgrade) => {
    const cost = parseInt(upgrade.innerText.split("$")[1]);
    if (count >= cost) {
      upgrade.classList.remove("disabled");
    } else {
      upgrade.classList.add("disabled");
    }
  });
}

updateAutoClickInterval();
updateUpgrades();

function codeSubmission() {
  let value = document.getElementById("code").value;
  if (value === "1uoenjg85124ngf" && !usedCodes.includes("1uoenjg85124ngf")) {
    updateMoney(count);
    usedCodes.push("1uoenjg85124ngf");
  } else if (value === "asuhbjn%1598yckj" && !usedCodes.includes("asuhbjn%1598yckj")) {
    autoPower *= 1.5
    updateAutoPowerDisplay()
    usedCodes.push("asuhbjn%1598yckj");
  } else if (value === "9a0d8fyhunjo#iasud0!#$%^T!@#$" && !usedCodes.includes("9a0d8fyhunjo#iasud0!#$%^T!@#$")) {
    updateMoney(count * count);
    autoPower *= 2;
    autoDelay *= 0.5;
    updateAutoDelayDisplay();
    updateAutoPowerDisplay();
    usedCodes.push("9a0d8fyhunjo#iasud0!#$%^T!@#$");
  }
  document.getElementById("code").value = "";
}

function displayInfo(info) {
  let infoElement = document.getElementById("infoBox");
  infoElement.classList.add("visible");
  infoElement.textContent = info;
  setTimeout(() => {
    infoElement.classList.remove("visible");
  }, 5000);
}

function sortUpgrades() {
  const upgrades = document.querySelectorAll("#shop .upgrade");
  const sortedUpgrades = Array.from(upgrades).sort((a, b) => {
    const costA = parseInt(a.innerText.split("$")[1]);
    const costB = parseInt(b.innerText.split("$")[1]);
    return costA - costB;
  });
  const shopElement = document.getElementById("shop");
  sortedUpgrades.forEach(upgrade => shopElement.appendChild(upgrade));
}

sortUpgrades();

function sortUpgradesByType() {
  const upgrades = document.querySelectorAll("#shop .upgrade");
  const autoPowerUpgrades = [];
  const autoDelayUpgrades = [];
  const clickerUpgrades = [];

  upgrades.forEach(upgrade => {
    const text = upgrade.innerText;
    if (text.includes("Auto Click Power")) {
      autoPowerUpgrades.push(upgrade);
    } else if (text.includes("Auto Click Delay")) {
      autoDelayUpgrades.push(upgrade);
    } else {
      clickerUpgrades.push(upgrade);
    }
  });

  const shopElement = document.getElementById("shop");
  const autoPowerSection = document.createElement("div");
  autoPowerSection.innerHTML = "<h3>Auto Click Power</h3>";
  autoPowerUpgrades.forEach(upgrade => autoPowerSection.appendChild(upgrade));
  shopElement.appendChild(autoPowerSection);

  const autoDelaySection = document.createElement("div");
  autoDelaySection.innerHTML = "<h3>Auto Click Delay</h3>";
  autoDelayUpgrades.forEach(upgrade => autoDelaySection.appendChild(upgrade));
  shopElement.appendChild(autoDelaySection);

  const clickerSection = document.createElement("div");
  clickerSection.innerHTML = "<h3>Clicker Power</h3>";
  clickerUpgrades.forEach(upgrade => clickerSection.appendChild(upgrade));
  shopElement.appendChild(clickerSection);
}

sortUpgradesByType();