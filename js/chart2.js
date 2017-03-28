/*
* Chart2.js
*
*
*/
  /*
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
  d3.csv("../resources/usopendata_visual2.csv", function(error, data) {
    //throw error
    if(error) throw error;

    data.forEach(function(d) {
      Agency_Name = d.Agency_Name;
      Lifecycle_Cost = +d.Lifecycle_Cost;
      Project_isDelayed = +d.Project_isDelayed;
      Start_Date = new Date(d.Start_Date);
      Planned_Project_Completion_Date_B2= new Date(d.Planned_Project_Completion_Date_B2);
      Projected_Actual_Project_Completion_Date_B2 = new Date(d.Projected_Actual_Project_Completion_Date_B2);
    });


    var nestedData = { "key": "Agency_Name", "values":
     d3.nest()
      .key(function(d){ return d.Agency_Name; })
      .entries(data)
    };

    console.log(data[0]);

  

  });


