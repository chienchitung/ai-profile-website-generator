import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    fullWidth?: boolean;
    variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, className, fullWidth, variant = 'primary', ...props }) => {
    const widthClass = fullWidth ? 'w-full' : '';

    const baseClasses = `
        px-6 py-3 font-bold rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition duration-200 ease-in-out transform hover:scale-[1.02]
        disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100
    `;

    const variantClasses = {
        primary: `
            bg-professional-blue-600 text-white
            hover:bg-professional-blue-700
            focus:ring-professional-blue-500
        `,
        outline: `
            bg-transparent text-professional-blue-600 border border-professional-blue-500
            hover:bg-professional-blue-50
            focus:ring-professional-blue-500
        `,
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};