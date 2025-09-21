
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    bgColor?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', bgColor = 'bg-white' }) => {
    return (
        <div className={`${bgColor} rounded-lg shadow-md p-6 ${className}`}>
            {children}
        </div>
    );
};
