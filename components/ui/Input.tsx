import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-professional-blue-500 focus:border-professional-blue-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...props}
            />
        </div>
    );
};