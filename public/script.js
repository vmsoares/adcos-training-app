let currentUser = null;

document.getElementById('startBtn').addEventListener('click', () => {
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username;
    document.getElementById('login').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('userDisplay').textContent = currentUser;
    loadModules();
    loadLeaderboard();
  }
});

function loadModules() {
  fetch('/api/modules')
    .then(res => res.json())
    .then(modules => {
      const list = document.getElementById('modules');
      list.innerHTML = '';
      modules.forEach(mod => {
        const li = document.createElement('li');
        li.textContent = `${mod.title} - ${mod.points} pontos`;
        li.addEventListener('click', () => completeModule(mod.id, mod.points, li));
        list.appendChild(li);
      });
    });
}

function completeModule(id, points, element) {
  if (!element.classList.contains('completed')) {
    fetch('/api/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: currentUser, moduleId: id, points })
    }).then(() => {
      element.classList.add('completed');
      loadLeaderboard();
    });
  }
}

function loadLeaderboard() {
  fetch('/api/leaderboard')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('leaderboard');
      list.innerHTML = '';
      data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.username} - ${entry.points} pts`;
        list.appendChild(li);
      });
    });
}
