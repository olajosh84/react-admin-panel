import { useState, useEffect} from "react";
import { AreaChart, Area, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar, BarChart, LineChart, Line, PieChart, Pie, ScatterChart,
  Scatter } from 'recharts';

const Charts = () => {
  const [pieOuterRadius, setPieOuterRadius] = useState(150);
  const data = [
    {
      name: 'Jan',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  
];
const data01 = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 300 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 278 },
  { name: 'Jun', value: 189 },
];
const data02 = [
  { x: 10, y: 30 },
  { x: 30, y: 200 },
  { x: 45, y: 100 },
  { x: 50, y: 400 },
  { x: 70, y: 150 },
  { x: 100, y: 250 },
];
const data03 = [
  { x: 30, y: 20 },
  { x: 50, y: 180 },
  { x: 75, y: 240 },
  { x: 100, y: 100 },
  { x: 120, y: 190 },
]; 
//change pie chart radius if based on screen/window size
useEffect(() => {
  const windowWidth = window.innerWidth
  if(windowWidth <= 449){
    setPieOuterRadius(100)
  }
},[])
    return (
        <section className="charts-section">
            <div className="heading">
                <h2>charts</h2>
            </div>
            <div className="charts-container">
              <div className="charts area-chart">
                  <header className="areachart-header">
                    area chart
                  </header>
                  <div style={{width: "100%", height: "450px", padding: "0.5rem"}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart width={730} height={250} data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
              </div>
              <div className="charts bar-chart">
                  <header className="barchart-header">
                    bar chart
                  </header>
                  <div style={{width: "100%", height: "450px", padding: "0.5rem"}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                 
              </div>
              <div className="charts stacked-bar-chart">
                <header className="stacked-barchart-header">
                  stacked bar chart
                </header>
                <div style={{width: "100%", height: "450px", padding: "0.5rem"}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                  </BarChart>
                  </ResponsiveContainer>
                
                </div>
              </div>
              <div className="charts line-chart">
                <header className="linechart-header">
                  line chart
                </header>
                <div style={{width: "100%", height: "450px", padding: "0.5rem"}}>
                  <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="charts pie-chart">
                <header className="piechart-header">
                  pie chart
                </header>
                <div style={{width: "100%", height: "450px"}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={600} height={600}>
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={pieOuterRadius}
                        fill="#8884d8"
                        label
                      />
                      
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div> 
              </div>
              <div className="charts pie-chart">
                  <header className="scatterchart-header">
                    scatter chart
                  </header>
                  <div style={{width: "100%", height: "450px", padding: "0.5rem"}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 20,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                        <ZAxis type="number" range={[100]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="A school" data={data02} fill="#8884d8" line shape="cross" />
                        <Scatter name="B school" data={data03} fill="#82ca9d" line shape="diamond" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </div>
            
        </section>
    )
}

export default Charts;