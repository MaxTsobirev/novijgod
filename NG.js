function algus(){
    var t = document.getElementById("tahvel").getContext("2d");
    setInterval('liigu()', 50);
}

function kustuta(){
    var t=document.getElementById("tahvel").getContext("2d");
    t.clearRect(0,0,700,400); //x,y, laius,kõrgus

}
//jolka
function joonistajolka(){
    var t=document.getElementById("tahvel").getContext("2d");
    //nogi
    t.fillStyle="brown";
    t.fillRect(270,355,55,45)
    //lihtme joon
    //1
    t.beginPath();
    t.fillStyle="green";
    t.lineWidth=2;
    t.moveTo(400,355);
    t.lineTo(300,180);
    t.lineTo(200,355);
    t.fill();
    //2
    t.beginPath();
    t.fillStyle="green";
    t.lineWidth=2;
    t.moveTo(400,300);
    t.lineTo(300,130);
    t.lineTo(200,300);
    t.fill();
    //3
    t.beginPath();
    t.fillStyle="green";
    t.lineWidth=2;
    t.moveTo(400,255);
    t.lineTo(300,100);
    t.lineTo(200,255);
    t.fill();

}
//sneg
function joonistasneg() {
    var t = document.getElementById("tahvel").getContext("2d");
    t.beginPath();
    t.fillStyle="white";
    t.arc(230, 400, 40,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(400, 400, 60,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(325, 400, 30,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(440, 400, 75,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(278, 400, 20,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(500, 400, 70,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(600, 400, 67,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(180, 400, 50,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(100, 400, 80,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.arc(50, 400, 70,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();

}
//gerljanda
function joonistagerljanda() {
    var t = document.getElementById("tahvel").getContext("2d");
    t.beginPath();
    t.fillStyle="red";
    t.arc(230, 260, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    t.beginPath();
    t.fillStyle="blue";
    t.arc(260, 310, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    t.beginPath();
    t.fillStyle="#00ff00";
    t.arc(300, 270, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    t.beginPath();
    t.fillStyle="#ffff66";
    t.arc(370, 310, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    t.beginPath();
    t.fillStyle="#cc33ff";
    t.arc(280, 210, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    t.beginPath();
    t.fillStyle="#ff6600";
    t.arc(300, 150, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    t.beginPath();
    t.fillStyle="#ccccff";
    t.arc(340, 200, 9,0, 2*Math.PI, true); //x, y, R , arc-duga
    t.fill();
    //star
    t.fillStyle = "yellow";
    t.beginPath();
    t.moveTo(304, 0.0);
    t.lineTo(320, 45);
    t.lineTo(369, 49.15);
    t.lineTo(331, 75.5);
    t.lineTo(337, 114.5);
    t.lineTo(304, 95);
    t.lineTo(270, 112.5);
    t.lineTo(272, 75.5);
    t.lineTo(240, 49);
    t.lineTo(282, 44);
    t.lineTo(304, 3);
    t.closePath();
    t.fill();

}

window.onload = function(){
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 100; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*4+1, //radius
            d: Math.random()*mp //density
        })
    }

    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W+5 || p.x < -5 || p.y > H)
            {
                if(i%3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                }
                else
                {
                    //If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                    else
                    {
                        //Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }

    //animation loop
    setInterval(draw, 33);
}

















