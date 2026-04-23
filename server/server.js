const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =======================
// ✅ API ROUTES
// =======================
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// =======================
// 🔥 SERVE FRONTEND
// =======================

// Serve React build
app.use(express.static(path.join(__dirname, '../client/dist')));

// React routing (IMPORTANT)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// =======================
// ❗ REMOVE THIS (IMPORTANT)
// =======================
// ❌ DELETE THIS:
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// =======================
// START SERVER
// =======================
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer();