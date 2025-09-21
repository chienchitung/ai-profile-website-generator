import React from 'react';

const iconProps = {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;

export const BriefcaseIcon = () => (
    <svg {...iconProps}>
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
    </svg>
);

export const AcademicCapIcon = () => (
    <svg {...iconProps}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3.33 1 6.67 1 10 0v-5"></path>
    </svg>
);

export const UserCircleIcon = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
    </svg>
);

export const GlobeIcon = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
    </svg>
);

export const MusicIcon = () => (
    <svg {...iconProps}>
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
    </svg>
);

export const ChartBarIcon = () => (
    <svg {...iconProps}>
        <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
        <path d="M7 16h8"></path><path d="M7 11h12"></path>
        <path d="M7 6h3"></path>
    </svg>
);

export const VolunteerIcon = () => (
    <svg {...iconProps}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
    </svg>
);

export const LanguageIcon = () => (
    <svg {...iconProps}>
        <path d="M12.87 15.07 10.33 12.53 10 14.53 7.5 12.03 5 14.53 2.5 12.03 2 17h1.97l.5-2 .5 2h1.4l.5-2 .5 2h1.42l.5-2 .5 2h1.4l.5-2 .5 2h1.48L12.87 15.07zM17 14.53l-2.5-2.5.53-2.03 2.5 2.5-.53 2.03z"></path>
        <path d="m21.66 10.99-1.41-1.41a2 2 0 0 0-2.83 0L15.93 11l-2.02-2.02a4.98 4.98 0 0 0-7.07 0L2 13.84l1.41 1.41a2 2 0 0 0 2.83 0l1.49-1.49 2.02 2.02a4.98 4.98 0 0 0 7.07 0l4.49-4.49a2 2 0 0 0 0-2.83z"></path>
    </svg>
);

export const CodeBracketIcon = () => (
    <svg {...iconProps}><path d="M10 20.5 3.5 14 10 7.5 M14 20.5 20.5 14 14 7.5"></path></svg>
);

export const BookOpenIcon = () => (
    <svg {...iconProps}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

export const PaintBrushIcon = () => (
    <svg {...iconProps}><path d="M17 3a2.85 2.85 0 0 0-4 4L7.5 11.5 2 17v4h4l5.5-5.5L15 11a2.85 2.85 0 0 0 4-4z"></path><path d="m21 1-6 6"></path></svg>
);

export const TrophyIcon = () => (
    <svg {...iconProps}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.81 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.19 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);

export const PaperAirplaneIcon = () => (
    <svg {...iconProps}><path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4Z"></path></svg>
);