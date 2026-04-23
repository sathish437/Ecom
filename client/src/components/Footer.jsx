const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 sm:py-10 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
                    <div>
                        <h3 className="text-xl font-bold mb-4">ProShop</h3>
                        <p className="text-gray-400 text-sm">Premium products at the best prices</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Shop</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li><a href="/" className="hover:text-white">Products</a></li>
                            <li><a href="/cart" className="hover:text-white">Cart</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Account</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li><a href="/login" className="hover:text-white">Login</a></li>
                            <li><a href="/register" className="hover:text-white">Register</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <p className="text-gray-400 text-sm">support@proshop.com</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} ProShop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
