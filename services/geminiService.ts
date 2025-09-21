import { GoogleGenAI, Type } from "@google/genai";
import type { WebsiteContent } from '../types';

const getPrompt = (profileText: string) => `
You are an expert data extractor and content strategist. Your task is to parse unstructured text from a user's CV or professional profile and transform it into a structured JSON object for a personal website.

Analyze the following text:
---
${profileText}
---

RULES:
1.  Extract all relevant information and structure it according to the provided JSON schema.
2.  Infer proficiency levels for skills and languages where possible (e.g., 'Native', 'Fluent', 'Basic' for languages; 0-100 for skills). If not specified, make a reasonable estimate based on context.
3.  Generate compelling, concise titles and subtitles for each section.
4.  Separate the user's experience into 'experience' and 'education' types within the 'careerJourney'.
5.  Find public logo URLs for companies and universities. Use a placeholder like "https://logo.clearbit.com/[company_name].com" if needed.
6.  The 'radarChart' in the skills section should summarize 5-6 key high-level skills.
7.  Extract any projects or publications mentioned. For each, find a relevant, publicly accessible image URL. If a specific image is not available from the text, use a placeholder from 'https://via.placeholder.com/600x400.png?text=Project+Title' where you replace 'Project+Title' with the actual URL-encoded project title. Provide a title, description, link, type ('project' or 'publication'), and relevant tags.
8.  Do not invent information. If a piece of data is not present in the text, omit the corresponding field from the JSON output.

Generate a JSON object that adheres to the schema.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        hero: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                headline: { type: Type.STRING },
                imageUrl: { type: Type.STRING, description: "URL for the user's profile photo." },
                companyLogoUrl: { type: Type.STRING, description: "URL for the current or most recent company's logo." },
            },
        },
        about: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                professionalSummary: { type: Type.STRING },
                personalSummary: { type: Type.STRING },
                languages: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            proficiency: { type: Type.STRING, description: "Must be one of: 'Native', 'Fluent', 'Conversational', 'Basic'" },
                        },
                    },
                },
                volunteerWork: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                },
            },
        },
        careerJourney: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                items: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, description: "Must be 'experience' or 'education'" },
                            title: { type: Type.STRING },
                            institution: { type: Type.STRING },
                            logoUrl: { type: Type.STRING },
                            startDate: { type: Type.STRING },
                            endDate: { type: Type.STRING },
                            description: { type: Type.STRING },
                            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                            gpa: { type: Type.STRING },
                            achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                    },
                },
            },
        },
        skills: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                skills: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            proficiency: { type: Type.INTEGER },
                            category: { type: Type.STRING, description: "Must be one of: 'Technical', 'Business', 'Industry'" },
                        },
                    },
                },
                radarChart: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            subject: { type: Type.STRING },
                            value: { type: Type.INTEGER },
                        },
                    },
                },
            },
        },
        interests: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                items: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            icon: { type: Type.STRING, description: "Must be one of: 'Music', 'Culture', 'Data', 'Sports', 'Travel', 'Reading', 'Code', 'Art'" },
                        },
                    },
                },
            },
        },
        projectsAndPublications: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                items: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            imageUrl: { type: Type.STRING },
                            link: { type: Type.STRING },
                            type: { type: Type.STRING, description: "Must be one of: 'project', 'publication'" },
                            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                    },
                },
            },
        },
    },
};


export async function generateWebsiteContent(profileData: string, profileImage: string | null): Promise<WebsiteContent> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: getPrompt(profileData),
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedContent = JSON.parse(jsonText);

        if (profileImage) {
            parsedContent.hero.imageUrl = profileImage;
        }

        return parsedContent as WebsiteContent;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from AI. Please check your API key and input data.");
    }
}