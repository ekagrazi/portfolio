// ── Owner ─────────────────────────────────────────────────────────────────
export const owner = {
  name:     'Ekagra Gupta',
  role:     'Computer Science Student',
  subrole:  'COMPUTER SCIENCE STUDENT',
  tagline:  'Building intelligent systems at the intersection of AI and security.',
  location: 'Lucknow, India',
  typewriterRoles: [
    'Full-Stack Developer',
    'Cybersecurity Enthusiast',
    'AI/ML Engineer',
    'AWS Certified',
  ],
  phone:    '+91 8090753680',
  email:    'ekagragupta814@gmail.com',
  bio:      'I\'m a B.Tech Computer Science student specializing in Cyber Security & Digital Forensics at VIT Bhopal. I build full-stack applications, AI/ML systems, and cybersecurity tools — driven by curiosity and a passion for solving real-world problems through code.',
  social: {
    github:   'https://github.com/ekagrazi',
    linkedin: 'https://linkedin.com/in/ekagrazi',
  },
};

// ── Projects ──────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'disability-aid',
    number: '01',
    badge: 'Featured / AI',
    subtitle: 'ISL Gesture Recognition',
    title: 'Disability Aid',
    tagline: 'A real-time edge-AI application translating Indian Sign Language into text to bridge communication barriers.',
    description: 'Built a cross-platform desktop app for real-time Indian Sign Language recognition, engineering a 1154-dimensional pipeline using MediaPipe and training a BiLSTM classifier in PyTorch for sub-100ms inference. Architected a full-duplex WebSocket pipeline between frontend and FastAPI backend, with a 5-frame majority-vote smoothing engine to filter false positives; packaged as a standalone Windows installer via PyInstaller and Electron.',
    longDesc: 'ISL Recognition is a high-performance desktop application designed to make communication accessible. By combining MediaPipe\'s spatial hand tracking with a custom Bidirectional LSTM sequence model in PyTorch, the system accurately translates dynamic sign language gestures into text in real-time. The architecture pairs a fluid React/Electron interface with an asynchronous FastAPI backend via WebSockets, ensuring seamless, low-latency edge inference.',
    year: 'Jul 2025 – Mar 2026',
    tech: ['PyTorch', 'FastAPI', 'React', 'MediaPipe', 'Electron', 'WebSockets', 'BiLSTM', 'PyInstaller'],
    githubUrl: 'https://github.com/ekagrazi/Disability_Aid_ISL_Gesture_Recognition',
    liveUrl: null,
    image: '/images/projects/disability-aid.png',
  },
  {
    id: 'redteam-toolkit',
    number: '02',
    badge: 'Security',
    subtitle: 'Cybersecurity Automation',
    title: 'Red-Team Toolkit',
    tagline: 'An all-in-one Python security toolkit for faster reconnaissance and automated vulnerability detection.',
    description: 'Built a Python desktop GUI to automate web penetration testing, cutting manual assessment time by ~60%. Implemented network analysis features using raw socket programming and whois lookups to map domain infrastructure during reconnaissance phases.',
    longDesc: 'Developed RedTeamToolkit, a powerful desktop application built with Python and PyQt6 to simplify web security reconnaissance and vulnerability assessment. The toolkit integrates domain intelligence, subdomain enumeration, port scanning, and automated testing for vulnerabilities like SQL Injection, XSS, and HTML Injection into a single user-friendly interface. Leveraging libraries such as Requests, BeautifulSoup, dnspython, and python-whois, the project demonstrates practical expertise in cybersecurity automation, network analysis, and secure application development.',
    year: 'Sep 2024 – Jan 2025',
    tech: ['Python', 'PyQt6', 'Selenium', 'Sockets', 'BeautifulSoup', 'dnspython', 'python-whois'],
    githubUrl: 'https://github.com/ekagrazi/RedTeamToolkit',
    liveUrl: null,
    image: '/images/projects/redteam-toolkit.png',
  },
  {
    id: 'flight-delay',
    number: '03',
    badge: 'ML',
    subtitle: 'Machine Learning · Flask',
    title: 'Flight Delay Prediction System',
    tagline: 'Predicting flight delays with machine learning for smarter travel planning and decision-making.',
    description: 'Developed an end-to-end ML pipeline covering data preprocessing, feature engineering, and model training across Random Forest, Logistic Regression, and XGBoost classifiers. Deployed the best-performing model (Decision Tree, 86.7% accuracy on 11,000+ records) as a Flask web app enabling real-time delay predictions from user inputs.',
    longDesc: 'Built a Flight Delay Prediction System, a machine learning-powered web application that predicts flight delays using historical aviation data and real-time user inputs. Developed with Flask and scikit-learn, the system uses a Decision Tree Classifier achieving 86.7% accuracy on over 11,000 flight records. The project demonstrates expertise in data preprocessing, feature engineering, model training, and deploying intelligent predictive solutions through an interactive web interface.',
    year: 'Jun 2025 – Jul 2025',
    tech: ['Python', 'Scikit-Learn', 'Flask', 'Pandas', 'NumPy', 'XGBoost', 'Random Forest'],
    githubUrl: 'https://github.com/ekagrazi/Flight-Delay-Prediction-using-ML',
    liveUrl: null,
    image: '/images/projects/flight-delay.png',
  },
  {
    id: 'ccrm',
    number: '04',
    badge: 'Java',
    subtitle: 'Academic Management System',
    title: 'Campus Course & Records Manager (CCRM)',
    tagline: 'Streamlining academic management with powerful Java-driven course and student record automation.',
    description: 'Built a comprehensive Java SE application to manage students, courses, enrollments, grades, and academic records. Features CSV import/export, GPA and transcript generation, automated backups, and advanced reporting through a menu-driven console interface with strong validation and error handling.',
    longDesc: 'Built Campus Course & Records Manager (CCRM), a comprehensive Java SE application designed to manage students, courses, enrollments, grades, and academic records efficiently. The project showcases strong understanding of Object-Oriented Programming, file handling, design patterns, and modern Java concepts. It features CSV import/export, GPA and transcript generation, automated backups, and advanced reporting tools, all through a robust menu-driven console interface with strong validation and error handling.',
    year: '2024',
    tech: ['Java SE', 'OOP', 'File I/O', 'CSV', 'Design Patterns'],
    githubUrl: 'https://github.com/ekagrazi/Campus-Course-Records-Manager',
    liveUrl: null,
    image: '/images/projects/ccrm.png',
  },
  {
    id: 'steghide',
    number: '05',
    badge: 'Security',
    subtitle: 'Steganography Tool',
    title: 'StegHide',
    tagline: 'Securely hiding sensitive data within media files through advanced steganography techniques.',
    description: 'Developed a cross-platform steganography tool to conceal secret messages inside images, audio, video, and text files using LSB manipulation and Zero-Width Character encoding, while preserving media quality.',
    longDesc: 'Developed StegHide, a cross-platform steganography tool designed to conceal secret messages inside images, audio, video, and text files using advanced encoding techniques. The project implements methods such as LSB manipulation and Zero-Width Character encoding to securely embed hidden data while preserving media quality. Built as a lightweight command-line application, StegHide demonstrates expertise in cybersecurity concepts, file processing, multimedia handling, and secure data concealment across multiple file formats.',
    year: '2024',
    tech: ['Python', 'LSB Steganography', 'Zero-Width Characters', 'CLI', 'File Processing'],
    githubUrl: '#',
    liveUrl: null,
    image: '/images/projects/steghide.png',
  },
  {
    id: 'openmodelica',
    number: '06',
    badge: 'GUI',
    subtitle: 'Simulation Interface',
    title: 'OpenModelica Desktop App',
    tagline: 'Simplifying OpenModelica simulations with an intuitive Python-powered desktop interface.',
    description: 'Built a Python and PyQt6-based desktop application providing a user-friendly GUI for running OpenModelica simulation executables without command-line interaction. Supports executable browsing, parameter validation, real-time output streaming, and robust error handling.',
    longDesc: 'Developed OpenModelica-PyQt-Desktop-App, a Python and PyQt6-based desktop application that provides a user-friendly graphical interface for running OpenModelica simulation executables without command-line interaction. The application supports executable browsing, simulation parameter validation, real-time output streaming, and robust error handling through a clean MVC-inspired architecture. This project highlights expertise in GUI development, subprocess management, simulation workflow automation, and desktop application engineering on Windows platforms.',
    year: '2024',
    tech: ['Python', 'PyQt6', 'OpenModelica', 'MVC', 'Subprocess Management'],
    githubUrl: '#',
    liveUrl: null,
    image: '/images/projects/openmodelica.png',
  },
  {
    id: 'dwsim',
    number: '07',
    badge: 'Automation',
    subtitle: 'Process Simulation · Python',
    title: 'DWSIM Python Automation',
    tagline: 'Automating process simulation and parametric analysis in DWSIM using Python and .NET integration.',
    description: 'Developed a DWSIM Python Automation framework driving DWSIM headlessly through its .NET API for automated parametric sweeps of chemical process simulations. Evaluates Plug Flow Reactor and Distillation Column performance, generating structured CSV outputs and analytical plots.',
    longDesc: 'Developed a DWSIM Python Automation framework that drives DWSIM headlessly through its .NET API to perform automated parametric sweeps for chemical process simulations. The system evaluates Plug Flow Reactor and Distillation Column performance across multiple operating conditions, gracefully handling solver failures while generating structured CSV outputs and analytical plots. This project demonstrates expertise in process simulation, Python automation, scientific computing, and interoperability between Python and .NET-based engineering software.',
    year: '2024',
    tech: ['Python', '.NET API', 'DWSIM', 'Parametric Simulation', 'Scientific Computing', 'Matplotlib'],
    githubUrl: '#',
    liveUrl: null,
    image: '/images/projects/dwsim.png',
  },
];

// ── Skills ────────────────────────────────────────────────────────────────
export const skillGroups = [
  {
    label: 'Languages',
    skills: ['Python', 'C++', 'Java', 'JavaScript', 'SQL'],
  },
  {
    label: 'Frameworks & Libraries',
    skills: ['ReactJS', 'NodeJS', 'ExpressJS', 'Flask', 'FastAPI', 'MediaPipe', 'Scikit-Learn', 'PyTorch', 'NumPy', 'Matplotlib'],
  },
  {
    label: 'Databases',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    label: 'Security Tools',
    skills: ['Wireshark', 'OWASP ZAP', 'WebGoat', 'Selenium', 'Nmap'],
  },
  {
    label: 'Other',
    skills: ['Git', 'PyQt6', 'Machine Learning', 'GenAI', 'REST APIs'],
  },
];

// ── Education ─────────────────────────────────────────────────────────────
export const education = [
  {
    school:   'VIT Bhopal University',
    location: 'Sehore, Madhya Pradesh',
    degree:   'B.Tech in Computer Science and Engineering (CSDF)',
    score:    'CGPA: 8.6 / 10',
    period:   '2023 – 2027',
    current:  true,
  },
  {
    school:   'Bal Vidya Mandir School',
    location: 'Lucknow, Uttar Pradesh',
    degree:   'Class XII (CBSE)',
    score:    '85.6%',
    period:   '2022',
    current:  false,
  },
  {
    school:   'Maharaja Agrasen Public School',
    location: 'Lucknow, Uttar Pradesh',
    degree:   'Class X (CBSE)',
    score:    '85.2%',
    period:   '2020',
    current:  false,
  },
];

// ── Experience ────────────────────────────────────────────────────────────
export const experience = [
  {
    company:  'The Red Users',
    location: 'Remote',
    role:     'Cybersecurity Intern',
    period:   'Mar 2025 – Apr 2025',
    points: [
      'Conducted vulnerability assessments on web applications using OWASP ZAP and WebGoat, identifying and documenting critical risks including SQL Injection, XSS, and CSRF vulnerabilities.',
      'Documented findings and delivered structured mitigation reports to strengthen client web and network security posture.',
    ],
  },
];

// ── Achievements ──────────────────────────────────────────────────────────
export const achievements = [
  {
    org:   'Competitive & Community',
    title: '2nd Place — Mystery Manor',
    desc:  'Secured 2nd place in Mystery Manor, a cybersecurity challenge event organized in AdVITya, VIT Bhopal.',
  },
  {
    org:   'Club Leadership',
    title: 'Social Media Team Lead',
    desc:  'Served as Social Media Team Lead for Eureka Club and Cyber Warriors Club, VIT Bhopal — managed content strategy and grew engagement across platforms for both clubs.',
  },
  {
    org:   'National Competitions',
    title: 'CodeRed & KashiCTF Participant',
    desc:  'Participated in CodeRed (NITK) and KashiCTF (IIT BHU) — national-level competitive coding and Capture The Flag events.',
  },
];

// ── Certifications ────────────────────────────────────────────────────────
export const certifications = [
  {
    issuer: 'Stanford University (Coursera)',
    title:  'Machine Learning Specialization',
    desc:   'Supervised, Unsupervised & Reinforcement Learning by Andrew Ng',
    url:    'https://coursera.org/share/948f13211c452db250712f4234669ca8',
    image:  '/images/certs/stanford-ml.png',
  },
  {
    issuer: 'Google (Coursera)',
    title:  'The Bits and Bytes of Computer Networking',
    desc:   'Google-verified networking fundamentals certification.',
    url:    'https://www.coursera.org/account/accomplishments/verify/PH4BRW55YP87',
    image:  '/images/certs/google-networking.png',
  },
  {
    issuer:       'Microsoft',
    title:        'SC-900: Security, Compliance, and Identity Fundamentals',
    desc:         'Microsoft Certified: Security, Compliance, and Identity Fundamentals.',
    credentialId: 'wM6w7-H9Hw',
    url:          null,
    image:        '/images/certs/microsoft-sc900.png',
  },
  {
    issuer: 'Hitesh Chaudhary (Udemy)',
    title:  'Complete Web Development Course',
    desc:   'Certified in modern full-stack web development with hands-on experience in React, Node.js, PostgreSQL, and AI integration.',
    url:    'https://udemy-certificate.s3.amazonaws.com/pdf/UC-8d3eeb22-be17-4b3c-ac2c-78ee8aac8952.pdf',
    image:  '/images/certs/udemy-webdev.png',
  },
  {
    issuer: 'NPTEL',
    title:  'Blockchain and its Applications',
    desc:   'NPTEL certified course on blockchain fundamentals and applications.',
    url:    'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS08S65060040304211406',
    image:  '/images/certs/nptel-blockchain.png',
  },
  {
    issuer: 'IBM (Credly)',
    title:  'Getting Started with Cybersecurity',
    desc:   'IBM-issued badge for foundational cybersecurity knowledge.',
    url:    'https://www.credly.com/badges/e3ceb19b-2ecb-4488-a5a5-b63f0e76a7a6/public_url',
    image:  '/images/certs/ibm-cybersecurity.png',
  },
  {
    issuer: 'Google Cloud (Credly)',
    title:  'Introduction to Generative AI',
    desc:   'Google Cloud verified badge for GenAI fundamentals.',
    url:    'https://www.credly.com/badges/b764e347-ce76-402b-8247-76f474d06db4/public_url',
    image:  '/images/certs/google-genai.png',
  },
  {
    issuer: 'GeeksForGeeks',
    title:  'Python Programming Foundation',
    desc:   'GFG certificate for Python programming fundamentals.',
    url:    'https://www.geeksforgeeks.org/certificate/0c0959a85bb6520b5ba216942e3f6829',
    image:  '/images/certs/gfg-python.png',
  },
  {
    issuer: 'GeeksForGeeks',
    title:  'Full Stack Developer Bootcamp',
    desc:   'GFG certificate for full-stack web development.',
    url:    'https://media.geeksforgeeks.org/courses/certificates/9363a056a3d91a6b04657c4c7aad1dc2.pdf',
    image:  '/images/certs/gfg-fullstack.png',
  },
  {
    issuer: 'Postman',
    title:  'API Fundamentals Student Expert',
    desc:   'Postman-verified certification for REST API fundamentals.',
    url:    'https://badges.parchment.com/public/assertions/vh-qhgRvTkKcDy7yxFy4_g?identity__email=ekagragupta814@gmail.com',
    image:  '/images/certs/postman-api.png',
  },
];
