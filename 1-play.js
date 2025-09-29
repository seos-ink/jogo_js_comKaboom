kaboom({
    background: [2, 5, 30], // background é a cor do fundo do jogo
    fullscreen: true, // fullscreen é para deixar o jogo em tela cheia
})

// Crie uma pasta assets e coloque as imagens dentro dela
loadSprite("player", "./assets/player.png")
loadSprite("playerTwo", "./assets/playerTwo.png")
loadSprite("enemyBoss", "./assets/enemy1.png")
// loadSprite("bullet", "./assets/bullet.png")

loadSound("r0", "./assets/Let's Start the Revolution! - Main Theme.mp3")
loadSound("umbra", "./assets/Launch the UMBRA.mp3")

/*
loadSprite() é uma função que carrega uma imagem para ser usada como sprite.
O primeiro parâmetro é o nome do sprite e o segundo é o caminho para a imagem.
*/

/*
scene() é uma função que define uma cena do jogo.
Ela recebe dois parâmetros: o nome da cena e uma função "() =>" que define o que acontece nessa cena.
*/

scene("main", () => {

    const Player = add([
        sprite("player"),
        area(),
        pos(width() / 2, height() - 64),
        anchor("center"),
    ]);

    const music = play("r0", {
        volume: 1,
        loop: true,
    });
    // const PlayerTwo = add([
    //     sprite("playerTwo"),
    //     area(),
    //     pos(width() / 1.5, height() - 64),
    //     anchor("center"),
    // ]);

    /*
    const Spaceship = add() -> cria um novo objeto no jogo.
    sprite("Spaceship") -> define que o objeto é um sprite com a imagem "Spaceship".
    area() -> define que o objeto tem uma área de colisão.
    pos(width() / 2, height() - 64) -> posiciona o objeto no centro da tela, 64 pixels acima do fundo.
    width é a largura da tela total da tela
    height é a altura total da tela
    anchor("center") -> define o ponto de ancoragem do objeto como o centro.
    */

    // Movimentação do player /---------------------
    let speed = 500; // velocidade do jogador
    let BULLET_SPEED = 1500; // velocidade da bala
    var BULLET_enemySPEED = 1000; // velocidade da bala do inimigo


    onKeyDown("left", () => {
        Player.move(-speed, 0);
    });
    onKeyDown("right", () => {
        Player.move(speed, 0);
    });
    onKeyDown("down", () => {
        Player.move(0, speed);
    });
    onKeyDown("up", () => {
        Player.move(0, -speed);
    });


    // let speed2 = 300; // velocidade do jogador 2
    // onKeyDown("a", () => {
    //     PlayerTwo.move(-speed2, 0); 
    // });
    // onKeyDown("d", () => {
    //     PlayerTwo.move(speed2, 0);
    // });
    // onKeyDown("s", () => {
    //     PlayerTwo.move(0, speed2); 
    // });
    // onKeyDown("w", () => {
    //     PlayerTwo.move(0, -speed2); 
    // });

    // sistema de game over (por enquanto é só "press esc" p/ testar) --------------------------------------------
    onKeyPress("escape", () => {
        go("stop"); // vai para a cena gameover quando a tecla esc é pressionada
    });

    function spawnBullet(p) {
        add([
            rect(12, 48),
            area(),
            pos(p),
            anchor("center"),
            color(255, 255, 255),
            outline(4),
            move(UP, BULLET_SPEED),
            offscreen({ destroy: true }),
            // strings here means a tag
            "bullet",
        ])
    }

    onKeyPress("space", () => {
        spawnBullet(Player.pos.sub(16, 0))
        spawnBullet(Player.pos.add(5, 50))
        spawnBullet(Player.pos.add(24, 0))

    })

    function spawnEnemyBullet(p) {
        add([
            rect(20, 45),
            area(),
            pos(p),
            anchor("center"),
            color(8, 15, 255),
            outline(4),
            move(DOWN, BULLET_enemySPEED),
            offscreen({ destroy: true }),
            "enemy_bullet",
        ])
    }

    let DarkBulletSpeed = 450;
    let FinishSpeed = 250;

    function spawnDarkBullet(p) {
        add([
            rect(45, 60),
            area(),
            pos(p),
            anchor("center"),
            color(128, 0, 128),
            outline(4),
            move(DOWN, DarkBulletSpeed),
            offscreen({ destroy: true }),
            "enemy_Darkbullet",
        ])
    }

    function spawnFinish(p) {
        add([
            rect(60, 75),
            area(),
            pos(p),
            anchor("center"),
            color(255, 215, 0),
            outline(4),
            move(DOWN, FinishSpeed),
            offscreen({ destroy: true }),
            "enemy_Finishbullet",
        ])
    }

    // function enemyBulletSpawner() {
    //     spawnEnemyBullet(enemyBoss.pos.add(-16, 50))
    //     spawnEnemyBullet(enemyBoss.pos.add(16, 50))
    //     wait(0.5, enemyBulletSpawner)
    // }
    // enemyBulletSpawner()

    loop(0.5, () => {
        spawnEnemyBullet(enemyBoss.pos.add(-16, 50))
        spawnEnemyBullet(enemyBoss.pos.add(16, 50))
    })
    loop(1.5, () => {
        if (enemyBoss.hp() <= 700) {
            spawnDarkBullet(enemyBoss.pos.add(0, -50))
        }
    })
    loop(3.0, () => {
        if (enemyBoss.hp() <= 500) {
            spawnFinish(enemyBoss.pos.add(-50, -50))
            spawnFinish(enemyBoss.pos.add(50, -50))
        }
    })

    // onKeyPress("e", () => {
    //     spawnBullet(PlayerTwo.pos.sub(16, 0))
    //     spawnBullet(PlayerTwo.pos.add(16, 0))
    // })

    Player.onCollide("enemy_bullet", () => {
        destroy(Player)
        destroyAll(enemyBoss)
        music.detune = -1200

        wait(1, () => {
            music.paused = true
            go("stop")
        })
    })

    Player.onCollide("enemy_bullet", () => {
        destroy(Player)

        wait(1, () => {
            music.paused = true
            go("stop")
        })

    })

    Player.onCollide("enemy_Darkbullet", () => {
        destroy(Player)

        wait(1, () => {
            music.paused = true
            go("stop")
        })
    })

    Player.onCollide("enemy_Darkbullet", () => {
        destroy(Player)

        wait(1, () => {
            music.paused = true
            go("stop")
        })
    })

    onCollide("enemy_bullet", "bullet", (b, eb) => {
        destroy(b)
        destroy(eb)
    })

    onCollide("enemy_Darkbullet", "bullet", (b, eb) => {
        destroy(b)
        destroy(eb)
    })

    var ENEMY_SPEED = 500; // velocidade do inimigo
    const BOSS_HEALTH = 1000; // vida do boss

    const enemyBoss = add([
        sprite("enemyBoss"),
        area(),
        scale(2),
        pos(width() / 2, height() - 870),
        health(BOSS_HEALTH),
        anchor("center"),
        "enemy",
        {
            dir: 1, // direção do inimigo
        }
    ]);

    if (enemyBoss.hp() <= 700) {
        BULLET_enemySPEED = 2500; // aumenta a velocidade da bala do inimigo quando o boss está com menos de 500 de vida  
        ENEMY_SPEED = 700; // aumenta a velocidade do inimigo quando o boss está com menos de 500 de vida      
    }



    enemyBoss.onUpdate((p) => {
        enemyBoss.move(ENEMY_SPEED * enemyBoss.dir, 0)
        if (enemyBoss.dir === 1 && enemyBoss.pos.x >= width() - 20) {
            enemyBoss.dir = -1
        }
        if (enemyBoss.dir === -1 && enemyBoss.pos.x <= 20) {
            enemyBoss.dir = 1
        }
    })

    enemyBoss.onHurt(() => {
        Healthbar.set(enemyBoss.hp())
    })

    onCollide("bullet", "enemy", (b, e) => {
        destroy(b)
        e.hurt(5)
        shake(10)
        // addExplode(b.pos, 1, 24, 1)
    })

    enemyBoss.onDeath(() => {
        music.stop()
        go("win")
    })

    const Healthbar = add([
        rect(width(), 24),
        pos(0, 0),
        color(107, 201, 108),
        fixed(),
        {
            max: BOSS_HEALTH,
            set(hp) {
                this.width = width() * hp / this.max
                this.flash = true
            },
        },
    ])

    Healthbar.onUpdate(() => {
        if (Healthbar.flash) {
            Healthbar.color = rgb(255, 255, 255)
            Healthbar.flash = false
        } else {
            Healthbar.color = rgb(127, 255, 127)
        }
    })

    // scene("gameOver", () => {
    //     add([
    //         text("Game Over", 32),
    //         pos(width() / 2, height() / 2),
    //         anchor("center"),
    //     ]);
    //     add([
    //         text("Pressione 'Enter' para reiniciar", 16),
    //         pos(width() / 2, height() - 32),
    //         anchor("center"),
    //     ]);
    //     onKeyPress("enter", () => {
    //         go("main"); // Reinicia o jogo quando a tecla enter é pressionada
    //     });



})
scene("stop", () => {
    add([
        text("GAME OVER", 32),
        pos(width() / 2, height() / 2),
        anchor("center"),
    ]);
    add([
        text("Pressione Enter para Iniciar", 10),
        pos(width() / 2, height() / 2 + 40),
        anchor("center"),
    ]);
    onKeyPress("enter", () => {
        go("main"); // reinicia a cena main
    });
});



scene("win", () => {
    add([
        text("Você venceu!", 32),
        pos(width() / 2, height() / 2 - 40),
        anchor("center"),
    ]);
    onKeyPress("enter", () => {
        go("main"); // Reinicia o jogo quando a tecla enter é pressionada
    });
});

// scene("lose", () => {
//     add([
//         text("Você perdeu!", 32),
//         pos(width() / 2, height() / 2 - 40),
//         anchor("center"),
//     ]);
//     onKeyPress("enter", () => {
//         go("main"); // Reinicia o jogo quando a tecla enter é pressionada
//     });
// });




// });
// sistema de AI


/*
onKeyDown() é uma função que define o que acontece quando uma tecla é pressionada.
O primeiro parâmetro é o nome da tecla e o segundo é uma função que define o que acontece quando a tecla é pressionada.
up -> tecla para cima
down -> tecla para baixo
left -> tecla para esquerda 
right -> tecla para direita
enter -> tecla enter
space -> tecla espaço
*/


go('main'); // go é para ir para a cena main

