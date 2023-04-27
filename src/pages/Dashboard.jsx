import Todo from "../components/Todo";
import Calendar from "../components/Calendar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const revenuePercentage = 80;
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
    return (
        <section className="dashboard-section">
            <div className="heading">
                <h2>Dashboard</h2>
            </div>
            
            <div className="dashboard">
                <div className="dashboard-info customers">
                    <h2>10</h2>
                    <p>Customers</p>
                    <div className="footer">
                        <span>More info</span>
                        <span>
                            <i className="fas fa-arrow-circle-right"></i>
                        </span>
                    </div>
                </div>
                <div className="dashboard-info orders">
                    <h2>15</h2>
                    <p>New Orders</p>
                    <div className="footer">
                        <span>More info</span>
                        <span>
                            <i className="fas fa-arrow-circle-right"></i>
                        </span>
                    </div>
                </div>
                <div className="dashboard-info sales">
                    <h2>$10m</h2>
                    <p>Sales</p>
                    <div className="footer">
                        <span>More info</span>
                        <span>
                            <i className="fas fa-arrow-circle-right"></i>
                        </span>
                    </div>
                </div>
                <div className="dashboard-info users">
                    <h2>15</h2>
                    <p>New Users</p>
                    <div className="footer">
                        <span>More info</span>
                        <span>
                            <i className="fas fa-arrow-circle-right"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div className="dashboard-middle">
                <div className="revenue">
                    <h2>total revenue</h2>
                    <CircularProgressbar value={80} text={`${revenuePercentage}%`} strokeWidth={4} />
                    <div className="revenue-footer">
                        <div className="left">total sales:</div>
                        <div className="right">$450m</div>
                    </div>
                </div>
                <div className="charts">
                    <h2>six months sales</h2>
                    <div className="areachart-container" style={{width: "100%", height: "450px"}}>
                        <ResponsiveContainer width="100%" height="90%">
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
            </div>
            <div className="dashboard-bottom">
                <Todo />
                <Calendar />
            </div>
           
        </section>
        
    )
}
export default Dashboard;