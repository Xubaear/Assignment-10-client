import { useEffect, useState, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer, // 1. Imported ResponsiveContainer
} from "recharts";
import { AuthContext } from "../Provider/AuthProvider";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Reports = () => {
  const [report, setReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [categoriesState, setCategoriesState] = useState([]);
  const [monthlyPerCategoryState, setMonthlyPerCategoryState] = useState([]);

  const computeReportsFromTransactions = (transactions) => {
    const byCategory = transactions.reduce((acc, t) => {
      const key = t.category || "Others";
      acc[key] = (acc[key] || 0) + Number(t.amount || 0);
      return acc;
    }, {});

    const categoryArray = Object.keys(byCategory).map((k) => ({
      _id: k,
      totalAmount: byCategory[k],
    }));

    const byMonth = transactions.reduce((acc, t) => {
      const d = t.date ? new Date(t.date) : new Date();
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      acc[key] = (acc[key] || 0) + Number(t.amount || 0);
      return acc;
    }, {});

    const monthlyArray = Object.keys(byMonth)
      .map((k) => ({ _id: k, totalAmount: byMonth[k] }))
      .sort((a, b) => a._id.localeCompare(b._id));

    const categories = Object.keys(byCategory);
    const months = Array.from(new Set(Object.keys(byMonth))).sort();
    const monthlyPerCategory = months.map((m) => {
      const obj = { _id: m };
      categories.forEach((c) => {
        obj[c] = 0;
      });
      return obj;
    });

    transactions.forEach((t) => {
      const d = t.date ? new Date(t.date) : new Date();
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      const monthObj = monthlyPerCategory.find((x) => x._id === key);
      const cat = t.category || "Others";
      if (monthObj)
        monthObj[cat] = (monthObj[cat] || 0) + Number(t.amount || 0);
    });

    return { categoryArray, monthlyArray, categories, monthlyPerCategory };
  };

  useEffect(() => {
    document.title = "Reports";

    setLoading(true);
    setError("");
    const fetchReports = () => {
      if (!user?.email) {
        setError("Please log in to view your reports.");
        setReport([]);
        setMonthlyReport([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      fetch(
        `https://fineease-server.vercel.app/my-transactions?email=${encodeURIComponent(
          user.email
        )}`
      )
        .then((res) => res.json())
        .then((transactions) => {
          const tx = Array.isArray(transactions) ? transactions : [];
          const {
            categoryArray,
            monthlyArray,
            categories,
            monthlyPerCategory,
          } = computeReportsFromTransactions(tx);
          setReport(categoryArray);
          setMonthlyReport(monthlyArray);
          setCategoriesState(categories || []);
          setMonthlyPerCategoryState(monthlyPerCategory || []);
        })
        .catch((err) => {
          console.error("Failed to fetch user transactions for reports:", err);
          setError("Failed to load report data.");
          setReport([]);
          setMonthlyReport([]);
        })
        .finally(() => setLoading(false));
    };

    fetchReports();

    const handleUpdated = () => fetchReports();
    window.addEventListener("transactionsUpdated", handleUpdated);
    return () =>
      window.removeEventListener("transactionsUpdated", handleUpdated);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center my-10 space-y-12 w-full px-2">
      
      {/* 2. Made Pie Chart Container Responsive */}
      <div className="text-center w-full h-[400px] md:w-3/4 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Expense by Category</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={report}
              cx="50%"
              cy="50%"
              labelLine={false}
              // Changed fixed 150 radius to percentage or simpler logic for mobile
              outerRadius="80%" 
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
        </ResponsiveContainer>
      </div>

      {/* 3. Made Bar Chart Container Responsive */}
      <div className="text-center w-full h-[500px] px-2 md:px-4">
        <h2 className="text-3xl font-bold mt-20 mb-6">
          Monthly Financial Summary (by category)
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyPerCategoryState}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" type="category" />
            <YAxis type="number" width={60} /> {/* Reduced width slightly for mobile */}
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            {categoriesState.map((c, idx) => (
              <Bar
                key={c}
                dataKey={c}
                fill={COLORS[idx % COLORS.length]}
                name={c}
                maxBarSize={70}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;