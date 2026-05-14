import FundRise from '../../../../assets/projects/FundRiseMain.png'
import QPlus from '../../../../assets/projects/QPlusMain.png'
import CHATAPP from '../../../../assets/projects/SchoolChatLogin.png'
import ECCOMERCE from '../../../../assets/projects/EcommerceMain.png'
import PROJECTHIVE from '../../../../assets/projects/ProjectHiveMain.png'
import MOVIEBASE from '../../../../assets/projects/MovieBaseLanding.png'
import IDICE from '../../../../assets/projects/idiceLanding.png'
import ESTHINGTON from '../../../../assets/projects/EstingtonMain.png'

export const CAT = {
  FULL_STACK: 'Full Stack',
  FRONTEND:   'Frontend',
  WEBSITE:    'Website',
  LIVE:       'Live',
};

export const PROJECTS = [
  {
    id: 1,
    title: 'FundRise',
    img: FundRise,
    short_description: 'A full-stack crowdfunding platform where users create campaigns, set fundraising targets, and receive donations. Includes Paystack payment integration, automated email receipts, and real-time social features.',
    stack: ['React JS', 'Redux', 'Node JS', 'Express JS', 'MySQL', 'Nodemailer', 'Paystack', 'TailwindCSS'],
    features: ['User Authentication', 'Create Campaigns', 'Make Donations', 'User Profiles', 'Follow Users', 'Like Campaigns', 'Secure Payments', 'Email Notifications'],
    category: [CAT.FULL_STACK, CAT.LIVE],
    createdAt: 'Sept 2024',
  },
  {
    id: 2,
    title: 'QampusPlus Secondary (Frontend)',
    img: QPlus,
    short_description: 'School management platform for Techvibes International Limited. I contributed as frontend engineer, building React UI components, integrating REST APIs, and shipping features for class, staff, student, and assessment management.',
    stack: ['React JS', 'Redux', 'RTK Query', 'TailwindCSS'],
    features: ['Class Creation', 'Subject Management', 'Staff Management', 'Student Records', 'Assessments', 'Result Generation', 'Attendance Tracking', 'Timetable Scheduling'],
    category: [CAT.FRONTEND, CAT.LIVE],
    createdAt: 'Nov 2024',
  },
  {
    id: 3,
    title: 'School Chat App',
    img: CHATAPP,
    short_description: 'Real-time school communication platform with WebSocket-powered messaging, role-based user management for staff, students, and parents, and a dashboard with school-wide analytics.',
    stack: ['React JS', 'TailwindCSS', 'Socket.IO'],
    features: ['Real-Time Messaging', 'WebSockets Integration', 'Staff Profile Management', 'User Messaging'],
    category: [CAT.FRONTEND, CAT.LIVE],
    createdAt: 'June 2024',
  },
  {
    id: 4,
    title: 'Ecommerce Web Shop',
    img: ECCOMERCE,
    short_description: 'Full-stack e-commerce application with product browsing, shopping cart, secure Paystack checkout, order tracking, and a fully responsive UI across all screen sizes.',
    stack: ['React JS', 'Node JS', 'Express JS', 'MongoDB', 'Paystack', 'Material UI'],
    features: ['Product Browsing', 'Shopping Cart', 'User Authentication', 'Order Tracking', 'Payment Integration', 'Responsive Design'],
    category: [CAT.FULL_STACK, CAT.LIVE],
    createdAt: 'March 2024',
  },
  {
    id: 5,
    title: 'ProjectHive',
    img: PROJECTHIVE,
    short_description: 'A portfolio generator where users get unique subdomain landing pages to showcase their projects, with image uploads, GitHub links, and category filtering.',
    stack: ['React JS', 'Redux', 'Node JS', 'Express JS', 'MySQL', 'TailwindCSS'],
    features: ['Project Creation', 'Subdomain Landing Pages', 'Project Categories', 'Project Descriptions', 'Project Images', 'GitHub/Project Links'],
    category: [CAT.FULL_STACK, CAT.LIVE],
    createdAt: 'Nov 2024',
  },
  {
    id: 6,
    title: 'MovieBase',
    img: MOVIEBASE,
    short_description: 'Movie streaming web app with genre browsing, user authentication, watchlists, and an integrated video player. Fully responsive across devices.',
    stack: ['React JS', 'Redux', 'TailwindCSS', 'Video Player'],
    features: ['User Authentication', 'Movie Library', 'Personalized Accounts', 'Movie Categories', 'Search Functionality', 'Streaming', 'Responsive Design'],
    category: [CAT.FRONTEND, CAT.LIVE],
    createdAt: 'Nov 2024',
  },
  {
    id: 7,
    title: 'iDice Website',
    img: IDICE,
    short_description: 'Professional landing page for an IT solutions company in Nigeria, showcasing software development, IT consultancy, and digital transformation services.',
    stack: ['React JS', 'TailwindCSS'],
    features: ['Service Overview', 'IT Solutions', 'Software Development', 'Consultancy', 'Digital Transformation', 'Responsive Design'],
    category: [CAT.WEBSITE, CAT.LIVE],
    createdAt: 'Sept 2024',
  },
  {
    id: 8,
    title: 'Esthington Website',
    img: ESTHINGTON,
    short_description: 'Real estate practice project with property listings, search filters, detailed property pages, and a clean responsive UI.',
    stack: ['React JS', 'Tailwind CSS'],
    features: ['Property Listings', 'Search Filters', 'Property Details', 'Responsive Design', 'User Interface'],
    category: [CAT.WEBSITE],
    createdAt: 'April 2024',
  },
];

export const CATEGORIES = [
  { label: 'All',        value: 'All'          },
  { label: 'Full Stack', value: CAT.FULL_STACK },
  { label: 'Frontend',   value: CAT.FRONTEND   },
  { label: 'Websites',   value: CAT.WEBSITE    },
  { label: 'Live',       value: CAT.LIVE       },
];
