/**
 *
 * 
 */

  var margin = {top: 30, right: 60, bottom: 30, left: 60},
      width = 810 - margin.left - margin.right,   //width of svg
      height = 440 - margin.top - margin.bottom;  //height of svg
      padding = 70;
      radius = Math.min(width, height) / 2;     


  // var data = [
  //   {"Agency_Name": "dol", "Lifecycle_Cost" : 10},
  //   {"Agency_Name": "dol", "Lifecycle_Cost" : 20},
  //   {"Agency_Name": "doa", "Lifecycle_Cost" : 50}
  //   ];
  // console.log(data);

  var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  


  /*
  Visual #1

  Which agencies completed their projects in their estimated time.

Chart:
  Bar chart
  Pie chart
  Line chart

Data:
  Agency_Name

Calculate the difference between these two dates:
  Javascript
  Excel
    Planned_Project_Completion_Date_B2
    Projected_Actual_Project_Completion_Date_B2

    negative values - Finished early
    0 - on time
    positive - Late




  Visual #2 

  Agency_Name
  
  Planned_Project_Completion_Date_B2
  Projected_Actual_Project_Completion_Date_B2

  Planned_Cost_dollar_M
  Lifecycle_Cost

  Start_Date
  Completion_Date_B1 

  */


  function groupProjectDelayed(d) {
    if(d.Project_isDelayed > 0){
        console.log("d");
        return 1;
      }else if(d.Project_isDelayed < 0){
        return -1;
      }else{
        return 0;
      }
  }

  // function cleanAgencyNames(d){
  //   rData [];

  //   for(var i=0; i<d.length; i++){
  //     lookUp = d[i].Agency_Name;

  //     if(rData.indexOf(lookUp) > -1){
  //       rData.indexOf(d[i].Agency_Name)
  //     }else{
  //       rData = {"Agency_Name" : rData[i].Project_isDelayed, "Project_isDelayed" : rData[i].Project_isDelayed, "Count" : 1};
  //     }

  //   }


  //   return returnedData;
  // }

  // Get the data
  d3.csv("resources/usopendata_visual1.csv", function(error, data) {
    //throw error
    if(error) throw error;

    // parse the data
    data.forEach(function(d) {
      Agency_Name = d.Agency_Name;
      Project_isDelayed = groupProjectDelayed(d);
    });

    //data = cleanAgencyNames(data);

    console.log(data[1]);

  
    var pie = d3.pie()
    .sort(null)
    .value(function(d) {return d.Project_isDelayed} );

    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.Project_isDelayed); });


  });


