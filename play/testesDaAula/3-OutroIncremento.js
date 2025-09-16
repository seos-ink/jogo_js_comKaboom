// Variáveis
let pontuacao = 0;
const valorMoeda = 10;
const bonusEspecial = 50;

// Função que adiciona pontos com base no item coletado
function coletarItem(tipoItem) {
    if (tipoItem === 'moeda') {
        pontuacao += valorMoeda; // Adiciona 10 pontos
        console.log(`Você coletou uma moeda! Pontuação atual: ${pontuacao}`);
    } else if (tipoItem === 'joia') {
        pontuacao += bonusEspecial; // Adiciona 50 pontos
        console.log(`Você encontrou uma joia rara! Pontuação atual: ${pontuacao}`);
    }
}

coletarItem('moeda')
coletarItem('moeda')
coletarItem('joia')
coletarItem('moeda')
coletarItem('joia')
coletarItem('joia')
coletarItem('moeda')
coletarItem('joia')
/*
1 - Pergunta
Se, durante o jogo, a função coletarItem('moeda') for chamada 5 vezes e a função coletarItem('joia') for chamada 3 vezes, qual será o valor final da variável pontuacao? 

Para execução, crie um arquivo .js com a codificação acima e utilize o Node.js para executar
Abra o terminal do VSCode no projeto acima e digite: node nome-do-arquivo.js e o resultado será exibido no console.

*/