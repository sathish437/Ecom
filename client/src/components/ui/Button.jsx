import clsx from 'clsx';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, type = 'button', disabled = false, variant = 'primary' }) => {
    const baseStyles = 'px-6 py-2.5 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-main transition-all duration-300 shadow-lg';

    const variants = {
        primary: 'bg-gradient-accent text-white hover:brightness-110 shadow-glow focus:ring-accent border border-transparent',
        secondary: 'bg-bg-card text-text-primary hover:bg-slate-700 border border-border-soft focus:ring-slate-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md',
        outline: 'bg-transparent border border-accent text-accent hover:bg-accent/10 focus:ring-accent',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(baseStyles, variants[variant], className, { 'opacity-50 cursor-not-allowed grayscale': disabled })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
