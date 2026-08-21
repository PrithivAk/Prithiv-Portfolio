export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    specialization: string;
    email: string;
    phone: string;
    location: string;
    cgpa: string;
    hscPercentage: string;
    links: {
      linkedin: string;
      leetcode: string;
      github: string;
      hackerrank: string;
    };
  };
  objective: string;
  education: Array<{
    degree: string;
    field: string;
    institution: string;
    metric: string;
    type: 'college' | 'school';
  }>;
  skills: {
    programming: string[];
    database: string[];
    coreAreas: string[];
  };
  internships: Array<{
    role: string;
    company: string;
    period: string;
    type: 'ML' | 'FullStack';
    description: string[];
  }>;
  certifications: Array<{
    title: string;
    provider: string;
    code: string;
  }>;
  projects: Array<{
    title: string;
    subtitle: string;
    techStack: string[];
    description: string[];
    highlights: string[];
    githubUrl?: string;
    liveDemoUrl?: string;
    agents: Array<{
      name: string;
      role: string;
      type: string;
      sampleQueries: string[];
    }>;
  }>;
  declaration: string;
}

export type ViewMode = 'motherboard' | 'blueprint';

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: string;
}
