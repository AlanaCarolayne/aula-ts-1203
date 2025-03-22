"use strict";
var formTime = document.getElementById("formTime");
var tbTimes = document.getElementById("tbTimes");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function salvarLocalStorage() {
    localStorage.setItem("times", JSON.stringify(times));
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const novoTime = {
        id: Date.now(),
        nomeCurto: document.getElementById("nomeCurto").value,
        nomeLongo: document.getElementById("nomeLongo").value,
        localizacao: document.getElementById("localizacao").value,
        arena: document.getElementById("arena").value,
    };
    times.push(novoTime);
    atualizarTabela();
    salvarLocalStorage();
    formTime.reset();
    alert("Time cadastrado com sucesso!");
}
function atualizarTabela() {
    tbTimes.innerHTML = "";
    times.forEach((t) => {
        tbTimes.innerHTML += `
        <tr>
          <td>${t.nomeCurto}</td>
          <td>${t.nomeLongo}</td>
          <td>${t.localizacao}</td>
          <td>${t.arena}</td>
          <td>
            <button onclick="editarTime(${t.id})">Editar</button>
            <button onclick="removerTime(${t.id})">Remover</button>
          </td>
        </tr>
      `;
    });
}
function removerTime(id) {
    const index = times.findIndex((t) => t.id === id);
    if (index !== -1) {
        times.splice(index, 1);
        salvarLocalStorage();
        atualizarTabela();
    }
}
function editarTime(id) {
    const time = times.find((t) => t.id === id);
    if (!time)
        return;
    document.getElementById("nomeCurto").value = time.nomeCurto;
    document.getElementById("nomeLongo").value = time.nomeLongo;
    document.getElementById("localizacao").value = time.localizacao;
    document.getElementById("arena").value = time.arena;
    const index = times.findIndex((t) => t.id === id);
    if (index !== -1) {
        times.splice(index, 1);
        salvarLocalStorage();
        atualizarTabela();
    }
}
atualizarTabela();
formTime.addEventListener("submit", salvar);
