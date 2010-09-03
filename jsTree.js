const INFINITY = 99999; 	//Put a large number in here.

function jsTree(depth, leaves) {
	var node = new Object();
	node.value=0;
	node.terminal = function(){return false;};
	node.children = new Array;
	if(depth > 0){
		for(var i = leaves;i > 0;i--){
			node.children.push(jsTree(depth-1, leaves));
		}
	}
	if(depth==0) {node.value=Math.round(9 * Math.random(6))}
	return node;
}

function displayTree(node){
	var	str = "";
	
	function createTreeHTML(node){
		str = str + "<div><p>" + node.value + "</p>";
		for(var child in node.children){
			createTreeHTML(node.children[child]);	
		}
		str = str + "</div>";
	}
	
	createTreeHTML(node);
	$('#tree-container').html(str);
}

function minimax(node, depth){
	if((node.terminal)() == true || depth == 0)
		return evaluate(node);
	a = -INFINITY;
	for(var child in node.children){
		a = Math.max(a, -minimax(node.children[child], depth-1));	
	}
	node.value = a;
	console.log(a);
	return a;
}

function evaluate(node){
	return node.value;
}
