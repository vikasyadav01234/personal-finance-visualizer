import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';

export default function Dashboard({ transactions }) {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netAmount: 0
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // Colors for the pie chart
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#FDB462', '#B19CD9'
  ];

  useEffect(() => {
    if (!transactions.length) return;

    // Calculate summary
    const currentSummary = transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount);
        if (transaction.type === 'income') {
          acc.totalIncome += amount;
        } else {
          acc.totalExpenses += amount;
        }
        acc.netAmount = acc.totalIncome - acc.totalExpenses;
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0, netAmount: 0 }
    );

    // Calculate monthly data
    const monthlyTransactions = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      
      if (transaction.type === 'income') {
        acc[month].income += Number(transaction.amount);
      } else {
        acc[month].expense += Number(transaction.amount);
      }
      
      return acc;
    }, {});

    // Calculate category distribution (only for expenses)
    const categoryTransactions = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const category = transaction.category;
        const amount = Number(transaction.amount);
        
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {});

    setMonthlyData(Object.entries(monthlyTransactions).map(([month, data]) => ({
      month,
      ...data
    })));

    setCategoryData(Object.entries(categoryTransactions).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    })));

    setSummary(currentSummary);
  }, [transactions]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Total Income</p>
          <p className="text-xl font-bold text-green-700">
            {formatCurrency(summary.totalIncome)}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">Total Expenses</p>
          <p className="text-xl font-bold text-red-700">
            {formatCurrency(summary.totalExpenses)}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${
          summary.netAmount >= 0 ? 'bg-blue-50' : 'bg-yellow-50'
        }`}>
          <p className={`text-sm ${
            summary.netAmount >= 0 ? 'text-blue-600' : 'text-yellow-600'
          }`}>
            Net Balance
          </p>
          <p className={`text-xl font-bold ${
            summary.netAmount >= 0 ? 'text-blue-700' : 'text-yellow-700'
          }`}>
            {formatCurrency(summary.netAmount)}
          </p>
        </div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Monthly Overview Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
                <Bar dataKey="income" fill="#059669" name="Income" />
                <Bar dataKey="expense" fill="#DC2626" name="Expense" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Expense by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => 
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}