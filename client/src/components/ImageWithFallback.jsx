import { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
        // Fallback to a nice gradient placeholder or a default image
        setImgSrc(null);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}

            {hasError || !imgSrc ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-500">
                    <span className="text-xs">No Image</span>
                </div>
            ) : (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    src={imgSrc}
                    alt={alt}
                    className={`w-full h-full object-cover ${className}`}
                    onError={handleError}
                    onLoad={handleLoad}
                    {...props}
                />
            )}
        </div>
    );
};

export default ImageWithFallback;
