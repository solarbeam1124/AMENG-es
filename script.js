const game = document.getElementById("game");
const status = document.getElementById("status");
const role = Math.random() < 0.5 ? "Crewmate" : "Impostor";
let score = 0;
let currentRoom = "Upper Engine";
document.getElementById("role").textContent = "Role: " + role;

// Sound effects
const stepSound = new Audio("assets/sounds/step.mp3");
const alertSound = new Audio("assets/sounds/alert.mp3");

// Create rooms
const rooms = [
  { name: "Upper Engine", top: 20, left: 200 },
  { name: "Lower Engine", top: 120, left: 200 },
  { name: "Security", top: 220, left: 200 },
  { name: "Electrical", top: 320, left: 200 },
  { name: "Storage", top: 320, left: 100 },
  { name: "Admin", top: 220, left: 100 },
  { name: "Communications", top: 220, left: 300 },
  { name: "O2", top: 120, left: 100 },
  { name: "Shields", top: 120, left: 300 },
  { name: "Weapons", top: 20, left: 100 },
  { name: "Navigation", top: 20, left: 300 },
  { name: "Cafeteria", top: 420, left: 200 }
];

rooms.forEach(room => {
  const div = document.createElement("div");
  div.className = "room";
  div.style.top = room.top + "px";
  div.style.left = room.left + "px";
  div.dataset.name = room.name;
  div.textContent = room.name;
  game.appendChild(div);
});

// Create player
const player = document.createElement("div");
player.className = "player";
player.style.top = "20px";
player.style.left = "200px";
game.appendChild(player);

function updateScore() {
  score++;
  document.getElementById("score").textContent = "Score: " + score;
}

function checkRoom() {
  rooms.forEach(room => {
    const rx = room.left;
    const ry = room.top;
    const px = player.offsetLeft;
    const py = player.offsetTop;
    if (Math.abs(rx - px) < 20 && Math.abs(ry - py) < 20) {
      currentRoom = room.name;
      status.textContent = "📍 " + currentRoom;
      updateScore();

      if (Math.random() < 0.1) {
        alertSound.play();
        alert("💣 Sabotage in " + currentRoom + "! You fixed it.");
        score += 10;
        updateScore();
      }

      if (role === "Crewmate" && Math.random() < 0.05) {
        alert("💀 You were eliminated in " + currentRoom + "!");
        location.reload();
      }

      if (currentRoom === "Cafeteria" && Math.random() < 0.05) {
        alert("🐶 You found the Snoopy easter egg!");
      }
    }
  });
}

function move(dx, dy) {
  const x = player.offsetLeft + dx;
  const y = player.offsetTop + dy;
  if (x >= 0 && x <= 460 && y >= 0 && y <= 460) {
    player.style.left = x + "px";
    player.style.top = y + "px";
    stepSound.play();
    checkRoom();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w") move(0, -20);
  if (e.key === "s") move(0, 20);
  if (e.key === "a") move(-20, 0);
  if (e.key === "d") move(20, 0);
});
