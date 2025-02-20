import dbConnect from '../../../lib/mongodb';
import Budget from '../../../models/Budget';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    switch (req.method) {
      case 'PUT':
        const updatedBudget = await Budget.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        res.status(200).json(updatedBudget);
        break;

      case 'DELETE':
        await Budget.findByIdAndDelete(id);
        res.status(200).json({ message: 'Budget deleted successfully' });
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}