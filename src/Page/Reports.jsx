import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Reports = () => {

  useEffect(() => {
    document.title = 'Reports';
  }, []);

  const [report, setReport] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/reports")
      .then(res => res.json())
      .then(data => setReport(data));
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Reports;
