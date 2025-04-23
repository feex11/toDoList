document.addEventListener("DOMContentLoaded", () => {
    const addListButtons = document.querySelectorAll(".addList");
    let listCounter = 1; // Contador inicializado

    addListButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            listCounter++; // Incrementa o contador a cada clique
            console.log(`Número de listas criadas: ${listCounter}`); // Exibe o contador no console

            const listCard = document.createElement("div");
            listCard.className = "div1";
            listCard.innerHTML = `
                <div class="titulo">
                    <input type="text" placeholder="Título da lista" class="input" />
                    <button class="deleteList" title="Remover lista"><i class="fa-solid fa-trash"></i></button>
                </div>
                <div class="conteudo-lista">
                    <div class="botao">
                        <button class="add">+ Adicionar uma tarefa</button>
                    </div>
                </div>
            `;

            const container = btn.closest(".parent");

            // Insere o card ANTES do botão
            container.insertBefore(listCard, btn.parentElement);
        });
    });
});



document.addEventListener("click", function (event) {
    if (event.target.closest(".add")) {
      const btn = event.target.closest(".add");
  
      const card = document.createElement("div");
      card.className = "tarefa";
      card.innerHTML = `
        <textarea placeholder="Digite a tarefa" class="input2"></textarea>
        <button class="deleteTarefa" title="Remover"><i class="fa-solid fa-trash"></i></button>
      `;
  
      const conteudoLista = btn.closest(".conteudo-lista");
      conteudoLista.insertBefore(card, btn.parentElement);
    }
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


