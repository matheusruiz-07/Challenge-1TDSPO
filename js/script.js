
  // 1. Lógica do Painel de Missões e Pontuação
const checkboxes = document.querySelectorAll(".mission-checkbox");
  
  // CORRIGIDO: Alterado de 'total-points' para 'total-pontos' conforme o seu HTML atual
const totalPointsElement = document.getElementById("total-pontos");
  
let currentPoints = 1250;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const pointsValue = parseInt(event.target.getAttribute("data-points"), 10);

      if (event.target.checked) {
        currentPoints += pointsValue;
        // Simulação simples de evolução visual do avatar
        // CORRIGIDO: Alterado de 'avatar-image' para 'imagem-usuario' conforme o seu HTML atual
        document.getElementById("imagem-usuario").textContent = "🌳";
      } else {
        currentPoints -= pointsValue;
        // CORRIGIDO: Alterado de 'avatar-image' para 'imagem-usuario' conforme o seu HTML atual
        document.getElementById("imagem-usuario").textContent = "🌱";
      }

      // Atualiza o valor na tela formatado
      totalPointsElement.textContent = currentPoints.toLocaleString("pt-BR");
    });
  });
