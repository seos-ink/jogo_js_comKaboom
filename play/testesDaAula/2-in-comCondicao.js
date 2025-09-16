let pontuacao = 0;
let segundos = 0;

function adicionarPonto() {
  // Aumenta o contador de segundos e a pontuação
  segundos++;
  pontuacao++;
  
  console.log(`Pontuação: ${pontuacao}`);

  // Checa se o tempo de 5 segundos passou
  if (segundos >= 5) {
    // Para o temporizador
    clearInterval(gameLoop);
    console.log('\nFim do jogo! O tempo de 5 segundos acabou.');
  }
}
// clearInterval() é uma função que para a execução de setInterval()
// Inicia a função a cada 1 segundo
const gameLoop = setInterval(adicionarPonto, 1000);

/*
2 - Pergunta    
Se a função adicionarPonto for chamada a cada segundo, qual será o valor da variável pontuacao quando o jogo terminar após 15 segundos?
Para execução, crie um arquivo .js com a codificação acima e utilize o Node.js para executar
Abra o terminal do VSCode no projeto acima e digite: node nome-do-arquivo.js e o resultado será exibido no console.
Para parar a execução, utilize o atalho: Ctrl + C
*/
