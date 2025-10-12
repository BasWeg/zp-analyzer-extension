if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    doit();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        doit();
    });
}
console.log(document.URL);


async function doit() {
    const { getData } = await import ('./common.js');
  
const g = document.createElement('div');
 g.setAttribute("class", "row");
 g.setAttribute("id", "summary_div");
 g.setAttribute("style", "padding: 15px;");

 const parent = document.querySelector("#tab-riders > div");
 const refel = document.querySelector("#tab-riders > div > div.panel-body");
 parent.insertBefore(g,refel);
let p2 = document.createElement('div');
p2.setAttribute("class", "row");
p2.setAttribute("id", "control_charts");
p2.setAttribute("style", "text-align: right;padding-right: 15px;");
g.appendChild(p2);

 let p1 = document.createElement('div');
 p1.setAttribute("class", "row");
 p1.setAttribute("id", "charts");
 p1.setAttribute("style", "display: flex; padding: 15px;height:430px;");
 g.appendChild(p1);

 let g1 = document.createElement('div');
 g1.setAttribute("id", "summary_chart");
 g1.setAttribute("style", "height:400px; width:30%; background: white; padding: 20px;");
 p1.appendChild(g1);
 let g4 = document.createElement('div');
 g4.setAttribute("id", "scatter_chart");
 g4.setAttribute("style", "height:400px; width:70%; background: white; padding: 20px;");
 p1.appendChild(g4);  
//  g2 = document.createElement('div');
//  g2.setAttribute("id", "prop_chart");
//  g2.setAttribute("style", "height:400px; width:40%; background: white; padding: 20px;");
//  p1.appendChild(g2); 
//  const g3 = document.createElement('progress');
//  g3.setAttribute("id", "progress");
//  g3.setAttribute("max", "1");
//  g3.setAttribute("value", "0");
//  g3.setAttribute("style", "position: absolute; left: 5%; width: 90%; padding: 10px;");
//  p1.appendChild(g3); 


// console.log(document.URL);

p2.innerHTML = '<select name="chart_select_gender" id="chart_select_gender"><option value="0">mixed</option><option value="1">women</option></select>'+
        '<select name="chart_select_duration" id="chart_select_duration">'+
        '<option value="0">20min 95%</option>'+
        '<option value="1">20min</option>'+
        '<option value="2">15sec</option></select>';



        
const teamn = document.querySelector("#zp_submenu > ul > li.pull-left.active > a").textContent;
console.log(teamn);

let argument = document.URL.match(/[?&]id=([^&]+)/);
const category_dict= {
    0: null,
    5: 'A+',
    10: 'A',
    20: 'B',
    30: 'C',
    40: 'D',
};
// eslint-disable-next-line no-undef
const myChart = echarts.init(document.getElementById('summary_chart'));
// eslint-disable-next-line no-undef
const myScatterChart = echarts.init(document.getElementById('scatter_chart'));
// eslint-disable-next-line no-undef
// const myPropChart = echarts.init(document.getElementById('prop_chart'));
var duration = '20min 95%';
var gender = 'mixed';
// var tab_gender = 'mixed';

window.addEventListener('resize', function() {
    myChart.resize();
    myScatterChart.resize();
    // document.getElementById('prop_chart').style = `height:400px; width:100%;`;
    // myPropChart.resize();
});

// document.getElementById('zpanalysis').addEventListener('click', function() {
//     const width = (self.innerWidth > 1600) ? 1600 : self.innerWidth;
//     document.getElementById('prop_chart').style = `height:400px; width:${width-30}px;`;
// // This will log the width of the viewport
//     // myPropChart.resize();

// });


argument = {type: 'team', id: argument[1]};
console.log (argument);
var riders = {};
getData(argument).then(async function(myjson) {
   // console.log(myjson);
    riders =  myjson.data;

    const data_filtered = riders.filter(d => (parseFloat(d.h_1200_watts)||0) != 0 && (parseFloat(d.w[0])||0) != 0 && (parseFloat(d.div)||0)!= 0);
    let ap_riders = data_filtered.filter(item => item.div == 5);
    let a_riders = data_filtered.filter(item => item.div == 10);
    let b_riders = data_filtered.filter(item => item.div == 20);
    let c_riders = data_filtered.filter(item => item.div == 30);
    let d_riders = data_filtered.filter(item => item.div == 40);
    let apw_riders = data_filtered.filter(item => item.divw == 5);
    let aw_riders = data_filtered.filter(item => item.divw == 10);
    let bw_riders = data_filtered.filter(item => item.divw == 20);
    let cw_riders = data_filtered.filter(item => item.divw == 30);
    let dw_riders = data_filtered.filter(item => item.divw == 40); 
    let wriders = data_filtered.filter(item => item.divw != 0);  
    // console.log(data_filtered);
    const dataset_body = data_filtered.map(item => [item.zwid, 
                                                    item.name, 
                                                    category_dict[item.div], 
                                                    category_dict[item.divw], 
                                                    parseInt(item.ftp), 
                                                    parseFloat(item.w[0]), 
                                                    Math.round(parseFloat(item.h_1200_watts)*0.95),  // 95% 20min
                                                    Math.round((parseFloat(item.h_1200_watts)/parseFloat(item.w[0]))*0.95*100)/100,
                                                    parseFloat(item.h_1200_watts),
                                                    Math.round((parseFloat(item.h_1200_watts)/parseFloat(item.w[0]))*100)/100,
                                                    parseFloat(item.h_15_watts.replace(',','')),
                                                    parseFloat(item.h_15_wkg)])


    var options = {
        title: {
            text: teamn,
            subtext:'category distribution (active riders)',
            left: 'center'
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
            right: 0,
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
                            return data_filtered.length;
                        else
                            return wriders.length;
                    }
                }
            }            
          }                             
        ]
      };
      myChart.setOption(options);  
      
function get_scatter_marked_area(gender, duration){
var opacity = 0;
if (duration == '20min 95%') opacity = 0.2;
const mixed = {
    animation: false,
    silent: true,
    data: 
        [[
            {
            itemStyle: {
                color: 'orange',
                opacity: opacity
            },
            yAxis: '1.00'},{yAxis: '2.50'}
        ],
        [
            {
            itemStyle: {
                color: 'orange',
                opacity: opacity
            },
            coord: [0, 2.50],
            },
            {coord: [150, 6.00],}
        ],            
        [
            {
            itemStyle: {
                color: 'blue',
                opacity: opacity
            },
            coord: [150, 2.5],
            },
            {coord: [200, 6.00],}
        ],
        [
            {
            itemStyle: {
                color: 'blue',
                opacity: opacity
            },
            coord: [200, 2.5],
            },
            {coord: [600, 3.2],}
        ],            
        [
            {
            itemStyle: {
                color: 'green',
                opacity: opacity
            },
            coord: [200, 3.2],
            },
            {coord: [250, 6.00],}
        ],
        [
            {
            itemStyle: {
                color: 'green',
                opacity: opacity
            },
            coord: [250, 3.2],
            },
            {coord: [600, 4.00],}
        ],
        [
            {
            itemStyle: {
                color: 'red',
                opacity: opacity
            },
            coord: [250, 4.0],
            },
            {coord: [300, 6.00],}
        ],
        [
            {
            itemStyle: {
                color: 'red',
                opacity: opacity
            },
            coord: [300, 4.0],
            },
            {coord: [600, 4.60],}
        ],  
        [
            {
            itemStyle: {
                color: 'black',
                opacity: opacity
            },
            coord: [300, 4.6],
            },
            {coord: [600, 6.0],}
        ]                          
    ],
};
const women = {
    animation: false,
    silent: true,
    data: 
        [
            [
            {
            itemStyle: {
                color: 'orange',
                opacity: opacity
            },
            yAxis: '0.00'},{yAxis: '2.50'}
        ],
        [
            {
            itemStyle: {
                color: 'blue',
                opacity: opacity
            },
            yAxis: '2.50'},{yAxis: '3.20'}
        ],
        [
            {
            itemStyle: {
                color: 'green',
                opacity: opacity
            },
            yAxis: '3.20'},{yAxis: '3.70'}
        ],
            [
            {
            itemStyle: {
                color: 'red',
                opacity: opacity
            },
            yAxis: '3.70'},{yAxis: '6.00'}
        ]
                   
    ],
};

if (gender == 'mixed') return mixed;
else return women;
}
    //   const marked_scatter_mixed = {
    //     animation: false,
    //     silent: true,
    //     data: 
    //         [[
    //             {
    //             itemStyle: {
    //                 color: 'orange',
    //                 opacity: 0.2
    //             },
    //             yAxis: '1.00'},{yAxis: '2.50'}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'orange',
    //                 opacity: 0.2
    //             },
    //             coord: [0, 2.50],
    //             },
    //             {coord: [150, 6.00],}
    //         ],            
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'blue',
    //                 opacity: 0.2
    //             },
    //             coord: [150, 2.5],
    //             },
    //             {coord: [200, 6.00],}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'blue',
    //                 opacity: 0.2
    //             },
    //             coord: [200, 2.5],
    //             },
    //             {coord: [600, 3.2],}
    //         ],            
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'green',
    //                 opacity: 0.2
    //             },
    //             coord: [200, 3.2],
    //             },
    //             {coord: [250, 6.00],}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'green',
    //                 opacity: 0.2
    //             },
    //             coord: [250, 3.2],
    //             },
    //             {coord: [600, 4.00],}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'red',
    //                 opacity: 0.2
    //             },
    //             coord: [250, 4.0],
    //             },
    //             {coord: [300, 6.00],}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'red',
    //                 opacity: 0.2
    //             },
    //             coord: [300, 4.0],
    //             },
    //             {coord: [600, 4.60],}
    //         ],  
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'black',
    //                 opacity: 0.2
    //             },
    //             coord: [300, 4.6],
    //             },
    //             {coord: [600, 6.0],}
    //         ]                          
    //     ],
    // };

    // const marked_scatter_women = {
    //     animation: false,
    //     silent: true,
    //     data: 
    //         [
    //             [
    //             {
    //             itemStyle: {
    //                 color: 'orange',
    //                 opacity: 0.2
    //             },
    //             yAxis: '0.00'},{yAxis: '2.50'}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'blue',
    //                 opacity: 0.2
    //             },
    //             yAxis: '2.50'},{yAxis: '3.20'}
    //         ],
    //         [
    //             {
    //             itemStyle: {
    //                 color: 'green',
    //                 opacity: 0.2
    //             },
    //             yAxis: '3.20'},{yAxis: '3.70'}
    //         ],
    //             [
    //             {
    //             itemStyle: {
    //                 color: 'red',
    //                 opacity: 0.2
    //             },
    //             yAxis: '3.70'},{yAxis: '6.00'}
    //         ]
                       
    //     ],
    // };

     // [item.zwid, item.name, category_dict[item.div], category_dict[item.divw], parseFloat(item.w[0]), parseFloat(item.h_1200_watts),parseFloat(item.h_1200_wkg),parseFloat(item.h_15_watts),parseFloat(item.h_15_wkg)]
      const scatter_options = {
        dataset: [{
            dimensions: ['zwid', 'name', 'div', 'divw', 'ftp', 'weight', '20min watts 95%', '20min wkg 95%', '20min watts', '20min wkg', '15s watts', '15s wkg'],
            source: dataset_body
          },
          {
            transform: {
                type: 'filter',
                config: { dimension: 'div', '=': 'A+'},
            }
        },          
          {
            transform: {
                type: 'filter',
                config: { dimension: 'div', '=': 'A'},
            }
        },
        {
            transform: {
                type: 'filter',
                config: { dimension: 'div', '=': 'B'},
            },
        },
        {
            transform: {
                type: 'filter',
                config: { dimension: 'div', '=': 'C'},
            },
        },
        {
            transform: {
                type: 'filter',
                config: { dimension: 'div', '=': 'D'},
            }                                    
        },
        {
          transform: {
              type: 'filter',
              config: { dimension: 'divw', '=': 'A+'},
          }
      },          
        {
          transform: {
              type: 'filter',
              config: { dimension: 'divw', '=': 'A'},
          }
      },
      {
          transform: {
              type: 'filter',
              config: { dimension: 'divw', '=': 'B'},
          },
      },
      {
          transform: {
              type: 'filter',
              config: { dimension: 'divw', '=': 'C'},
          },
      },
      {
          transform: {
              type: 'filter',
              config: { dimension: 'divw', '=': 'D'},
          }                                    
      }
        ],
        title: {
            text: teamn,
            subtext:`${duration} power scatter - ${gender}`,
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
             //   console.log(params);
                        const data = params.data;
                        const gender = (data[3] > 0) ? '&#9792; ' : '&#9794; ';
                        const returnstr = `<span class="badge" style="background: ${params.color}; weight: 600;">` + params.seriesName + `:</span> ${gender} ${data[1]}<br>` +
                                    `FTP: ${data[4]}W <br>`+            
                                    `${params.dimensionNames[params.encode.x]}: ${data[params.encode.x]} <br>`+
                                    `${params.dimensionNames[params.encode.y]}: ${data[params.encode.y]}`;
                    return returnstr;
                
            }
        },
        toolbox : {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'area zooming' , back: 'restore zoom' }
                },
                // restore: {
                //   title: 'restore'
                // },
                saveAsImage: {
                  title: 'save as'
                }
            }
        },        
        legend: {data: ['A+', 'A', 'B', 'C', 'D'],
            orient: 'vertical',
            right: 0,
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
            type: 'scatter',
            datasetIndex: 1,
            color: 'black',
            encode: {
                x: '20min watts 95%',
                y: '20min wkg 95%',
                //tooltip: ['20min watts 95%', '20min wkg' 95%],
              }            
          },
          {
            name: 'A',
            type: 'scatter',
            datasetIndex: 2,
            color: 'red',
            encode: {
                x: '20min watts 95%',
                y: '20min wkg 95%',
             //   tooltip: ['20min watts 95%', '20min wkg 95%'],
              }            
          },          
          {
            name: 'B',
            type: 'scatter',
            datasetIndex: 3,  
            color: 'green',          
            encode: {
                x: '20min watts 95%',
                y: '20min wkg 95%'
              }            
          },
          {
            name: 'C',
            type: 'scatter',
            datasetIndex: 4,
            color: 'blue',
            encode: {
                x: '20min watts 95%',
                y: '20min wkg 95%'
              }            
          },
          {
            name: 'D',
            type: 'scatter',
            datasetIndex: 5,
            color: 'orange',
            encode: {
                x: '20min watts 95%',
                y: '20min wkg 95%'
              }            
          },
          {
            name: 'marks',
            selectedMode: false,
            datasetIndex: 0,
            type: 'line',
            data:[],
            markArea: get_scatter_marked_area(gender, duration),                                       
        },             
                              
        ]
      }
      myScatterChart.setOption(scatter_options);

      document.getElementById('chart_select_gender').addEventListener('change', function() {
        let scatterchart_options = myScatterChart.getOption();
        if (this.value == 0)
        {
            let index = 1;
            scatterchart_options.series = scatterchart_options.series.map(elem => {
                elem.datasetIndex = index++;
                return elem;
            });
            gender = 'mixed';
            scatterchart_options.series[5].markArea =get_scatter_marked_area(gender, duration);            
        }
        else
        {
            let index = 6;
            scatterchart_options.series = scatterchart_options.series.map(elem => {
                elem.datasetIndex = index++;
                return elem;
            });
            gender = 'women';
            scatterchart_options.series[5].markArea =get_scatter_marked_area(gender, duration);            
        
        }
        scatterchart_options.title[0].subtext = `${duration} power scatter - ${gender}`;
        myScatterChart.setOption(scatterchart_options);
    });      
 
    
    document.getElementById('chart_select_duration').addEventListener('change', function() {
        let scatterchart_options = myScatterChart.getOption();
        if (this.value == 0)
        {
            scatterchart_options.series = scatterchart_options.series.map(elem => {
            elem.encode =  {
                // Map "amount" column to x-axis.
                x: '20min watts 95%',
                // Map "product" row to y-axis.
                y: '20min wkg 95%' ,
                tooltip: ['20min watts 95%', '20min wkg 95%'],
              } ;
            return elem;
            });
            duration = '20min 95%';
            scatterchart_options.series[5].markArea =get_scatter_marked_area(gender, duration);
        }
        else if (this.value == 1)
        {
            scatterchart_options.series = scatterchart_options.series.map(elem => {
            elem.encode =  {
                // Map "amount" column to x-axis.
                x: '20min watts',
                // Map "product" row to y-axis.
                y: '20min wkg' ,
                tooltip: ['20min watts', '20min wkg'],
              } ;
            return elem;
            });
            duration = '20min';
            scatterchart_options.series[5].markArea =get_scatter_marked_area(gender, duration);
        }
        else
        {
            scatterchart_options.series = scatterchart_options.series.map(elem => {
                elem.encode =  {
                    // Map "amount" column to x-axis.
                    x: '15s watts',
                    // Map "product" row to y-axis.
                    y: '15s wkg',
                    tooltip: ['15s watts', '15s wkg'],
                  } ;
                return elem;
                }); 
                duration = '15s';
                scatterchart_options.series[5].markArea =get_scatter_marked_area(gender, duration);
        }
        scatterchart_options.title[0].subtext = `${duration} power scatter - ${gender}`;
        myScatterChart.setOption(scatterchart_options);
    });
});
}

