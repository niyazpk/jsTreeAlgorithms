// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
  // Override draw function, by default it will be called 60 times per second
    processing.draw = function() {
    // determine center and max clock arm length
	var centerX = processing.width / 2, centerY = processing.height / 2;
	var maxArmLength = Math.min(centerX, centerY);

	var curr_x = centerX;
	var curr_y = 10;
	var total_width = processing.width;
	//curr_x = total_width / 2;
	
	function displayTree(node, depth){	    
	    processing.fill(40*depth, 100, 100);
	    processing.ellipse(curr_x, curr_y, 20, 20);
	    curr_y = curr_y + 25;
	    num_nodes_in_level = Math.pow(LEAVES, (DEPTH-depth));
	    curr_x = curr_x - total_width * 2 /(num_nodes_in_level + 1);   
	    for(var child in node.children){
		//console.log(child);
		curr_x = curr_x + (child + 1) * (total_width/(num_nodes_in_level + 1));
		displayTree(node.children[child], depth-1);
		curr_x = curr_x - (child + 1) * (total_width/(num_nodes_in_level + 1));
	    }
	    curr_y = curr_y - 25;
	    curr_x = curr_x + total_width * 2 /(num_nodes_in_level+1);
	    //curr_x = curr_x - child * (processing.width/(num_nodes_in_level+1)); 
	}

	// erase background
	processing.background(224);
	displayTree(node, DEPTH);
	//console.log(curr_x, curr_y);
    
    };
    
}

var canvas = document.getElementById("canvas");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it
