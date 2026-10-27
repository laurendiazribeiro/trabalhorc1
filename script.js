// ===== Sabores – JavaScript do site =====
// Faz funcionar: favoritos, adicionar ingredientes, apagar receita e validar a palavra-passe

document.addEventListener("DOMContentLoaded", function () {  // Só corre depois de a página estar toda carregada
  var botoesFavorito = document.querySelectorAll(".btn-favorito, .btn-guardar");  // Encontra todos os botões de favorito
  var contador = document.getElementById("contador-favoritos");  // Número mostrado na página Favoritos (se existir)
  var mensagemVazia = document.getElementById("mensagem-vazia");  // Aviso de "sem favoritos" (se existir)

  function atualizarContador() {  // Atualiza o número de receitas guardadas
    var total = document.querySelectorAll("#lista-favoritos .cartao").length;  // Conta os cartões que ainda estão na lista
    if (contador) { contador.textContent = total; }  // Escreve o novo número, se o contador existir
    if (mensagemVazia && total === 0) { mensagemVazia.hidden = false; }  // Mostra o aviso quando a lista fica vazia
  }  // Fim da função atualizarContador

  botoesFavorito.forEach(function (botao) {  // Para cada botão de favorito...
    botao.addEventListener("click", function () {  // ...fica à espera de um clique
      var ativo = botao.classList.toggle("ativo");  // Liga/desliga a classe "ativo" (true = ficou guardada)
      botao.setAttribute("aria-pressed", ativo ? "true" : "false");  // Informa os leitores de ecrã do estado do botão
      var texto = botao.querySelector(".btn-guardar-texto");  // Procura o texto do botão grande (só existe na página da receita)
      if (texto) { texto.textContent = ativo ? "Guardada nos favoritos" : "Guardar nos favoritos"; }  // Muda o texto do botão grande
      if (botao.dataset.remover === "sim" && !ativo) {  // Na página Favoritos, desmarcar remove a receita da lista
        botao.closest(".cartao").remove();  // Apaga o cartão da página
        atualizarContador();  // Atualiza o número de receitas guardadas
      }  // Fim do if
    });  // Fim do clique
  });  // Fim do ciclo pelos botões

  var botaoAdicionar = document.getElementById("btn-add-ingrediente");  // Botão "+ Adicionar ingrediente"
  var listaIngredientes = document.getElementById("lista-ingredientes");  // Caixa que contém as linhas de ingredientes
  if (botaoAdicionar && listaIngredientes) {  // Só corre na página Criar receita
    botaoAdicionar.addEventListener("click", function () {  // Quando se clica em adicionar...
      var primeira = listaIngredientes.querySelector(".linha-ingrediente");  // Vai buscar uma linha para copiar
      var nova = primeira.cloneNode(true);  // Faz uma cópia completa dessa linha
      nova.querySelectorAll("input").forEach(function (campo) { campo.value = ""; });  // Limpa o que estava escrito na cópia
      nova.querySelector("select").selectedIndex = 0;  // Volta a escolher a primeira unidade
      listaIngredientes.appendChild(nova);  // Junta a nova linha ao fim da lista
    });  // Fim do clique em adicionar
    listaIngredientes.addEventListener("click", function (evento) {  // Fica à espera de cliques dentro da lista
      var botaoRemover = evento.target.closest(".btn-remover");  // Verifica se o clique foi num botão ✕
      if (!botaoRemover) { return; }  // Se não foi, não faz nada
      var linhas = listaIngredientes.querySelectorAll(".linha-ingrediente");  // Conta as linhas existentes
      if (linhas.length > 1) { botaoRemover.closest(".linha-ingrediente").remove(); }  // Remove a linha, mas deixa sempre pelo menos uma
    });  // Fim do clique na lista
  }  // Fim do bloco da página Criar receita

  document.querySelectorAll(".btn-apagar").forEach(function (botao) {  // Para cada botão "Apagar" da página Minha conta...
    botao.addEventListener("click", function () {  // ...fica à espera de um clique
      if (confirm("Queres mesmo apagar esta receita?")) { botao.closest(".cartao").remove(); }  // Pede confirmação e remove o cartão
    });  // Fim do clique
  });  // Fim do ciclo pelos botões apagar

  var palavraPasse = document.getElementById("palavra_passe");  // Campo da palavra-passe
  var confirmar = document.getElementById("confirmar_palavra_passe");  // Campo de confirmação da palavra-passe
  if (palavraPasse && confirmar) {  // Só corre na página Criar conta
    var verificar = function () {  // Função que compara os dois campos
      confirmar.setCustomValidity(confirmar.value !== palavraPasse.value ? "As palavras-passe não coincidem." : "");  // Dá erro se forem diferentes
    };  // Fim da função verificar
    palavraPasse.addEventListener("input", verificar);  // Compara sempre que se escreve na palavra-passe
    confirmar.addEventListener("input", verificar);  // Compara sempre que se escreve na confirmação
  }  // Fim do bloco da página Criar conta
});  // Fim do DOMContentLoaded

