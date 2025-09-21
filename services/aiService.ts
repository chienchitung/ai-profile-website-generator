import { generateWebsiteContent as geminiGenerate } from './geminiService';
import type { WebsiteContent, AIModel } from '../types';

// Mock function for non-Gemini providers
const generateMockContent = (profileText: string, profileImage: string | null): WebsiteContent => {
    const name = profileText.split('\n')[0] || 'Alex Doe';
    return {
        hero: {
            name: name,
            headline: 'Senior Frontend Engineer | AI & UI/UX Enthusiast',
            imageUrl: profileImage || 'https://picsum.photos/seed/ad1/400/400',
            companyLogoUrl: 'https://picsum.photos/seed/company/100/100',
        },
        about: {
            title: 'About Me',
            subtitle: 'A passionate developer making a difference.',
            professionalSummary: `This is a mock-generated professional summary for ${name}.`,
            personalSummary: 'This is a mock personal summary.',
            languages: [{ name: 'English', proficiency: 'Native' }],
            volunteerWork: ['Mock Volunteer Work'],
        },
        careerJourney: {
            title: 'Professional Experience',
            subtitle: 'My career journey so far.',
            items: [
                {
                    type: 'experience',
                    title: 'Senior Frontend Engineer',
                    institution: 'Innovate AI Corp',
                    logoUrl: 'https://picsum.photos/seed/exp1/100/100',
                    startDate: 'Jan 2020',
                    endDate: 'Present',
                    description: 'Mock description of the role.',
                    skills: ['React', 'TypeScript', 'AI'],
                },
                {
                    type: 'education',
                    title: 'Master of Science in Computer Science',
                    institution: 'Stanford University',
                    logoUrl: 'https://picsum.photos/seed/edu1/100/100',
                    startDate: 'Sep 2014',
                    endDate: 'May 2016',
                    description: 'Mock description of studies.',
                }
            ],
        },
        skills: {
            title: 'Skills & Expertise',
            subtitle: 'My technical and business capabilities.',
            skills: [
                { name: 'React', proficiency: 95, category: 'Technical' },
                { name: 'TypeScript', proficiency: 90, category: 'Technical' },
                { name: 'Node.js', proficiency: 80, category: 'Technical' },
                { name: 'Project Management', proficiency: 85, category: 'Business' },
                { name: 'UI/UX Design', proficiency: 75, category: 'Technical' },
            ],
            radarChart: [
                { subject: 'Frontend', value: 90 },
                { subject: 'Backend', value: 70 },
                { subject: 'Design', value: 80 },
                { subject: 'Communication', value: 95 },
                { subject: 'Leadership', value: 85 },
            ],
        },
        interests: {
            title: 'Personal Interests',
            subtitle: 'What I do in my free time.',
            items: [
                { title: 'Music', description: 'Playing the piano.', icon: 'Music' },
                { title: 'Open Source', description: 'Contributing to open source projects.', icon: 'Code' },
                { title: 'Travel', description: 'Exploring new cultures and places.', icon: 'Travel' },
            ]
        },
        projectsAndPublications: {
            title: 'Projects & Publications',
            subtitle: 'A selection of my work.',
            items: [
                {
                    title: 'AI Website Generator',
                    description: 'This very application! An AI-powered tool to generate personal websites from CVs.',
                    imageUrl: 'https://via.placeholder.com/600x400.png?text=AI+Website+Generator',
                    link: '#',
                    type: 'project',
                    tags: ['React', 'AI', 'TypeScript', 'UI/UX'],
                },
                {
                    title: 'Data Visualization Dashboard',
                    description: 'A dashboard for visualizing complex datasets using D3.js and React.',
                    imageUrl: 'https://via.placeholder.com/600x400.png?text=Data+Visualization+Dashboard',
                    link: '#',
                    type: 'project',
                    tags: ['D3.js', 'React', 'Data Viz'],
                },
            ]
        }
    };
};


export const generateWebsiteContent = async (
    profileData: string,
    model: AIModel,
    apiKey: string,
    profileImage: string | null
): Promise<WebsiteContent> => {
    switch (model) {
        case 'gemini':
            if (!apiKey) {
                throw new Error('Gemini API key is required.');
            }
            // Temporarily use `process.env` for the service layer
            const originalApiKey = process.env.API_KEY;
            process.env.API_KEY = apiKey;
            try {
                return await geminiGenerate(profileData, profileImage);
            } finally {
                // Restore original or undefined
                 if (originalApiKey) {
                   process.env.API_KEY = originalApiKey;
                 } else {
                   delete process.env.API_KEY;
                 }
            }
        case 'chatgpt':
        case 'grok':
        case 'claude':
            // Simulate an API call for mock providers
            console.log(`Using mock generation for ${model}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return generateMockContent(profileData, profileImage);
        default:
            throw new Error(`Unsupported AI model: ${model}`);
    }
};