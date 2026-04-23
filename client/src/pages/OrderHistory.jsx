import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const abortController = new AbortController();
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${user.token}` },
                    signal: abortController.signal
                });
                setOrders(data);
                setLoading(false);
            } catch (error) {
                if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
                    console.error(error);
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchOrders();
        }
        return () => abortController.abort();
    }, [user]);

    if (loading) return <Loader />;

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold mb-8 text-text-primary">Order History</h1>
            {orders.length === 0 ? (
                <div className="text-text-muted text-lg">No orders found</div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-bg-card border-b border-border-soft">
                                <tr>
                                    <th className="py-4 px-6 text-left text-text-muted font-bold uppercase tracking-wider">ID</th>
                                    <th className="py-4 px-6 text-left text-text-muted font-bold uppercase tracking-wider">DATE</th>
                                    <th className="py-4 px-6 text-left text-text-muted font-bold uppercase tracking-wider">TOTAL</th>
                                    <th className="py-4 px-6 text-left text-text-muted font-bold uppercase tracking-wider">PAID</th>
                                    <th className="py-4 px-6 text-left text-text-muted font-bold uppercase tracking-wider">DELIVERED</th>
                                    <th className="py-4 px-6 text-left text-text-muted font-bold uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-soft">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 text-text-primary whitespace-nowrap opacity-70">{order._id.substring(0, 8)}...</td>
                                        <td className="py-4 px-6 text-text-primary">{order.createdAt.substring(0, 10)}</td>
                                        <td className="py-4 px-6 text-text-primary font-bold">${order.totalPrice}</td>
                                        <td className="py-4 px-6">
                                            {order.isPaid ? (
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">Paid</span>
                                            ) : (
                                                <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold">Not Paid</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            {order.isDelivered ? (
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">Delivered</span>
                                            ) : (
                                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-bold">In Progress</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link to={`/order/${order._id}`} className="text-accent hover:text-white transition-colors font-medium">
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default OrderHistory;
