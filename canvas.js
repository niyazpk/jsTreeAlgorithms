// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
  // Override draw function, by default it will be called 60 times per second
  processing.draw = function() {
    // determine center and max clock arm length
    var centerX = processing.width / 2, centerY = processing.height / 2;
    var maxArmLength = Math.min(centerX, centerY);

	var curr_x = centerX;
	var curr_y = 0;
	
    function displayTree(node, depth){
		processing.ellipse(curr_x, curr_y, 20, 20);
		curr_y = curr_y + 25;
		curr_x = 0;
		for(var child in node.children){
			curr_x = curr_x + (processing.width/leaves)/2;
			displayTree(node.children[child], depth-1);
		}
		curr_y = curr_y - 25;
	}

    // erase background
    processing.background(224);

    displayTree(node, depth);
    
  };
  
}

var canvas = document.getElementById("canvas");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it
