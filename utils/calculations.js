export function calculateSummary(transactions) {
    return transactions.reduce((acc, transaction) => {
        const amount = Number(transaction.amount);
        if (transaction.type === 'income') {
            acc.totalIncome += amount;
        } else {
            acc.totalExpenses += amount;
        }
        acc.netAmount = acc.totalIncome - acc.totalExpenses;
        return acc;
    }, { totalIncome: 0, totalExpenses: 0, netAmount: 0 });
}

export function calculateMonthlyData(transactions) {
    return transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        if (!acc[month]) {
            acc[month] = { income: 0, expense: 0 };
        }
        
        const amount = Number(transaction.amount);
        if (transaction.type === 'income') {
            acc[month].income += amount;
        } else {
            acc[month].expense += amount;
        }
        
        return acc;
    }, {});
}

export function calculateCategoryData(transactions) {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, transaction) => {
            const { category, amount } = transaction;
            acc[category] = (acc[category] || 0) + Number(amount);
            return acc;
        }, {});
}