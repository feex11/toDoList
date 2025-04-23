document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add");
  
    addButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = document.createElement("div");
        card.className = "tarefa";
        card.innerHTML = `
          <textarea placeholder="Digite a tarefa" class="input2"></textarea>

          <button class="deleteTarefa" title="Remover"><i class="fa-solid fa-trash"></i></button>
        `;
  
        // Encontra o container da lista de tarefas
        const conteudoLista = btn.closest(".conteudo-lista");
  
        // Insere o card ANTES do botão
        conteudoLista.insertBefore(card, btn.parentElement);
      });
    });
  });

  document.addEventListener("click", function (event) {
    const deleteBtn = event.target.closest(".deleteTarefa");
    if (deleteBtn) {
        const confirmacao = confirm("Você tem certeza que deseja excluir esta tarefa?");
        if (confirmacao) {
          const card = deleteBtn.closest(".tarefa");
          if (card) card.remove();
        }
      }
    });

  document.addEventListener("click", function (event) {
    const deleteBtn = event.target.closest(".deleteList");
    if (deleteBtn) {
      const confirmacao = confirm("Você tem certeza que deseja excluir esta lista?");
      if (confirmacao) {
        const card = deleteBtn.closest(".div1");
        if (card) card.remove();
      }
    }
  });
  
  document.addEventListener("input", function (event) {
    if (event.target.classList.contains("input2")) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    }
  });