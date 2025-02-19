export default function TransactionList({ transactions = [], onEdit, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
        >
          <div>
            <p className="font-medium">{transaction.description}</p>
            <div className="text-sm text-gray-500">
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{transaction.category}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`font-medium ${
              transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
            }`}>
              ${Number(transaction.amount).toFixed(2)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(transaction)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(transaction._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}