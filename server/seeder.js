const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        if (require.main === module) {
            process.exit();
        }
    } catch (error) {
        console.error(`${error}`);
        const fs = require('fs');
        fs.writeFileSync('seeder-error.log', `${error.stack}`);
        if (require.main === module) {
            process.exit(1);
        }
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        if (require.main === module) {
            process.exit();
        }
    } catch (error) {
        console.error(`${error}`);
        if (require.main === module) {
            process.exit(1);
        }
    }
};

if (require.main === module) {
    connectDB();
    if (process.argv[2] === '-d') {
        destroyData();
    } else {
        importData();
    }
}

module.exports = { importData, destroyData };
