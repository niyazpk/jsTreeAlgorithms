// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
  // Override draw function, by default it will be called 60 times per second
    frameRate(5);
    processing.draw = function() {
    // determine center and max clock arm length
	var centerX = processing.width / 2, centerY = processing.height / 2;
	var maxArmLength = Math.min(centerX, centerY);

	var curr_x = centerX;
	var curr_y = 10;
	var total_width = processing.width;
	
	function displayTree(node, depth){	    
	    processing.fill(60*depth, 100, 100);
	    processing.ellipse(curr_x, curr_y, 20, 20);
	    curr_y = curr_y + 25;
	    var num_nodes_in_level = Math.pow(LEAVES, (DEPTH-depth+1));
	    //if(depth==4){console.log(num_nodes_in_level);}
	    for(var child in node.children){
		//console.log(node.children.length);
		var multiplier = (child >= node.children.length/2 ? 1 : -1);
		//console.log(multiplier);
		curr_x = curr_x + multiplier * (total_width/(num_nodes_in_level)) / 2;
		displayTree(node.children[child], depth-1);
		curr_x = curr_x - multiplier * (total_width/(num_nodes_in_level)) / 2;
	    }
	    curr_y = curr_y - 25;
 
	}

	// erase background
	processing.background(224);
	displayTree(node, DEPTH);
    
    };
    
}

var canvas = document.getElementById("canvas");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it
