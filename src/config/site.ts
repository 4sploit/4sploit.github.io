/**
 * Central site configuration.
 *
 * Every theme-level setting lives here — change values in this file to
 * customize the site without touching any component.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  /** Site name, shown in the header and metadata */
  name: string;
  /** Default <title> for the homepage */
  title: string;
  /** Default meta description */
  description: string;
  /** Absolute production URL (no trailing slash) */
  url: string;
  /** Default locale for Open Graph */
  locale: string;

  author: {
    name: string;
    email: string;
    /** Path to avatar image (in /public) or remote URL */
    avatar: string;
    role: string;
    location: string;
  };

  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    mastodon?: string;
  };

  /** GitHub settings for the contribution graph + header link */
  github: {
    /** Username used for the contribution heatmap (build-time fetch) */
    username: string;
    /** Repository URL used in the header/footer GitHub links */
    repoUrl?: string;
  };

  navigation: NavItem[];

  hero: {
    /** Short one-line introduction under your name */
    tagline: string;
    /** Longer supporting sentence */
    intro: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    /** Small availability badge, e.g. "Available for work" — set to null to hide */
    status: string | null;
  };

  /** Configurable stats — no third-party API required */
  stats: Array<{ label: string; value: string }>;

  /** Skills shown on the homepage and about page, grouped by category */
  skills: Array<{ category: string; items: string[] }>;

  blog: {
    postsPerPage: number;
    /** Include full rendered post HTML in the RSS feed */
    rssFullContent: boolean;
  };

  contact: {
    /** Optional form endpoint (Formspree, Basin, your own API...). null hides the form. */
    formAction: string | null;
  };

  resume: {
    /** Optional downloadable file placed in /public. null hides the download button. */
    pdfFile: string | null;
  };

  footer: {
    /** Short description shown in the footer */
    text: string;
  };

  /** Toggle whole features on/off */
  features: {
    blog: boolean;
    projects: boolean;
    docs: boolean;
    search: boolean;
    githubActivity: boolean;
    newsletter: boolean;
    comments: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Mahmoud Mahajna',
  title: 'Mahmoud Mahajna — Software Engineer And Security Researcher',
  description:
    'I build scalable software, investigate security vulnerabilities, and analyze software through reverse engineering. My work spans software engineering, offensive security, malware analysis, and vulnerability research.',
  url: 'https://mahajnam.com',
  locale: 'en_US',

  author: {
    name: 'Mahmoud Mahajna',
    email: 'mahmod.mahajnaa@outlook.com',
    avatar: '/images/avatar.svg',
    role: 'Senior Software Enginner | Security Researcher',
    location: 'Haifa, IL',
  },

  social: {
    github: 'https://github.com/4sploit',
    linkedin: 'https://www.linkedin.com/in/4sploit',
    // twitter: 'https://x.com/astrodotbuild',
  },

  github: {
    username: '4sploit',
    repoUrl: 'https://github.com/4sploit/4sploit.github.io',
  },

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    // { label: 'Docs', href: '/docs' },
    { label: 'About', href: '/about' },
  ],

  hero: {
    tagline: 'Software Engineer | Security Researcher',
    intro:
      'I build scalable software, investigate security vulnerabilities, and analyze software through reverse engineering. My work spans software engineering, offensive security, malware analysis, and vulnerability research.',
    primaryCta: { label: 'View Projects', href: '/projects' },
    secondaryCta: { label: 'Read Blog', href: '/blog' },
    status: 'Open to opportunities',
  },

  stats: [
    // { label: 'GitHub stars', value: '4.2k' },
    // { label: 'Projects', value: '24' },
    // { label: 'Articles', value: '38' },
    { label: 'Years of experience', value: '10+' },
  ],

  
skills: [
  {
    category: 'Programming Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'C#', 'Java', 'Kotlin', 'Assembly', 'Bash', 'PowerShell'],
  },
  {
    category: 'Frontend Development',
    items: ['React', 'Angular', 'HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'WebAssembly'],
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express', 'Flask', 'FastAPI', '.NET', 'Spring', 'WebSockets', 'REST APIs', 'GraphQL', 'RPC'],
  },
  {
    category: 'Databases & Messaging',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'RabbitMQ', 'MSSQL', 'MySQL'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Helm', 'GitLab CI/CD', 'GitHub Actions', 'Terraform', 'Ansible'],
  },
  {
    category: 'Cyber Security',
    items: ['Web Security', 'Mobile Security', 'Penetration Testing', 'Active Directory', 'Cloud Security', 'Vulnerability Research'],
  },
  {
    category: 'Reverse Engineering & Malware Analysis',
    items: ['IDA Pro', 'Ghidra', 'JEB', 'Binary Ninja', 'Jadx', 'Frida', 'LLDB', 'GDB', 'WinDbg', 'x64dbg'],
  },
  {
    category: 'Operating Systems',
    items: ['Linux', 'Windows', 'MacOS', 'Embedded Linux', 'Raspberry Pi OS', 'Android', 'iOS'],
  },
],


  blog: {
    postsPerPage: 10,
    rssFullContent: true,
  },

  contact: {
    formAction: null,
  },

  resume: {
    pdfFile: null,
  },

  footer: {
    text: 'Software engineering, security research, and open-source projects.',
  },

  features: {
    blog: true,
    projects: true,
    docs: false,
    search: true,
    githubActivity: false,
    newsletter: false,
    comments: false,
  },
};
