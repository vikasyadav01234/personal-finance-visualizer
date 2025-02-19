import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function BudgetOverview({ budgets, transactions }) {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    if (!budgets || !transactions) return;

    // Calculate spending for each category
    const spending = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        const category = transaction.category.toLowerCase();
        acc[category] = (acc[category] || 0) + Number(transaction.amount);
      }
      return acc;
    }, {});

    // Combine budget and spending data
    const combinedData = budgets.map(budget => {
      const category = budget.category.toLowerCase();
      return {
        category: category.charAt(0).toUpperCase() + category.slice(1),
        budget: budget.amount,
        spent: spending[category] || 0,
        remaining: Math.max(budget.amount - (spending[category] || 0), 0)
      };
    });

    setBudgetData(combinedData);
  }, [budgets, transactions]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {budgetData.map((item) => (
          <div
            key={item.category}
            className="bg-white rounded-lg p-4 shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{item.category}</h3>
              <span className="text-gray-500">
                {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{
                    width: `${Math.min((item.spent / item.budget) * 100, 100)}%`
                  }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    item.spent > item.budget ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {item.spent > item.budget ? (
                <span className="text-red-500">
                  Over budget by {formatCurrency(item.spent - item.budget)}
                </span>
              ) : (
                <span className="text-green-500">
                  {formatCurrency(item.remaining)} remaining
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-80 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Budget vs. Spending</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="budget" fill="#3B82F6" name="Budget" />
            <Bar dataKey="spent" fill="#EF4444" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}