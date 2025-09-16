// ---- Sistema de incremento

let pontuacao = 0;

function addPonto() {
    pontuacao++;
    console.log(`Pontuação: ${pontuacao}`);
}

setInterval(addPonto, 1000);
// setInterval

// Do prof ------
let score = 0;
score += 10

if(score === 0) {
    console.log("game over");
}
