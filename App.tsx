import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Preview } from './components/Preview';
import { mockProfileText } from './data/mockProfile';
import type { WebsiteContent, LLMProvider } from './types';
import { LLM_PROVIDERS } from './constants';
import { generateWebsiteContent } from './services/aiService';

export default function App() {
    const [profileData, setProfileData] = useState<string>(mockProfileText);
    const [generatedContent, setGeneratedContent] = useState<WebsiteContent | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const [llmProvider, setLlmProvider] = useState<LLMProvider>(LLM_PROVIDERS[0]);
    const [apiKey, setApiKey] = useState<string>('');

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedContent(null);
        try {
            if (!profileData.trim()) {
                throw new Error("Profile content cannot be empty.");
            }
            
            // For Gemini, we pass the real API key. For others, it's mocked in the service.
            const effectiveApiKey = llmProvider.id === 'gemini' ? apiKey : 'mock-key-not-used';

            const content = await generateWebsiteContent(profileData, llmProvider.id, effectiveApiKey, profileImage);
            setGeneratedContent(content);
        } catch (err: any) {
            setError(err.message || 'Failed to generate website content.');
            setGeneratedContent(null);
        } finally {
            setIsLoading(false);
        }
    }, [profileData, llmProvider, apiKey, profileImage]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="flex flex-col lg:flex-row h-screen">
                <Sidebar
                    profileData={profileData}
                    setProfileData={setProfileData}
                    llmProvider={llmProvider}
                    setLlmProvider={setLlmProvider}
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    error={error}
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                />
                <Preview 
                    content={generatedContent} 
                    isLoading={isLoading}
                />
            </main>
        </div>
    );
}
