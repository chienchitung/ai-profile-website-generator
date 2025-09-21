import React, { useRef, useCallback } from 'react';
import type { LLMProvider } from '../types';
import { LLM_PROVIDERS } from '../constants';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Input } from './ui/Input';
import { UserCircleIcon } from './ui/icons';

// Note: pdf.js and mammoth.js are loaded via <script> tags in index.html
// and are expected to be available on the `window` object.

interface SidebarProps {
    profileData: string;
    setProfileData: (data: string) => void;
    llmProvider: LLMProvider;
    setLlmProvider: (provider: LLMProvider) => void;
    apiKey: string;
    setApiKey: (key: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    error: string | null;
    profileImage: string | null;
    setProfileImage: (image: string | null) => void;
}

const Logo = () => (
    <div className="flex items-center space-x-2">
         <div className="w-8 h-8 bg-professional-blue-800 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800">AI Website Generator</h1>
    </div>
);


export const Sidebar: React.FC<SidebarProps> = ({
    profileData,
    setProfileData,
    llmProvider,
    setLlmProvider,
    apiKey,
    setApiKey,
    onGenerate,
    isLoading,
    error,
    profileImage,
    setProfileImage,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handlePhotoUploadClick = useCallback(() => {
        photoInputRef.current?.click();
    }, []);

    const handlePhotoFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        event.target.value = '';
        
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (e.g., JPG, PNG, GIF).');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setProfileImage(result);
        };
        reader.onerror = (e) => {
            console.error("Failed to read image file:", e);
            alert("Failed to read image file.");
        };
        reader.readAsDataURL(file);
    }, [setProfileImage]);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset the input value to allow uploading the same file again
        event.target.value = '';

        try {
            if (file.type === 'application/pdf') {
                const pdfjsLib = (window as any).pdfjsLib;
                if (!pdfjsLib) {
                    alert("Error: pdf.js library not found. Please check your internet connection and try again.");
                    throw new Error("pdf.js library is not loaded.");
                }

                const arrayBuffer = await file.arrayBuffer();
                // Set worker source for pdf.js
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.min.js`;
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let textContent = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const text = await page.getTextContent();
                    textContent += text.items.map((s: any) => s.str).join(' ') + '\n';
                }
                setProfileData(textContent);
            } else if (file.name.endsWith('.docx')) {
                 const mammoth = (window as any).mammoth;
                 if (!mammoth) {
                    alert("Error: mammoth.js library not found. Please check your internet connection and try again.");
                    throw new Error("mammoth.js library is not loaded.");
                 }
                 const arrayBuffer = await file.arrayBuffer();
                 const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
                 setProfileData(result.value);
            } else if (file.name.endsWith('.doc')) {
                alert("Legacy .doc files are not supported. Please save as .docx, .pdf, or a plain text format (.txt, .md).");
            } else { // Assume text file
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result as string;
                    setProfileData(text);
                };
                reader.onerror = (e) => {
                    console.error("Failed to read file:", e);
                    alert("Failed to read file.");
                };
                reader.readAsText(file);
            }
        } catch (err) {
            console.error("Error processing file:", err);
            alert("Could not process the uploaded file. Please ensure it is not corrupted and is a supported format (.txt, .md, .pdf, .docx).");
        }
    }, [setProfileData]);
    
    return (
        <aside className="w-full lg:w-1/3 xl:w-1/4 bg-white p-6 overflow-y-auto border-r border-gray-200 h-full flex flex-col">
            <header className="mb-8">
                <Logo />
            </header>
            
            <div className="flex-grow space-y-6">
                {/* Step 1: Profile Data */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Provide Profile Content</h2>
                    <p className="text-sm text-gray-500 mb-4">Upload a profile picture, then paste your CV content or upload a file.</p>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-gray-400"><UserCircleIcon /></div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={photoInputRef}
                                onChange={handlePhotoFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <Button variant="outline" onClick={handlePhotoUploadClick}>
                                Upload Photo
                            </Button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">CV / Resume Content</label>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".txt,.md,.pdf,.docx"
                        />
                        <Button fullWidth variant="outline" onClick={handleUploadClick}>
                            Upload CV / Resume File
                        </Button>
                    </div>

                    <textarea
                        value={profileData}
                        onChange={(e) => setProfileData(e.target.value)}
                        className="w-full flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-professional-blue-500 focus:border-professional-blue-500 transition duration-200 text-xs"
                        placeholder='Paste your CV/Resume text here...'
                        rows={15}
                    />
                </div>

                {/* Step 2: AI Configuration */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">2. Configure AI Model</h2>
                    <div className="space-y-4">
                        <Select
                            label="LLM Provider"
                            value={llmProvider.id}
                            onChange={(e) => {
                                const selected = LLM_PROVIDERS.find(p => p.id === e.target.value);
                                if (selected) setLlmProvider(selected);
                            }}
                        >
                            {LLM_PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </Select>

                        {llmProvider.id === 'gemini' && (
                           <Input
                             label="Gemini API Key"
                             type="password"
                             value={apiKey}
                             onChange={(e) => setApiKey(e.target.value)}
                             placeholder="Enter your API Key"
                           />
                        )}
                        {llmProvider.id !== 'gemini' && (
                           <Input
                             label={`${llmProvider.name} API Key`}
                             type="password"
                             placeholder={`(Feature Coming Soon)`}
                             disabled
                           />
                        )}
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-auto">
                <Button onClick={onGenerate} disabled={isLoading || !profileData} fullWidth>
                    {isLoading ? 'Generating...' : '✨ Generate Website'}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
        </aside>
    );
};