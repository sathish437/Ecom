import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideUp } from '../utils/motion';
import ImageWithFallback from './ImageWithFallback';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            layout
            variants={slideUp}
            whileHover={{ y: -10 }}
            className="glass-card rounded-2xl overflow-hidden group hover:shadow-glow transition-all duration-300"
        >
            <Link to={`/product/${product._id}`}>
                <div className="overflow-hidden h-56">
                    <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </Link>
            <div className="p-5">
                <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-bold text-text-primary hover:text-accent truncate transition-colors">
                        {product.name}
                    </h2>
                </Link>
                <div className="flex items-center mt-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600 fill-current'}`} viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-text-muted text-sm ml-2">{product.numReviews} reviews</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    <Link to={`/product/${product._id}`}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 bg-gradient-accent text-white text-sm rounded-lg hover:brightness-110 shadow-lg"
                        >
                            View
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
