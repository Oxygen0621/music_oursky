var ctx,
    canvas,
    width,
    height;
var animation,
    lastTime = 0,
    Timesub = 0,
    DeltaTime = 0,
    loop = true;
var ctx_font = "Arial",
    ctx_fontsize = 10,
    ctx_backColor = "#222";
var keys = {}, mousePos = {};
var isStarted = false;

window.onload = function () {
    ctx = CreateDisplay("myCanvas");
    canvas = ctx.canvas;
    width = canvas.width;
    height = canvas.height;

    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);
    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("mousemove", mousemove, false);
    window.addEventListener("resize", resize);

    main();
}

// ----------------------------------------------------------
function mainLoop(timestamp) {
    Timesub = timestamp - lastTime;// get sleep
    DeltaTime = Timesub / 1000;
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = 'rgba(34,34,34,' + clearAlpha + ')';
    ctx.fillRect(0, 0, width, height);
    //--------Begin-----------

    if (isStarted) {
        update(DeltaTime);
    }
    draw(ctx);

    //--------End---------------
    let str1 = "Fps: " + Math.round(1000 / Timesub), str2 = "Timesub: " + Math.round(Timesub), str3 = "DeltaTime: " + Math.round(DeltaTime);
    drawString(ctx, str1,
        0, height - 31,
        "rgba(255,255,255,0.3)", 10, "Arial",
        0, 0, 0);
    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}
//-------------------------------------------------------
var clearAlpha = 0.3;

var particles = [];
var fireworks = [];
var gravity = new Vector(0, 3);

var scaleY, imgHeight, startY;

function main() {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    window.requestAnimationFrame(mainLoop);
}

function update(dt) {
    var chance;
    if (height > width) {
        chance = 10;
    }else{
        chance = 80;
    }
    if (random(0, 1000) < chance) {
        let x = random(0, width);
        let y = height;
        CreateFirework(x, y);
    }

    for (particle of particles) {
        particle.applyForce(gravity);
        particle.update(dt);
    }

    for (firework of fireworks) {
        firework.applyForce(gravity);
        firework.update(dt);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].IsDead) {
            particles.splice(i, 1);
        }
    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
        if (fireworks[i].IsDead) {
            fireworks.splice(i, 1);
        }
    }
}

function draw(ctx) {
    drawBackground(ctx);

    for (particle of particles) {
        particle.render(ctx);
    }

    for (firework of fireworks) {
        firework.render(ctx);
    }
}

function drawBackground(ctx) {
    // 使用漸層黑色和深藍色背景
    let gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#000022");
    gradient.addColorStop(1, "#000000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawString(ctx, text, x, y, color, fontSize, font, alignX, alignY, baseline) {
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${font}`;
    ctx.textAlign = alignX || 'left';
    ctx.textBaseline = baseline || 'alphabetic';
    ctx.fillText(text, x, y);
}

//---evnt---
function keydown(e) {
    keys[e.keyCode] = true;
}

function keyup(e) {
    delete keys[e.keyCode];
}

function mousedown(e) {
    CreateParticle(e.clientX, e.clientY, randomInt(0, 360), randomInt(100, 500));
    if (randomInt(0, 1000) < 300) {
        CreateParticle(e.clientX, e.clientY, randomInt(0, 360), randomInt(300, 800));
    }
    // 新增創建煙火的邏輯
    let sx = e.clientX;
    let sy = e.clientY;
    let ex = sx;
    let ey = random(height * 0.1, height * 3 / 4);
    fireworks.push(new Firework(sx, sy, ex, ey, random(0, 360)));
    isStarted = true; // 開始更新
}

function mouseup(e) {

}

function mousemove(e) {
    mousePos.x = e.clientX - ctx.canvas.offsetLeft
    mousePos.y = e.clientY - ctx.canvas.offsetTop;
}

function resize() {
    setCanvasSize(canvas);
    width = canvas.width;
    height = canvas.height;
}

//----tool-------
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//---------------------
function CreateDisplay(id, width, height, border) {
    let canvas = document.createElement("canvas");
    let style_arr = [
        "display: block;",
        "margin: 0 auto;",
        "background: #FFF;",
        "padding: 0;",
        "display: block;"
    ];
    canvas.id = id;
    canvas.width = width | 0;
    canvas.height = height | 0;

    if (border) style_arr.push("border:1px solid #000;");

    if (!width && !height) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    canvas.style.cssText = style_arr.join("");

    document.body.appendChild(canvas);

    return canvas.getContext("2d");
}

document.addEventListener('click', function() {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.play();
    document.querySelector('.record').style.animationPlayState = 'running';
    isStarted = true; // 開始更新
});