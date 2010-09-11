// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
  // Override draw function, by default it will be called 60 times per second
    frameRate(5);
    processing.draw = function() {
    // determine center and max clock arm length
	var centerX = processing.width / 2, centerY = processing.height / 2;
	var maxArmLength = Math.min(centerX, centerY);

	var curr_x = centerX;
	var curr_y = 20;
	var total_width = processing.width;
	
	function displayTree(node, depth){

	    var prev_x = curr_x;
	    var prev_y = curr_y;	    

	    curr_y = curr_y + 65;
	    var num_nodes_in_level = Math.pow(LEAVES, (DEPTH-depth+1));

	    for(var child in node.children){
		var multiplier = (child >= node.children.length/2 ? 1 : -1);
		curr_x = curr_x + multiplier * (total_width/(num_nodes_in_level)) / 2;
		stroke(#AAAAAA);
		line(prev_x, prev_y, curr_x, curr_y);
		displayTree(node.children[child], depth-1);
		curr_x = curr_x - multiplier * (total_width/(num_nodes_in_level)) / 2;
	    }

	    curr_y = curr_y - 65;

	    if(node.status==0){
		processing.fill(#AAAAAA);
	    }else if(node.status==1){
		processing.fill(#55C876);
	    }else{
		processing.fill(#cc5555);
	    }
	    noStroke();
	    processing.ellipse(prev_x, prev_y, 30, 30);

	    PFont fontA = loadFont("Courier New Bold");
	    textFont(fontA, 16);
	    textAlign(CENTER);
	    fill(255);
	    text(node.value, prev_x, prev_y+5);
 
	}

	processing.background(255);
	displayTree(node, DEPTH);
    
    };
    
}

var canvas = document.getElementById("canvas");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it
