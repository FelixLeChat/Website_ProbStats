
var margin,x,y,xAxis,yAxis,svg;


function initialiseBarGraph(){
   margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;

   x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

   y = d3.scale.linear()
    .range([height, 0]);

   xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

   yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

   svg = d3.select(".BarGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function type(d) {
  d.frequence = +d.frequence;
  return d;
}


/* Test pour changer les informations du graph */
var dataGraph = new Array();

/* Initialise le tableau des informations pour le graph */
function initialiseGraph(){


  dataGraph[0] = { pairs: "Pas de paires", frequence: 0};
  dataGraph[1] = { pairs: "Au moins une paire", frequence: 0};

  x.domain(dataGraph.map(function(d) {
    return d.pairs; 
  }));

  y.domain([0, 1]);
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);  
}

function modifyGraph(data){

    x.domain(data.map(function(d) {
      return d.pairs; 
    }));

    y.domain([0, 1]);

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.pairs); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequence); })
        .attr("height", function(d) { return height - y(d.frequence); });
}