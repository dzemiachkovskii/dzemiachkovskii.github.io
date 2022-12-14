window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    var t = Date.now();
    var grndHeight = 300;
    var x = 100, y = 280;
    var sx = 30, sy = 30;
    var dy = 0;
    var cactus = false;
    var cactusX;
    var cactusY = 300;
    var cactusHeight;
    var gameSpeed = 1;
    var pts = 0;
    var highscore = 0;
    var ascent = false;
    var oldHeight = 0;
    var bird = document.getElementById("bird");
    /* zashk */ var upperPipe = 0;
    var ptsTimer = 0;
    window.onkeydown = function() {
        dy = -350;
        oldHeight = y;
    }
    window.ontouchstart = function() {
        dy = -350;
        oldHeight = y;
    }
    window.onclick = function() {
        dy = -350;
        oldHeight = y;
    }
    function mainLoop() {
        var tPassed = (Date.now() - t) / 1000;
        t = Date.now();
        y += dy * tPassed;
        if (y >= grndHeight - sy) {
            dy = 0;
            y = grndHeight - sy;
        }
        else if (y <= 10) {
            y = 10;
            dy = 200;
        }
        else if (y <= oldHeight - 50) dy = 200;
        ctx.clearRect(0, 0, 600, 400);
        drawPts();
        if (pts / 20 >= gameSpeed) gameSpeed += 1;
        drawHighscore();
        drawBG();
        drawDino();
        drawObstacles();
        collisionCheck();
        window.requestAnimationFrame(mainLoop);
    }
    function drawPts() {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.font = "50px Arial";
        ctx.fillText(Math.round(pts), 300, 100);
    }
    function drawHighscore() {
        if (highscore > 0) {
            ctx.fillStyle = "#000000";
            ctx.font = "20px Arial";
            ctx.fillText("Highscore: " + highscore, 20, 40);
        }
    }
    function drawBG() {
        ctx.beginPath();
        ctx.fillStyle = "#6c3b0f";
        ctx.rect(0, 300, 600, 100);
        ctx.fill();
    }
    function drawDino() {
        ctx.beginPath();
        ctx.drawImage(bird, x, y, sx, sy);
    }
    function drawObstacles() {
        if (!cactus) {
            cactus = !cactus;
            cactusX = 610;
            cactusHeight = Math.round(Math.random() * 69 + 30);
        }
        else {
            if (cactusX < -35) cactus = !cactus;
            else cactusX -= gameSpeed * 2 + 4;
        }
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.rect(cactusX, cactusY - cactusHeight, 25, cactusHeight);
        ctx.fill();
        ctx.beginPath();
        ctx.rect(cactusX - 4, cactusY - cactusHeight, 33, 15);
        ctx.fill();
        ctx.beginPath();
        upperPipe = cactusY - cactusHeight - (sy * 4);
        ctx.rect(cactusX, upperPipe, 25, -500);
        ctx.fill();
        ctx.beginPath();
        ctx.rect(cactusX - 4, upperPipe, 33, -15);
        ctx.fill();
    }
    function collisionCheck() {
        if (x + sx >= cactusX && x <= cactusX + 25) {
            if (y + sy >= cactusY - cactusHeight || y <= upperPipe) {
                var score = Math.round(pts);
                pts = 0;
                gameSpeed = 1;
                if (score > highscore) highscore = score;
            }
            else {
                if (Date.now() - ptsTimer > 300 / gameSpeed) {
                    ptsTimer = Date.now();
                    pts += 1;
                }
            }
        }
    }
    mainLoop();
}