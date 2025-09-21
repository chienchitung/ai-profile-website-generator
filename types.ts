export interface HeroSection {
    name: string;
    headline: string;
    imageUrl: string;
    companyLogoUrl: string;
}

export interface Language {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
}

export interface AboutSection {
    title: string;
    subtitle: string;
    professionalSummary: string;
    personalSummary: string;
    languages: Language[];
    volunteerWork: string[];
}

export interface JourneyItem {
    type: 'experience' | 'education';
    title: string;
    institution: string;
    logoUrl: string;
    startDate: string;
    endDate: string;
    description: string;
    skills?: string[];
    gpa?: string;
    achievements?: string[];
}

export interface Skill {
    name: string;
    proficiency: number; // 0-100
    category: 'Technical' | 'Business' | 'Industry';
}

export interface RadarSkill {
    subject: string;
    value: number;
}

export interface SkillSection {
    title: string;
    subtitle: string;
    skills: Skill[];
    radarChart: RadarSkill[];
}

export interface Interest {
    title: string;
    description: string;
    icon: 'Music' | 'Culture' | 'Data' | 'Sports' | 'Travel' | 'Reading' | 'Code' | 'Art';
}

export interface ProjectOrPublication {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    type: 'project' | 'publication';
    tags: string[];
}

export interface WebsiteContent {
    hero: HeroSection;
    about: AboutSection;
    careerJourney: {
        title: string;
        subtitle: string;
        items: JourneyItem[];
    };
    skills: SkillSection;
    interests: {
        title: string;
        subtitle: string;
        items: Interest[];
    };
    projectsAndPublications: {
        title: string;
        subtitle: string;
        items: ProjectOrPublication[];
    }
}

export interface LLMProvider {
    id: 'gemini' | 'chatgpt' | 'grok' | 'claude';
    name: string;
    models: string[];
}

export type AIModel = 'gemini' | 'chatgpt' | 'grok' | 'claude';