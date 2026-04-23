import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { toast } from 'react-toastify';
import { Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideUp } from '../utils/motion';
import ImageWithFallback from '../components/ImageWithFallback';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // New Product State
    const [createLoading, setCreateLoading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
        brand: '',
        category: '',
        countInStock: '',
        description: '',
    });

    useEffect(() => {
        const abortController = new AbortController();
        fetchData(abortController.signal);
        return () => abortController.abort();
    }, []);

    const fetchData = async (signal) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
                signal
            };
            const [productsRes, ordersRes] = await Promise.all([
                axios.get('/api/products', config),
                axios.get('/api/orders', config),
            ]);

            // Handle different response structures if needed
            setProducts(productsRes.data.products || productsRes.data);
            setOrders(ordersRes.data);
            setLoading(false);
        } catch (error) {
            if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
                console.error(error);
                setLoading(false);
                toast.error('Failed to fetch admin data');
            }
        }
    };

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                toast.success('Product deleted');
                fetchData();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting product');
            }
        }
    };

    const createProductHandler = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await axios.post('/api/products', newProduct, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            toast.success('Product created successfully');
            setNewProduct({ name: '', price: '', image: '', brand: '', category: '', countInStock: '', description: '' });
            fetchData();
            setCreateLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating product');
            setCreateLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-4xl font-bold mb-8 text-text-primary border-l-4 border-accent pl-4">Admin Dashboard</h1>

            {/* Create Product Form */}
            <div className="glass-card p-8 rounded-2xl mb-12">
                <h2 className="text-2xl font-bold mb-6 text-text-primary">Create New Product</h2>
                <form onSubmit={createProductHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Name" id="name" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                    <Input label="Price" id="price" type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                    <Input label="Image URL" id="image" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
                    <Input label="Brand" id="brand" placeholder="Brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} required />
                    <Input label="Category" id="category" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required />
                    <Input label="Count In Stock" id="countInStock" type="number" placeholder="Stock" value={newProduct.countInStock} onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })} required />
                    <div className="md:col-span-2">
                        <Input label="Description" id="description" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
                    </div>
                    <div className="md:col-span-2">
                        <Button type="submit" disabled={createLoading} className="w-full">
                            {createLoading ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Products Table */}
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Products</h2>
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl mb-12">
                <div className="overflow-x-auto">
                    <motion.table
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="min-w-full"
                    >
                        <thead className="bg-bg-card border-b border-border-soft">
                            <tr>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">ID</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">NAME</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">PRICE</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">CATEGORY</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">BRAND</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-soft">
                            {products.map((product) => (
                                <motion.tr variants={slideUp} key={product._id} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-text-primary text-sm opacity-70">{product._id.substring(0, 8)}...</td>
                                    <td className="py-4 px-6 text-text-primary font-medium">{product.name}</td>
                                    <td className="py-4 px-6 text-text-primary font-bold">${product.price}</td>
                                    <td className="py-4 px-6 text-text-primary">{product.category}</td>
                                    <td className="py-4 px-6 text-text-primary">{product.brand}</td>
                                    <td className="py-4 px-6 flex space-x-3">
                                        <button className="text-accent hover:text-white transition-colors">
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => deleteProductHandler(product._id)}
                                            className="text-red-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                </div>
            </div>

            {/* Orders Table */}
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Orders</h2>
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <motion.table
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="min-w-full"
                    >
                        <thead className="bg-bg-card border-b border-border-soft">
                            <tr>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">ID</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">USER</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">DATE</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">TOTAL</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">PAID</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">DELIVERED</th>
                                <th className="py-4 px-6 text-left text-text-muted font-bold uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-soft">
                            {orders.map((order) => (
                                <motion.tr variants={slideUp} key={order._id} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-text-primary text-sm opacity-70">{order._id.substring(0, 8)}...</td>
                                    <td className="py-4 px-6 text-text-primary">{order.user && order.user.name}</td>
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
                                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-bold">Pending</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <Button variant="outline" className="text-xs px-2 py-1">
                                            Details
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
