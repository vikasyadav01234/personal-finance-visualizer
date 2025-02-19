# Personal Finance Tracker

A modern web application for tracking personal finances, built with Next.js, MongoDB, and Tailwind CSS.

![Personal Finance Tracker](https://raw.githubusercontent.com/vikasyadav01234/personal-finance-tracker/main/public/screenshot.png)

## Features

- 💰 Track income and expenses
- 📊 Visual data representation with charts
- 📱 Responsive design that works on all devices
- 🗃️ Category-based transaction organization
- 📈 Monthly financial overview
- 🔍 Transaction history with search and filter
- 💾 Persistent data storage with MongoDB

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for production
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Recharts](https://recharts.org/) - Composable charting library

- **Backend:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling

- **Deployment:**
  - [Vercel](https://vercel.com/) - Platform for frontend deployment
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vikasyadav01234/personal-finance-tracker.git
cd personal-finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

- `MONGODB_URI`: Your MongoDB connection string

## Project Structure

```
personal-finance-tracker/
├── components/           # React components
│   ├── Dashboard.js     # Dashboard with charts
│   ├── TransactionForm.js # Form for adding/editing transactions
│   └── TransactionList.js # List of transactions
├── lib/
│   └── mongodb.js       # MongoDB connection utility
├── models/
│   └── Transaction.js   # Mongoose model for transactions
├── pages/
│   ├── api/            # API routes
│   │   └── transactions/
│   │       ├── index.js
│   │       └── [id].js
│   ├── _app.js
│   └── index.js        # Main page
├── public/             # Static files
└── styles/            # Global styles
```

## API Routes

### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Author

**Vikas Yadav**
- GitHub: [@vikasyadav01234](https://github.com/vikasyadav01234)

## Support

If you found this project helpful, please give it a ⭐️!

---

Created by [Vikas Yadav](https://github.com/vikasyadav01234) - 2024