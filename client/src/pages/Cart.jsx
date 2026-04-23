import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Loader from '../components/Loader';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { slideInRight } from '../utils/motion';
import ImageWithFallback from '../components/ImageWithFallback';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [user, navigate]);

    const fetchCart = async () => {
        try {
            const { data } = await axios.get('/api/cart', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCart(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const removeFromCartHandler = async (id) => {
        try {
            await axios.delete(`/api/cart/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchCart();
            toast.success('Item removed');
        } catch (error) {
            toast.error('Error removing item');
        }
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/checkout');
    };

    if (loading) return <Loader />;

    return (
        <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold mb-8 text-primary">Shopping Cart</h1>
            {cart && cart.cartItems.length === 0 ? (
                <div className="text-center text-xl text-text-muted mt-20">
                    Your cart is empty <Link to="/" className="text-accent underline ml-2">Go Back</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cart && cart.cartItems.map((item) => (
                            <motion.div
                                layout
                                key={item.product}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                                        <ImageWithFallback
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg border border-border-soft"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/product/${item.product}`} className="text-base sm:text-lg font-semibold text-text-primary hover:text-accent block transition-colors truncate">{item.name}</Link>
                                        <div className="text-text-muted text-sm sm:text-base mt-1">${item.price} x {item.qty}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                                    <div className="text-text-muted sm:hidden">Qty: {item.qty}</div>
                                    <div className="hidden sm:block text-text-muted text-lg mr-6">${item.price}</div>
                                    <div className="hidden sm:block text-text-muted mr-6">Qty: {item.qty}</div>
                                    <button
                                        onClick={() => removeFromCartHandler(item.product)}
                                        className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 size={20} className="sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="glass-card p-8 rounded-2xl h-fit">
                        <h2 className="text-2xl font-bold mb-6 text-text-primary">Subtotal ({cart ? cart.cartItems.reduce((acc, item) => acc + item.qty, 0) : 0}) items</h2>
                        <div className="text-4xl font-bold mb-8 text-accent">
                            ${cart ? cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) : 0}
                        </div>
                        <Button
                            onClick={checkoutHandler}
                            disabled={cart && cart.cartItems.length === 0}
                            className="w-full text-lg py-4"
                        >
                            Proceed To Checkout
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;
