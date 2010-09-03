const INFINITY = 99999; 	// Put a large number in here.
var isItTimeYet;			// Used to introduce delay in various methods


// Function to get a tree of desired depth and leaves
function jsTree(depth, leaves) {
	var node = new Object();
	node.value = 0;
	node.status = 0;
	node.terminal = function(){return false;};
	node.children = new Array;
	if(depth > 0){
		for(var i = leaves; i > 0; i--){
			node.children.push(jsTree(depth-1, leaves));
		}
	}
	if(depth==0) {node.value=Math.round(9 * Math.random(6))}
	return node;
}

// Function to display the tree in the HTML page.
function displayTree(node){
	var	str = "";
	function createTreeHTML(node){
		str = str + "<div><p class='status-" + node.status+ "'>" + node.value + "</p>";
		for(var child in node.children){
			createTreeHTML(node.children[child]);	
		}
		str = str + "</div>";
	}
	createTreeHTML(node);
	$('#tree-container').html(str);
}

// Evaluation function
function evaluate(node){
	return node.value;
}

function resetStatus(node, depth){
	node.status = 0;
	if((node.terminal)() == true || depth == 0)
		return;
	for(var child in node.children){
		resetStatus(node.children[child], depth-1);
	}
}

// Minimax algorithm
function minimax(node, depth){
	node.status = 1;
	if((node.terminal)() == true || depth == 0)
		return evaluate(node);
	a = -INFINITY;
	for(var child in node.children){
		a = Math.max(a, -minimax(node.children[child], depth-1));
	}
	node.value = a;
	return a;
}

// AlphaBeta algorithm
function alphabeta(node, alpha, beta, depth){
	node.status = 1;
	if((node.terminal)() == true || depth == 0)
		return evaluate(node);
	a = -INFINITY;
	for(var child in node.children){
		a = Math.max(a, -alphabeta(node.children[child], alpha, beta, depth-1));
	}
	node.value = a;
	return a;
}
