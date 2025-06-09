const questions = [
  {
    text: 'Qual é o benefício principal da linha de produtos anti-idade da ADCOS?',
    options: ['Hidratação intensa', 'Proteção solar', 'Redução de rugas', 'Controle de oleosidade'],
    answer: 2
  },
  {
    text: 'Uma técnica eficaz de cross‑selling é:',
    options: ['Oferecer desconto no produto principal', 'Sugerir produtos complementares', 'Ignorar necessidades do cliente', 'Falar apenas do preço'],
    answer: 1
  },
  {
    text: 'Para fechar uma venda com sucesso, é importante:',
    options: ['Interromper o cliente frequentemente', 'Destacar benefícios que atendem às dores dele', 'Falar rápido para ganhar tempo', 'Usar jargões técnicos'],
    answer: 1
  }
];

const quizDiv = document.getElementById('quiz');
questions.forEach((q, idx) => {
  const div = document.createElement('div');
  div.className = 'question';
  const p = document.createElement('p');
  p.textContent = `${idx + 1}. ${q.text}`;
  div.appendChild(p);
  q.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="q${idx}" value="${i}"> ${opt}`;
    div.appendChild(label);
    div.appendChild(document.createElement('br'));
  });
  quizDiv.appendChild(div);
});

document.getElementById('submitBtn').addEventListener('click', () => {
  let score = 0;
  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  const result = document.getElementById('result');
  result.textContent = `Você acertou ${score} de ${questions.length} questões!`;
});
