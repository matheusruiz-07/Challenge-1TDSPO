document.addEventListener("DOMContentLoaded", () => {
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

  // 2. Lógica de Chat Simulado com o Avatar Eco (Mantida integralmente)
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // Adiciona a mensagem do utilizador no chat
    const userDiv = document.createElement("div");
    userDiv.className = "message user-msg";
    userDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(userDiv);

    // Limpa o input
    userInput.value = "";

    // Rola o chat para baixo
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Resposta simulada do Avatar (Eco) após 1 segundo
    setTimeout(() => {
      const avatarDiv = document.createElement("div");
      avatarDiv.className = "message avatar-msg";

      // Resposta automática simulando o Watson Assistant
      avatarDiv.innerHTML = `<p>Muito bem! A tua dúvida sobre "${text}" foi registada. Lembre-se que cada pequena ação conta para o nosso ecossistema! 🌍</p>`;

      chatMessages.appendChild(avatarDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});