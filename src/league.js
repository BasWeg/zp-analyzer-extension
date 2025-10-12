//import  { getData } from ('./common.js');

if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    doit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        doit();
    });
}

// var sc = document.createElement("script");
// sc.setAttribute("src", chrome.runtime.getURL('echart.js'));
// sc.setAttribute("type", "text/javascript");
// document.head.appendChild(sc);
// var sc = document.createElement("script");
// sc.src =  chrome.runtime.getURL('echart.js');
// document.documentElement.appendChild (sc);

async function doit() {
    const { getData } = await import ('./common.js');
    
    let g = document.createElement('div');
    g.setAttribute("class", "row");
    g.setAttribute("id", "summary_div");
    g.setAttribute("style", "padding: 15px;");

 const parent = document.querySelector("#page-body")
 const refel = document.querySelector("#page-body > div.tab-content")
 parent.insertBefore(g,refel);
let pa = document.createElement('div');
pa.setAttribute("class", "panel panel-blue panel-max-width");
g.appendChild(pa);

let h = document.createElement('div');
h.setAttribute("class", "panel-heading");
h.setAttribute("style", "padding: 5px;");

let p = document.createElement('div');
p.setAttribute("id", "my_row");
p.setAttribute("class", "panel-body");
p.setAttribute("style", "height:100%; width:100%; padding: 15px;");
pa.appendChild(h);
pa.appendChild(p);

var row2 = document.createElement('div');
row2.setAttribute("class", "row");
row2.setAttribute("id", "div_chart_effort");
row2.setAttribute("style", "display: none; padding: 15px;border-top: outset;");
p.appendChild(row2);

let dichartctrrl = document.createElement('div');
    dichartctrrl.setAttribute("id", "idchart_control");
row2.appendChild(dichartctrrl);  
let dichart = document.createElement('div');
            dichart.setAttribute("id", "effort_chart");
                dichart.setAttribute("style", "height:260px; width:100%; padding: 10px;");
row2.appendChild(dichart);
dichart = document.createElement('div');
            dichart.setAttribute("id", "effortspeed_chart");
                dichart.setAttribute("style", "height:180px; width:100%; padding: 10px;");
row2.appendChild(dichart);
dichart = document.createElement('div');
            dichart.setAttribute("id", "effortalt_chart");
                dichart.setAttribute("style", "height:180px; width:100%; padding: 10px;");
row2.appendChild(dichart);


 dichartctrrl.innerHTML = '<div id="idchart_select_xAxis" style="text-align: end;">'+
                '<select name="chart_select_xAxis" id="chart_select_xAxis">' +
                  '<option value="0">time</option>'+
                  '<option value="1">distance</option>'+
                '</select>'+
                '<select name="chart_select_watt" id="chart_select_watt">' +
                  '<option value="0">watt</option>'+
                  '<option value="1">wkg</option>'+
                '</select>'+
                '<select name="chart_select_smoothing" id="chart_select_smoothing">' +
                  '<option value="0">5s W smoothing</option>'+
                  '<option value="1">no W smoothing</option>'+
                '</select>'+ 
                '<div>';
                
// console.log(document.URL);

// eslint-disable-next-line no-undef
const myEffortWChart = echarts.init(document.getElementById('effort_chart'));
// eslint-disable-next-line no-undef
const myEffortALTChart = echarts.init(document.getElementById('effortalt_chart'));
// eslint-disable-next-line no-undef
const myEffortSPEEDChart = echarts.init(document.getElementById('effortspeed_chart'));
// eslint-disable-next-line no-undef
echarts.connect([myEffortWChart, myEffortALTChart, myEffortSPEEDChart]);

const myEffortWChartOptions = {
    title: {
      text: 'Race chart',
      left: 'center',
    },
        toolbox : {
          orient: 'vertical',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'area zooming' , back: 'restore zoom' }
                },
                saveAsImage: {
                  title: 'save as'
                }
            }
        },      
    legend: {
        left:'10%',
        bottom:0,
       },
        grid: {
            left: 50,
            right: 50,
            top: 40,
            bottom: 60
        },        
    dataZoom: [{
        type: 'slider',
        start: 0,
        end: 100,
        filterMode: 'filter',
        bottom:30,
        xAxisIndex: [0]
    },
    {
        type: 'inside',
        start: 0,
        end: 100,
        filterMode: 'filter',
        xAxisIndex: [0]
    }
    ], 
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        },
    },       
    xAxis: {
      type: 'value',
      name: 't(s)',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      name: 'W',
      type: 'value',

    },
    series: [
    {}
    ]
  };
  

  
const myEffortALTChartOptions = {
    legend: {
        left:'10%',
        show:false
       },
        toolbox : {
          show: false,
          orient: 'vertical',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'area zooming' , back: 'restore zoom' }
                },
                saveAsImage: {
                  title: 'save as'
                }
            }
        },       
   
        grid: {
            left: 50,
            right: 50,
            top: 30,
            bottom: 20
        },        
    dataZoom: [
    {
        type: 'slider',
        start: 0,
        end: 100,
        filterMode: 'filter',
        xAxisIndex: [0],
        show: false
    },
    {
        type: 'inside',
        start: 0,
        end: 100,
        filterMode: 'filter',
        xAxisIndex: [0]
    }
    ], 
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        },
    },       
    xAxis: {
      type: 'value',
      name: 't(s)',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      name: 'm',
      type: 'value',

    },
    series: [
    {}
    ]
  };  
  
const myEffortSPEEDChartOptions = {
    legend: {
        left:'10%',
        show:false
       },
        toolbox : {
          show: false,
          orient: 'vertical',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'area zooming' , back: 'restore zoom' }
                },
                saveAsImage: {
                  title: 'save as'
                }
            }
        },       
   
        grid: {
            left: 50,
            right: 50,
            top: 30,
            bottom: 20
        },        
    dataZoom: [
    {
        type: 'slider',
        start: 0,
        end: 100,
        filterMode: 'filter',
        xAxisIndex: [0],
        show: false
    },
    {
        type: 'inside',
        start: 0,
        end: 100,
        filterMode: 'filter',
        xAxisIndex: [0]
    }
    ], 
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        },
    },       
    xAxis: {
      type: 'value',
      name: 't(s)',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      name: 'km/h',
      type: 'value',

    },
    series: [
    {}
    ]
  };    
  
const effort_chart_dict = {
  0: {
    xAxis: {
      type: 'value',
      name: 't(s)',
      splitLine: {
        show: false
      }
    },
  },
  1: {
    xAxis: {
      type: 'value',
      name: 'km',
      splitLine: {
        show: false
      }
    },
  }
};

function effort_chart_w_axis(type) {
  let yaxis =  
    {
      name: 'W',
      type: 'value',
    };
    if (type) {
    yaxis =  
    {
      name: 'wkg',
      type: 'value',
    };
    }
  return yaxis;
}

  myEffortWChart.setOption(myEffortWChartOptions);
  myEffortALTChart.setOption(myEffortALTChartOptions);
  myEffortSPEEDChart.setOption(myEffortSPEEDChartOptions);


// const teamn = document.querySelector("#header_details > div.col-sm-7 > h3").textContent;
// console.log(teamn);

var riders = {};





function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

window.addEventListener('resize', function() {
    myEffortWChart.resize();
    myEffortALTChart.resize();
    myEffortSPEEDChart.resize();
});

console.log(document.URL);
let argument = document.URL.match(/[?&]id=([^&]+)/);
argument = {type: 'league', id: argument[1]};
console.log (argument);
// document.addEventListener('click', async function(e) {
// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList) => {
for (const mutation of mutationList) {
  if (mutation.addedNodes.length > 0)
  {
      for (var i = 0; i< mutation.addedNodes.length; i++)
      {
          const row =  mutation.addedNodes[i];
          inject_racereport_row(row);
      }
  }
}
};


// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
//const table_profile_results = document.getElementById("profile_results");
// Start observing the target node for configured mutations

    
// }, false);
setTimeout( function() {
  inject_racereport();
  observer.observe(league_standings, config);
}, 2000);

const league_standings = document.getElementById("league_standings");
function inject_racereport() {
 
  for (var i = 0; i < league_standings.rows.length; i++) {
      inject_racereport_row(league_standings.rows[i]);
      }
  }
  
function inject_racereport_row(row) {
  if (row.cells)
  {
       const rider_dom = (row.cells[2]) ? row.cells[2].getElementsByTagName('a')[0] : null;
         if(rider_dom){
          //console.log(rider_dom);
           let zwid = rider_dom.getAttribute('href').match(/[?&]z=([^&]+)/);
           zwid = zwid[1];
           const report_dom_div = row.cells[2].getElementsByTagName('div')[0];
           //console.log(report_dom_div);
           if (!report_dom_div.getAttribute('fera')) {
            let i_dom = document.createElement('i');
            i_dom.setAttribute('id',`report_${zwid}`);
            i_dom.setAttribute("class","fa fa-file-text fa-2 text-gray hover-orange");
            //report_dom_div.appendChild(i_dom);  
            report_dom_div.insertBefore(i_dom,rider_dom);   
            //report_dom_div.setAttribute('style',"display: flex;");
            report_dom_div.setAttribute('fera',true);
          }
         }
      }
}




var rider_efforts = [];
var effort_xAxis = 0;
var effort_watt = 0;
var effort_smoothing = 0;
document.getElementById('league_standings').addEventListener('click', async function(e) {
    //console.log(e.target.id);
    if (e.target.id.includes("report_")) {
      const target_dom = e.target;
      if (target_dom.getAttribute('class').includes('text-gray')) {
        target_dom.setAttribute("class","fa fa-file-text fa-2 text-orange hover-gray");
      } else {
        target_dom.setAttribute("class","fa fa-file-text fa-2 text-gray hover-orange");
      }
      const id = e.target.id.replace("report_", "");
      updateEffortDict(id);
    }
}, false);

const effort_colors =
{0:"#979dc2",
1:"#8dd055",
2:"#bc4bcb",
3:"#cca856",
4:"#5d4aac",
5:"#87cbaf",
6:"#c1523a",
7:"#55643c",
8:"#c25b88",
9:"#4b2f43"}

async function updateEffortDict(id)
{
       if (id.isNaN) return;
      const sel_rider =  riders.filter(item => item.zwid == id);
      //console.log(sel_rider);
      //if (sel_rider[0].src != 1) return;
      const found = rider_efforts.find(el => el.id === id);
      const used_colors = rider_efforts.map(item => { return item.color_num });
      // console.log(used_colors);
      let free_color = null;
      // find free color
      for (let i = 0; i < 10; i++)
      {
        if (!used_colors.includes(i)){
          free_color = i;
          break;
        }
      }
      
      if (!found)
      {      
      // fetch activities for this series for certain id
        const rdata = await getData({type: 'league_rider_results', id: id,leagueid:argument.id}); 
        const rdata_best = rdata.data[0];        
        const rider_activities = await getData({type: 'profile', id: id});
        const activity = rider_activities.data.filter(item => item.zid == rdata_best.zid);
        // console.log(activity);
        if (activity[0].src != 1) {
          // show notification that this event is not public, therefore no fit file to parse
          alert(`Rider ${sel_rider[0].name} event is not public, no fit file to parse`);
          return; // no fit file parsed
        }

        let rider_effort = {};
        rider_effort.id = id;
        rider_effort.name = sel_rider[0].name;
        rider_effort.weight = rider_activities.data.filter(item => item.zid == rdata_best.zid).map(item => {return parseFloat(item.weight[0])});

        rider_effort.color_num = free_color; 
        //console.log(rdata);

        //console.log(rdata_best);
        const data = await getData({type: 'analysis', id: id,eventid:rdata_best.zid}); 
        // console.log(data);


        //data.sort((a, b) => a.event_date - b.event_date);


        //rider_effort.weight = riders.filter(item => item.zwid == id).map(item => {return parseFloat(item.weight[0])});
        const all_data = (data.x2Data) ? data.x2Data.map((element, index) => 
            {
                const wkg=Math.round((data.datasets[1].data[index] / rider_effort.weight)*100)/100; 
                return {time: element, // time
                        dist: data.xData[index], // dist
                        watt: data.datasets[1].data[index], //watt
                        wkg: wkg, // wkg
                        alt: data.datasets[0].data[index], //alt
                        speed: (index > 1) ?   ((data.xData[index]-data.xData[index-1])/(data.x2Data[index] - data.x2Data[index-1]))*3600 : 0}}) : 
                        [];
//filterExtremeSpeedChanges(all_data);
        rider_effort.data = all_data.map(item => {
            const before5 = item.time - 5;
            const before10 = item.time - 16;
            const filteredData5 = all_data.filter(d => d.time > before5 && d.time <= item.time);
            const watt_avg5 = Math.round((filteredData5.reduce((acc, curr)=> acc + curr.watt, 0)/filteredData5.length));
            const wkg_avg5 = Math.round((filteredData5.reduce((acc, curr)=> acc + curr.wkg, 0)/filteredData5.length)*100)/100;
            const filteredData10 = all_data.filter(d => d.time > before10 && d.time <= item.time);
            const speed_avg10 = Math.round((filteredData10.reduce((acc, curr)=> acc + curr.speed, 0)/filteredData10.length)*10)/10;
            return {...item, watt_avg5, wkg_avg5, speed_avg10};
        });
        
        const data_arr = all_data.map(item => { return [item.watt, item.speed]; });
        const watt_avg = data_arr.reduce((acc, curr)=> acc + curr[0], 0)/data_arr.length;
        const speed_avg = data_arr.reduce((acc, curr)=> acc + curr[1], 0)/data_arr.length;
        rider_effort.watt_avg = Math.round(watt_avg);
        rider_effort.speed_avg = Math.round(speed_avg*10)/10;
        console.log(rider_effort);
        rider_efforts.push(rider_effort);
        updateEffortChart();
      } else {
        // remove 
        rider_efforts = rider_efforts.filter(item => item.id != id);
        updateEffortChart();
      }
}


function updateEffortChart() {
    const xAxis = effort_xAxis;
    const wseries = [];
    const altseries = [];
    const speedseries = [];
    for (let i in rider_efforts) {
      const rider = rider_efforts[i];
        let wserie = {name: htmlDecode(rider.name), type: 'line', showSymbol: false};
        if (rider.color_num) wserie.color = effort_colors[rider.color_num];
        //const id = rider.id;
        wserie.data = [];
        let altserie = {name: htmlDecode(rider.name), type: 'line', showSymbol: false};
        if (rider.color_num) altserie.color = effort_colors[rider.color_num];
        altserie.data = [];
        let speedserie = {name: htmlDecode(rider.name), type: 'line', showSymbol: false};
        if (rider.color_num) speedserie.color = effort_colors[rider.color_num];
        speedserie.data = [];        

        if (xAxis == 0) {
          wserie.data = (rider.data)? rider.data.map(row => {return [row.time, (effort_watt) ? 
                                                                                      ((!effort_smoothing) ? row.wkg_avg5 : row.wkg)
                                                                                    : ((!effort_smoothing) ? row.watt_avg5 : row.watt)]}) : [];
          altserie.data = (rider.data)? rider.data.map(row => {return [row.time, row.alt]}) : [];
          speedserie.data = (rider.data)? rider.data.map(row => {return [row.time, row.speed_avg10]}) : [];
        } 
        else
        {
          wserie.data = (rider.data)? rider.data.map(row => {return [row.dist, (effort_watt) ? 
                                                                                      ((!effort_smoothing) ? row.wkg_avg5 : row.wkg)
                                                                                    : ((!effort_smoothing) ? row.watt_avg5 : row.watt)]}) : [];
          altserie.data = (rider.data)? rider.data.map(row => {return [row.dist, row.alt]}) : [];
          speedserie.data = (rider.data)? rider.data.map(row => {return [row.dist, row.speed_avg10]}) : [];
        }
        wseries.push(wserie);
        altseries.push(altserie);
        speedseries.push(speedserie);
      }
      var woptions = Object.assign({}, effort_chart_dict[xAxis]);
      woptions.yAxis = effort_chart_w_axis(effort_watt);
      woptions.series = wseries;
      
      var altoptions = Object.assign({}, effort_chart_dict[xAxis]);
      altoptions.series = altseries;  
      var speedoptions = Object.assign({}, effort_chart_dict[xAxis]);
      speedoptions.series = speedseries;        
      
      
      if (wseries.length == 0)
      {
        row2.style.display = 'none';
      }
      else
      {
        row2.style.display = "block";
        myEffortWChart.resize();
        myEffortALTChart.resize();
        myEffortSPEEDChart.resize();
      }
      myEffortWChart.setOption(woptions,{ replaceMerge: 'series' });
      myEffortALTChart.setOption(altoptions,{ replaceMerge: 'series' });
      myEffortSPEEDChart.setOption(speedoptions,{ replaceMerge: 'series' });


}

document.getElementById('chart_select_xAxis').addEventListener('change', function() {
    effort_xAxis = parseInt(this.value);
    updateEffortChart();
});
document.getElementById('chart_select_watt').addEventListener('change', function() {
    effort_watt = parseInt(this.value);
    updateEffortChart();
});
document.getElementById('chart_select_smoothing').addEventListener('change', function() {
    effort_smoothing = parseInt(this.value);
    updateEffortChart();
});

getData(argument).then(async function(myjson) {
  // if (!myjson.data) return;
    riders =  myjson.data;
    //console.log(riders);
   });
}
