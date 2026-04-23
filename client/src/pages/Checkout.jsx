import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();
    const { user } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();

        // 1. Get Cart Items
        try {
            const { data: cart } = await axios.get('/api/cart', {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (!cart || cart.cartItems.length === 0) {
                toast.error('Cart is empty');
                return;
            }

            const orderData = {
                orderItems: cart.cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: 'Cash on Delivery',
                itemsPrice: cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
            };

            const { data: order } = await axios.post('/api/orders', orderData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            toast.success('Order Placed Successfully');
            navigate('/order-history');

        } catch (error) {
            toast.error(error.response?.data?.message || 'Error placing order');
        }
    };

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8 flex justify-center"
        >
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-center text-text-primary">Checkout</h1>
                <form onSubmit={submitHandler} className="glass-card shadow-2xl rounded-2xl px-8 pt-8 pb-8 mb-4">
                    <Input
                        label="Address"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <Input
                        label="City"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <Input
                        label="Postal Code"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    <Input
                        label="Country"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <div className="mb-6">
                        <label className="block text-text-muted text-sm font-bold mb-2">Payment Method</label>
                        <div className="flex items-center p-3 rounded-lg border border-border-soft bg-bg-main">
                            <input type="radio" id="cod" name="paymentMethod" value="Cash on Delivery" checked readOnly className="mr-3 h-4 w-4 accent-accent" />
                            <label htmlFor="cod" className="text-text-primary">Cash on Delivery</label>
                        </div>
                    </div>
                    <Button type="submit" className="w-full text-lg py-3">
                        Place Order
                    </Button>
                </form>
            </div>
        </motion.div>
    );
};

export default Checkout;
