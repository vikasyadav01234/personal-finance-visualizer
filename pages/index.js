import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const url = editingTransaction
        ? `/api/transactions/${editingTransaction._id}`
        : "/api/transactions";

      const method = editingTransaction ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction");
      }

      await fetchTransactions();
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error saving transaction:", error);
      setError(error.message);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    // Scroll to form
    document
      .getElementById("transaction-form")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      await fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Personal Finance Tracker
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-lg shadow p-6"
              id="transaction-form"
            >
              <h2 className="text-xl font-semibold mb-4">
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <TransactionForm
                onSubmit={handleSubmit}
                initialData={editingTransaction}
              />
            </div>
          </div>

          {/* Right Column - Dashboard and Transactions */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Dashboard */}
              <div className="bg-white rounded-lg shadow">
                <Dashboard transactions={transactions} />
              </div>

              {/* Transactions List */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Recent Transactions
                </h2>
                <TransactionList
                  transactions={transactions}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
