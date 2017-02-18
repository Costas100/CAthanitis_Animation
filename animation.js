var canvas = document.getElementById("slate");
var ctx = canvas.getContext("2d");
var circleButton = document.getElementById("circle");
var dvdButton = document.getElementById("dvd");
var stopButton = document.getElementById("stop");
var clearButton = document.getElementById("clear");


var rID = 0;


var clear = function(){
    stopAnime();
    ctx.clearRect(0,0,canvas.width, canvas.height);
};


//FOR CIRCLE FUNCTIONALITY
var animateCircle = function(){

    window.cancelAnimationFrame(rID);
    var x = canvas.height/2
    var y = canvas.width/2
    var radiusSize = 0;

    //true if increasing, false if decreasing
    var upDown= true;
  
    var makeCircle = function(){
	clear();
	ctx.beginPath();
	ctx.arc(x,y,radiusSize,0,2*Math.PI);
	ctx.fill();
	if (radiusSize < x && upDown == true){
	    radiusSize++;
	}
	else if(radiusSize == x){
	    upDown = false;
	    radiusSize--;
	}
	else if (radiusSize > 0 && upDown == false){
	    radiusSize--;
	}
	else{
	    upDown = true;
	    radiusSize++;
	}


	rID = window.requestAnimationFrame(makeCircle);
    };
    makeCircle();
};

//FOR DVD FUNCTIONALITY


var randomStart = function(){
    var max = 475;
    var min = 0;
    return Math.floor(Math.random() * (max -min + 1) + min);
};


var animateDVD = function(){

    window.cancelAnimationFrame(rID);
    var x = randomStart();
    var y = randomStart();


    var bR = function(){
	x = x + 1.5;
	y = y + 1;
    }

    var tR = function(){
	x = x + 1.5;
	y = y - 1;
    }

    var tL = function(){
	x = x - 1.5;
	y = y - 1;
    }

    var bL = function(){
	x = x - 1.5;
	y = y + 1;
    }
	

    
    // 0 = bottom right; 1 = top right; 2 = top left; 3 = bottom left
    var dir = 0;



    var makeDVD = function(){
	clear();
	ctx.beginPath();

	var width = 125;
	var height = 50;
	
	ctx.fillRect(x,y,width,height);
	ctx.fill();

	var xMaxBound = canvas.width - width;
	var yMaxBound = canvas.height - height

	if (dir == 0){
	    if (y >= yMaxBound){
		dir = 1;
		tR();
	    }
	    if (x >= xMaxBound){
		dir = 3;
		bL();
	    }	
	    else{
		bR();
	    }
	}

	else if (dir == 1){
	    if (x >= xMaxBound){
		dir = 2;
		tL();
	    }
	    if(y <= 0){
		dir = 0;
		bR();
	    }
	    else{
		tR();
	    }
	}

	else if (dir == 2){
	    if (y <= 0){
		dir = 3;
		bL();
	    }
	    if (x <= 0){
		dir = 1;
		tR();
	    }		
	    else{
		tL();
	    }
	}
	//last case must be dir == 3
	else{
	    if (x <= 0){
		dir = 0;
		bR();
	    }
	    if (y >= yMaxBound){
		dir = 2;
		tL();
	    }
	    else{
		bL();
	    }
	}

	rID = window.requestAnimationFrame(makeDVD);
    };
    makeDVD();
};

var stopAnime = function(){
    window.cancelAnimationFrame(rID);
};


circleButton.addEventListener("click", animateCircle);
dvdButton.addEventListener("click",animateDVD);
stopButton.addEventListener("click", stopAnime);
clearButton.addEventListener("click", clear);
