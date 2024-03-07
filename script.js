let placas = JSON.parse(localStorage.getItem('placas')) || [];
let valorReais = localStorage.getItem('valorReais') || 0;

document.getElementById('valorReais').value = valorReais; // Define o valor inicial do campo Valor em Reais

document.getElementById('valorReais').addEventListener('change', function() {
  valorReais = parseFloat(this.value);
  localStorage.setItem('valorReais', valorReais);
  atualizarCalculos();
});

function adicionarPlaca() {
  const nomePlaca = document.getElementById('nomePlaca').value;
  const mhsPlaca = parseFloat(document.getElementById('mhsPlaca').value);

  if (nomePlaca && mhsPlaca) {
    const novaPlaca = { id: Date.now(), nome: nomePlaca, mhs: mhsPlaca };
    placas.push(novaPlaca);
    atualizarLocalStorage();
    document.getElementById('nomePlaca').value = '';
    document.getElementById('mhsPlaca').value = '';
    renderizarPlacas();
  } else {
    alert('Preencha todos os campos para adicionar uma placa!');
  }
}

function removerPlaca(id) {
  placas = placas.filter(placa => placa.id !== id);
  atualizarLocalStorage();
  renderizarPlacas();
}

function calcularPorcentagens() {
  const totalMhs = placas.reduce((acc, placa) => acc + placa.mhs, 0);
  return placas.map(placa => ({
    ...placa,
    porcentagem: ((placa.mhs / totalMhs) * 100).toFixed(2),
    valorReais: ((placa.mhs / totalMhs) * valorReais).toFixed(2)
  }));
}

function renderizarPlacas() {
  const placasComPorcentagem = calcularPorcentagens();
  const placasContainer = document.getElementById('placasContainer');
  placasContainer.innerHTML = '';

  placasComPorcentagem.forEach(placa => {
    const divPlaca = document.createElement('div');
    divPlaca.classList.add('placa');
    divPlaca.innerHTML = `
      <span>${placa.nome} - ${placa.mhs} Mhs (${placa.porcentagem}% - R$ ${placa.valorReais})</span>
      <button onclick="removerPlaca(${placa.id})">Remover</button>
    `;
    placasContainer.appendChild(divPlaca);
  });
}

function atualizarLocalStorage() {
  localStorage.setItem('placas', JSON.stringify(placas));
}

function atualizarCalculos() {
  renderizarPlacas();
}

renderizarPlacas();
