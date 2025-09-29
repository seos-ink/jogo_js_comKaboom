kaboom({
    fullscreen: true,
});

loadSprite("player", "../assets/player.png");

setBackground([0, 0, 0]);

add([
    sprite("player"),
    area(),
    anchor("center"),
    pos(width() / 2, height() / 2),
])

let bulletSpeed = 400;

onKeyPress("space", () => {
    function spawnBullet(p) {
        add([
            rect(4, 12),
            pos(p),
            anchor("center"),
            color(0, 255, 0),
            area(),
            "bullet",
            move(UP, bulletSpeed),
        ]);
    }
    spawnBullet(Player.pos.sub(16, 0))

});

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


