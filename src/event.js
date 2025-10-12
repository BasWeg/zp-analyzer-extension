function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
  console.log("injected")
}

setTimeout( async function() {
  window.addEventListener('message', handleFromWeb);
  // eslint-disable-next-line no-undef
  injectScript(chrome.runtime.getURL("event_inject.js"), 'body');
}, 1000);

if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
      // eslint-disable-next-line no-undef
  //injectScript(chrome.runtime.getURL("event_inject.js"), 'body');
//    doit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
          // eslint-disable-next-line no-undef
  //injectScript(chrome.runtime.getURL("event_inject.js"), 'body');
    //    doit();
    });
}

var ZP_VARS = {};

const handleFromWeb = async (event) => {
  if (event.data.from) {
      const data = event.data.data.data;
      // console.log(`process from ${event.data.from}`);
      // console.log(event.data.data);
      
      if (event.data.data.type == "event_inject")
      {
        ZP_VARS = await data;
        // console.log(ZP_VARS);
        doit();
      }
      //getActivity(activity_id,data.sessionTokens.accessToken);
  }
};
// var sc = document.createElement("script");
// sc.setAttribute("src", chrome.runtime.getURL('echart.js'));
// sc.setAttribute("type", "text/javascript");
// document.head.appendChild(sc);
// var sc = document.createElement("script");
// sc.src =  chrome.runtime.getURL('echart.js');
// document.documentElement.appendChild (sc);
const category_dict= {
    0: null,
    5: 'A+',
    10: 'A',
    20: 'B',
    30: 'C',
    40: 'D',
};
function get_float (item) {
    return (item) ? ((parseFloat(item[1].replace(',','')) == 0.0) ? null : parseFloat(item[1].replace(',',''))) : null;
}
function get_float0 (item) {
    return (item) ? ((parseFloat(item[0].replace(',','')) == 0.0) ? null : parseFloat(item[0].replace(',',''))) : null;
}

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

let p2 = document.createElement('div');
p2.setAttribute("class", "row");
p2.setAttribute("id", "control_charts");
p2.setAttribute("style", "text-align: right;padding-right: 15px;");
p.appendChild(p2);

 let p1 = document.createElement('div');
 p1.setAttribute("class", "row");
 p1.setAttribute("id", "charts");
 p1.setAttribute("style", "display: flex; padding: 15px;height:430px;");
 p.appendChild(p1);

 let g1 = document.createElement('div');
 g1.setAttribute("id", "summary_chart");
 g1.setAttribute("style", "height:400px; width:30%; padding: 20px;");
 p1.appendChild(g1);
 let g4 = document.createElement('div');
 g4.setAttribute("id", "scatter_chart");
 g4.setAttribute("style", "height:400px; width:70%; padding: 20px;");
 p1.appendChild(g4);  
//  let g2 = document.createElement('div');
//  g2.setAttribute("id", "prop_chart");
//  g2.setAttribute("style", "height:400px; width:40%; padding: 20px;");
//  p1.appendChild(g2); 
//  const g3 = document.createElement('progress');
//  g3.setAttribute("id", "progress");
//  g3.setAttribute("max", "1");
//  g3.setAttribute("value", "0");
//  g3.setAttribute("style", "position: absolute; left: 20%; width: 60%; padding: 10px;");
//  p1.appendChild(g3); 
 p2.innerHTML = '<select name="chart_select_duration" id="chart_select_duration">' +
                '<option value="0">20 min</option>'+
                '<option value="1">5 min</option>'+
                '<option value="2">1 min</option>'+
                '<option value="3">15 sec</option></select>';

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
const myScatterChart = echarts.init(document.getElementById('scatter_chart'));
// eslint-disable-next-line no-undef
//const myPropChart = echarts.init(document.getElementById('prop_chart'));
// eslint-disable-next-line no-undef
const myChart = echarts.init(document.getElementById('summary_chart'));
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
var duration = '20min';
const teamn = document.querySelector("#header_details > div.col-sm-7 > h3").textContent;
// console.log(teamn);

var riders = {};

const duration_dict = {
0: '20 min',
1: '5 min',
2: '1 min',
3: '15 sec',
};



document.getElementById('chart_select_duration').addEventListener('change', function() {
    let chart_options = myScatterChart.getOption();
    chart_options.series = chart_options.series.map(elem => {
        elem.encode =  {
            x: 6+this.value*2,
            y: 7+this.value*2,
            tooltip: [6+this.value*2, 7+this.value*2],
          } ;
        return elem;
        });
        duration = duration_dict[this.value];
 
    chart_options.title[0].subtext = `${duration} power scatter`;
    myScatterChart.setOption(chart_options);
});

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

window.addEventListener('resize', function() {
    myChart.resize();
    myScatterChart.resize();
    myEffortWChart.resize();
    myEffortALTChart.resize();
    myEffortSPEEDChart.resize();
});

// console.log(document.URL);
let argument = document.URL.match(/[?&]zid=([^&]+)/);
argument = {type: 'event', id: argument[1]};
// console.log (argument);

function changeScatterChartDataset(value) {
    let chart_options = myScatterChart.getOption();
    chart_options.series = [
      {
        datasetIndex: 1+value*10+60,
      },
      {
        datasetIndex: 2+value*10+60,
      },          
      {
        datasetIndex: 3+value*10+60,  
      },
      {
        datasetIndex: 4+value*10+60,
      },
      {
        datasetIndex: 5+value*10+60,
      },
      
      {
        datasetIndex: 1+value*10+120,
      },
      {
        datasetIndex: 2+value*10+120,
      },          
      {
        datasetIndex: 3+value*10+120,  
      },
      {
        datasetIndex: 4+value*10+120,
      },
      {
        datasetIndex: 5+value*10+120,
      }, 
      
      
          {
            datasetIndex: 1+value*10,
          },
          {
            datasetIndex: 2+value*10,
          },          
          {
            datasetIndex: 3+value*10,  
          },
          {
            datasetIndex: 4+value*10,
          },
          {
            datasetIndex: 5+value*10,
          },
        ]
 
    myScatterChart.setOption(chart_options);
}



document.addEventListener('click', async function(e) {
  // console.log(e);
  if (e.srcElement)
  {
    if (e.srcElement.nodeName == "BUTTON")
    {
      if (e.srcElement.dataset.container == "body" && e.srcElement.dataset.toggle == "tooltip")
      {
        
        const val = e.srcElement.dataset.value;
        //console.log(val);
        if (val == "ALL")
        {
          changeScatterChartDataset(0);
        }
        else if (val == "A" || val == "1")
        {
          changeScatterChartDataset(1);
        }
        else if (val == "B" || val == "2")
        {
          changeScatterChartDataset(2);
        }
        else if (val == "C" || val == "3")
        {
          changeScatterChartDataset(3);
        }
        else if (val == "D" || val == "4")
        {
          changeScatterChartDataset(4);
        }
        else if (val == "E" || val == "5")
        {
          changeScatterChartDataset(5);
        }        
        
      }
    }
  }
});
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
  observer.observe(table_event_results, config);
}, 2000);

const table_event_results = document.getElementById("table_event_results_final");
function inject_racereport() {
 
  for (var i = 0; i < table_event_results.rows.length; i++) {
      inject_racereport_row(table_event_results.rows[i]);
      }
  }
  
function inject_racereport_row(row) {
       const rider_dom = (row.cells[2]) ? row.cells[2].getElementsByTagName('a')[0] : null;
         if(rider_dom){
           let zwid = rider_dom.getAttribute('href').match(/[?&]z=([^&]+)/);
           zwid = zwid[1];
           const report_dom_div = row.cells[row.cells.length-1].getElementsByTagName('div')[0];
           //console.log(report_dom_div);
           if (!report_dom_div.getAttribute('fera')) {
            let i_dom = document.createElement('i');
            i_dom.setAttribute('id',`report_${zwid}`);
            i_dom.setAttribute("class","fa fa-file-text fa-2 text-gray hover-orange");
            report_dom_div.appendChild(i_dom);     
            report_dom_div.setAttribute('style',"display: flex;");
            report_dom_div.setAttribute('fera',true);
          }
         }
      }





var rider_efforts = [];
var effort_xAxis = 0;
var effort_watt = 0;
var effort_smoothing = 0;
document.getElementById('table_event_results_final').addEventListener('click', async function(e) {
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
      if (sel_rider[0].src != 1) {
        alert(`Rider ${sel_rider[0].name} event is not public, no fit file to parse`);
        return;
      }
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
        const myparam = {type: 'analysis', id: id,eventid:argument.id};
        let rider_effort = {};
        rider_effort.id = id;
        rider_effort.name = sel_rider[0].name;

        rider_effort.color_num = free_color; 
        const data = await getData(myparam); 
        // console.log(data);
        rider_effort.weight = riders.filter(item => item.zwid == id).map(item => {return parseFloat(item.weight[0])});
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
        rider_efforts.push(rider_effort);
        updateEffortChart();
      } else {
        // remove 
        rider_efforts = rider_efforts.filter(item => item.id != id);
        updateEffortChart();
      }
}
// myEffortChart.on('legendselectchanged', function(params) {

  // if (!params.selected[params.name])
  // {
    // if (confirm(`Remove ${params.name} from chart?`))
    // {
      // let id_to_remove;
      // for (const [key, value] of Object.entries(rider_efforts)) {
        // if (value.name == params.name)
        // {
          // id_to_remove = key;
          // break;
        // }
      // }
        // // remove 
        // delete rider_efforts[id_to_remove];
        // updateEffortChart(effort_xAxis);

    // }
  // }
// });

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
var dataset_body = [];

getData(argument).then(async function(myjson) {
  // if (!myjson.data) return;
    riders =  myjson.data;
    // console.log(riders);

    let ap_riders = riders.filter(item => item.div == 5);
    let a_riders = riders.filter(item => item.div == 10);
    let b_riders = riders.filter(item => item.div == 20);
    let c_riders = riders.filter(item => item.div == 30);
    let d_riders = riders.filter(item => item.div == 40);
    let apw_riders = riders.filter(item => item.divw == 5);
    let aw_riders = riders.filter(item => item.divw == 10);
    let bw_riders = riders.filter(item => item.divw == 20);
    let cw_riders = riders.filter(item => item.divw == 30);
    let dw_riders = riders.filter(item => item.divw == 40); 
    let wriders = riders.filter(item => item.divw != 0);  
//(item.cp_1200_watts) ? (parseFloat(item.cp_1200_watts[1]) == 0.0) ? null : parseFloat(item.cp_1200_watts[1]);
    //var dataset_body = [];
    if (myjson.type == 'signup')
    {    
        dataset_body = riders.map(item => [item.zwid, 
                                            item.name, 
                                            category_dict[item.div], 
                                            category_dict[item.divw], 
                                            parseInt(item.ftp),
                                            parseFloat(item.weight[0]), 
                                            get_float(item.cp_1200_watts),
                                            get_float(item.cp_1200_wkg),
                                            get_float(item.cp_300_watts),
                                            get_float(item.cp_300_wkg),                                                     
                                            get_float(item.cp_60_watts),
                                            get_float(item.cp_60_wkg),                                                    
                                            get_float(item.cp_15_watts),
                                            get_float(item.cp_15_wkg),
                                            (item.label==1) ? 'A' : (item.label==2) ? 'B' :(item.label==3) ? 'C' :(item.label==4) ? 'D' :(item.label==5) ? 'E' : '',
                                            item.tid,
                                            item.tname]);
    }
    else
    {    
        dataset_body = riders.map(item => [item.zwid, 
                                            item.name, 
                                            category_dict[item.div], 
                                            category_dict[item.divw], 
                                            parseInt(item.ftp),
                                            parseFloat(item.weight[0]), 
                                            get_float0(item.w1200),
                                            get_float0(item.wkg1200),
                                            get_float0(item.w300),
                                            get_float0(item.wkg300),                                                     
                                            get_float0(item.w60),
                                            get_float0(item.wkg60),                                                    
                                            get_float0(item.w15),
                                            get_float0(item.wkg15),
                                            item.category,
                                            item.tid,
                                            item.tname]);
    }

    //console.log(dataset_body);

    var options = {
        title: {
            text: 'category distribution',
            left: 'center',
        },      
        grid: {
            left: 50,
            right: 50,
            top: 60,
            bottom: 40
        },     
        legend: {
            data: ['A+', 'A', 'B', 'C', 'D'],
            orient: 'vertical',
            right: 10,
            top: 'center'
        },
        tooltip: {
            trigger: 'axis',
            },
        xAxis: {
          data: ['mixed', 'women']
        },
        yAxis: {},
        series: [
          {
            data: [d_riders.length, dw_riders.length],
            type: 'bar',
            color: 'orange',
            stack: 'x',
            name: 'D'
          },
          {
            data: [c_riders.length, cw_riders.length],
            type: 'bar',
            color: 'blue',
            stack: 'x',
            name: 'C'
          }
          ,
          {
            data: [b_riders.length, bw_riders.length],
            type: 'bar',
            color: 'green',
            stack: 'x',
            name: 'B'
          }  
          ,
          {
            data: [a_riders.length, aw_riders.length],
            type: 'bar',
            color: 'red',
            stack: 'x',
            name: 'A'
          }
          ,
          {
            data: [ap_riders.length, apw_riders.length],
            color: 'black',
            type: 'bar',
            stack: 'x',
            name: 'A+',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: (params) => {
                        if (params.dataIndex == 0)
                            return riders.length;
                        else
                            return wriders.length;
                    }
                }
            }            
          }                             
        ]
      };
      myChart.setOption(options);  


        // Example usage:
  const divValues = ['A+', 'A', 'B', 'C', 'D'];
  const divwValues = ['A+', 'A', 'B', 'C', 'D'];
  const categoryValues = ['A', 'B', 'C', 'D', 'E'];
  const zwid = ZP_VARS.zid; // Replace with the actual value of ZP_VARS.zid
  const tid = ZP_VARS.tid;
  
  const echartsDataset = generateEChartsDatasetStructure(dataset_body,divValues, divwValues, categoryValues, zwid, tid);

console.log (ZP_VARS.zid);
      const scatter_options = {
        dataset: echartsDataset,
      
        
        
        title: {
            text: teamn,
            subtext:`${duration} power scatter`,
            left: 'center'
        },    
        grid: {
            left: 60,
            right: 50,
            top: 60,
            bottom: 40
        },                  
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: function(params) {
                // console.log(params);
                        const data = params.data;
                        const gender = (data[3] > 0) ? '&#9792; ' : '&#9794; ';
                        const returnstr = `<span class="badge" style="background: ${params.color}; weight: 600;">` + params.seriesName + `:</span> ${gender} ${data[1]}<br>` +
                                    `Team: ${data[16]} <br>`+
                                    `FTP: ${data[4]}W <br>`+
                                    `${params.dimensionNames[params.encode.x]}: ${data[params.encode.x]} <br>`+
                                    `${params.dimensionNames[params.encode.y]}: ${data[params.encode.y]}`;
                    return returnstr;
                
            }
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
            data: [{
              name: 'A+',
              itemStyle: {color: 'black'},
             },
             {
              name: 'A',
              itemStyle: {color: 'red'},
             },
             {
              name: 'B',
              itemStyle: {color: 'green'},
             },
             {
              name: 'C',
              itemStyle: {color: 'blue'},
             },
             {
              name: 'D',
              itemStyle: {color: 'orange'},
             },                                       
            ],
            orient: 'vertical',
            right: -10,
            top: 'center'},
        dataZoom: [{
                id: 'dataZoomX',
                type: 'slider',
                xAxisIndex: [0],
                filterMode: 'filter',
                bottom: 0,
                height: 20,
            },
            {
                id: 'dataZoomY',
                type: 'slider',
                yAxisIndex: [0],
                filterMode: 'empty',
                orient: 'vertical',
                   left: 10,   
                   width: 20             
            },
            {
                id: 'dataZoomX2',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter'
            },
            {
                id: 'dataZoomY2',
                type: 'inside',
                yAxisIndex: [0],
                filterMode: 'empty'
            }
        ],            
          xAxis: {name: 'W',min: 'dataMin',},
          yAxis: {name: 'Wkg',min: 'dataMin',},
          series: [
            {
              name: 'A+',
              type: 'effectScatter',
              datasetIndex: 61,
              symbolSize: 15,
              silent: true,
              color: 'purple',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'A',
              type: 'effectScatter',
              datasetIndex: 62,
              symbolSize: 15,
              silent: true,
              color: 'purple',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'B',
              type: 'effectScatter',
              datasetIndex: 63,
              symbolSize: 15,
              silent: true,
              color: 'purple',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'C',
              type: 'effectScatter',
              datasetIndex: 64,
              symbolSize: 15,
              silent: true,
              color: 'purple',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'D',
              type: 'effectScatter',
              datasetIndex: 65,
              symbolSize: 15,
              silent: true,
              color: 'purple',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },                                                   
//team
            {
              name: 'A+',
              type: 'effectScatter',
              datasetIndex: 121,
              symbolSize: 15,
              silent: true,
              color: 'grey',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'A',
              type: 'effectScatter',
              datasetIndex: 122,
              symbolSize: 15,
              silent: true,
              color: 'grey',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'B',
              type: 'effectScatter',
              datasetIndex: 123,
              symbolSize: 15,
              silent: true,
              color: 'grey',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'C',
              type: 'effectScatter',
              datasetIndex: 124,
              symbolSize: 15,
              silent: true,
              color: 'grey',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },
            {
              name: 'D',
              type: 'effectScatter',
              datasetIndex: 125,
              symbolSize: 15,
              silent: true,
              color: 'grey',
              encode: {
                  x: '20min watts',
                  y: '20min wkg'
                }            
            },              

            
            {
            name: 'A+',
            type: 'scatter',
            datasetIndex: 1,
            color: 'black',
            encode: {
                x: '20min watts',
                y: '20min wkg',
                tooltip: ['20min watts', '20min wkg'],
              }            
          },
          {
            name: 'A',
            type: 'scatter',
            datasetIndex: 2,
            color: 'red',
            encode: {
                x: '20min watts',
                y: '20min wkg',
                tooltip: ['20min watts', '20min wkg'],
              }            
          },          
          {
            name: 'B',
            type: 'scatter',
            datasetIndex: 3,  
            color: 'green',          
            encode: {
                x: '20min watts',
                y: '20min wkg'
              }            
          },
          {
            name: 'C',
            type: 'scatter',
            datasetIndex: 4,
            color: 'blue',
            encode: {
                x: '20min watts',
                y: '20min wkg'
              }            
          },
          {
            name: 'D',
            type: 'scatter',
            datasetIndex: 5,
            color: 'orange',
            encode: {
                x: '20min watts',
                y: '20min wkg'
              }            
          },
       
        //   {
        //     name: 'marks',
        //     selectedMode: false,
        //     datasetIndex: 0,
        //     type: 'line',
        //     data:[],
        //     markArea: marked_scatter_mixed,                                       
        // },             
                              
        ]
      }
      myScatterChart.setOption(scatter_options);


    // preselect effort chart with from ZP preselected CP rider
    // for ( i of document.getElementsByTagName("i")){
    //   if (i.id.includes('cp_zwift_id_') && i.getAttribute('class').includes('text-green'))
    //   { 
    //     const id = i.id.replace("cp_zwift_id_", "");
    //     updateEffortDict(id);
    //     break;
    //   }
    // }


});
}



  // function generate_bin(min_boundary, max_boundary, data)
  // {
  //   let bin_dict= {};
  //   for (let i = min_boundary; i <= max_boundary; i=i+0.01)
  //   {
  //       bin_dict[i.toFixed(2)] = 0;
  //   }
  //   for (var x = 0; x < data.length; x++) {

  //       var bin_idx = data[x].avg90Wkg1200;
  //       bin_dict[bin_idx] = bin_dict[bin_idx] + 1; 
  //   }    
  //   return Object.entries(bin_dict).map(([x, y]) => {return [x, y];});
  // }

  function generateEChartsDatasetStructure(dataset_body,divValues, divwValues, categoryValues, zwid, tid) {
    const dimensions = [
      'zwid',
      'name',
      'div',
      'divw',
      'ftp',
      'weight',
      '20min watts',
      '20min wkg',
      '5min watts',
      '5min wkg',
      '1min watts',
      '1min wkg',
      '15s watts',
      '15s wkg',
      'category',
      'tid',
      'tname',
    ];
  
    const dataset = [{
      dimensions,
      source: dataset_body,
    }];
  
    const filterTransforms = [];
  
    for (const div of divValues) {
      filterTransforms.push({
        transform: {
          type: 'filter',
          config: { dimension: 'div', '=': div },
        },
      });
    }
  
    for (const divw of divwValues) {
      filterTransforms.push({
        transform: {
          type: 'filter',
          config: { dimension: 'divw', '=': divw },
        },
      });
    }

    for (const category of categoryValues) {
      for (const div of divValues) {
        filterTransforms.push({
          transform: {
            type: 'filter',
            config: { and: [{ dimension: 'div', '=': div }, { dimension: 'category', '=': category }] },
          },
        });
      }
      for (const divw of divwValues) {
        filterTransforms.push({
          transform: {
            type: 'filter',
            config: { and: [{ dimension: 'divw', '=': divw }, { dimension: 'category', '=': category }] },
          },
        });      
      }
    }


  
    for (const div of divValues) {
      filterTransforms.push({
        transform: {
          type: 'filter',
          config: { and: [ { dimension: 'div', '=': div }, { dimension: 'zwid', '=': zwid }]},
        },
      });
    }
    for (const divw of divwValues) {
      filterTransforms.push({
        transform: {
          type: 'filter',
          config: { and: [ { dimension: 'divw', '=': divw }, { dimension: 'zwid', '=': zwid }]},
        },
      });
    }

    for (const category of categoryValues) {
      for (const div of divValues) {
        filterTransforms.push({
          transform: {
            type: 'filter',
            config: { and: [ { dimension: 'div', '=': div }, { dimension: 'category', '=': category }, { dimension: 'zwid', '=': zwid }]},
          },
        });
      }
      for (const divw of divwValues) {
        filterTransforms.push({
          transform: {
            type: 'filter',
            config: { and: [ { dimension: 'divw', '=': divw }, { dimension: 'category', '=': category }, { dimension: 'zwid', '=': zwid }]},
          },
        });
      }
    }
  
// team
    for (const div of divValues) {
      filterTransforms.push({
        transform: {
          type: 'filter',
          config: { and: [ { dimension: 'div', '=': div }, { dimension: 'zwid', '!=': zwid }, { dimension: 'tid', '=': tid }]},
        },
      });
    }
    for (const divw of divwValues) {
      filterTransforms.push({
        transform: {
          type: 'filter',
          config: { and: [ { dimension: 'divw', '=': divw }, { dimension: 'zwid', '!=': zwid }, { dimension: 'tid', '=': tid }]},
        },
      });
    }

    for (const category of categoryValues) {
      for (const div of divValues) {
        filterTransforms.push({
          transform: {
            type: 'filter',
            config: { and: [ { dimension: 'div', '=': div }, { dimension: 'category', '=': category }, { dimension: 'zwid', '!=': zwid }, { dimension: 'tid', '=': tid }]},
          },
        });
      }
      for (const divw of divwValues) {
        filterTransforms.push({
          transform: {
            type: 'filter',
            config: { and: [ { dimension: 'divw', '=': divw }, { dimension: 'category', '=': category }, { dimension: 'zwid', '!=': zwid }, { dimension: 'tid', '=': tid }]},
          },
        });
      }
    }
    // Add all filter transforms to the dataset
    dataset.push(...filterTransforms);
  
    return dataset;
  }
  

  