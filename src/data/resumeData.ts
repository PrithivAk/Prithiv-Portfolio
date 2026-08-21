import { ResumeData } from '../types';

export const resumeData: ResumeData = {
  personalInfo: {
    name: "PRITHIV A K",
    title: "AI & Full Stack Engineer",
    specialization: "Artificial Intelligence & Data Science",
    email: "prithiv7770@gmail.com",
    phone: "9788059972",
    location: "Tamil Nadu, India",
    cgpa: "7.4",
    hscPercentage: "70%",
    links: {
      linkedin: "https://www.linkedin.com/in/prithiv-ak-694894328",
      leetcode: "https://leetcode.com/u/prithivak/",
      github: "https://github.com/PrithivAk",
      hackerrank: "https://www.hackerrank.com/profile/prithiv7770"
    }
  },
  objective: "Highly motivated and adaptable B.Tech student specializing in Artificial Intelligence & Data Science. Seeking an opportunity to gain real-world experience, enhance technical skills, and contribute effectively to organizational growth.",
  education: [
    {
      degree: "B.Tech – Artificial Intelligence & Data Science",
      field: "AI & Data Science",
      institution: "V.S.B. College of Engineering and Technical Campus",
      metric: "CGPA: 7.4",
      type: "college"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      field: "Higher Secondary Education",
      institution: "Corporation Higher Secondary School",
      metric: "70%",
      type: "school"
    }
  ],
  skills: {
    programming: ["Python", "Java"],
    database: ["SQL"],
    coreAreas: ["Machine Learning", "Full Stack Development", "Natural Language Processing"]
  },
  internships: [
    {
      role: "Machine Learning Intern",
      company: "Barola Technologies",
      period: "June 2025 – July 2025",
      type: "ML",
      description: [
        "Worked on machine learning concepts and real-time datasets.",
        "Assisted in model development and data preprocessing tasks."
      ]
    },
    {
      role: "Full Stack Development Intern",
      company: "Techvolt Software Pvt. Ltd",
      period: "February 2024",
      type: "FullStack",
      description: [
        "Contributed to web application development.",
        "Assisted in front-end and back-end integration."
      ]
    }
  ],
  certifications: [
    {
      title: "Full Stack Development",
      provider: "Novitech R&D; Private Limited",
      code: "CERT-FS-01"
    },
    {
      title: "Java Programming",
      provider: "Great Learning",
      code: "CERT-JAVA-02"
    },
    {
      title: "Introduction to Natural Language Processing",
      provider: "Infosys Springboard",
      code: "CERT-NLP-03"
    }
  ],
  projects: [
    {
      title: "Zoar",
      subtitle: "Multi-Agent AI Assistant",
      techStack: ["Python", "Streamlit", "Groq LLM API", "FAISS", "SQLite"],
      description: [
        "Built a multi-agent conversational AI system routing user queries to specialized agents (wellness tracking, semantic product search, mock interview prep) via an LLM-based intent classifier.",
        "Implemented semantic search using sentence-transformer embeddings and FAISS for context-aware product recommendations, improving match relevance over keyword search.",
        "Designed a shared SQLite memory layer enabling context persistence across agents; deployed live on Streamlit Community Cloud."
      ],
      highlights: [
        "LLM-based Intent Classification",
        "FAISS Vector Search Integration",
        "SQLite Context Memory Layer",
        "Streamlit Cloud Live Deployment"
      ],
      githubUrl: "https://github.com/PrithivAk",
      liveDemoUrl: "https://github.com/PrithivAk",
      agents: [
        {
          name: "Wellness Tracking Agent",
          role: "Analyzes wellness metrics, daily habits, and stress levels",
          type: "A1-WELLNESS",
          sampleQueries: ["How can I manage stress during exam week?", "Suggest a daily hydration and recovery schedule"]
        },
        {
          name: "Semantic Product Search Agent",
          role: "Uses sentence-transformer embeddings & FAISS for smart matching",
          type: "A2-FAISS-SEARCH",
          sampleQueries: ["Find wireless noise-canceling headphones for coding", "Search for ergonomics setup under $100"]
        },
        {
          name: "Mock Interview Prep Agent",
          role: "Conducts technical interview practice and feedback for AI/ML roles",
          type: "A3-INTERVIEW-PREP",
          sampleQueries: ["Ask me 3 technical questions about FAISS indexing", "Practice ML model overfitting explanation"]
        }
      ]
    }
  ],
  declaration: "I hereby declare that the above information is true and correct to the best of my knowledge and belief."
};
