import dbConnect from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    await dbConnect();

    try {
        switch (req.method) {
            case 'PUT':
                const updatedTransaction = await Transaction.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true, runValidators: true }
                );
                if (!updatedTransaction) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                return res.status(200).json(updatedTransaction);

            case 'DELETE':
                const deletedTransaction = await Transaction.findByIdAndDelete(id);
                if (!deletedTransaction) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                return res.status(200).json({ message: 'Transaction deleted successfully' });

            case 'GET':
                const transaction = await Transaction.findById(id);
                if (!transaction) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                return res.status(200).json(transaction);

            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
}