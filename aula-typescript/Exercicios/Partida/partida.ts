var formPartida = document.getElementById("formPartida") as HTMLFormElement;
var tabelaPartida = document.getElementById("tbPartidas") as HTMLElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");

interface Partida {
  id: number;
  mandante: string;
  visitante: string;
  idCampeonato: number;
  nomeCampeonato: string;
  data: string;
}

function salvarLocalStorage() {
  localStorage.setItem("partidas", JSON.stringify(partidas));
}

function salvarPartida(event: Event) {
  event?.preventDefault();
  const idCampeonato = parseInt(
    (document.getElementById("idCampeonato") as HTMLSelectElement).value
  );
  const campeonato = campeonatos.find((c: any) => c.id === idCampeonato);

  if (!campeonato) {
    alert("Campeonato não encontrado!");
    return;
  }

  const novaPartida: Partida = {
    id: Date.now(),
    mandante: (document.getElementById("mandante") as HTMLInputElement).value,
    visitante: (document.getElementById("visitante") as HTMLInputElement).value,
    idCampeonato: idCampeonato,
    nomeCampeonato: campeonato.nome,
    data: (document.getElementById("data") as HTMLInputElement).value,
  };

  partidas.push(novaPartida);
  salvarLocalStorage();
  atualizarTabela();
  formPartida.reset();
  alert("Partida cadastrada com sucesso!");
}

function atualizarTabela() {
  tabelaPartida.innerHTML = "";
  partidas.forEach((p: Partida) => {
    tabelaPartida.innerHTML += `
      <tr>
        <td>${p.mandante}</td>
        <td>${p.visitante}</td>
        <td>${p.nomeCampeonato}</td>
        <td>${p.data}</td>
        <td>
          <button onclick="editarPartida(${p.id})">Editar</button>
          <button onclick="removerPartida(${p.id})">Remover</button>
        </td>
      </tr>
    `;
  });
}

function removerPartida(id: number) {
  const index = partidas.findIndex((p: Partida) => p.id === id);
  if (index !== -1) {
    partidas.splice(index, 1);
    salvarLocalStorage();
    atualizarTabela();
  }
}

function editarPartida(id: number) {
  const partida = partidas.find((p: Partida) => p.id === id);
  if (!partida) return;

  (document.getElementById("mandante") as HTMLInputElement).value =
    partida.mandante;
  (document.getElementById("visitante") as HTMLInputElement).value =
    partida.visitante;
  (document.getElementById("idCampeonato") as HTMLSelectElement).value =
    partida.idCampeonato.toString();
  (document.getElementById("data") as HTMLInputElement).value = partida.data;

  const index = partidas.findIndex((p: Partida) => p.id === id);
  if (index !== -1) {
    partidas.splice(index, 1);
    salvarLocalStorage();
    atualizarTabela();
  }
}


function carregarCampeonatos() {
  const selectCampeonato = document.getElementById(
    "idCampeonato"
  ) as HTMLSelectElement;
  selectCampeonato.innerHTML =
    '<option value="">Selecione um campeonato</option>';

  campeonatos.forEach((c: any) => {
    selectCampeonato.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
  });
}

carregarCampeonatos(); 
atualizarTabela(); 
formPartida.addEventListener("submit", salvarPartida);
