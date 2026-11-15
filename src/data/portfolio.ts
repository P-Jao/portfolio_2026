import type { Project, SkillDefinition, SkillFile, SocialLink } from '../types'

function tokenize(line: string) {
  const tokenRegex =
    /(\/\/.*|--.*|#.*)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")(?=\s*(?:=>|:))|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(<\?php|\b(?:import|from|export|const|return|SELECT|FROM|INSERT|INTO|VALUES)\b)|([A-Za-z_][\w-]*)(?=\s*:)|(=>|[{}\[\](),;:])/g
  const tokens: { c: string; t: string }[] = []
  let last = 0

  for (const match of line.matchAll(tokenRegex)) {
    const text = match[0]
    const index = match.index ?? 0
    if (index > last) tokens.push({ c: 'tx', t: line.slice(last, index) })
    tokens.push({
      c: match[1] ? 'cm' : match[2] || match[5] ? 'ky' : match[3] ? 'st' : match[4] ? 'kw' : 'pu',
      t: text,
    })
    last = index + text.length
  }

  if (last < line.length) tokens.push({ c: 'tx', t: line.slice(last) })
  return tokens
}

export const pageLinks = [
  { path: '/', id: 'hello', label: '_hello' },
  { path: '/projects', id: 'projects', label: '_projects' },
  { path: '/skills', id: 'skills', label: '_skills' },
  { path: '/experience', id: 'experience', label: '_experience' },
  { path: '/contact', id: 'contact', label: '_contact-me' },
]

export const yearsOfExperience = (now: Date = new Date()): number => now.getFullYear() - 2020

export const profile = {
  name: 'Paul Jao',
  role: 'Professional Full-Stack AI Engineer',
  bio: `${yearsOfExperience()}+ years of experience building web applications end to end, from database design to polished interfaces. I also build AI-powered features into production apps. I thrive on collaborative teams, turning complex requirements into reliable and maintainable products.`,
  email: 'paul.jao95@gmail.com',
  phone: '+63 945 750 5051',
  location: 'Las Piñas City, Metro Manila, Philippines',
  photo: '/images/profile.png',
  available: true,
}

export const services = [
  {
    id: 'web-applications',
    title: 'Application Development',
    description:
      'Reliable, maintainable web applications built to grow with your business and its users.',
    image: '/images/services/scalable-web-applications.svg',
  },
  {
    id: 'custom-websites',
    title: 'Web Design & Development',
    description: 'Purpose-built websites shaped around your brand, audience, and business goals.',
    image: '/images/services/custom-websites.svg',
  },
  {
    id: 'web-scraping',
    title: 'Data Automation',
    description:
      'Automated data collection that turns scattered web information into useful insights.',
    image: '/images/services/web-scraping.svg',
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    description:
      'Practical AI features that streamline workflows and make your products more helpful.',
    image: '/images/services/ai-solutions.svg',
  },
] as const

export const folders = [
  { id: 'web', label: 'Web Applications', color: '#ee7d68' },
  { id: 'design', label: 'Web Designs / Websites', color: '#e8b45c' },
  { id: 'automation', label: 'Automations', color: '#6fa3dc' },
  { id: 'mobile', label: 'Mobile Applications', color: '#a58be0' },
]

export const projects: Project[] = [
  {
    id: 'p1',
    folder: 'web',
    title: 'LGU Reports Monitoring System',
    dates: 'February 2025 - April 2025',
    summary:
      'The system is designed to facilitate and streamline report submission and compliance monitoring across various local government units (LGUs). This system enables efficient tracking of reports, deadlines, and compliance statuses to improve accountability and transparency. Our platform empowers users with easy access to information and report management, providing a robust tool for administrative oversight.',
    highlights: [
      'Report Submission Monitoring: Keep track of all reports submitted by LGUs, including deadlines, submission status, and frequency of reporting.',
      'Compliance Management: Ensure compliance through automated reminders, notifications, and easy-to-view status updates for timely submissions.',
      'Data Analytics and Reporting: Generate detailed reports and insights from data collected, helping inform decision-making and operational improvements.',
    ],
    role: 'Lead developer',
    stack: ['Laravel', 'jQuery', 'FullCalendar', 'Bootstrap', 'MySQL'],
    live: null,
    source: null,
    shots: [
      { caption: 'Dashboard screen', path: '/images/projects/lgu_dashboard.png' },
      { caption: 'Report form submission', path: '/images/projects/lgu_report_submission.png' },
      { caption: 'Compliance report list', path: '/images/projects/lgu_compliance_report.png' },
    ],
  },
  {
    id: 'p3',
    folder: 'dashboards',
    title: 'Project Three',
    dates: 'Mar 2025 - Aug 2025',
    summary:
      'A short description of what this dashboard shows and the decisions it helps people make.',
    highlights: [
      'Placeholder: the key numbers the dashboard shows and who reads them.',
      'Placeholder: how you kept charts fast with large data sets.',
      'Placeholder: a decision the team made because of what the dashboard showed.',
    ],
    role: 'Frontend developer',
    stack: ['Vue 3', 'Pinia', 'Chart.js'],
    live: 'https://example.com/project-three',
    source: 'https://github.com/your-username/project-three',
    shots: [
      { caption: 'Placeholder caption: overview with key figures', path: 't2' },
      { caption: 'Placeholder caption: trends over time', path: 't4' },
      { caption: 'Placeholder caption: exportable table', path: 't1' },
    ],
  },
]

export const jobs = [
  {
    id: 'j1',
    when: 'September 2025 - September 2026',
    role: 'Systems Developer',
    company: 'Innovative Solutions Inc.',
    technologies: [
      'Laravel',
      'Yii',
      'REST API',
      'Vue.js',
      'Quasar',
      'JQuery',
      'Inertia.js',
      'MySQL',
      'Figma',
      'AI Agents',
    ],
    points: [
      "Developed and optimized existing SQL queries for the accounting module of the company's core ERP system. Thus, improving the speed of queries in financial reports and data retrieval processes by 3 to 5 times.",
      'Refactored and tuned complex queries (aggregations, joins, conditional logic) to support accurate and efficient accounting computations within a large-scale ERP environment.',
      'Led the development of a standalone accounting system based on an existing legacy application built with the Yii Framework and jQuery. Rebuilt it on the VILT stack (Vue, Inertia, Laravel, Tailwind), replacing page-level jQuery scripting with reusable component-based UI and a cleaner separation of concerns, which made the system easier to maintain and extend. It is scoped as a lighter-weight alternative to the main ERP, covering core accounting functionality.',
      "Designed a prototype for an e-commerce integration to our client's ERP system. The integration showcased the flow of data coming from and going to multiple marketplace. The update of stocks and orders will be close to real time instead of doing it manually for each marketplace.",
    ],
  },
  {
    id: 'j2',
    when: 'March 2024 - June 2025',
    role: 'PHP Developer',
    company: 'Octal Philippines Inc.',
    technologies: [
      'Laravel',
      'Event Driven',
      'REST API',
      'Vue.js',
      'Nuxt',
      'Vuestic UI',
      'phpBB',
      'MySQL',
      'MSSQL',
    ],
    points: [
      'Developed a web based ticketing system using Laravel, Nuxt, Vuestic UI and MySQL stack for the internal process of the company and its clients. Through its analytics and turnaround time reports, the company will have the data to track response and resolution times, identify bottlenecks, and make informed decisions that improve service quality and client satisfaction.',
      'Collaborate closely with other developers in developing new modules for the web-based financial management system using Vue.js for the frontend and Laravel for the API. Built a module that scales to millions of records, designing database indexes around its main query patterns and testing them at volume so list, search, and report screens stay fast as the data grows.',
      'Implemented a more secure JWT authentication flow with Laravel and Vue, replacing the existing non-expiring token with short-lived access tokens kept alive by refresh tokens. A stolen token is now only useful for a short window instead of indefinitely, while users stay signed in without interruption, which strengthens the security of the financial management system without hurting usability.',
      "Customised phpBB to fit the company's internal process, replacing scattered email and chat announcements with a single searchable source of truth. Role-based forums and permissions made sure each department saw only the updates relevant to them, and threaded discussions kept questions and answers in one place. This cut repeated questions and sped up how quickly policy and process changes reached staff.",
    ],
  },
  {
    id: 'j3',
    when: 'April 2022 - December 2023',
    role: 'Web Developer',
    company: 'Fastrak Services Inc.',
    technologies: ['Laravel', 'Python', 'REST API', 'Vue.js', 'JQuery', 'MySQL', 'Redis'],
    points: [
      "Collaborated with multiple departments to develop a web-based internal system for handling and processing client mail and parcels using Laravel and jQuery. Migrated it from a legacy desktop application to the web, so it runs entirely in a browser with nothing to install at each site. The new version was designed to solve the legacy system's existing pain points and streamline the entire process. Updates are now deployed once on the server instead of being rolled out to every machine, which makes the system easier to maintain and keeps every site on the same version.",
      'Created a REST API for the mobile application used by delivery couriers, with consistent endpoint structure and response formats that make both the web system and the mobile API easier to maintain. Coordinated closely with the mobile app developer to limit the data returned by each endpoint, so only the fields the app needs are exposed, which reduces payload size and lowers the risk of leaking sensitive information.',
      'Automated file management on the company server (linux based) by developing Python scripts that archive old files and transfer them to a separate server. This keeps all relevant records preserved and easy to retrieve during audits, frees up space on the main server, and removes the manual, error-prone work of sorting and moving files by hand.',
      'Developed a custom web-based hotel management and reservation system for a client using Laravel, Vue.js and MySQL, designed around their own workflows instead of a one-size-fits-all product. The system streamlines their process by handling reservations and daily hotel operations in one place, so staff no longer work around software that doesn’t fit how they operate. The reduced workload lets the company save on operating costs. Built-in reports give management clear data on bookings and revenue, helping them make informed decisions on seasonal pricing and promotions.',
    ],
  },
  {
    id: 'j4',
    when: 'May 2018 - November 2018',
    role: 'Web Developer',
    company: 'Ascendant Technologies Inc.',
    technologies: ['Laravel', 'CodeIgniter', 'JQuery', 'MySQL', 'WordPress', 'Jira'],
    points: [
      "Maintained the company mail server and resolved employees' mail issues promptly, minimizing downtime and keeping communication with colleagues and clients uninterrupted.",
      'Customized and maintained Jira to fit the needs of each project, setting up workflows, boards, and task tracking that matched how each team worked. This gave everyone a clear view of who was doing what and where each task stood, so blockers surfaced early and project deadlines were easier to plan, monitor, and meet.',
      'Maintained multiple WordPress websites by regularly updating site content and data as the clients sent changes. Quick and reliable updates kept each site accurate and current.',
      'Participated in the development and enhancement of an electronic medical record (EMR) system built with Laravel, jQuery, and MySQL. Contributed mainly by identifying and fixing bugs, which kept the system stable and freed senior developers to concentrate on the critical components.',
    ],
  },
]

export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/justjao',
    display: 'linkedin.com/in/justjao',
    icon: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/P-Jao',
    display: 'github.com/P-Jao',
    icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8',
  },
]

const skillDefinitions: SkillDefinition[] = [
  {
    id: 'frontend',
    file: 'frontend.ts',
    lang: 'TypeScript',
    color: '#6fa3dc',
    head: ["import { createApp } from 'vue'", '', 'export const frontend = {'],
    tail: ['}', ''],
    format: (key: string, value: string) => `  ${key}: '${value}',`,
    items: [
      ['framework', 'Vue, Nuxt'],
      ['library', 'React, jQuery, Inertia.js'],
      ['language', 'TypeScript'],
      ['state', 'Pinia, Vuex'],
      ['build', 'Vite'],
      ['basic', 'HTML, CSS, Javascript'],
      ['styling', 'Tailwind CSS, Bootstrap'],
      ['design', 'Figma'],
    ],
  },
  {
    id: 'backend',
    file: 'backend.php',
    lang: 'PHP',
    color: '#e8b45c',
    head: ['<?php', '', 'return ['],
    tail: ['];', ''],
    format: (key: string, value: string, width: number) => `    '${key}' => '${value}',`,
    items: [
      ['framework', 'Laravel, CodeIgniter, Yii'],
      ['language', 'PHP, Python'],
      ['runtime', 'Node.js'],
      ['design_pattern', 'MVC, Observer, Repository'],
    ],
  },
  {
    id: 'database',
    file: 'database.sql',
    lang: 'SQL',
    color: '#ee7d68',
    head: ['INSERT INTO databases VALUES'],
    tail: [''],
    format: (key: string, value: string, width: number, last: boolean) =>
      `  ('${key}',' ${value}')${last ? ';' : ','}`,
    items: [
      ['relational', 'MySQL, MSSQL, SQLite'],
      ['nosql', 'Redis'],
    ],
  },
  {
    id: 'devtools',
    file: 'dev-tools.sh',
    lang: 'Bash',
    color: '#7fcf9e',
    head: [],
    tail: [''],
    format: (key: string, value: string) => `  ${key}: '${value}'`,
    items: [
      ['VERSION_CONTROL', 'Git'],
      ['CONTAINER', 'Docker'],
      ['AUTOMATION', 'CI/CD, GitHub Actions, Shell Scripting, AI Agents'],
      ['OS', 'Windows, Linux'],
    ],
  },
  {
    id: 'server',
    file: 'server.yml',
    lang: 'YAML',
    color: '#4fc3c7',
    head: ['server:'],
    tail: [''],
    format: (key: string, value: string) => `  ${key}: '${value}'`,
    items: [
      ['provider', 'AWS'],
      ['compute', 'EC2 (Linux VPS)'],
      ['storage', 'S3 (file storage)'],
    ],
  },
  {
    id: 'software',
    file: 'software.json',
    lang: 'JSON',
    color: '#b4a0e8',
    head: ['{', '  "software": {'],
    tail: ['  }', '}', ''],
    format: (key: string, value: string, _width: number, last: boolean) =>
      `    "${key}": "${value}"${last ? '' : ','}`,
    items: [
      ['cms', 'WordPress'],
      ['forum', 'phpBB'],
      ['project', 'Jira, Trello'],
      ['database', 'MySQL Workbench'],
      ['ide', 'Visual Studio Code, PhpStorm, Cursor'],
    ],
  },
]

export const skillFiles: SkillFile[] = skillDefinitions.map((definition) => {
  const width = Math.max(...definition.items.map(([key]) => key.length))
  const firstItemIndex = definition.head.length
  const textLines = [
    ...definition.head,
    ...definition.items.map(([key, value], index) =>
      definition.format(key, value, width, index === definition.items.length - 1),
    ),
    ...definition.tail,
  ]

  return {
    id: definition.id,
    file: definition.file,
    lang: definition.lang,
    color: definition.color,
    firstLine: firstItemIndex + 1,
    items: definition.items.map(([key, name]) => ({ key, name })),
    lines: textLines.map((text, index) => ({
      n: index + 1,
      len: text.length,
      skill: index >= firstItemIndex && index < firstItemIndex + definition.items.length,
      toks: tokenize(text),
    })),
  }
})
