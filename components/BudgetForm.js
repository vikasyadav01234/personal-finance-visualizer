import { useState } from 'react';

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Other',
];

export default function BudgetForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    category: initialData?.category || categories[0],
    amount: initialData?.amount || '',
    month: initialData?.month || new Date().toLocaleString('default', { month: 'long' }).toLowerCase(),
    year: initialData?.year || new Date().getFullYear(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      ...formData,
      amount: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget Amount
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Set Budget
      </button>
    </form>
  );
}