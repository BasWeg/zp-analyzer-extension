//const segments = new URL(window.location).pathname.split('/');
//var activity_id = segments.pop() || segments.pop(); // Handle potential trailing slash
var myEffortChart;
var myhist_cadence;
var myhist_power;
var myhist_speed;
var myhist_hr;
var activity_data = null;
var fitness_data = null;
const handleFromWeb = async (event) => {
    if (event.data.from) {
        const data = event.data.data.data;
        // console.log(`process from ${event.data.from}`);
        // console.log(event.data.data);
        
        if (event.data.data.type == "activity_data")
        {
            activity_data = await data;
        }
        else if (event.data.data.type == "fitness_data")
        {
            doit();
            update_chart(activity_data, data);
            fitness_data = await data;
        }
        //getActivity(activity_id,data.sessionTokens.accessToken);
    }
};




var markarea = [];
const effortoptions = {
    title: {
        text: "TIMELINE GRAPH",
        subtext: '',
        left: 'left'
    },
    legend: [{
        data: [ 'HR', 'Watt','cadence', 'altitude','Speed' ],
     }],
    dataset:[{source:[[null,null,null,null,null,null,null]]}],
    grid: [
        { top: 100,  left: 100, right: 120, bottom: 40},
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
            name: 'bpm',
            gridIndex: 0,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'Maroon',
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
                    color: 'black',
                },
                onZero: false,
            },            
        },
        {
            type: 'value',
            name: 'm',
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
        {
            type: 'value',
            name: 'rpm',
            gridIndex: 0,
            max: 'dataMax',
            position: 'right',
            offset: 80,
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'steelblue',
                },
                onZero: false,
            },            
        },
        {
            type: 'value',
            name: 'km/h',
            gridIndex: 0,
            position: 'right',
            max: 'dataMax',
            offset: 40,
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'green',
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
            y: 5,
        } ,     
        name: 'Watt',
        type: 'line',
        symbol: 'none',
        smooth: true,
        connectNulls: true,        
        color: 'black',
        yAxisIndex: 1,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                }
            }
        },
   
    },
    {
        datasetIndex: 0,
        encode: {
            x: 0,
            y: 6,
        } ,     
        name: 'Speed',
        type: 'line',
        symbol: 'none',
        smooth: true,
        connectNulls: true,        
        color: 'green',
        yAxisIndex: 4,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                }
            }
        },
   
    },
  
    {
        datasetIndex: 0,
        encode: {
            x: 0,
            y: 4,
        } ,     
        name: 'cadence',
        type: 'line',
        symbol: 'none',
        smooth: true,
        connectNulls: true,        
        color: 'steelblue',
        yAxisIndex: 3,
        xAxisIndex: 0,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                }
            }
        },
   
    },    

    {
        datasetIndex: 0,
        name: 'HR',
        encode: {
            x: 0,
            y: 3, 
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
    },
     
    ]    
    
  };

var totalElements = 1;
var totalHistElements = 1;

  function get_histogramm_options(dimension) {
// freedmanDiaconis scott sturges
  const histogramm_options = {
    title: {
        text: "",
        subtext: '',
        left: 'left'
    },
    dataset:[
        {
            source:[[0,0,0,0,0,0,0]]
        },
        {
                transform: {
                    type: 'ecStat:histogram',
                    print: true,
                    config: { dimensions: [dimension],  
                         }
            }
        }
],
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
        },
        formatter: function (params) { 
            //console.log(params);
            return `${params[0].data[4]}: <b>${params[0].data[1]}s</b> &wedgeq; ${Math.round((params[0].data[1]*10000)/totalHistElements)/100}%`;
        }
    },   

    xAxis: [{
        type: 'category',
        gridIndex: 0,
    // },{
    //     type: 'value',
    //     gridIndex: 1,
    }],
    yAxis: [
        {
            type: 'value',
            gridIndex: 0,
        },
    ],
    series: [
        {
            name: 'histogram',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: '99.3%',
            label: {
                show: false,
                position: 'top'
            },
            encode: { x: 0, y: 1, itemName: 4 },
            datasetIndex: 1
   
    }
    ]    
  };
  return histogramm_options;
}



async function update_chart(activity_data, fitness_data)
{
    
    const title = activity_data.profile.firstName + ' ' + activity_data.profile.lastName;
    const date = new Date(activity_data.startDate);
    const subtitle = date + ': ' + activity_data.name;
   // console.log(dataset);

    const dataset = fitness_data.timeInSec.map((element, index) => {
        return [element, 
                                                                    fitness_data.distanceInCm[index]/100, 
                                                                    fitness_data.altitudeInCm[index]/100, 
                                                                    fitness_data.heartRate[index], 
                                                                    fitness_data.cadencePerMin[index], 
                                                                    fitness_data.powerInWatts[index],
                                                                    Math.round(fitness_data.speedInCmPerSec[index]*3.6/10)/10,  // Convert cm/s to km/h
                                                                    ]});
  let options = {};
//   console.log(dataset);



  var dataset_hist = dataset.slice();
  totalHistElements = dataset_hist.length;
  //console.log(totalElements);
  options.dataset=[{source:dataset}];
  options.title= {text: title, subtext: subtitle};
  
  myEffortChart.setOption(options);

  options.yAxis = {
    type: 'value',
    axisLabel: {
      formatter: function (value) {return `${Math.round((value*100) / totalHistElements)}%`}
    }
  };
  options.dataset=[{source:dataset_hist}];
  options.title= {text: title + " - cadence distribution", subtext: subtitle};
//   console.log(options);
  myhist_cadence.setOption(options);
    options.title= {text: title + " - heartrate distribution", subtext: subtitle};
  myhist_hr.setOption(options);
  
  options.title= {text: title + " - power distribution", subtext: subtitle};
  myhist_power.setOption(options);
    options.title= {text: title + " - speed distribution", subtext: subtitle};
    myhist_speed.setOption(options);

  myEffortChart.hideLoading();
  
  // eslint-disable-next-line no-unused-vars
  myEffortChart.on('datazoom', function (evt) {
    var zoom = myEffortChart.getOption().dataZoom[0];

    dataset_hist = dataset.slice(Math.round(zoom.startValue),Math.round(zoom.endValue));
    totalHistElements = dataset_hist.length;
    options.dataset=[{source:dataset_hist}];
    options.title= {text: title + " - cadence distribution (" + Math.round(zoom.startValue)+"s - "+Math.round(zoom.endValue)+"s)", subtext: subtitle};
    myhist_cadence.setOption(options);
    
    options.title= {text: title + " - heartrate distribution (" + Math.round(zoom.startValue)+"s - "+Math.round(zoom.endValue)+"s)", subtext: subtitle};
    myhist_hr.setOption(options);

    options.title= {text: title + " - power distribution (" + Math.round(zoom.startValue)+"s - "+Math.round(zoom.endValue)+"s)", subtext: subtitle};
    myhist_power.setOption(options);
    
    options.title= {text: title + " - speed distribution (" + Math.round(zoom.startValue)+"s - "+Math.round(zoom.endValue)+"s)", subtext: subtitle};
    myhist_speed.setOption(options);
});
  //console.log(dataset);                                                    
}



function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
    // console.log("injected")
}

setTimeout( async function() {
    window.addEventListener('message', handleFromWeb);
    // eslint-disable-next-line no-undef
    injectScript(chrome.runtime.getURL("activity_inject.js"), 'body');
}, 1000);






if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
   // doit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
    //    doit();
    });
}

async function doit() {


//setTimeout( async function() {
    const parent = document.querySelector("#navigation-container > div > div > main > div.activity-details-page > div");
//    console.log(parent);
    var row2 = document.createElement('div');
    row2.setAttribute("class", "row");
    row2.setAttribute("id", "div_chart_effort");
    row2.setAttribute("style", "width:100%;padding: 15px;");
        
    let dichartctrrl = document.createElement('div');
    dichartctrrl.setAttribute("id", "idchart_control");
    row2.appendChild(dichartctrrl);  
    let dichart = document.createElement('div');
            dichart.setAttribute("id", "effort_chart");
                dichart.setAttribute("style", "height:500px; width:100%; padding: 20px;");
    row2.appendChild(dichart);

    parent.appendChild(row2);


    var row3 = document.createElement('div');
    row3.setAttribute("class", "row");
    row3.setAttribute("id", "div_chart_histo");
    row3.setAttribute("style", "width:100%;padding: 15px;");
    let hist_cadence = document.createElement('div');
    hist_cadence.setAttribute("id", "hist_cadence");
    hist_cadence.setAttribute("style", "height:500px; width:50%; padding: 20px;");
    row3.appendChild(hist_cadence);
    let hist_hr = document.createElement('div');
    hist_hr.setAttribute("id", "hist_hr");
    hist_hr.setAttribute("style", "height:500px; width:50%; padding: 20px;");
    row3.appendChild(hist_hr);

    parent.appendChild(row3);



    var row5 = document.createElement('div');
    row5.setAttribute("class", "row");
    row5.setAttribute("id", "div_chart_histo");
    row5.setAttribute("style", "width:100%;padding: 15px;");
    let hist_power = document.createElement('div');
    hist_power.setAttribute("id", "hist_power");
    hist_power.setAttribute("style", "height:500px; width:50%; padding: 20px;");
    row5.appendChild(hist_power);
    let hist_speed = document.createElement('div');
    hist_speed.setAttribute("id", "hist_speed");
    hist_speed.setAttribute("style", "height:500px; width:50%; padding: 20px;");
    row5.appendChild(hist_speed);

    parent.appendChild(row5);    



    // eslint-disable-next-line no-undef
    echarts.registerTransform(ecStat.transform.histogram);
    // eslint-disable-next-line no-undef
    myhist_cadence= echarts.init(document.getElementById('hist_cadence'));
    // eslint-disable-next-line no-undef
    myhist_cadence.setOption(get_histogramm_options(4));
    

    // eslint-disable-next-line no-undef
    myhist_hr= echarts.init(document.getElementById('hist_hr'));
    // eslint-disable-next-line no-undef

    myhist_hr.setOption(get_histogramm_options(3));
    
    // eslint-disable-next-line no-undef
    myhist_power= echarts.init(document.getElementById('hist_power'));
    // eslint-disable-next-line no-undef
    myhist_speed= echarts.init(document.getElementById('hist_speed')); 
    myhist_power.setOption(get_histogramm_options(5));
    myhist_speed.setOption(get_histogramm_options(6));        


   
    // myhist_cadence.resize();
    // eslint-disable-next-line no-undef
    myEffortChart = echarts.init(document.getElementById('effort_chart'));
    myEffortChart.setOption(effortoptions);
    myEffortChart.resize();
    myEffortChart.showLoading();

    
    
    
    window.addEventListener('resize', function() {
        myEffortChart.resize();
        myhist_cadence.resize();
        myhist_hr.resize();
        myhist_power.resize();
        myhist_speed.resize();        
    });    

 // }, 10000);

}






