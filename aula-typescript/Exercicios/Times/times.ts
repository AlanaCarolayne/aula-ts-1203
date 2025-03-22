var formTime = document.getElementById("formTime") as HTMLFormElement;
var tbTimes = document.getElementById("tbTimes") as HTMLTableElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");

interface Time {
  id: number;
  nomeCurto: string;
  nomeLongo: string;
  localizacao: string;
  arena: string;
}

function salvarLocalStorage() {
  localStorage.setItem("times", JSON.stringify(times));
}

function salvar(event:Event) {
    event?.preventDefault(); 
    const novoTime: Time = {
        id: Date.now(),
        nomeCurto: (document.getElementById("nomeCurto") as HTMLInputElement).value,
        nomeLongo: (document.getElementById("nomeLongo") as HTMLInputElement).value,
        localizacao: (document.getElementById("localizacao") as HTMLInputElement).value,
        arena: (document.getElementById("arena") as HTMLInputElement).value,
      };
      times.push(novoTime);
      atualizarTabela();
      salvarLocalStorage();
      formTime.reset();
      alert("Time cadastrado com sucesso!");
  }

function atualizarTabela() {
  tbTimes.innerHTML = "";
  times.forEach((t: Time) => {
    tbTimes.innerHTML += `
        <tr>
          <td>${t.nomeCurto}</td>
          <td>${t.nomeLongo}</td>
          <td>${t.localizacao}</td>
          <td>${t.arena}</td>
          <td>
            <button class="btn btn-editar" onclick="editarTime(${t.id})">Editar</button>
            <button class="btn btn-remover" onclick="removerTime(${t.id})">Remover</button>
          </td>
        </tr>
      `;
  });
}

function removerTime(id: number) {
  const index = times.findIndex((t: Time) => t.id === id);
  if (index !== -1) {
    times.splice(index, 1);
    salvarLocalStorage();
    atualizarTabela();
  }
}

function editarTime(id: number) {
  const time = times.find((t: Time) => t.id === id);
  if (!time) return;

  (document.getElementById("nomeCurto") as HTMLInputElement).value = time.nomeCurto;
  (document.getElementById("nomeLongo") as HTMLInputElement).value = time.nomeLongo;
  (document.getElementById("localizacao") as HTMLInputElement).value = time.localizacao;
  (document.getElementById("arena") as HTMLInputElement).value = time.arena;

  const index = times.findIndex((t: Time) => t.id === id);
  if (index !== -1) {
    times.splice(index, 1);
    salvarLocalStorage();
    atualizarTabela();
  }
}

atualizarTabela(); 
formTime.addEventListener("submit", salvar);