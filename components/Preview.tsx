import React from 'react';
import type { WebsiteContent } from '../types';
import { Spinner } from './ui/Spinner';
import { TemplateModern } from './templates/TemplateModern';

interface PreviewProps {
    content: WebsiteContent | null;
    isLoading: boolean;
}

const WelcomeMessage = () => (
    <div className="text-center p-8 h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-professional-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-professional-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">AI Professional Website Generator</h2>
        <p className="text-gray-500 max-w-md mx-auto">
            Provide your CV or profile content in the sidebar, configure your AI model, and click "Generate Website" to create your portfolio.
        </p>
    </div>
);


export const Preview: React.FC<PreviewProps> = ({ content, isLoading }) => {
    
    return (
        <div className="w-full lg:w-2/3 xl:w-3/4 bg-gray-100 overflow-y-auto h-full">
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-full">
                    <Spinner />
                    <p className="mt-4 text-professional-blue-600 font-semibold">AI is crafting your professional website...</p>
                </div>
            )}
            {!isLoading && !content && <WelcomeMessage />}
            {!isLoading && content && (
                <TemplateModern content={content} />
            )}
        </div>
    );
};