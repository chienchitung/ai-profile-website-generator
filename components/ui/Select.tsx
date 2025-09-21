import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
}

export const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-professional-blue-500 focus:border-professional-blue-500 transition duration-200"
                {...props}
            >
                {children}
            </select>
        </div>
    );
};