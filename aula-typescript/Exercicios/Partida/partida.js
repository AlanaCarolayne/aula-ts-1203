"use strict";
// Variáveis globais
var formPartida = document.getElementById("formPartida");
var tabelaPartida = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
// Carregar campeonatos do localStorage
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
// Função para salvar no localStorage
function salvarLocalStorage() {
    localStorage.setItem("partidas", JSON.stringify(partidas));
}
// Função para salvar uma nova partida
function salvarPartida(event) {
    event.preventDefault();
    // Obter valores do formulário
    const idCampeonato = parseInt(document.getElementById("idCampeonato").value);
    const campeonato = campeonatos.find((c) => c.id === idCampeonato);
    if (!campeonato) {
        alert("Campeonato não encontrado!");
        return;
    }
    const novaPartida = {
        id: Date.now(),
        mandante: document.getElementById("mandante").value,
        visitante: document.getElementById("visitante").value,
        idCampeonato: idCampeonato,
        nomeCampeonato: campeonato.nome, // Armazenar o nome do campeonato
        data: document.getElementById("data").value,
    };
    partidas.push(novaPartida);
    salvarLocalStorage();
    atualizarTabela();
    formPartida.reset();
    alert("Partida cadastrada com sucesso!");
}
// Função para atualizar a tabela de partidas
function atualizarTabela() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p) => {
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
// Função para remover uma partida
function removerPartida(id) {
    const index = partidas.findIndex((p) => p.id === id);
    if (index !== -1) {
        partidas.splice(index, 1);
        salvarLocalStorage();
        atualizarTabela();
    }
}
// Função para editar uma partida
function editarPartida(id) {
    const partida = partidas.find((p) => p.id === id);
    if (!partida)
        return;
    // Preencher o formulário com os dados da partida
    document.getElementById("mandante").value = partida.mandante;
    document.getElementById("visitante").value = partida.visitante;
    document.getElementById("idCampeonato").value = partida.idCampeonato.toString();
    document.getElementById("data").value = partida.data;
    // Remover a partida da lista para edição
    const index = partidas.findIndex((p) => p.id === id);
    if (index !== -1) {
        partidas.splice(index, 1);
        salvarLocalStorage();
        atualizarTabela();
    }
}
// Função para carregar os campeonatos na <select> box
function carregarCampeonatos() {
    const selectCampeonato = document.getElementById("idCampeonato");
    selectCampeonato.innerHTML = '<option value="">Selecione um campeonato</option>';
    campeonatos.forEach((c) => {
        selectCampeonato.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
    });
}
// Inicialização
carregarCampeonatos(); // Carregar campeonatos na <select> box
atualizarTabela(); // Atualizar a tabela de partidas
// Adicionar evento de submit ao formulário
formPartida.addEventListener("submit", salvarPartida);
