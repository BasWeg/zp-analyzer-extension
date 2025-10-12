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
    injectScript(chrome.runtime.getURL("profile_inject.js"), 'body');
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
  
  console.log(document.URL);
  const url_argument = document.URL.match(/[?&]z=([^&]+)/);
  const profile_id = url_argument[1].replace('#','');

  const handleFromWeb = async (event) => {
    if (event.data.from) {
        const data = event.data.data.data;
        console.log(`process from ${event.data.from}`);
        console.log(event.data.data);
        
        if (event.data.data.type == "profile_inject")
        {
          ZP_VARS = await data;
          console.log(ZP_VARS);

          if (profile_id == ZP_VARS.zid)
          {
            doit();
          }        
        }
    }
  };



if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    //doit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        //doit();
    });
}
console.log(document.URL);
// var sc = document.createElement("script");
// sc.setAttribute("src", chrome.runtime.getURL('echart.js'));
// sc.setAttribute("type", "text/javascript");
// document.head.appendChild(sc);
// var sc = document.createElement("script");
// sc.src =  chrome.runtime.getURL('echart.js');
// document.documentElement.appendChild (sc);

async function doit() {
    const { getData } = await import ('./common.js');

let tabheader = document.querySelector("#zp_submenu > ul")
let li = document.createElement('li');
li.setAttribute("role", "presentation");
li.setAttribute("class", "");
li.innerHTML = '<a href="#tab-zpanalysis" data-toggle="tab" id="zpanalysis" aria-expanded="false">ZP Analysis</a>';
tabheader.appendChild(li);

let pbody = document.querySelector("#page-body > div > div");

let ptab = document.createElement('div');
ptab.setAttribute("id", "tab-zpanalysis");
ptab.setAttribute("style", "");
ptab.setAttribute("class", "tab-pane panel-max-width");
pbody.appendChild(ptab);
let panel = document.createElement('div');
panel.setAttribute("class", "panel panel-blue panel-max-width");
panel.setAttribute("style", "margin-top:0px");

let h = document.createElement('div');
h.setAttribute("class", "panel-heading");
h.setAttribute("style", "padding: 5px;");

let p = document.createElement('div');
p.setAttribute("id", "my_row");
p.setAttribute("class", "panel-body");
p.setAttribute("style", "height:100%; width:100%; background: white; padding: 15px;");
let g = document.createElement('div');
g.setAttribute("id", "metrics_chart");
g.setAttribute("style", "width:100%; background: white;");
let g1 = document.createElement('div');
g1.setAttribute("id", "chart_control");
g1.setAttribute("style", "width:100%; background: white; text-align: end;");



const parent = document.querySelector("#tab-results");
const refel = document.querySelector("#tab-results > div.panel.panel-blue.panel-max-width");
let g2 = document.createElement('div');
g2.setAttribute("class", "row");
g2.setAttribute("id", "effort_row");
g2.setAttribute("style", "display: none; padding: 15px;");
parent.insertBefore(g2,refel);
let pa = document.createElement('div');
pa.setAttribute("class", "panel panel-blue panel-max-width");
g2.appendChild(pa);

let h2 = document.createElement('div');
h2.setAttribute("class", "panel-heading");
h2.setAttribute("style", "padding: 5px;");

let p2 = document.createElement('div');
p2.setAttribute("id", "my_row2");
p2.setAttribute("class", "panel-body");
p2.setAttribute("style", "width:100%; padding: 15px;");
pa.appendChild(h2);
pa.appendChild(p2);
var row2 = document.createElement('div');
row2.setAttribute("class", "row");
row2.setAttribute("id", "div_chart_effort");
row2.setAttribute("style", "width:100%;padding: 15px;");
p2.appendChild(row2);

let dichartctrrl = document.createElement('div');
    dichartctrrl.setAttribute("id", "idchart_control");
row2.appendChild(dichartctrrl);  
let dichart = document.createElement('div');
            dichart.setAttribute("id", "effort_chart");
                dichart.setAttribute("style", "height:500px; width:100%; padding: 20px;");
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
                  '<option value="0">no W smoothing</option>'+
                  '<option value="1">5s W smoothing</option>'+
                '</select>'+ 
                '<div>';
// let myImage = document.createElement('img');
// const iconUrl =  chrome.runtime.getURL("images/icon128.png");
// myImage.src = iconUrl;
// $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//     var target = $(e.target).attr("href") // activated tab
//     alert(target);
//   });


//const el = document.querySelector("#tab-results > div.row > div.col-lg-7 > div > div.panel-body");
// const el = document.querySelector("#tab-results > div.row");
// const parent = document.querySelector("#tab-results");
// const refel = document.querySelector("#tab-results > div.panel.panel-blue.panel-max-width");

// and give it some content

// add the text node to the newly created div
//el.appendChild(g);
//parent.insertBefore(p,refel);
ptab.appendChild(panel);
panel.appendChild(h);
panel.appendChild(p);
p.appendChild(g1);
p.appendChild(g);



g1.innerHTML = '<label for="chart_select" style="padding-inline: 10px;">Show: </label>' +
                    '<select name="chart_select" id="chart_select">' +
                    '<option value="1">no Rides</option>' + 
                    '<option value="0">all Events</option></select>'+
                    '<select name="watt_select" id="watt_select">' +
                    '<option value="0">Wkg</option>' + 
                    '<option value="1">Watt</option></select>' +
                    '<select name="gender_select" id="gender_select" style="visibility: hidden;">' +
                    '<option value="0">mixed</option>' + 
                    '<option value="1">women</option></select>';
                    // g1.appendChild(myImage);
// var gender = 0;
// var watt_select = 0;

  // eslint-disable-next-line no-undef
const myEffortChart = echarts.init(document.getElementById('effort_chart'));
myEffortChart.resize();
// eslint-disable-next-line no-undef
const myChart = echarts.init(document.getElementById('metrics_chart'));

window.addEventListener('resize', function() {
  document.getElementById('metrics_chart').style = `height:1000px; width:100%;`;
  myChart.resize();
  myEffortChart.resize();

});

document.getElementById('zpanalysis').addEventListener('click', function() {
    const width = (self.innerWidth > 1600) ? 1600 : self.innerWidth;
    document.getElementById('metrics_chart').style = `height:1000px; width:${width-30}px;`;
    myChart.resize();

});

document.getElementById('chart_select').value = 1;



const argument = {type: 'profile', id: profile_id};

function inject_racereport() {
    const table_profile_results = document.getElementById("profile_results");
    for (var i = 0; i < table_profile_results.rows.length; i++) {
        inject_racereport_row(table_profile_results.rows[i]);
        }
    }
    
function inject_racereport_row(row) {
    const event_dom = (row.cells[3]) ? row.cells[3].getElementsByTagName('a')[0] : null;
    if(event_dom){
        let zwid = event_dom.getAttribute('href').match(/[?&]zid=([^&]+)/);
        zwid = zwid[1];
        const report_dom = row.cells[row.cells.length-1].getElementsByTagName('a')[0];
        report_dom.removeAttribute('href');
        const report_dom_i = report_dom.getElementsByTagName('i')[0]
        report_dom_i.setAttribute('id',`report_${zwid}`);
    }
}
// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList) => {
  for (const mutation of mutationList) {
    console.log(mutation);
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
const table_profile_results = document.getElementById("profile_results");
// Start observing the target node for configured mutations
observer.observe(table_profile_results, config);

getData(argument).then(myjson => {
    const data_sorted1 = myjson.data.sort((a, b) => a.event_date - b.event_date);
    let ninetyDaysBefore;
    let three6tyDaysBefore;
    //let max90wkg1200;
    let max360wkg1200;
    function parseMyFloat(data)
    {
      return (parseFloat(data)||0);
    }
    
    function arrayMin(arr) {
      return arr.reduce(function (p, v) {
        return ( p < v ? p : v );
      });
    }

    function arrayMax(arr) {
      return arr.reduce(function (p, v) {
        return ( p > v ? p : v );
      });
    }    
    
    
    //const data_sorted = data_sorted1.filter(d => (parseFloat(d.w1200[0])||0) != 0 && (parseFloat(d.weight[0])||0) != 0);
    //const data_sorted = data_sorted1.filter(d =>  (parseFloat(d.weight[0])||0) != 0);
    //console.log(data_sorted1);

    const data_sorted2 = data_sorted1.map(element => {
        const value = element["f_t"];
        const values = value.split(" ");
        if (values.length === 1) {
            return { ...element, f_t: values[0].replace("TYPE_", "") };
        } else {
            if (values.includes("TYPE_RACE") && values.includes("TYPE_RIDE")) {
                return { ...element, f_t: "RACE" };
            } else if (values.includes("TYPE_RUN")) {
                return { ...element, f_t: "RUN" };
            } else {
                return { ...element, f_t: values[0].replace("TYPE_", "") };
            }
        }
    });

    const data_sorted = data_sorted2.map(item => {
        //console.log('A:' + item.weight[0] + ' ' + item.w300[0] + ' ' +  item.wkg300[0] + ' ' +item.f_t);
        item.weight[0] = (parseFloat(item.weight[0]))? item.weight[0] : (parseMyFloat(item.w300[0])/parseMyFloat(item.wkg300[0])).toFixed(1);
        //console.log('B:' + item.weight[0] + ' ' + item.w300[0] + ' ' +  item.wkg300[0] + ' ' +item.f_t);
        item.avg_wkg[0] = (parseFloat(item.avg_power[0]) / parseFloat(item.weight[0])).toFixed(2);
        item.avg_hr__avg_wkg = (parseFloat(item.avg_hr[0]) / parseFloat(item.avg_wkg[0]));
        item.avg_hr__avg_wkg = (item.avg_hr__avg_wkg) ? item.avg_hr__avg_wkg : 0;
        return {...item}
        }).filter(d=> d.f_t != "RUN" && isFinite(d.weight[0]));


    

     const data90_360days = data_sorted.map(item => {
          ninetyDaysBefore = item.event_date - (90*24*60*60);
          const filtered90Data = data_sorted.filter(d => d.event_date > ninetyDaysBefore && d.event_date <= item.event_date);
          const max1200 = arrayMax(filtered90Data.map(e => {return parseMyFloat(e.w1200[0])}));
          const max300 = arrayMax(filtered90Data.map(e => {return parseMyFloat(e.w300[0])}));
          const max60 = arrayMax(filtered90Data.map(e => {return parseMyFloat(e.w60[0])}));
          const max30 = arrayMax(filtered90Data.map(e => {return parseMyFloat(e.w30[0].replace(',',''))}));
          const max15 = arrayMax(filtered90Data.map(e => {return parseMyFloat(e.w15[0].replace(',',''))}));
          const filtered90Data_hr_wkg = filtered90Data.filter(d => d.avg_hr__avg_wkg != 0).map(e => {return e.avg_hr__avg_wkg});
          const filtered90Data_hr_wkg_no_rides = filtered90Data.filter(d => d.avg_hr__avg_wkg != 0 && d.f_t != "RIDE").map(e => {return e.avg_hr__avg_wkg});
          const avg_hr__avg_wkg90d = (filtered90Data_hr_wkg.length) ? filtered90Data_hr_wkg.reduce((acc, curr)=> acc + curr, 0)/filtered90Data_hr_wkg.length : null;
          const avg_hr__avg_wkg90d_no_rides = (filtered90Data_hr_wkg_no_rides.length) ? filtered90Data_hr_wkg_no_rides.reduce((acc, curr)=> acc + curr, 0)/filtered90Data_hr_wkg_no_rides.length : null;
          //console.log(avg_hr__avg_wkg90d);
          filtered90Data.sort((a, b) => (parseMyFloat(b.w1200[0])/(parseFloat(b.weight[0]))) - (parseMyFloat(a.w1200[0])/(parseFloat(a.weight[0]))));
          let top3wkg1200 = filtered90Data.slice(0,3).filter(d => (parseFloat(d.w1200[0])||0) != 0);
          
          //max90wkg1200 = ((((parseFloat(top3wkg1200[0].w1200[0]))/(parseFloat(top3wkg1200[0].weight[0]))))).toFixed(2);
          const avg90Wkg1200 = (top3wkg1200.length) ? (top3wkg1200.reduce((acc, val) => acc + (((parseFloat(val.w1200[0]))/(parseFloat(val.weight[0])))), 0) / top3wkg1200.length).toFixed(2) : null;
          
          const avg90W1200 = (top3wkg1200.length) ? (top3wkg1200.reduce((acc, val) => acc + (((parseFloat(val.w1200[0])))), 0) / top3wkg1200.length).toFixed(2): null;
          three6tyDaysBefore = item.event_date - (360*24*60*60);
          const filtered360Data = data_sorted.filter(d => d.event_date > three6tyDaysBefore && d.event_date <= item.event_date);
          filtered360Data.sort((a, b) => (parseMyFloat(b.w1200[0])/(parseFloat(b.weight[0]))) - (parseMyFloat(a.w1200[0])/(parseFloat(a.weight[0]))));
          top3wkg1200 = filtered360Data.slice(0,3);
          max360wkg1200 = ((parseFloat(top3wkg1200[0].w1200[0])/(parseFloat(top3wkg1200[0].weight[0])))).toFixed(2);
          const avg360Wkg1200 = (top3wkg1200.reduce((acc, val) => acc + (parseFloat(val.w1200[0])/(parseFloat(val.weight[0]))), 0) / top3wkg1200.length).toFixed(2);              
          return {...item, avg_hr__avg_wkg90d, avg_hr__avg_wkg90d_no_rides, avg90Wkg1200, avg90W1200, avg360Wkg1200, max360wkg1200, max15, max30, max60, max300, max1200 };
        }); 

setTimeout( function() {
    inject_racereport()
}, 2000);


var race_reports = {};
var active_id = null;
document.getElementById('profile_results').addEventListener('click', async function(e) {
    if (e.target.id.includes("report_")) {
      const id = e.target.id.replace("report_", "");
      if(id)
      {
        if (active_id == id)
        {
            active_id = null;
            document.getElementById(e.target.id).setAttribute("class","fa fa-file-text fa-2 text-gray hover-orange");
        }
        else      
        {
          if(active_id)
          {
            // old active_id
            const dom = document.getElementById("report_"+active_id);
            if (dom) document.getElementById("report_"+active_id).setAttribute("class","fa fa-file-text fa-2 text-gray hover-orange");
          }
            active_id = id;
            document.getElementById(e.target.id).setAttribute("class","fa fa-file-text fa-2 text-orange hover-gray");
            if (!(id in race_reports)) {
                race_reports[id] = await get_race_report(profile_id, id);
            }
        }
        update_effort_chart();
      }
    }
}, false);


function calculateXPower(powerValues) {
    const numZeros = 25;
    if (numZeros > 0) {
      powerValues = Array(numZeros).fill(0).concat(powerValues);
    }
  
    const xPowerValues = [];
    for (let i = 25; i < powerValues.length; i++) {
      let averagePower = 0;
      let peakPower = 0;
      for (let j = i - 25; j < i; j++) {
        averagePower += powerValues[j];
        peakPower = Math.max(peakPower, powerValues[j]);
      }
      averagePower /= 25;
      xPowerValues.push((averagePower * 0.95) + (peakPower * 0.05));
    }
    return xPowerValues;
  }


async function get_race_report(profile_id, eventid)
      { 
        let rider_effort = {};     
        const myparam = {type: 'analysis', id: profile_id,eventid:eventid};
        // find event with this id
        rider_effort.eventid = eventid;
        //rider_effort.title = sel_rider[0].name;

        const data = await getData(myparam); 
        console.log(data90_360days);
        const event_data = data90_360days.filter(item => item.zid == eventid);
        console.log(eventid);
        console.log(event_data);
        rider_effort.weight = parseFloat(event_data[0].weight[0]);
        rider_effort.event_date = event_data[0].event_date;
        rider_effort.event_title = event_data[0].event_title;
        var xPower = [];
        if (data.datasets[1]) {
            xPower = calculateXPower(data.datasets[1].data);
        }
        //console.log(xPower);
        const all_data = (data.x2Data) ? data.x2Data.map((element, index) => 
            {
                const wkg=Math.round((data.datasets[1].data[index] / rider_effort.weight)*100)/100;

                return {time: element, // time
                        dist: data.xData[index], // dist
                        watt: data.datasets[1].data[index], //watt
                        wkg: wkg, // wkg
                        xPower: Math.round(xPower[index]),
                        xPowerKg: Math.round(xPower[index]/rider_effort.weight*100)/100,
                        hr: data.datasets[2].data[index], //HR
                        alt: data.datasets[0].data[index], //alt
                        hr_wkg: (data.datasets[1].data[index])?Math.round((data.datasets[2].data[index] / wkg)*10)/10 : 0}}) : 
                        [];
        rider_effort.data = all_data.map(item => {
            const before300 = item.time - 300;
            const before5 = item.time - 5;
            item.hr_wkg = (item.hr_wkg > item.hr)? item.hr : item.hr_wkg;
            const filteredData300 = all_data.filter(d => d.time > before300 && d.time <= item.time).map(e => {
              e.hr_wkg = (e.hr_wkg > e.hr)? e.hr : e.hr_wkg;
              return e.hr_wkg});
            const filteredData5 = all_data.filter(d => d.time > before5 && d.time <= item.time);
            const hr_wkg_avg300 = Math.round((filteredData300.reduce((acc, curr)=> acc + curr, 0)/filteredData300.length)*10)/10;
            const watt_avg5 = Math.round((filteredData5.reduce((acc, curr)=> acc + curr.watt, 0)/filteredData5.length));
            const wkg_avg5 = Math.round((filteredData5.reduce((acc, curr)=> acc + curr.wkg, 0)/filteredData5.length)*100)/100;
            return {...item, hr_wkg_avg300, watt_avg5, wkg_avg5};
        });
        const data_arr = all_data.map(item => { return [item.hr,item.watt,item.hr_wkg]; });
        const hr_avg = data_arr.reduce((acc, curr)=> acc + curr[0], 0)/data_arr.length;
        const watt_avg = data_arr.reduce((acc, curr)=> acc + curr[1], 0)/data_arr.length;
        const hr_wkg_avg = data_arr.reduce((acc, curr)=> acc + curr[2], 0)/data_arr.length;
        //const mycalc = hr_avg / watt_avg * rider_effort.weight;
        rider_effort.hr_avg = Math.round(hr_avg);
        rider_effort.watt_avg = Math.round(watt_avg);
        rider_effort.hr_wkg_avg = Math.round(hr_wkg_avg*10)/10;
        return rider_effort;
      }


function update_effort_chart()
{
    var options = {};
    if (active_id)
    {
        //console.log (race_reports[active_id].data);
        const title = race_reports[active_id].event_title;
        const date = new Date(race_reports[active_id].event_date*1000);
        const dataset = race_reports[active_id].data.map(row => {return [row.time, row.dist,row.alt, row.watt, row.wkg, row.watt_avg5, row.wkg_avg5,row.hr, row.hr_wkg, row.hr_wkg_avg300, row.xPower, row.xPowerKg]});
       // console.log(dataset);
        options.title= {text: title, subtext: date};
        options.dataset=[{source:dataset}];
        g2.style.display = "block";
    } else {
        const title ="";
        const date = "";
        const dataset = [[null,null,null,null,null,null,null,null,null,null]];
        options.title= {text: title, subtext: date};
        options.dataset=[{source:dataset}];
        g2.style.display = 'none';
    }
    //console.log(options);
    myEffortChart.setOption(options);
    myEffortChart.resize();
}    

document.getElementById('chart_select_xAxis').addEventListener('change', function() {
    const effort_xAxis = parseInt(this.value);
    let options = myEffortChart.getOption();
    options.series = options.series.map(elem => {
        elem.encode =  {
            x: effort_xAxis,
          } ;
        return elem;
        });
        options.xAxis[0].name = (effort_xAxis) ? 'km' : 't(s)'; 
        myEffortChart.setOption(options);   
    }
);
var effort_watt = 0;
var effort_smoothing = 0;
document.getElementById('chart_select_watt').addEventListener('change', function() {
    effort_watt = parseInt(this.value);
    let options = myEffortChart.getOption();
    options.series[0]=
        {
        name: 'Watt',
        encode: {
            y: 3+effort_watt+2*effort_smoothing,
        }};
        options.series[1]=
        {
        name: 'xPower',
        encode: {
            y: 10+effort_watt,
        }};        
        myEffortChart.setOption(options);   
});
document.getElementById('chart_select_smoothing').addEventListener('change', function() {
    effort_smoothing = parseInt(this.value);
    let options = myEffortChart.getOption();
    options.series[0]=
        {
        name: 'Watt',
        encode: {
            y: 3+effort_watt+2*effort_smoothing,
        }};
        myEffortChart.setOption(options);
});

// effort chart options
const effortoptions = {
    title: {
        text: "",
        subtext:'date',
        left: 'left'
    },
    legend: [{
        data: [ 'HR', 'Watt', 'xPower', 'altitude' ],
     }],
    dataset:[{source:[[null,null,null,null,null,null,null,null,null,null]]}],
    grid: [
        { top: 100,  left: 100, right: 100, bottom: 40},
        // { top: 320,  height: 140, left: '6%', right: '12%', bottom: 40},

      ],
    dataZoom: [{
        type: 'slider',
        start: 0,
        end: 100,
        bottom: -10,
        filterMode: 'empty',
        xAxisIndex: [0]
    },
    {
        type: 'inside',
        start: 0,
        end: 100,
        filterMode: 'empty',
        xAxisIndex: [0]
    }
    ],
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            saveAsImage: {}
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            animation: false,
            label: {
                backgroundColor: '#505765'
            }
        }
    },    

    xAxis: [{
        type: 'value',
        name: 't(s)',
        gridIndex: 0,
    // },{
    //     type: 'value',
    //     gridIndex: 1,
    }],
    yAxis: [
        {
            type: 'value',
            name: 'HR',
            gridIndex: 0,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#6F4E37',
                },
            }, 
        },
        {
            type: 'value',
            name: 'W',
            gridIndex: 0,
            max: 'dataMax',
            position: 'right',
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'blue',
                },
                onZero: false,
            },            
        },
        {
            type: 'value',
            name: 'altitude',
            gridIndex: 0,
            position: 'left',
            offset: 50,
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#101010',
                },
                onZero: false,
            },            
        },         
    ],
    series: [
        {
        datasetIndex: 0,
        encode: {
            x: 0,
            y: 3,
        } ,     
        name: 'Watt',
        type: 'line',
        symbol: 'none',
        smooth: true,
        connectNulls: true,        
        color: 'steelblue',
        yAxisIndex: 1,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                }
            }
        },
   
    },{
        datasetIndex: 0,
        encode: {
            x: 0,
            y: 10,
        } ,     
        name: 'xPower',
        type: 'line',
        symbol: 'none',
        smooth: true,
        connectNulls: true,        
        color: 'blue',
        yAxisIndex: 1,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                }
            }
        },
   
    },{
        datasetIndex: 0,
        name: 'HR',
        encode: {
            x: 0,
            y: 7, 
        } ,          
        type: 'line',
        symbol: 'none',
        color: 'Maroon',
        smooth: true,
        connectNulls: true,
        yAxisIndex: 0,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'Maroon'
                    }
                }
            }
        },
     },{
        datasetIndex: 0,
   //     data: tmaxHR,
        name: 'altitude',
        encode: {
            x: 0,
            y: 2,
        } ,          
        type: 'line',
        symbol: 'none',
        color: '#10101010',
        smooth: true,
        connectNulls: true,
        yAxisIndex: 2,
        xAxisIndex: 0,
        areaStyle: {},
        itemStyle: {
            normal: {
                label: {
                    show: false,
                }
            }
        },
     } 
    ]    
    
  };

  myEffortChart.setOption(effortoptions);


var no_rides = 1;

    document.getElementById('chart_select').addEventListener('change', function() {
        let chart_options = myChart.getOption();
        chart_options.series = chart_options.series.map(elem => {
            elem.datasetIndex = this.value;
            no_rides = parseInt(this.value);
            return elem;
          });
        myChart.setOption(chart_options);
   
        const serie = {
          name: '90d avg HR/wkg',
        encode: {
            x: 0, 
            y: 20+parseInt(this.value),
          } 
          }  ;
     const options = {series:[serie]};
    // console.log(options);
     myChart.setOption(options);
    });


   
    // check gender 
    if (data90_360days[0].male == 0)
    {
        // change visibility of gender selctor
        document.getElementById('gender_select').setAttribute("style","");
    }

    function htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  
    const dataset_body = data90_360days.map(item => [
            item.event_date*1000,
            htmlDecode(item.event_title),
            item.f_t,
            (item.max_hr[0])? Math.floor(item.avg_hr[0]/item.max_hr[0]*100):null,
            (item.avg_hr[0])?(item.avg_hr[0]):null,
            (item.max_hr[0])?(item.max_hr[0]):null,
            (item.avg90Wkg1200) ? (item.avg90Wkg1200 * 0.95).toFixed(2) : null,
            (item.w1200[0])?(((parseFloat(item.w1200[0])/parseFloat(item.weight[0]))|| 0.0 )*0.95).toFixed(2):null,
            (item.max15/parseFloat(item.weight[0])).toFixed(2),
            (item.max60/parseFloat(item.weight[0])).toFixed(2),
            (item.max300/parseFloat(item.weight[0])).toFixed(2),
            (item.max1200/parseFloat(item.weight[0])).toFixed(2),
            (item.avg90W1200)? (item.avg90W1200 * 0.95).toFixed(0) : null,
            (item.w1200[0])? (parseFloat(item.w1200[0])*0.95).toFixed(0) : null,
            item.max15,
            item.max60,
            item.max300,
            item.max1200,
            (item.max1200) ? (item.max300/item.max1200).toFixed(2) : null,
            (item.avg_hr__avg_wkg) ? item.avg_hr__avg_wkg.toFixed(1) : null,
            (item.avg_hr__avg_wkg90d) ? item.avg_hr__avg_wkg90d.toFixed(1) : null,
            (item.avg_hr__avg_wkg90d_no_rides) ? item.avg_hr__avg_wkg90d_no_rides.toFixed(1) : null,
            item.weight[0], 
            (item.height[0])?item.height[0]:null,
            (item.height[0])? Math.round((item.weight[0] / ((item.height[0]/100)**2))*10)/10 : null,
        ]);


    //const dataset = dataset_header.concat(dataset_body);
    //console.log(dataset_body);

    // calc max hr from last 360 days
    const eventdate_before360 = Math.floor((Date.now()/1000)) - (360*24*60*60);
    const hrdata_360 = data90_360days.filter(d => d.event_date > eventdate_before360);
    hrdata_360.sort((a, b) => b.max_hr[0] - a.max_hr[0]);
    const top3hrmax = hrdata_360.slice(0,3);
    const mHR= Math.ceil(top3hrmax.reduce((acc, val) => acc + parseFloat(val.max_hr[0]), 0) / top3hrmax.length); 
    const WEIGHT = data90_360days.map(item => {return parseFloat(item.weight[0])});

    const minWeight = arrayMin(WEIGHT);

  const marked_Q = 
    {
      animation: false,
      silent: true,
      data: [
        [
          {
            itemStyle: {
              color: 'green',
              opacity: 0.2
            },
            yAxis: '0.00'
          },
          {
            yAxis: '1.24'
          }
        ],
        [
          {
            itemStyle: {
              color: 'yellow',
              opacity: 0.2
            },
            yAxis: '1.24'
          },
          {
            yAxis: '1.26'
          }
        ],
        [
          {
            itemStyle: {
              color: 'red',
              opacity: 0.2
            },
            yAxis: '1.26'
          },
          {
            yAxis: '4.00'
          }
        ]
      ],
    };

    const marked_zp_mixed = {
        animation: false,
        silent: true,
        data: 
            [
                [
                {
                itemStyle: {
                    color: 'orange',
                    opacity: 0.2
                },
                yAxis: '0.00'},{yAxis: '2.50'}
            ],
            [
                {
                itemStyle: {
                    color: 'blue',
                    opacity: 0.2
                },
                yAxis: '2.50'},{yAxis: '3.20'}
            ],
            [
                {
                itemStyle: {
                    color: 'green',
                    opacity: 0.2
                },
                yAxis: '3.20'},{yAxis: '4.00'}
            ],
                [
                {
                itemStyle: {
                    color: 'red',
                    opacity: 0.2
                },
                yAxis: '4.00'},{yAxis: '4.60'}
            ]
            ,
            [
                {
                itemStyle: {
                    color: 'black',
                    opacity: 0.2
                },
                yAxis: '4.60'},{yAxis: '6.00'}
            ]                          
        ],
    };

    const marked_zp_women = {
        animation: false,
        silent: true,
        data: 
            [
                [
                {
                itemStyle: {
                    color: 'orange',
                    opacity: 0.2
                },
                yAxis: '0.0'},{yAxis: '2.50'}
            ],
            [
                {
                itemStyle: {
                    color: 'blue',
                    opacity: 0.2
                },
                yAxis: '2.50'},{yAxis: '3.20'}
            ],
            [
                {
                itemStyle: {
                    color: 'green',
                    opacity: 0.2
                },
                yAxis: '3.20'},{yAxis: '3.70'}
            ],
                [
                {
                itemStyle: {
                    color: 'red',
                    opacity: 0.2
                },
                yAxis: '3.70'},{yAxis: '6.00'}
            ]
                       
        ],
    };    

    

    document.getElementById('gender_select').addEventListener('change', function() {
        if (this.value == 1)
        {
            //women
            myChart.setOption({
                series: [
                  {
                    // Find series by name
                    name: 'mark ZP zones',
                    markArea: marked_zp_women,
                  }
                ]
              });
        }
        else
        {
            // mixed
            myChart.setOption({
                series: [
                  {
                    // Find series by name
                    name: 'mark ZP zones',
                    markArea: marked_zp_mixed,
                  }
                ]
              });        
        }
    });

var show_watt = 0;

    document.getElementById('watt_select').addEventListener('change', function() {
        show_watt = parseInt(this.value);
        if (this.value == 1)
        {
            //watt
            myChart.setOption({
                series: [
                  {
                    name: '90d 20min 95%', 
                    encode: {
                        x: 0,
                        y: 12,
                    }
                  },
                  {
                    name: '20min 95%', 
                    encode: {
                        x: 0,
                        y: 13,
                    }
                  },
                  {
                    name: '15s max', 
                    encode: {
                        x: 0,
                        y: 14,
                    }
                  },
                  {
                    name: '1min max', 
                    encode: {
                        x: 0,
                        y: 15,
                    }
                  },
                  {
                    name: '5min max', 
                    encode: {
                        x: 0,
                        y: 16,
                    }
                  },
                  {
                    name: '20min max', 
                    encode: {
                        x: 0,
                        y: 17,
                    }
                  },                                                                                          
                ]
              });  
        }
        else
        {
            // wkg
            myChart.setOption({
                series: [
                  {
                    name: '90d 20min 95%', 
                    encode: {
                        x: 0,
                        y: 6,
                    }
                  },
                  {
                    name: '20min 95%', 
                    encode: {
                        x: 0,
                        y: 7,
                    }
                  },
                  {
                    name: '15s max', 
                    encode: {
                        x: 0,
                        y: 8,
                    }
                  },
                  {
                    name: '1min max', 
                    encode: {
                        x: 0,
                        y: 9,
                    }
                  },
                  {
                    name: '5min max', 
                    encode: {
                        x: 0,
                        y: 10,
                    }
                  },
                  {
                    name: '20min max', 
                    encode: {
                        x: 0,
                        y: 11,
                    }
                  },                                                                                          
                ]
              });        
        }
    });

const ttcolor_dict = {
3: 'Coral',
4: 'IndianRed',
5: 'Maroon',
6: 'blue',
7: 'SteelBlue',
8: '#45b320',
9: '#00A86B',
10: '#0B6623',
11: '#043927',
12: 'blue',
13: 'SteelBlue',
14: '#45b320',
15: '#00A86B',
16: '#0B6623',
17: '#043927',
18: '#45b320',
19: 'Orchid',
20: 'purple',
21: 'purple',
22: '#6F4E37',
23: '#483C32',
24: '#483C32'
}

  const options = {
    title: {
        text: htmlDecode(data90_360days[0].name),
        subtext:'Rider metrics',
        left: 'left'
    },
    dataset: [{
            // Provide a set of data.
            source: dataset_body
        },    
        {
            transform: {
                type: 'filter',
                config: { dimension: 2, '!=': 'RIDE' },
            }
        }
    ],

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
       // padding: [10, 20, 10, 20],
        backgroundColor: 'rgba(255,255,255,.92)',
        transitionDuration: 0,
        extraCssText: 'width: 600px; white-space: normal;',
        textStyle: {
          color: '#000',
          fontSize: 14,
          weight:600
        },        
        formatter: function(params) {
            const eventdate =  new Date(params[0].data[0]).toDateString();
            const w_bwkg = (show_watt==1)?'W':'wkg';
            return '<table>'+
                   '<tr><td style="width: 120px">Date:</td><td style="max-width: 480px">'+  eventdate + '</td></tr>' +
                   '<tr><td>Event:</td><td><div style="text-overflow: ellipsis;white-space: nowrap;">'+  params[0].data[1] + '</div></td></tr>' +
                   '<tr><td>Type:</td><td>'+  params[0].data[2] + '</td></tr>' +
                   `<tr><td>HR avg/max:</td><td style="color: ${ttcolor_dict[3]};">`+  params[0].data[3]  +'%' + '</td></tr>' +
                   `<tr><td>HR avg:</td><td style="color: ${ttcolor_dict[4]};">`+  params[0].data[4]  +'bpm' + '</td></tr>' +
                   `<tr><td>HR max:</td><td style="color: ${ttcolor_dict[5]};">`+  params[0].data[5]  +'bmp' + '</td></tr>' +
                   `<tr><td>20min 95% &#216;:</td><td style="color: ${ttcolor_dict[6]};">`+  params[0].data[6+show_watt*6] + w_bwkg + '</td></tr>' +
                   `<tr><td>20min 95%:</td><td style="color: ${ttcolor_dict[7]};">`+  params[0].data[7+show_watt*6] +w_bwkg + '</td></tr>' +
                   `<tr><td>Q 5/20:</td><td style="color: ${ttcolor_dict[18]};">`+  params[0].data[18] + '</td></tr>' +
                   `<tr><td>avg HR/wkg:</td><td style="color: ${ttcolor_dict[19]};">`+  params[0].data[19] + '</td></tr>' +
                   `<tr><td>avg HR/wkg  &#216;:</td><td style="color: ${ttcolor_dict[20+no_rides]};">`+  params[0].data[20+no_rides] + '</td></tr>' +
                   `<tr><td>15s max:</td><td style="color: ${ttcolor_dict[8]};">`+  params[0].data[8+show_watt*6] +w_bwkg + '</td></tr>' +
                   `<tr><td>1min max:</td><td style="color: ${ttcolor_dict[9]};">`+  params[0].data[9+show_watt*6] +w_bwkg + '</td></tr>' +
                   `<tr><td>5min max:</td><td style="color: ${ttcolor_dict[10]};">`+  params[0].data[10+show_watt*6] +w_bwkg + '</td></tr>' +
                   `<tr><td>20min max:</td><td style="color: ${ttcolor_dict[11]};">`+  params[0].data[11+show_watt*6] +w_bwkg + '</td></tr>' +
                   `<tr><td>Weight:</td><td style="color: ${ttcolor_dict[22]};">`+  params[0].data[22]  +'kg' + '</td></tr>' +
                   `<tr><td>Height:</td><td style="color: ${ttcolor_dict[23]};">`+  params[0].data[23]  +'cm' + '</td></tr>' +
                   '</table>';
                   
        },
      position: function (pos, params, el, elRect, size) {
        let obj = {};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 40;
        obj[['top']] = 200;
        //console.log(obj);
        return obj;
      },        
    },
    legend: [{
        data: [ 'HR avg/max', 'HR avg', 'HR max' ],
        selected: {
          'HR avg/max': true,
          'HR avg': false,
          'HR max': false,
        },
        orient: 'vertical',
        left: '90%',
        top: '100',
        itemGap: 20,
     },
    {
        data: [ '90d 20min 95%', '20min 95%'],
        selected: {
          '90d 20min 95%': true,
          '20min 95%': true,
        },
        orient: 'vertical',
        left: '90%',
        top: '320',
        itemGap: 20,
     },    {
        data: ['90d Q 5/20', 'avg HR/wkg', '90d avg HR/wkg'],
        selected: {
          '90d Q 5/20': false,
          'avg HR/wkg': true, 
          '90d avg HR/wkg': true
        },
        orient: 'vertical',
        left: '90%',
        top: '520',
        itemGap: 20,
     },    {
        data: ['15s max', '1min max','5min max','20min max'],
        selected: {
          '15s max': true,
          '1min max': true,
          '5min max': true,
          '20min max': true,
        },
        orient: 'vertical',
        left: '90%',
        top: '700',
        itemGap: 20,
     },     {
        data: [ 'Weight (kg)', 'Height (cm)'],
        selected: {
          'Weight (kg)': true,
          'Height (cm)': false,
        },
        orient: 'vertical',
        left: '90%',
        top: '880',
        itemGap: 20,
     },          ],
    grid: [
        { top: 100,  height: 140, left: '6%', right: '12%', bottom: 40},
        { top: 320,  height: 140, left: '6%', right: '12%', bottom: 40},
        { top: 520,  height: 120, left: '6%', right: '12%', bottom: 40},        
        { top: 700,  height: 120, left: '6%', right: '12%', bottom: 20},
        { top: 880,  height: 100, left: '6%', right: '12%', bottom: 20},
      ],
    dataZoom: [{
        type: 'slider',
        start: 0,
        end: 100,
        bottom: -10,
        filterMode: 'filter',
        xAxisIndex: [0, 1, 2, 3, 4]
    },
    {
        type: 'inside',
        start: 0,
        end: 100,
        filterMode: 'filter',
        xAxisIndex: [0, 1, 2, 3, 4]
    }
    ],
    axisPointer: {
        show: true,
        snap: true,
        lineStyle: {
          type: 'dashed'
        },
        label: {
          show: true,
          margin: 6,
          backgroundColor: '#556',
          color: '#fff'
        },
        link: [
          {
            xAxisIndex: [0, 1, 2, 3, 4],
          },
        ]
      },
    //   visualMap: {
    //     show: false,
    //     dimension: 24,
    //     seriesIndex: 2,
    //     pieces: [
    //       {
    //       lt: 18.5,
    //       gt: 0,
    //       color: 'blue'
    //     }, {
    //         lt: 25,
    //         gte: 18.5,
    //       color: 'green'
    //     }, {
    //       lt: 30,
    //       gte: 25,          
    //       color: '#EDED00' //'yellow'
    //     }, {
    //         lt: 35,
    //         gte: 30,
    //         color: 'orange'
    //       }
    //       , {
    //         gte: 35,
    //         color: 'red'
    //       }
        
        
    //     ]
    //     } ,     
    xAxis: [{
        type: 'time',
        gridIndex: 0,
    },{
        type: 'time',
        gridIndex: 1,
    },{
        type: 'time',
        gridIndex: 2,
    },{
        type: 'time',
        gridIndex: 3,
    },{
        type: 'time',
        gridIndex: 4,
    }],
    yAxis: [
        {
            type: 'value',
            name: 'Weight',
            gridIndex: 4,
            min: Math.floor(minWeight)-5,
            axisLabel: {
                  formatter: '{value}kg'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#6F4E37',
                },
            }, 
        },
        {
            type: 'value',
            name: 'Height (cm)',
            gridIndex: 4,
            min: 'dataMin',
            max: 'dataMax',
            position: 'right',
            axisLabel: {
                //formatter: '{value}cm'
            },
            //offset:70,
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#483C32',
                },
                onZero: false,
            },            
        },
        {
        type: 'value',
        name: '95%',
        gridIndex: 1,
        min: 'dataMin',
        position: 'right',
        axisLabel: {
            formatter: '{value}'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'RoyalBlue',
                },
            },             
        },
        {
        type: 'value',
        
        name: 'HR bmp',
        gridIndex: 0,
        min: 'dataMin',
        max: mHR+5,
        position: 'left',
        axisLabel: {
            formatter: '{value}'
            },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'IndianRed',
            },
        }
    }   ,  
        {
          type: 'value',
          name: 'HR %',
          gridIndex: 0,
          min: '60',
          max: '100',
          position: 'right',
          axisLabel: {
              formatter: '{value}'
          },
          axisLine: {
              show: true,
              lineStyle: {
                  color: 'IndianRed',
              },
          },                    
        }
        ,
        {
        type: 'value',
        name: '90d max',
        gridIndex: 3,
        min: 'dataMin',
        position: 'right',
        axisLabel: {
            formatter: '{value}'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4F7942',
                },
            },             
        },
        {
        type: 'value',
        name: 'Q 5/20',
        gridIndex: 2,
        min: 'dataMin',
        position: 'left',
        axisLabel: {
            formatter: '{value}'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#45b320',
                },
            },             
        },
        {
        type: 'value',
        name: 'avg HR/wkg',
        gridIndex: 2,
        min: 'dataMin',
        position: 'right',
        axisLabel: {
            formatter: '{value}'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'purple',
                },
            },             
        }
              
    ],
    series: [{
        datasetIndex: 1,
        //data: tweight,
        encode: {
            x: 0,
            y: 22,
        } ,     
        name: 'Weight (kg)',
        type: 'line',
        symbol: 'circle',
        smooth: true,
        connectNulls: true,        
        color: '#6F4E37',
        yAxisIndex: 0,
        xAxisIndex: 4,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#6F4E37'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
   
    },{
        datasetIndex: 1,
        encode: {
            x: 0,
            y: 23,
        } ,    
       // data: theight,
        name: 'Height (cm)',
        type: 'line',
        symbol: 'circle',
        connectNulls: true,
        smooth: true,
        color: '#483C32',
        yAxisIndex: 1,
        xAxisIndex: 4,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#483C32'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
        // markLine: {
        //     data: [
        //         {type: 'average', name: 'Average'}
        //     ]
        // }        
    },{
        datasetIndex: 1,
   //     data: tavg20min,
        
        encode: {
            x: 0,               // Dimension 0 is mapped to x axis.
            y: 6,              // Dimension 1 is mapped to y axis.
        } ,      
        name: '90d 20min 95%',    
        type: 'line',
        symbol: 'circle',
        color: 'blue',
        smooth: true,
        connectNulls: true,        
        yAxisIndex: 2,
        xAxisIndex: 1,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'blue'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
        // markLine: {
        //     data: [
        //         {type: 'average', name: 'Average'}
        //     ]
        // }        
    },{
        datasetIndex: 1,
  //      data: t20min,
        name: '20min 95%',
        encode: {
            x: 0,               // Dimension 0 is mapped to x axis.
            y: 7,              // Dimension 1 is mapped to y axis.
        } ,          
        type: 'line',
        symbol: 'circle',
        color: 'SteelBlue',
        smooth: true,
        connectNulls: true,
        yAxisIndex: 2,
        xAxisIndex: 1,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'SteelBlue'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
     },{
        datasetIndex: 1,
  //      data: tavgHR,
        name: 'HR avg',
        encode: {
            x: 0,               // Dimension 0 is mapped to x axis.
            y: 4,              // Dimension 1 is mapped to y axis.
        } ,          
        type: 'line',
        symbol: 'circle',
        color: 'IndianRed',
        smooth: true,
        connectNulls: true,
        yAxisIndex: 3,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'IndianRed'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
        markLine: {
            data: [
                {
                    name: 'max HR',
                    yAxis: mHR
            }
            ]
            ,
            label: {
                normal: {
                  show: true,
                  position: 'middle',
                  formatter:`${mHR} bpm`,
                  color: 'Maroon',
                  fontWeight: 'bold',
                  fontSize: 14,
                  backgroundColor: 'white'                  
                }
              }            
        }         
     },{
        datasetIndex: 1,
   //     data: tmaxHR,
        name: 'HR max',
        encode: {
            x: 0,               // Dimension 0 is mapped to x axis.
            y: 5,              // Dimension 1 is mapped to y axis.
        } ,          
        type: 'line',
        symbol: 'circle',
        color: 'Maroon',
        smooth: true,
        connectNulls: true,
        yAxisIndex: 3,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'Maroon'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
        markLine: {
            data: [
                {
                    name: 'max HR',
                    yAxis: mHR
            }]
            ,
            label: {
                normal: {
                  show: true,
                  position: 'middle',
                  formatter: `${mHR} bpm`,
                  color: 'Maroon',
                  fontWeight: 'bold',
                  fontSize: 14,
                  backgroundColor: 'white'                  
                }
              }
        } 
     },{
        datasetIndex: 1,
  //      data: tavgHR,
        name: 'HR avg/max',
        encode: {
            x: 0,               // Dimension 0 is mapped to x axis.
            y: 3,              // Dimension 1 is mapped to y axis.
        } ,          
        type: 'line',
        symbol: 'circle',
        color: 'Coral',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 4,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'Coral'
                    }
                }
            }
        },
        markPoint: {
            data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
            ]
        },
        markLine: {
            data: [
                {
                    name: 'max HR',
                    yAxis: 100
            },
            {type: 'average', name: 'Average'}
            ]
            ,
            label: {
                formatter:'{b}: {c}%',
                  show: true,
                  position: 'insideStartTop',
                  color: 'Coral',
                  fontWeight: 'bold',
                  fontSize: 14,
                  backgroundColor: 'white'
 
              }            
        },
                  
     },
     
     {
        datasetIndex: 1,
          name: '15s max',
        encode: {
            x: 0,  
            y: 8, 
        } ,          
        type: 'line',
        symbol: 'circle',
        color: '#45b320',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 5,
        xAxisIndex: 3,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#45b320'
                    }
                }
            }
        },
     },
     
     {
        datasetIndex: 1,
        name: '1min max',
        encode: {
            x: 0,
            y: 9,
        } ,          
        type: 'line',
        symbol: 'circle',
        color: '#00A86B',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 5,
        xAxisIndex: 3,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#00A86B'
                    }
                }
            }
        },
     },
     
     {
        datasetIndex: 1,
        name: '5min max',
        encode: {
            x: 0,
            y: 10,
        } ,          
        type: 'line',
        symbol: 'circle',
        color: '#0B6623',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 5,
        xAxisIndex: 3,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#0B6623'
                    }
                }
            }
        },
     },
     
     {
        datasetIndex: 1,
        name: '20min max',
        encode: {
            x: 0, 
            y: 11,
        } ,          
        type: 'line',
        symbol: 'circle',
        color: '#043927',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 5,
        xAxisIndex: 3,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#043927'
                    }
                }
            }
        },
     }
,
     {
        datasetIndex: 1,
        name: '90d Q 5/20',
        encode: {
            x: 0, 
            y: 18,
        } ,          
        type: 'line',
        symbol: 'circle',
        color: '#45b320',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 6,
        xAxisIndex: 2,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#45b320'
                    }
                }
            }
        },
        markArea: marked_Q,
     }  
     ,
     {
        datasetIndex: 1,
        name: 'avg HR/wkg',
        encode: {
            x: 0, 
            y: 19,
        } ,          
        type: 'line',
        symbol: 'circle',
        color: 'Orchid',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 7,
        xAxisIndex: 2,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'Orchid'
                    }
                }
            }
        },
     }
,
     {
        datasetIndex: 1,
        name: '90d avg HR/wkg',
        encode: {
            x: 0, 
            y: 21,
        } ,          
        type: 'line',
        symbol: 'circle',
        color: 'purple',
        connectNulls: true,
        smooth: true,
        yAxisIndex: 7,
        xAxisIndex: 2,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'purple'
                    }
                }
            }
        },
     }     
     ,
     
     {
        datasetIndex: 1,
        name: 'mark ZP zones',
        data: [],        
        type: 'line',
        symbol: 'circle',
        color: '#45b320',

        yAxisIndex: 2,
        xAxisIndex: 1,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#45b320'
                    }
                }
            }
        },
        markArea: marked_zp_mixed,
     }      
    ]    
    
  };

  options.toolbox = {
      feature: {
          dataZoom: {
              yAxisIndex: 'none',
              title: { zoom: 'area zooming' , back: 'restore zoom' }
          },
          saveAsImage: {
            title: 'save as'
          },
      }
  };
  

myChart.on('brush', function () {
    var option = myChart.getOption();
    option.toolbox[0].feature.dataZoom.yAxisIndex = 'all';
    myChart.setOption(option);
});


  // set the options and render the chart
  myChart.setOption(options);     
  myChart.resize();
});
}

