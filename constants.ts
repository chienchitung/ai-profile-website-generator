import type { LLMProvider } from './types';

export const LLM_PROVIDERS: LLMProvider[] = [
    {
        id: 'gemini',
        name: 'Google Gemini',
        models: ['gemini-2.5-flash', 'gemini-2.5-pro'],
    },
    {
        id: 'chatgpt',
        name: 'OpenAI ChatGPT',
        models: ['GPT-5', 'GPT-4o', 'GPT-4o mini'],
    },
    {
        id: 'grok',
        name: 'xAI Grok',
        models: ['Grok 4', 'Grok 3'],
    },
    {
        id: 'claude',
        name: 'Anthropic Claude',
        models: ['Claude 4 Sonnet', 'Claude 3.7 Sonnet'],
    },
];
