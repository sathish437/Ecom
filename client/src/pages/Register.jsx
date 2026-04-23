import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '../utils/motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { register, user, loading } = useAuth();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            await register(name, email, password);
            toast.success('Registered successfully');
        } catch (err) {
            toast.error(err);
        }
    };

    if (loading) return <Loader />;

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 py-8 flex justify-center"
        >
            <motion.div
                variants={slideUp}
                className="w-full max-w-md"
            >
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-accent bg-clip-text text-transparent">Sign Up</h1>
                <form onSubmit={submitHandler} className="glass-card shadow-2xl rounded-2xl px-8 pt-8 pb-8 mb-4">
                    <Input
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="mt-6">
                        <Button type="submit" className="w-full text-lg">
                            Register
                        </Button>
                    </div>
                </form>
                <div className="text-center text-text-muted">
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-accent hover:text-white transition-colors">
                        Login
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Register;
