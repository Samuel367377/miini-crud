let itens = [];
let editandoIndex = null;

function mostrarFeedback(mensagem) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = mensagem;
  setTimeout(() => (feedback.textContent = ""), 2000);
}

function salvarLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(itens));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem("tarefas");
  if (dados) {
    itens = JSON.parse(dados);
    listarItens();
  }
}

function listarItens() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item}
      <div class="btns">
        <button onclick="editarItem(${index})">Editar</button>
        <button onclick="removerItem(${index})">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function adicionarItem() {
  const input = document.getElementById("itemInput");
  const valor = input.value.trim();

  if (valor === "") {
    mostrarFeedback("⚠️ Digite algo antes de adicionar.");
    return;
  }

  if (itens.includes(valor) && editandoIndex === null) {
    mostrarFeedback("⚠️ Item duplicado.");
    return;
  }

  if (editandoIndex !== null) {
    itens[editandoIndex] = valor;
    mostrarFeedback("✏️ Item editado com sucesso.");
    editandoIndex = null;
  } else {
    itens.push(valor);
    mostrarFeedback("✅ Item adicionado com sucesso.");
  }

  input.value = "";
  salvarLocalStorage();
  listarItens();
}

function removerItem(index) {
  if (confirm("Tem certeza que deseja excluir este item?")) {
    itens.splice(index, 1);
    salvarLocalStorage();
    listarItens();
    mostrarFeedback("❌ Item excluído com sucesso.");
  }
}

function editarItem(index) {
  const input = document.getElementById("itemInput");
  input.value = itens[index];
  input.focus();
  editandoIndex = index;
}

// Carrega ao iniciar
carregarLocalStorage();
