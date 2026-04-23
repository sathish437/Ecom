import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { zoomIn, staggerContainer, slideUp } from '../utils/motion';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { user } = useAuth();

    useEffect(() => {
        const abortController = new AbortController();
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`, { signal: abortController.signal });
                setProduct(data);
                setLoading(false);
            } catch (error) {
                if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
                    console.error(error);
                    setLoading(false);
                }
            }
        };

        fetchProduct();
        return () => abortController.abort();
    }, [id]);

    const addToCartHandler = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await axios.post('/api/cart', { productId: id, qty }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success('Added to cart');
            navigate('/cart');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding to cart');
        }
    };

    if (loading) return <Loader />;
    if (!product) return <div>Product not found</div>;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8"
        >
            <Button onClick={() => navigate('/')} variant="outline" className="mb-6">
                Go Back
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <motion.div variants={zoomIn} className="rounded-2xl overflow-hidden shadow-2xl border border-border-soft aspect-square md:aspect-auto">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </motion.div>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.h1 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-text-primary">{product.name}</motion.h1>
                    <motion.div variants={slideUp} className="flex items-center mb-6">
                        <span className="text-yellow-400 font-bold mr-2 text-lg">{product.rating} ★</span>
                        <span className="text-text-muted">({product.numReviews} reviews)</span>
                    </motion.div>
                    <motion.p variants={slideUp} className="text-3xl font-bold mb-6 text-accent">${product.price}</motion.p>
                    <motion.p variants={slideUp} className="text-gray-300 mb-8 leading-relaxed">{product.description}</motion.p>

                    <motion.div variants={slideUp} className="glass-card p-6 rounded-2xl">
                        <div className="flex justify-between mb-4 border-b border-border-soft pb-4">
                            <span className="text-text-muted">Status:</span>
                            <span className={product.countInStock > 0 ? 'text-green-400 font-bold' : 'text-red-500 font-bold'}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </span>
                        </div>
                        {product.countInStock > 0 && (
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-text-muted">Quantity:</span>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="bg-bg-main border border-border-soft rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none"
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <Button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="w-full text-lg py-3"
                        >
                            Add to Cart
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;
