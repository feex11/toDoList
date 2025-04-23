document.addEventListener("DOMContentLoaded", () => {
  const parent = document.querySelector(".parent");

  // salva as listas no localStorage
  function salvarDados() {
    const listas = Array.from(document.querySelectorAll(".div1")).map((listaDiv) => {
      const titulo = listaDiv.querySelector(".input").value;
      const tarefas = Array.from(listaDiv.querySelectorAll(".tarefa")).map((tarefa) => ({
        texto: tarefa.querySelector(".input2").value,
        concluida: tarefa.querySelector(".checkbox").checked,
      }));
      return { titulo, tarefas };
    });

    localStorage.setItem("listas", JSON.stringify(listas));
  }

  // Carrega as listas do localStorage
  function carregarDados() {
    const dados = JSON.parse(localStorage.getItem("listas")) || [];

    dados.forEach(({ titulo, tarefas }) => {
      const novaLista = criarLista(titulo);
      tarefas.forEach((tarefa) => {
        criarTarefa(novaLista, tarefa.texto, tarefa.concluida);
      });
    });
  }

  // Cria a lista inicial
  function criarLista(titulo = "") {
    const div1 = document.createElement("div");
    div1.className = "div1";
    div1.innerHTML = `
      <div class="titulo">
        <input type="text" placeholder="Título da lista" class="input" value="${titulo}" />
        <button class="deleteList" title="Remover lista"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="conteudo-lista">
        <div class="botao">
          <button class="add">+ Adicionar uma tarefa</button>
        </div>
      </div>
    `;
    parent.insertBefore(div1, document.querySelector(".div2"));
    return div1;
  }

  // Cria uma nova tarefa

  function criarTarefa(listaDiv, texto = "", concluida = false) {
    const tarefa = document.createElement("div");
    tarefa.className = "tarefa";
    tarefa.innerHTML = `
      <textarea placeholder="Digite a tarefa" class="input2">${texto}</textarea>
      <input type="checkbox" class="checkbox" ${concluida ? "checked" : ""} />
      <button class="deleteTarefa" title="Remover"><i class="fa-solid fa-trash"></i></button>
    `;
    const conteudo = listaDiv.querySelector(".conteudo-lista");
    conteudo.insertBefore(tarefa, conteudo.querySelector(".botao"));
  }

  // Eventos globais
  document.addEventListener("click", (event) => {
    if (event.target.closest(".addList")) {
      criarLista();
      salvarDados();
    }

    if (event.target.closest(".add")) {
      const btn = event.target.closest(".add");
      const listaDiv = btn.closest(".div1");
      criarTarefa(listaDiv);
      salvarDados();
    }

    if (event.target.closest(".deleteList")) {
      if (confirm("Você tem certeza que deseja excluir esta lista?")) {
        const card = event.target.closest(".div1");
        if (card) {
          card.remove();
          salvarDados();
        }
      }
    }

    if (event.target.closest(".deleteTarefa")) {
      if (confirm("Você tem certeza que deseja excluir esta tarefa?")) {
        const card = event.target.closest(".tarefa");
        if (card) {
          card.remove();
          salvarDados();
        }
      }
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.classList.contains("input2")) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
      salvarDados();
    }

    if (event.target.classList.contains("input")) {
      salvarDados();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.classList.contains("checkbox")) {
      salvarDados();
    }
  });

  // Carrega as listas na inicialização
  carregarDados();
});
