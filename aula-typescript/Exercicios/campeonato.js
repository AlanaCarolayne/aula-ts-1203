"use strict";
var formCampeonato = document.getElementById("formCampeonato");
var tabelaCampeonato = document.getElementById("tbCampeonatos");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function salvarLocal() {
    let campeonatosSalvar = JSON.stringify(campeonatos);
    localStorage.setItem("campeonatos", campeonatosSalvar);
}
function attTabela() {
    tabelaCampeonato.innerHTML = " ";
    campeonatos.forEach(campeonato => {
        tabelaCampeonato.innerHTML += `<tr>
        <td>
        ${campeonato.nome}
        </td>
        <td>
        ${campeonato.categoria}
        </td>
        <td>
        ${campeonato.tipo}
        </td>
        <td>
        ${campeonato.dataInicio}
        </td>
        <td>
        ${campeonato.dataFim}
        </td>
        </tr>`;
    });
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoCampeonato = {
        id: Date.now(),
        categoria: "masculino",
        dataFim: "2025-10-30",
        dataInicio: "2025-04-01",
        nome: "Brasileirão 2025",
        tipo: "pontos-corridos"
    };
    campeonatos.push(novoCampeonato);
}
