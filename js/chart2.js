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


  // Get the data
  d3.csv("../resources/usopendata.csv", function(error, data) {
    //throw error
    if(error) throw error;

    data.forEach(function(d) {
      Agency_Name = d.Agency_Name;
      Investment_Title = d.Investment_Title;
      Project_Name = d.Project_Name;
      Projected_slash_Actual_Cost_dollar_M  = + d.Projected_slash_Actual_Cost_dollar_M;
    });
    console.log(data[1]);

  


  });


