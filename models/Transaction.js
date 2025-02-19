import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be positive']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['income', 'expense'],
            message: 'Type must be either income or expense'
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'shopping', 'other'],
            message: 'Invalid category'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxLength: [100, 'Description cannot be more than 100 characters']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);