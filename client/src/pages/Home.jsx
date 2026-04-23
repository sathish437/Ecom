import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products', { signal: abortController.signal });
                setProducts(data.products);
                setLoading(false);
            } catch (err) {
                if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchProducts();
        return () => abortController.abort();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-text-primary border-l-4 border-accent pl-4">Latest Products</h1>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Home;
