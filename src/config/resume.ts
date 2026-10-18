/**
 * Structured career data shared by the About and Resume pages.
 */

export interface ExperienceItem {
  company: string;
  position: string;
  start: string;
  end: string | null;
  location: string;
  mode?: 'Remote' | 'On-Site' | 'Hybrid';
  description: string;
  technologies: string[];
  /** Shows a pulsing "current" badge next to the entry */
  current?: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  start: string;
  end: string;
  description?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export const experience: ExperienceItem[] = [
  {
    company: 'ActiveFence',
    position: 'Security Researcher',
    start: 'Nov 2025',
    end: null,
    location: 'Israel',
    mode: 'Hybrid',
    current: true,
    description:
      'Research Android malware campaigns, reverse engineer APKs and ARM64 native libraries, and investigate malicious behavior through static and dynamic analysis. Identify evasion techniques, exploitation paths, and malicious infrastructure while developing AI-assisted research and automation workflows.',
    technologies: [
      'Android', 'IDA Pro', 'Binary Ninja', 'JEB',
      'JADX', 'Frida', 'ARM64', 'Python',
    ],
  },
  {
    company: 'Synack Red Team',
    position: 'Security Researcher',
    start: 'Aug 2023',
    end: 'Oct 2025',
    location: 'Remote',
    mode: 'Remote',
    current: false,
    description:
      'Conducted offensive security assessments across web, mobile, cloud, and enterprise environments. Identified and exploited vulnerabilities, reverse engineered mobile applications, and assessed Active Directory security. Developed automation tools and documented findings with actionable remediation guidance.',
    technologies: [
      'Burp Suite', 'Frida', 'Ghidra', 'Python',
      'AWS', 'Active Directory', 'BloodHound',
    ],
  },
  {
    company: 'Via Transportation',
    position: 'Backend Developer',
    start: 'Dec 2021',
    end: 'Jul 2023',
    location: 'Israel',
    mode: 'On-Site',
    current: false,
    description:
      'Designed and developed scalable Node.js microservices on AWS for workforce and shift management. Built event-driven integrations using AWS Lambda, SQS, and SNS, developed Flask APIs, and optimized real-time services for performance and infrastructure efficiency.',
    technologies: [
      'Node.js', 'Python', 'Flask',
      'AWS', 'Lambda', 'SQS', 'SNS',
    ],
  },
  {
    company: 'Munters',
    position: 'Full Stack Developer',
    start: 'Jan 2021',
    end: 'Dec 2021',
    location: 'Israel',
    mode: 'On-Site',
    current: false,
    description:
      'Developed web applications for IoT-based agricultural climate control systems using Angular and TypeScript. Integrated Azure IoT Hub to enable real-time environmental monitoring, remote configuration, and management of connected devices.',
    technologies: [
      'TypeScript', 'Angular', 'Azure',
      'Azure IoT Hub', 'IoT',
    ],
  },
  {
    company: 'HOT',
    position: 'Full Stack Developer',
    start: 'Jan 2018',
    end: 'Dec 2020',
    location: 'Israel',
    mode: 'On-Site',
    current: false,
    description:
      'Developed customer-facing web applications and internal management tools, including an Angular-based service purchasing platform, WPF administration applications, and custom Umbraco CMS features.',
    technologies: [
      'Angular', 'TypeScript', 'C#',
      'WPF', 'Umbraco CMS',
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: 'Technical University of Delft',
    degree: 'BSc Computer Science',
    start: '2014',
    end: '2018',
    description: 'Focus on distributed systems and human-computer interaction.',
  },
];

export const certifications: CertificationItem[] = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    name: 'CKA: Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    year: '2022',
  },
];

export const philosophy = `
I believe the best software is the software you can delete. Small, composable
modules beat clever abstractions; boring technology beats novel technology
until the problem demands otherwise.

Performance is a feature, accessibility is a requirement, and developer
experience is how you scale a team. I default to open source — working in
public keeps the quality bar honest.
`;
