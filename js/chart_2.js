/*
* Chart2.js
*
*
*/

/*
############################################
			Get the csv data
############################################
*/

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = screen.width -200 - margin.left - margin.right,
    height = screen.height +75 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

// Add tooltip div
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

function collapseAll() {
	root.children.forEach(collapse);
	update(root);
}

//define empty update func
var update = function update(){

}
//define collapse update func
var collapse = function collapse(){

}


d3.csv("../resources/usopendata_visual2.csv", function(error, data) {
	//throw error
	if(error) throw error;

	data.forEach(function(d) {
	  Agency_Name = d.Agency_Name;
	  Investment_Title = d.Investment_Title;
	  Project_Name = d.Project_Name;
	  Projected_slash_Actual_Cost_dollar_M  = +d.Projected_slash_Actual_Cost_dollar_M;
	});


	var nestedTreeData = { "key": "Agency", "values":
	 d3.nest()
		.key(function(d){ return d.Agency_Name; })
		.key(function(d){ return d.Investment_Title; })
		.key(function(d){ return d.Project_Name; })
		.entries(data)
	};

	console.log(nestedTreeData);

	var treeData = { "name": "US Agency", "children":
		nestedTreeData.values.map( function(major){

			return { "name": major.key, "children": 
				major.values.map (function(region){

					return { "name": region.key, "children":
						region.values.map(function(country){

							return { "name": country.key, "children": country.values };

						})//end of map(function(country){
					};

				})//end of map (function(region){
			};

		})//end of map( function(major)
	};//end of var declaration

	//TODO remove log 
	console.log(treeData);


	// Assigns parent, children, height, depth
	root = d3.hierarchy(treeData, function(d) { return d.children; });
	root.x0 = height / 2;
	root.y0 = 0;

	// Collapse the node and all it's children
	collapse = function collapse(d) {
	  if(d.children) {
	    d._children = d.children
	    d._children.forEach(collapse)
	    d.children = null
	  }
	}

	// Collapse after the second level
	root.children.forEach(collapse);
	update(root);

	

	update = function update(source){
		// Assigns the x and y position for the nodes
		var treeData = treemap(root);

		// Compute the new tree layout.
		var nodes = treeData.descendants(),
			links = treeData.descendants().slice(1);

		// Normalize for fixed-depth.
  		nodes.forEach(function(d){ d.y = d.depth * 180});

  		// ########################################################
  		// ****************** Nodes section ***************************

		// Update the nodes...
		var node = svg.selectAll('g.node')
		  .data(nodes, function(d) {return d.id || (d.id = ++i); });


		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append('g')
		  .attr('class', 'node')
		  .attr("transform", function(d) {
		    return "translate(" + source.y0 + "," + source.x0 + ")";		})
		.on('click', click)
		.on("mouseover", mouseover)
        .on("mousemove", function(d){mousemove(d);})
        .on("mouseout", mouseout);

		// Add Circle for the nodes
		nodeEnter.append('circle')
		  .attr('class', 'node')
		  .attr('r', 1e-6)
		  .style("fill", function(d) {
		      return d._children ? "lightsteelblue" : "#fff";
		  });


		// Add labels for the nodes
		nodeEnter.append('text')
		  .attr("dy", ".120em")
		  .attr("x", function(d) {
		      return d.children || d._children ? -13 : 13;
		  })
		  .attr("text-anchor", function(d) {
		      return d.children || d._children ? "end" : "start";
		  })
		  .text(function(d) {
		  	if(d.data.name) 
		  		return d.data.name.substring(0,23); 
		  });

		// UPDATE
		var nodeUpdate = nodeEnter.merge(node);

		// Transition to the proper position for the node
		nodeUpdate.transition()
			.duration(duration)
			.attr("transform", function(d) { 
		    return "translate(" + d.y + "," + d.x + ")";
		 });

		// Update the node attributes and style
		nodeUpdate.select('circle.node')
			.attr('r', 10)
			.style("fill", function(d) {
		    return d._children ? "lightsteelblue" : "#fff";
		})
			.attr('cursor', 'pointer');


		// Remove any exiting nodes
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) {
		    	return "translate(" + source.y + "," + source.x + ")";
			})
		  	.remove();

		// On exit reduce the node circles size to 0
		nodeExit.select('circle')
			.attr('r', 1e-6);

		// On exit reduce the opacity of text labels
		nodeExit.select('text')
			.style('fill-opacity', 1e-6);


		//########################################################
		// ****************** links section ***************************

		// Update the links...
		var link = svg.selectAll('path.link')
		  .data(links, function(d) { return d.id; });

		// Enter any new links at the parent's previous position.
		var linkEnter = link.enter().insert('path', "g")
		  .attr("class", "link")
		  .attr('d', function(d){
		    var o = {x: source.x0, y: source.y0}
		    return diagonal(o, o)
		  });

		// UPDATE
		var linkUpdate = linkEnter.merge(link);

		// Transition back to the parent element position
		linkUpdate.transition()
		  .duration(duration)
		  .attr('d', function(d){ return diagonal(d, d.parent) });

		// Remove any exiting links
		var linkExit = link.exit().transition()
		  .duration(duration)
		  .attr('d', function(d) {
		    var o = {x: source.x, y: source.y}
		    return diagonal(o, o)
		  })
		  .remove();

		// Store the old positions for transition.
		nodes.forEach(function(d){
		d.x0 = d.x;
		d.y0 = d.y;
		});

		// Creates a curved (diagonal) path from parent to the child nodes
		function diagonal(s, d) {

		path = `M ${s.y} ${s.x}
		        C ${(s.y + d.y) / 2} ${s.x},
		          ${(s.y + d.y) / 2} ${d.x},
		          ${d.y} ${d.x}`

		return path
		}

		// Toggle children on click.
		function click(d) {
		if (d.children) {
		    d._children = d.children;
		    d.children = null;
		  } else {
		    d.children = d._children;
		    d._children = null;
		  }
		update(d);
		}

		//end reading update function
		}


		

		//#################################################################
		//						mouse event functions
		//#################################################################
		function mouseover() {
	        div.transition()
	        .duration(300)
	        .style("opacity", 1);
	    }

	    function mousemove(d) {
	        div
	        .text(function(){
	        	if(d.data.name !=null)
	        		return d.data.name;
	        })
	        .style("left", (d3.event.pageX ) + "px")
	        .style("top", (d3.event.pageY) + "px");
	    }

	    function mouseout() {
	        div.transition()
	        .duration(300)
	        .style("opacity", 1e-6);
	    }


// End reading csv
});




