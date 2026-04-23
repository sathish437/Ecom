import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const cartItemsCount = 0;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass sticky top-0 z-50 text-text-primary px-4 py-4"
        >
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xl md:text-2xl font-bold text-white"
                    >
                        ProShop
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link to="/cart" className="flex items-center hover:text-accent transition-colors text-sm lg:text-base">
                        <ShoppingCart className="w-5 h-5 mr-1" />
                        Cart
                        {cartItemsCount > 0 && (
                            <span className="ml-1 bg-accent text-white text-xs rounded-full px-2 py-0.5 shadow-glow">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4 lg:space-x-6">
                            <span className="flex items-center text-text-muted text-sm lg:text-base">
                                <User className="w-5 h-5 mr-1" />
                                {user.name}
                            </span>
                            {user.isAdmin && (
                                <Link to="/admin" className="hover:text-accent transition-colors text-sm lg:text-base">Admin</Link>
                            )}
                            <button
                                onClick={logout}
                                className="flex items-center hover:text-accent transition-colors text-sm lg:text-base"
                            >
                                <LogOut className="w-5 h-5 mr-1" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center hover:text-accent transition-colors text-sm lg:text-base">
                            <User className="w-5 h-5 mr-1" />
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mt-4 pt-4 border-t border-white/10"
                    >
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/cart"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center hover:text-accent transition-colors py-2"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Cart
                                {cartItemsCount > 0 && (
                                    <span className="ml-2 bg-accent text-white text-xs rounded-full px-2 py-0.5">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <>
                                    <span className="flex items-center text-text-muted py-2">
                                        <User className="w-5 h-5 mr-2" />
                                        {user.name}
                                    </span>
                                    {user.isAdmin && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="hover:text-accent transition-colors py-2"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center hover:text-accent transition-colors py-2 text-left"
                                    >
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center hover:text-accent transition-colors py-2"
                                >
                                    <User className="w-5 h-5 mr-2" />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
