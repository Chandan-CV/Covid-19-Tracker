import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
 import numeral from 'numeral'


function LineGraph({casestype}) {
 const [data, setData] = useState({});
//https://disease.sh/v3/covid-19/historical/all?lastdays=120  
const [refresh,setRefresh]= useState();


const buildChartData=(data)=>{
    const x=[];
    const y=[];
    let lastPoint;
   for (let date in data[casestype]) {
        if(lastPoint){
          if((data[casestype][date]-lastPoint)>0 )  
         { x.push(date)
          y.push(data[casestype][date]-lastPoint)
         }  
          
        }
        lastPoint= data[casestype][date]

    };

    return {x,y}
    
}





useEffect(()=>{
    const fetchData =async()=>{
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(lol=>{
            const chartData = buildChartData(lol);
            setData(chartData);
            console.log(data)
        })
    }
    fetchData();
    setRefresh(casestype);
},[])   

const rebuild = ()=>{
    const fetchData =async()=>{
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(lol=>{
            const chartData = buildChartData(lol);
            setData(chartData);
            console.log(data)
        })
    }
    fetchData();
    setRefresh(casestype);

}

return (
        <div>
        {refresh!==casestype?rebuild() :null}
     
            { data?
            
                <Line
                data={{
                    labels: data.x,
                    datasets: [{
                        
                        label: 'new cases',
                        backgroundColor: 'rgb(255, 139, 139)',
                        borderColor: 'red',
                        data: data.y
                    }]
                }}
                
                options={{
                  
                    
                    maintainAspectRatio:true,  
                    tooltips:{
                        mode:"index",
                        intersect:false,
                        callbacks:{
                            label: function (tooltipItem,data){
                                return numeral(tooltipItem.value).format("+0.0");
                            },
                        },
                    },
                    scales:{
                        xAxes:[
                            { 
                                gridLines:{
                                    display:false
                                },
                                type:"time",
                                time:{
                                    format:"MM/DD/YY",
                                    tooltipFormat:"ll"
                                }
                                
                            }
                        ],
                        yAxes:[
                            {
                                gridLines:{
                                    display:false
                                },
                                ticks:{
                                    callback: function(value,index,values)
                                    {
                                        return numeral(value).format("0a")
                                    }
                                }
                            }
                        ]
                    },
                    
                    
        
                }}
                />
                :<h1>loading the graph</h1>
            }
                </div>
                )
            }

            export default LineGraph
            