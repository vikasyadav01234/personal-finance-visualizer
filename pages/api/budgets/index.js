import dbConnect from '../../../lib/mongodb';
import Budget from '../../../models/Budget';

export default async function handler(req, res) {
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        const { month, year } = req.query;
        const budgets = await Budget.find({ month, year });
        res.status(200).json(budgets);
        break;

      case 'POST':
        const budget = await Budget.create(req.body);
        res.status(201).json(budget);
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}