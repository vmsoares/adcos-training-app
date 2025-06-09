const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let users = {}; // {username: {points: number, completed: []}}

app.post('/api/complete', (req, res) => {
  const { username, moduleId, points } = req.body;
  if (!users[username]) {
    users[username] = { points: 0, completed: [] };
  }
  if (!users[username].completed.includes(moduleId)) {
    users[username].completed.push(moduleId);
    users[username].points += points;
  }
  res.json({ success: true });
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboard = Object.entries(users)
    .map(([username, data]) => ({ username, points: data.points }))
    .sort((a, b) => b.points - a.points);
  res.json(leaderboard);
});

app.get('/api/modules', (req, res) => {
  cons  const modules = [
    { id: 1, title: 'Conheça a linha de produtos', points: 50 },
    { id: 2, title: 'Técnicas de venda consultiva', points: 70 },
    { id: 3, title: 'Atendimento ao cliente', points: 60 },
    { id: 4, title: 'Dicas rápidas de cross-selling', points: 40 },
    { id: 5, title: 'Macetes de fechamento de venda', points: 50 },
    { id: 6, title: 'Treinamento relâmpago: objeções comuns', points: 60 }
  ];
  res.json(modules);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
