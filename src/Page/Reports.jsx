import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid,} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Reports = () => {
  const [report, setReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Reports";

    setLoading(true);
    setError("");

   
    fetch("http://localhost:3000/reports/category")
      .then((res) => res.json())
      .then((data) => {
        setReport(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch category report:", err);
        setError("Failed to load category report.");
        setReport([]);
      });

    
    fetch("http://localhost:3000/reports/monthly")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyReport(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch monthly report:", err);
        setError("Failed to load monthly report.");
        setMonthlyReport([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center my-10  space-y-12">
      
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Expense by Category</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={report}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="totalAmount"
            nameKey="_id"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {report.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Monthly Financial Summary</h2>
        <BarChart width={600} height={400} data={monthlyReport}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="_id"
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#82ca9d" name="Total Amount" />
        </BarChart>
      </div>
    </div>
  );
};

export default Reports;
