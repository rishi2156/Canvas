var canvas= document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');
var colours=['red','blue','green','yellow','pink','black'];

// c.fillStyle = "rgba(255, 0 , 0 ,0.5)"
// c.fillRect(100,100,100,100);
// c.fillStyle = "rgba(0 , 255 , 0 ,0.5)"
// c.fillRect(300,300,100,100);
// c.fillStyle = "rgba(0, 0 , 255 ,0.5)"
// c.fillRect(400,100,100,100);


// //------------LINE-------------------//

// for(var i=0;i<100;i++){
//     c.beginPath();
//     var x1=Math.random()*window.innerWidth;
//     var y1=Math.random()*window.innerHeight;
//     var x2=Math.random()*window.innerWidth;
//     var y2=Math.random()*window.innerHeight;
//     var clr=Math.random()*10;
//     c.moveTo(x1,y1);
//     c.lineTo(x2,y2);
//     c.strokeStyle = colours[Math.floor(clr)];
//     c.stroke();
// }

//------------ARC-------------------//
// c.beginPath();
// c.arc(300,300,30,0,Math.PI*2,false);
// c.strokeStyle = "blue";
// c.stroke();

// for(var i=0;i<100;i++){
//     var x=Math.random()*window.innerWidth;
//     var y=Math.random()*window.innerHeight;
//     var clr=Math.random()*10;
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI*2,false);
//     c.strokeStyle = colours[Math.floor(clr)];
//     c.stroke();
// // }
var mouse = {
    x:undefined,
    y:undefined
}
var maxradius = 40;
// var minradius = 5;

var colorArray =['#010326','#6DA0A6','#F2EEB3','#F29F05','#F28705'];
window.addEventListener('mousemove' , function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height=window.innerHeight;

    init();
});

function Circle( x , y , dx , dy , rad) {
    this.x = x;
    this.y=y;
    this.dx = dx;
    this.dy = dy;
    this.rad =  rad;
    this.minradius = rad;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    };
    this.update  = function() {
        if(this.x+this.rad>innerWidth||this.x-this.rad<0)
        this.dx= -this.dx;
        if(this.y+this.rad>innerHeight||this.y-this.rad<0)
        this.dy= -this.dy;
        this.x+=this.dx;
        this.y+=this.dy;

        //interactivity

        if(mouse.x - this.x < 50 && mouse.x-this.x >-50 && mouse.y - this.y < 50 && mouse.y - this.y >-50){
            if(this.rad<maxradius)
            this.rad+=1;
        } else if(this.rad>this.minradius){
            this.rad-=1;
        }
        this.draw();
    };
}

var circleArray = [];

function init(){
    circleArray=[];
    for(var i=0;i<2000;i++){
        var rad=Math.random() * 3 + 5;
        var x=Math.random() * (innerWidth - rad*2) + rad;
        var y=Math.random() * (innerHeight - rad*2)+rad;
        var dy=( Math.random() - 0.5);
        var dx =( Math.random() - 0.5);
        circleArray.push(new Circle(x,y,dx,dy,rad));
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        
    }
}
animate();
init();