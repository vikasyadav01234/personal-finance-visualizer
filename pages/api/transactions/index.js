import dbConnect from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
    await dbConnect();

    try {
        switch (req.method) {
            case 'GET':
                const transactions = await Transaction.find({})
                    .sort({ date: -1 })
                    .limit(50);
                return res.status(200).json(transactions);

            case 'POST':
                const transaction = await Transaction.create(req.body);
                return res.status(201).json(transaction);

            default:
                res.setHeader('Allow', ['GET', 'POST']);
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