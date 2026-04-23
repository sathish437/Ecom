import clsx from 'clsx';

const Input = ({ label, id, type = 'text', placeholder, value, onChange, className, ...props }) => {
    return (
        <div className={clsx("mb-4", className)}>
            {label && (
                <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                {...props}
            />
        </div>
    );
};

export default Input;
