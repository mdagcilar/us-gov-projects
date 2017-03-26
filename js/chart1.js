/*
* Chart2.js
*
*
*/

  /*
  Visual #1 

  Visualisation is a Weighted Tree which starts from a single parent node.
   Clicking on parent node will show all the AGENCIES as child node. Clicking
    on child node will show all their project INVESTMENT TITLE as another child 
    node and further clicking on each child node will show PROJECT TITLE as leaf node.
     Each node will show budget being allocated as it expands. It sums up the budget
      and uses thicker link to represent bigger budgets and vice versa. Different colours
       are being used to represent each individual agency.

  Agency_Name
  
  Planned_Project_Completion_Date_B2
  Projected_Actual_Project_Completion_Date_B2

  Planned_Cost_dollar_M
  Lifecycle_Cost

  Start_Date
  Completion_Date_B1 

    Visual #2

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

  */


  var margin = {top: 30, right: 60, bottom: 30, left: 60},
      width = 810 - margin.left - margin.right,   //width of svg
      height = 440 - margin.top - margin.bottom;  //height of svg
      padding = 70;


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



  // Get the data
  d3.csv("../resources/usopendata.csv", function(error, data) {
    //throw error
    if(error) throw error;

    /*
    data.forEach(function(d) {
      Unique_Investment_Identifier = d.Unique_Investment_Identifier;
      Business_Case_ID = +d.Business_Case_ID;
      Agency_Code = +d.Agency_Code;
      Agency_Name = d.Agency_Name;
      Investment_Title = d.Investment_Title;
      Project_ID = +d.Project_ID;
      Agency_Project_ID = d.Agency_Project_ID;
      Project_Name = d.Project_Name;
      Project_Description = d.Project_Description;
      Completion_Date_B1 = new Date(d.Completion_Date_B1);
      Start_Date = new Date(d.Start_Date);
      Planned_Project_Completion_Date_B2= new Date(d.Planned_Project_Completion_Date_B2);
      Projected_Actual_Project_Completion_Date_B2 = new Date(d.Projected_Actual_Project_Completion_Date_B2);
      Lifecycle_Cost = + d.Lifecycle_Cost;
      Schedule_Variance_days = + d.Schedule_Variance_days;
      Schedule_Variance_percentage = + d.Schedule_Variance_percentage;
      Cost_Variance_dollar_M = + d.Cost_Variance_dollar_M;
      Cost_Variance_percentage = + d.Cost_Variance_percentage;
      Planned_Cost_dollar_M  = + d.Planned_Cost_dollar_M;
      Projected_slash_Actual_Cost_dollar_M  = + d.Projected_slash_Actual_Cost_dollar_M;
      Updated_Date = new Date(d.Updated_Date);
      Updated_Time = new Date(d.Updated_Time);
      Unique_Project_ID = d.Unique_Project_ID;
    });
    */

    // parse the data
    data.forEach(function(d) {
      Agency_Name = d.Agency_Name;
      Project_isDelayed = +d.Project_isDelayed;
      Planned_Project_Completion_Date_B2= new Date(d.Planned_Project_Completion_Date_B2);
      Projected_Actual_Project_Completion_Date_B2 = new Date(d.Projected_Actual_Project_Completion_Date_B2);
    });

    console.log(data[1]);

  
    var pie = d3.pie()
    .sort(null)
    .value(function(d) {return d.Lifecycle_Cost;});

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
        .style("fill", function(d) { return color(d.data.Agency_Name); });


  });


