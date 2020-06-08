function loadAssets(){
    virus_image = new Image;
    virus_image.src = "assets/v2.png"

    doctor_image = new Image;
    doctor_image.src = "assets/doctor.png"

    tonic_image = new Image;
    tonic_image.src = "assets/tonic.png"
}

function init(){
    canvas = document.getElementById("mycanvas");
    W = 700;
    H = 400;
    canvas.width = W;
    canvas.height = H; 
    // render on 2d canvas.
    pen = canvas.getContext('2d');
    game_over = false;

    v1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20,
    };
    v2 = {
        x: 350,
        y: 150,
        w: 60,
        h: 60,
        speed: 30,
    };
    v3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 40,
    };

    virus = [v1,v2,v3];

    doctor = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed: 20,
        health: 70,
        moving: false,
    };
    tonic = {
        x: W-100,
        y: H/2,
        w: 60,
        h: 60,
    }; 
    
    // Add Event Listeners on the canvas.
    canvas.addEventListener('mousedown', function(){
        console.log("mouse is pressed");
        doctor.moving = true;
    });
    canvas.addEventListener('mouseup', function(){
        console.log("mouse is released");
        doctor.moving = false;
    });
}

function isCollision(person1,person2){
    if( person1.x < person2.x + person2.w &&
        person1.x + person1.w > person2.x &&
        person1.y < person2.y + person2.h &&
        person1.y + person1.h > person2.y ){
        return true;
    }
    return false;
}

function draw(){
    pen.clearRect(0,0,W,H);

    // pen.fillStyle = "red";
    // pen.fillRect(box.x,box.y,box.w,box.h);
    // pen.drawImage(image,box.x,box.y,box.w,box.h);

    // draw doctor
    pen.drawImage(doctor_image,doctor.x,doctor.y,doctor.w,doctor.h);
    // draw tonic
    pen.drawImage(tonic_image,tonic.x,tonic.y,tonic.w,tonic.h);

    // draw viruses
    for(let i=0;i<virus.length;i++){
        pen.drawImage(virus_image,virus[i].x,virus[i].y,virus[i].w,virus[i].h);
    }

    pen.fillStyle = "black";
    pen.font = "20px Roboto";
    pen.fillText("Health "+doctor.health,15,15);
}

function update(){
    // box.y += box.speed;

    // if( box.y > H-box.h || box.y < 0){
    //     box.speed *= -1;
    // }

    // if doctor is moving towards the tonic
    if(doctor.moving == true){
        doctor.x += doctor.speed;
        doctor.health += 30;
    }

    for(let i=0; i<virus.length;i++){
        if(isCollision(doctor,virus[i])){
            doctor.health -= 40;
            if(doctor.health < 0){
                console.log(doctor.health);
                game_over = true; 
                alert("Sorry, the virus has killed you. See you again!\n"+
                "Your health was " + doctor.health);
            }
        }
    }

    if(isCollision(doctor,tonic)){
        console.log("You killed the virus successfully");
        alert("You killed the virus successfully");
        game_over = true;
        return;
    }

    for(let i=0; i<virus.length; i++){
        virus[i].y += virus[i].speed;
        if( virus[i].y > H - virus[i].h || virus[i].y < 0){
            virus[i].speed *= -1;
        }
    }

}

function gameloop(){
    if(game_over){
        clearInterval(f);
    }
    draw();
    update();
// console.log("gameloop");
}

loadAssets();
init();
var f = setInterval(gameloop,100);