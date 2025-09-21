import React from 'react';
import type { WebsiteContent, JourneyItem, Skill, Interest, ProjectOrPublication } from '../../types';
import { BriefcaseIcon, AcademicCapIcon, UserCircleIcon, GlobeIcon, MusicIcon, ChartBarIcon, VolunteerIcon, LanguageIcon, BookOpenIcon, CodeBracketIcon, PaintBrushIcon, TrophyIcon, PaperAirplaneIcon } from '../ui/icons';

interface TemplateModernProps {
    content: WebsiteContent;
}

const Section: React.FC<{ title: string; subtitle: string; children: React.ReactNode; id: string; bgColor?: string }> = ({ title, subtitle, children, id, bgColor = '' }) => (
    <section id={id} className={`py-16 sm:py-20 px-4 md:px-6 scroll-mt-20 ${bgColor}`}>
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">{title}</h2>
                <div className="w-20 h-1 bg-professional-blue-600 mx-auto mt-4 mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            </div>
            {children}
        </div>
    </section>
);

const AboutCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-professional-blue-50/50 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="w-12 h-12 bg-white text-professional-blue-600 rounded-full flex items-center justify-center mb-4 border border-professional-blue-100">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <div className="text-gray-600">{children}</div>
    </div>
);

const JourneyCard: React.FC<{ item: JourneyItem; isRight: boolean }> = ({ item, isRight }) => (
    <div className={`md:flex items-start ${isRight ? 'md:flex-row-reverse' : ''}`}>
        <div className="hidden md:block md:w-1/2"></div>
        <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12 data-[is-right=true]:md:pl-0 data-[is-right=true]:md:pr-12" data-is-right={isRight}>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-gray-200 flex-shrink-0">
                        <img src={item.logoUrl} alt={item.institution} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-professional-blue-600">{item.institution}</p>
                    </div>
                    <div className="ml-auto bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600 whitespace-nowrap">
                        {item.endDate}
                    </div>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.skills && (
                    <div className="flex flex-wrap gap-2">
                        {item.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-professional-blue-50 text-professional-blue-700 text-xs font-medium rounded-full">{skill}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);

const EducationCard: React.FC<{ item: JourneyItem }> = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col">
        <div className="h-24 bg-professional-blue-50/70 flex items-center justify-center p-4">
            <img src={item.logoUrl} alt={item.institution} className="h-full max-h-16 object-contain" />
        </div>
        <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600 whitespace-nowrap">{item.endDate}</span>
            </div>
            <p className="text-professional-blue-600 font-medium mb-3">{item.institution}</p>
            <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
            {item.gpa && (
                 <div className="mb-4">
                    <div className="flex justify-between mb-1"><span className="text-sm font-medium">GPA</span><span className="text-sm text-professional-blue-600 font-medium">{item.gpa}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-green-500" style={{width: `${(parseFloat(item.gpa.split('/')[0]) / parseFloat(item.gpa.split('/')[1])) * 100}%`}}></div></div>
                </div>
            )}
             {item.achievements && (
                <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Achievements</h4>
                    <ul className="space-y-1">
                        {item.achievements.map(ach => <li key={ach} className="text-sm text-gray-600 flex items-start"><span className="mr-2 text-professional-blue-500">•</span>{ach}</li>)}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-gray-700">{skill.name}</span>
            <span className="text-sm font-medium text-professional-blue-600">{skill.proficiency}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-professional-blue-600 h-2.5 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
        </div>
    </div>
);

const interestIcons: { [key: string]: React.ReactNode } = {
    Music: <MusicIcon />,
    Culture: <GlobeIcon />,
    Data: <ChartBarIcon />,
    Sports: <TrophyIcon />,
    Travel: <PaperAirplaneIcon />,
    Reading: <BookOpenIcon />,
    Code: <CodeBracketIcon />,
    Art: <PaintBrushIcon />,
    Default: <UserCircleIcon />, // A fallback
};

const InterestCard: React.FC<{ item: Interest }> = ({ item }) => (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
        <div className="w-16 h-16 bg-professional-blue-100 text-professional-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            {interestIcons[item.icon] || interestIcons.Default}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
    </div>
);

const ProjectCard: React.FC<{ item: ProjectOrPublication }> = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex flex-col flex-grow">
            <div className="relative h-48">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-professional-blue-600 text-white text-xs font-bold rounded capitalize">{item.type}</div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm flex-grow">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {(item.tags || []).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{tag}</span>
                    ))}
                </div>
                <span className="font-semibold text-professional-blue-600 group-hover:underline mt-auto">
                    View {item.type === 'project' ? 'Project' : 'Publication'} &rarr;
                </span>
            </div>
        </a>
    </div>
);

const Footer: React.FC<{ name: string }> = ({ name }) => (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center px-4">
            <p>&copy; {new Date().getFullYear()} {name}. All Rights Reserved.</p>
            <p className="text-sm text-gray-400 mt-2">Generated with AI Website Generator</p>
        </div>
    </footer>
);

export const TemplateModern: React.FC<TemplateModernProps> = ({ content }) => {
    const { hero, about, careerJourney, skills, interests, projectsAndPublications } = content;
    const experienceItems = careerJourney?.items?.filter(item => item.type === 'experience') || [];
    const educationItems = careerJourney?.items?.filter(item => item.type === 'education') || [];

    const NavLink: React.FC<{href: string; children: React.ReactNode}> = ({href, children}) => (
        <a href={href} className="text-sm font-medium text-gray-600 hover:text-professional-blue-600 transition-colors relative group">
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-professional-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
    );

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <header className="fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out py-4 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 md:px-6"><div className="flex items-center justify-between">
                    <a href="#hero" className="text-xl font-display font-bold text-professional-blue-700 hover:text-professional-blue-500 transition-colors"><span className="inline-block transform hover:scale-105 transition-transform duration-300">{hero?.name}</span></a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {about && <NavLink href="#about">About</NavLink>}
                        {experienceItems.length > 0 && <NavLink href="#experience">Experience</NavLink>}
                        {educationItems.length > 0 && <NavLink href="#education">Education</NavLink>}
                        {skills?.skills?.length > 0 && <NavLink href="#skills">Skills</NavLink>}
                        {projectsAndPublications?.items?.length > 0 && <NavLink href="#projects">Projects</NavLink>}
                        {interests?.items?.length > 0 && <NavLink href="#interests">Interests</NavLink>}
                    </nav>
                </div></div>
            </header>

            {/* Hero Section */}
            {hero && (
                <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
                    <div className="container mx-auto px-4 md:px-6 z-10"><div className="flex flex-col md:flex-row items-center gap-8 md:gap-12"><div className="w-full md:w-2/5 flex justify-center md:justify-end order-2 md:order-1"><div className="relative"><div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl"><img src={hero.imageUrl} alt={hero.name} className="w-full h-full object-cover" /></div><div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg"><img src={hero.companyLogoUrl} alt="Company Logo" className="w-16 h-16 object-contain" /></div></div></div><div className="w-full md:w-3/5 text-center md:text-left order-1 md:order-2"><div className="inline-block px-3 py-1 rounded-full bg-professional-blue-100 text-professional-blue-700 text-sm font-medium mb-4">{hero.headline}</div><h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">{hero.name}</h1><p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-xl">{about?.professionalSummary?.substring(0, 100)}...</p><div className="flex flex-wrap gap-3 justify-center md:justify-start"><a href="#experience" className="px-6 py-3 bg-professional-blue-600 text-white rounded-md hover:bg-professional-blue-700 transition-colors shadow-md hover:shadow-lg">View Experience</a><a href="#about" className="px-6 py-3 bg-white text-professional-blue-600 border border-professional-blue-200 rounded-md hover:bg-professional-blue-50 transition-colors shadow-sm">About Me</a></div></div></div></div>
                </section>
            )}
            
            {about && (
                <Section id="about" title={about.title || 'About Me'} subtitle={about.subtitle || ''}>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {about.professionalSummary && (
                            <AboutCard icon={<BriefcaseIcon />} title="Professional">
                                <p>{about.professionalSummary}</p>
                            </AboutCard>
                        )}
                        {about.personalSummary && (
                            <AboutCard icon={<UserCircleIcon />} title="Personal">
                                <p>{about.personalSummary}</p>
                            </AboutCard>
                        )}
                        {about.languages && about.languages.length > 0 && (
                            <AboutCard icon={<LanguageIcon />} title="Languages">
                                <ul className="space-y-3">
                                    {about.languages.map(lang => {
                                        const widths = {'Native': 100, 'Fluent': 90, 'Conversational': 60, 'Basic': 30};
                                        const width = widths[lang.proficiency] || 50;
                                        return (
                                        <li key={lang.name}><span className="w-24 inline-block">{lang.name}:</span><div className="flex-1 bg-gray-200 h-2 rounded-full inline-block w-32 ml-2 align-middle"><div className="bg-green-500 h-2 rounded-full" style={{width: `${width}%`}}></div></div></li>
                                        )
                                    })}
                                </ul>
                            </AboutCard>
                        )}
                        {about.volunteerWork && about.volunteerWork.length > 0 && (
                            <AboutCard icon={<VolunteerIcon />} title="Volunteer Work">
                                <ul className="space-y-2">
                                  {about.volunteerWork.map(item => <li key={item} className="flex items-center gap-2"><span className="w-2 h-2 bg-professional-blue-400 rounded-full flex-shrink-0"></span><span>{item}</span></li>)}
                                </ul>
                            </AboutCard>
                        )}
                     </div>
                </Section>
            )}

            {experienceItems.length > 0 && (
                <Section id="experience" title={careerJourney?.title || 'Professional Experience'} subtitle={careerJourney?.subtitle || 'My career journey so far.'} bgColor="bg-white">
                     <div className="relative pt-8">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-professional-blue-100 transform md:-translate-x-1/2"></div>
                        <div className="space-y-12">
                            {experienceItems.map((item, index) => (
                                 <div key={index} className="relative">
                                    <div className="absolute left-1.5 md:left-1/2 top-1 w-5 h-5 bg-professional-blue-600 rounded-full border-4 border-white transform md:-translate-x-1/2 z-10"></div>
                                    <JourneyCard item={item} isRight={index % 2 !== 0} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            {educationItems.length > 0 && (
                <Section id="education" title="Education" subtitle="My academic background and achievements.">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {educationItems.map((item, index) => (
                            <EducationCard key={index} item={item} />
                       ))}
                    </div>
                </Section>
            )}
            
            {skills?.skills && skills.skills.length > 0 && (
                <Section id="skills" title={skills.title || 'Skills & Expertise'} subtitle={skills.subtitle || 'My technical and business capabilities.'} bgColor="bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {skills.skills.map((skill, index) => (
                                <SkillBar key={index} skill={skill} />
                            ))}
                        </div>
                    </div>
                    {skills.radarChart && skills.radarChart.length > 0 && (
                        <div className="mt-16 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Core Competencies</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {skills.radarChart.map((skill, index) => (
                                    <span key={index} className="px-5 py-2 bg-professional-blue-50 text-professional-blue-800 rounded-full font-medium shadow-sm border border-professional-blue-100">
                                        {skill.subject}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </Section>
            )}
            
            {projectsAndPublications?.items && projectsAndPublications.items.length > 0 && (
                <Section id="projects" title={projectsAndPublications.title || 'Projects & Publications'} subtitle={projectsAndPublications.subtitle || 'A selection of my work.'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsAndPublications.items.map((item, index) => (
                            <ProjectCard key={index} item={item} />
                        ))}
                    </div>
                </Section>
            )}

            {interests?.items && interests.items.length > 0 && (
                <Section id="interests" title={interests.title || 'Personal Interests'} subtitle={interests.subtitle || 'What I do in my free time.'} bgColor="bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {interests.items.map((item, index) => (
                            <InterestCard key={index} item={item} />
                        ))}
                    </div>
                </Section>
            )}

            <Footer name={hero?.name || ''} />
        </div>
    );
};