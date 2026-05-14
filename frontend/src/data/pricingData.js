export const CURRENCY = {
  USD: { symbol: '$', code: 'USD', rate: 1 },
  NGN: { symbol: '₦', code: 'NGN', rate: 1600 },
};

// surchargePercent applies to (base + features) subtotal
export const PROJECT_TYPES = [
  {
    id: 'portfolio',
    name: 'Portfolio / Personal Brand',
    description: 'Show the world what you do — your work, your skills, and your story, all in one place.',
    icon: '🎨',
    basePrice: 150,
    includes: [
      'Work and projects showcase',
      'About you and skills sections',
      'Contact form and social links',
      'Downloadable CV option',
      'Fully responsive on all devices',
    ],
    timelineOptions: [
      { label: 'Standard — 3 to 5 weeks', value: 'standard', surchargePercent: 0 },
      { label: 'Faster — 1 to 2 weeks',   value: 'fast',     surchargePercent: 20 },
      { label: 'Rush — under 1 week',      value: 'rush',     surchargePercent: 40 },
    ],
  },
  {
    id: 'landing',
    name: 'Business Landing Page',
    description: 'One powerful page that tells people who you are, what you do, and how to reach you.',
    icon: '🚀',
    basePrice: 200,
    includes: [
      'Eye-catching hero and services section',
      'Contact form and WhatsApp button',
      'Social media links and Google Maps',
      'Fully responsive on all devices',
    ],
    timelineOptions: [
      { label: 'Standard — 2 to 3 weeks', value: 'standard', surchargePercent: 0 },
      { label: 'Faster — 1 to 2 weeks',   value: 'fast',     surchargePercent: 20 },
      { label: 'Rush — under 1 week',      value: 'rush',     surchargePercent: 35 },
    ],
  },
  {
    id: 'website',
    name: 'Full Website',
    description: 'A complete multi-page website for businesses that need more room to grow.',
    icon: '🌐',
    basePrice: 300,
    includes: [
      'Up to 5 pages including Home, About, Services, and Contact',
      'Navigation, footer, and WhatsApp button',
      'Contact form with email delivery',
      'Social media links',
      'Fully responsive on all devices',
    ],
    timelineOptions: [
      { label: 'Standard — 3 to 5 weeks', value: 'standard', surchargePercent: 0 },
      { label: 'Faster — 2 to 3 weeks',   value: 'fast',     surchargePercent: 20 },
      { label: 'Rush — under 2 weeks',     value: 'rush',     surchargePercent: 40 },
    ],
  },
  {
    id: 'webapp',
    name: 'Web Application',
    description: 'A fully functional app with user accounts, dashboards, and custom logic built around your idea.',
    icon: '⚙️',
    basePrice: 400,
    includes: [
      'App shell and page routing',
      'Error handling and loading states',
      'Fully responsive on all devices',
      'Ready to deploy',
    ],
    timelineOptions: [
      { label: 'Standard — 2 to 3 months', value: 'standard', surchargePercent: 0 },
      { label: 'Faster — 6 to 8 weeks',    value: 'fast',     surchargePercent: 25 },
      { label: 'Rush — 4 to 5 weeks',       value: 'rush',     surchargePercent: 50 },
    ],
  },
  {
    id: 'ecommerce',
    name: 'Online Store',
    description: 'A proper e-commerce store where customers can browse, add to cart, and pay without leaving your site.',
    icon: '🛒',
    basePrice: 600,
    includes: [
      'Product listings and categories',
      'Shopping cart and checkout flow',
      'WhatsApp button and social links',
      'Fully responsive on all devices',
    ],
    timelineOptions: [
      { label: 'Standard — 6 to 8 weeks', value: 'standard', surchargePercent: 0 },
      { label: 'Faster — 4 to 5 weeks',   value: 'fast',     surchargePercent: 25 },
      { label: 'Rush — 2 to 3 weeks',      value: 'rush',     surchargePercent: 50 },
    ],
  },
];

export const FEATURES_BY_TYPE = {
  portfolio: [
    { id: 'f-port-1', name: 'Contact Form with Email Delivery', price: 20, description: 'A working contact form that sends messages straight to your inbox.' },
    { id: 'f-port-2', name: 'Blog or Articles Section', price: 50, description: 'Write and publish case studies, updates, or thoughts directly on your site.' },
    { id: 'f-port-3', name: 'Testimonials Section', price: 20, description: 'Let happy clients or colleagues speak for you with a dedicated reviews section.' },
    { id: 'f-port-4', name: 'Newsletter Signup', price: 25, description: 'Collect emails from people who want to follow your work.' },
    { id: 'f-port-5', name: 'SEO Setup', price: 35, description: 'Metadata, sitemaps, and page optimisation so you actually show up on Google.' },
    { id: 'f-port-6', name: 'Analytics Integration', price: 20, description: 'See who visits your portfolio, where they come from, and what they click on.' },
    { id: 'f-port-7', name: 'Dark and Light Mode', price: 25, description: 'Give visitors a toggle to switch between a dark and light version of your site.' },
    { id: 'f-port-8', name: 'Custom Domain Setup', price: 30, description: 'Get your site live on a real custom domain like yourname.com.' },
  ],
  landing: [
    { id: 'f-land-1', name: 'Photo Gallery', price: 30, description: 'Show off your work, products, or space with a clean scrollable gallery.' },
    { id: 'f-land-2', name: 'Testimonials or Reviews', price: 20, description: 'Build trust with new visitors by featuring what happy customers say.' },
    { id: 'f-land-3', name: 'FAQ Section', price: 20, description: 'Answer the questions people ask most so visitors feel confident reaching out.' },
    { id: 'f-land-4', name: 'Newsletter Signup', price: 25, description: 'Capture emails from interested visitors so you can reach them later.' },
    { id: 'f-land-5', name: 'Countdown Timer or Promo Banner', price: 25, description: 'Highlight a special offer or launch with a banner or live countdown.' },
    { id: 'f-land-6', name: 'Live Chat Widget', price: 30, description: 'Let visitors ask questions in real time while they browse your page.' },
    { id: 'f-land-7', name: 'Booking System', price: 70, description: 'Let customers book appointments or schedule calls directly from your page.' },
    { id: 'f-land-8', name: 'SEO Setup', price: 35, description: 'Full SEO configuration so your page ranks when people search for what you offer.' },
    { id: 'f-land-9', name: 'Analytics Integration', price: 20, description: 'Track visitors, traffic sources, and how people interact with your page.' },
  ],
  website: [
    { id: 'f-web-1',  name: 'Blog or News Section', price: 50, description: 'Publish articles, updates, or announcements to keep your site fresh.' },
    { id: 'f-web-2',  name: 'Photo or Video Gallery', price: 30, description: 'A gallery to showcase your work, space, team, or products.' },
    { id: 'f-web-3',  name: 'Testimonials or Reviews', price: 20, description: 'Display customer feedback across your site to build credibility.' },
    { id: 'f-web-4',  name: 'Team Page', price: 25, description: 'Introduce the people behind your business with photos and roles.' },
    { id: 'f-web-5',  name: 'FAQ Section', price: 20, description: 'A dedicated section for your most common questions.' },
    { id: 'f-web-6',  name: 'Newsletter Signup', price: 25, description: 'Grow your audience by collecting emails from interested visitors.' },
    { id: 'f-web-7',  name: 'Booking System', price: 70, description: 'Let customers book appointments or reserve slots online.' },
    { id: 'f-web-8',  name: 'Events Calendar', price: 50, description: 'Publish and manage upcoming events so visitors know what\'s on.' },
    { id: 'f-web-9',  name: 'Search Functionality', price: 30, description: 'Let visitors quickly find what they\'re looking for across your content.' },
    { id: 'f-web-10', name: 'Multi-language Support', price: 50, description: 'Serve your content in multiple languages for international visitors.' },
    { id: 'f-web-11', name: 'SEO Setup', price: 35, description: 'Full SEO setup across all pages so your site ranks on Google.' },
    { id: 'f-web-12', name: 'Analytics Integration', price: 20, description: 'Track traffic, visitor behaviour, and engagement across your whole site.' },
    { id: 'f-web-13', name: 'Dark and Light Mode', price: 25, description: 'Give visitors the option to switch themes based on their preference.' },
    { id: 'f-web-14', name: 'Database Integration', price: 60, description: 'Add a backend database to power dynamic content, form submissions, or user data — using MySQL, PostgreSQL, or MongoDB.' },
    { id: 'f-web-15', name: 'Custom Backend API', price: 80, description: 'A server-side API for sites that need more than static pages — dynamic content, external integrations, and real-time updates.' },
  ],
  webapp: [
    { id: 'f-app-1',  name: 'User Accounts', price: 50, description: 'Secure sign-up and login with password protection and session management.' },
    { id: 'f-app-2',  name: 'Admin Dashboard', price: 80, description: 'A private area where you manage users, content, and everything in your app.' },
    { id: 'f-app-3',  name: 'User Roles and Permissions', price: 60, description: 'Different access levels for different users — admin, staff, client, and more.' },
    { id: 'f-app-4',  name: 'Payment Integration', price: 70, description: 'Accept payments securely via Paystack or Stripe.' },
    { id: 'f-app-5',  name: 'Real-Time Chat or Notifications', price: 80, description: 'Live messaging or instant in-app notifications so users stay in the loop.' },
    { id: 'f-app-6',  name: 'File Uploads', price: 30, description: 'Let users upload images, documents, or other files inside the app.' },
    { id: 'f-app-7',  name: 'Email Notifications', price: 25, description: 'Automated emails for signups, confirmations, alerts, and key events.' },
    { id: 'f-app-8',  name: 'Search Functionality', price: 30, description: 'Search across users, records, or content inside the app.' },
    { id: 'f-app-9',  name: 'Third-Party API Integration', price: 40, description: 'Connect your app to external services like Google, Twilio, or any REST API.' },
    { id: 'f-app-10', name: 'Booking or Scheduling System', price: 70, description: 'Let users book time slots, appointments, or events inside your app.' },
    { id: 'f-app-11', name: 'Data Export', price: 35, description: 'Let users or admins download reports and records as PDFs or CSV files.' },
    { id: 'f-app-12', name: 'Analytics Dashboard', price: 50, description: 'Visual charts and key metrics so you always know what\'s happening in your app.' },
    { id: 'f-app-13', name: 'Two-Factor Authentication', price: 40, description: 'Extra security — users verify their identity via email or SMS before getting in.' },
    { id: 'f-app-14', name: 'Subscriptions or Memberships', price: 80, description: 'Recurring billing and gated content for paying members.' },
    { id: 'f-app-15', name: 'Installable Mobile App (PWA)', price: 60, description: 'Make your web app installable on a phone like a native app, no App Store needed.' },
    { id: 'f-app-16', name: 'SQL Database', price: 60, description: 'A structured relational database (MySQL or PostgreSQL) to store and manage your app\'s data reliably. Most apps need this.' },
    { id: 'f-app-17', name: 'NoSQL Database (MongoDB)', price: 60, description: 'A flexible document database suited to apps with varied or rapidly changing data structures.' },
    { id: 'f-app-18', name: 'Custom Backend API', price: 100, description: 'A dedicated server-side API to handle your app\'s business logic, data processing, and third-party integrations.' },
    { id: 'f-app-19', name: 'Cloud File Storage', price: 40, description: 'Store and serve user-uploaded files via cloud storage (AWS S3 or Cloudinary) so uploads stay fast and reliable.' },
  ],
  ecommerce: [
    { id: 'f-eco-1',  name: 'Payment Integration', price: 70, description: 'Accept orders and payments securely via Paystack or Stripe.' },
    { id: 'f-eco-2',  name: 'Customer Accounts', price: 50, description: 'Shoppers can create accounts, track orders, and save their details.' },
    { id: 'f-eco-3',  name: 'Order Tracking', price: 50, description: 'Let customers see the status of their orders in real time.' },
    { id: 'f-eco-4',  name: 'Admin Dashboard', price: 80, description: 'Manage products, orders, customers, and revenue from one place.' },
    { id: 'f-eco-5',  name: 'Inventory Management', price: 60, description: 'Track stock levels and get alerted when things are running low.' },
    { id: 'f-eco-6',  name: 'Discount Codes and Promotions', price: 40, description: 'Create coupon codes and offers to drive sales.' },
    { id: 'f-eco-7',  name: 'Product Search and Filters', price: 40, description: 'Help shoppers find exactly what they want by category, price, or other filters.' },
    { id: 'f-eco-8',  name: 'Wishlist', price: 30, description: 'Let customers save products they want to come back and buy later.' },
    { id: 'f-eco-9',  name: 'Product Reviews and Ratings', price: 35, description: 'Shoppers can leave reviews, which builds trust for new buyers.' },
    { id: 'f-eco-10', name: 'Order Confirmation Emails', price: 25, description: 'Automatic emails sent to customers the moment they complete a purchase.' },
    { id: 'f-eco-11', name: 'Returns and Refund Requests', price: 40, description: 'A proper flow for customers to request returns or refunds.' },
    { id: 'f-eco-12', name: 'Multi-Currency Support', price: 50, description: 'Accept payments in different currencies for international shoppers.' },
    { id: 'f-eco-13', name: 'SEO Setup', price: 35, description: 'Optimise product pages and your store so people find you on Google.' },
    { id: 'f-eco-14', name: 'Abandoned Cart Emails', price: 35, description: 'Automatically follow up with customers who left items in their cart.' },
    { id: 'f-eco-15', name: 'SQL Database', price: 60, description: 'A structured relational database (MySQL or PostgreSQL) to store products, orders, and customer records reliably.' },
    { id: 'f-eco-16', name: 'Custom Backend API', price: 100, description: 'A dedicated server-side API to power your store\'s data, business logic, and third-party integrations.' },
    { id: 'f-eco-17', name: 'Cloud File Storage', price: 40, description: 'Store and serve product images and uploads via cloud storage so your store loads fast everywhere.' },
  ],
};

export const ADDONS = [
  // ── Revision and Support ──
  { id: 'ao-1', name: 'Extra Revision Round', price: 20, description: 'Every project comes with 2 revision rounds. Add more if you want extra flexibility.' },
  { id: 'ao-2', name: '1 Month Support After Launch', price: 40, description: 'Bug fixes and small tweaks for a full month after your site goes live.' },
  { id: 'ao-3', name: '3 Months Support After Launch', price: 90, description: 'Three months of peace of mind — fixes, tweaks, and guidance long after launch.' },

  // ── Hosting ──
  { id: 'ao-host-1', name: 'Static Hosting Setup (Netlify / Vercel)', price: 20, description: 'Free hosting for static sites and frontend-only apps. I\'ll set it up, configure the build, and connect your domain. Great for portfolios and landing pages.' },
  { id: 'ao-host-2', name: 'Shared Hosting Setup', price: 45, description: 'Traditional cPanel-style hosting — solid for small business sites. You pay the provider directly (~$3–10/mo). I handle the setup, file transfer, and DNS.' },
  { id: 'ao-host-3', name: 'VPS Server Setup', price: 80, description: 'A Virtual Private Server (DigitalOcean, Linode, etc.) for apps that need a real backend. You pay the server cost (~$6–20/mo). I set up the environment, deploy the app, and secure the server.' },
  { id: 'ao-host-4', name: 'Cloud Hosting Setup (AWS / GCP)', price: 130, description: 'Enterprise-grade cloud infrastructure for high-traffic or scalable apps. Best for production web apps. You pay usage-based cloud costs. I architect, deploy, and configure the environment.' },

  // ── Domain and Email ──
  { id: 'ao-domain-1', name: 'Domain Registration (.com / .net / .org)', price: 25, description: 'I\'ll register your domain name, configure DNS records, and point everything to your hosting. You pay the yearly renewal fee (~$10–15/yr) directly to the registrar.' },
  { id: 'ao-domain-2', name: 'Professional Email Address', price: 30, description: 'A branded email like hello@yourbusiness.com using Google Workspace or Zoho. You pay the provider fee (from ~$6/mo). I handle the setup and DNS configuration.' },
];

export const DISCOUNT_THRESHOLD = 5;
export const DISCOUNT_PERCENTAGE = 10;

export const calculateTotal = (projectType, selectedFeatures, selectedAddons, timeline = 'standard', currency = 'USD') => {
  if (!projectType) return {
    base: 0, featuresTotal: 0, discount: 0, discountedFeatures: 0,
    timelineSurcharge: 0, timelineSurchargePercent: 0, addonsTotal: 0, total: 0,
  };

  const base = projectType.basePrice;
  const featuresTotal = selectedFeatures.reduce((sum, f) => sum + f.price, 0);

  const discount = selectedFeatures.length >= DISCOUNT_THRESHOLD
    ? Math.round(featuresTotal * DISCOUNT_PERCENTAGE / 100)
    : 0;
  const discountedFeatures = featuresTotal - discount;

  const timelineOpt = projectType.timelineOptions?.find(t => t.value === timeline);
  const timelineSurchargePercent = timelineOpt?.surchargePercent || 0;
  const timelineSurcharge = timelineSurchargePercent > 0
    ? Math.round((base + discountedFeatures) * timelineSurchargePercent / 100)
    : 0;

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = base + discountedFeatures + timelineSurcharge + addonsTotal;
  const rate = CURRENCY[currency].rate;

  return {
    base:                    Math.round(base * rate),
    featuresTotal:           Math.round(featuresTotal * rate),
    discount:                Math.round(discount * rate),
    discountedFeatures:      Math.round(discountedFeatures * rate),
    timelineSurcharge:       Math.round(timelineSurcharge * rate),
    timelineSurchargePercent,
    addonsTotal:             Math.round(addonsTotal * rate),
    total:                   Math.round(total * rate),
  };
};
