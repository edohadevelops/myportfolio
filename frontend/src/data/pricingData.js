export const CURRENCY = {
  USD: { symbol: '$', code: 'USD', rate: 1 },
  NGN: { symbol: '₦', code: 'NGN', rate: 1600 },
};

export const PROJECT_TYPES = [
  {
    id: 'portfolio',
    name: 'Portfolio / Personal Brand',
    description: 'Showcase your work, skills, and personality online.',
    icon: '🎨',
    basePrice: 150,
    includes: [
      'Work / Projects showcase section',
      'About & skills section',
      'Basic contact section',
      'Social media links',
      'Fully responsive design',
    ],
    timelineOptions: [
      { label: 'No timeline preference', value: 'none' },
      { label: '1 – 2 weeks', value: '1-2w' },
      { label: '2 – 3 weeks', value: '2-3w' },
      { label: '3 – 5 weeks', value: '3-5w' },
    ],
  },
  {
    id: 'landing',
    name: 'Business Landing Page',
    description: 'A single high-converting page for your business or product.',
    icon: '🚀',
    basePrice: 200,
    includes: [
      'Hero / banner section',
      'Services / offerings section',
      'Basic contact section',
      'Social media links',
      'Fully responsive design',
    ],
    timelineOptions: [
      { label: 'No timeline preference', value: 'none' },
      { label: '1 – 2 weeks', value: '1-2w' },
      { label: '2 – 3 weeks', value: '2-3w' },
      { label: '3 – 5 weeks', value: '3-5w' },
    ],
  },
  {
    id: 'website',
    name: 'Full Website (Multi-page)',
    description: 'A complete multi-page website for your business.',
    icon: '🌐',
    basePrice: 300,
    includes: [
      'Up to 5 pages (Home, About, Services, Contact + 1 custom)',
      'Navigation & footer',
      'Basic contact section',
      'Social media links',
      'Fully responsive design',
    ],
    timelineOptions: [
      { label: 'No timeline preference', value: 'none' },
      { label: '2 – 3 weeks', value: '2-3w' },
      { label: '3 – 5 weeks', value: '3-5w' },
      { label: '5 – 6 weeks', value: '5-6w' },
    ],
  },
  {
    id: 'webapp',
    name: 'Web Application',
    description: 'A fully functional app with user accounts, dashboards, and custom logic.',
    icon: '⚙️',
    basePrice: 400,
    includes: [
      'App shell and routing',
      'Fully responsive design',
      'Error handling',
      'Deployment ready',
    ],
    timelineOptions: [
      { label: 'No timeline preference', value: 'none' },
      { label: '2 months+', value: '2mo+' },
      { label: '3 months+', value: '3mo+' },
      { label: 'Custom timeline', value: 'custom' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    description: 'A full online store where customers can browse, cart, and purchase.',
    icon: '🛒',
    basePrice: 600,
    includes: [
      'Product catalogue & listings',
      'Shopping cart',
      'Basic checkout flow',
      'Fully responsive design',
    ],
    timelineOptions: [
      { label: 'No timeline preference', value: 'none' },
      { label: '1 month+', value: '1mo+' },
      { label: '2 months+', value: '2mo+' },
      { label: 'Custom timeline', value: 'custom' },
    ],
  },
];

export const FEATURES_BY_TYPE = {
  portfolio: [
    { id: 'f-port-1', name: 'Contact Form with Email Notifications', price: 20, description: 'A working contact form that sends messages directly to your inbox.' },
    { id: 'f-port-2', name: 'Blog / Articles Section', price: 50, description: 'Write and publish articles or blog posts directly on your site.' },
    { id: 'f-port-3', name: 'Testimonials Section', price: 20, description: 'Showcase client or colleague reviews on your portfolio.' },
    { id: 'f-port-4', name: 'Downloadable CV / Resume', price: 15, description: 'Visitors can download your CV directly from your portfolio.' },
    { id: 'f-port-5', name: 'Newsletter Signup', price: 25, description: 'Collect email addresses from visitors who want to follow your work.' },
    { id: 'f-port-6', name: 'SEO Optimisation', price: 35, description: 'Structured metadata, sitemaps, and optimisation so you rank on Google.' },
    { id: 'f-port-7', name: 'Analytics Integration', price: 20, description: 'Track who visits your portfolio, where they come from, and what they look at.' },
    { id: 'f-port-8', name: 'Dark / Light Mode Toggle', price: 25, description: 'Let visitors switch between a light and dark version of your site.' },
    { id: 'f-port-9', name: 'Custom Domain Setup', price: 30, description: 'Connect your portfolio to a custom domain (e.g. yourname.com).' },
  ],
  landing: [
    { id: 'f-land-1', name: 'Contact Form with Email Notifications', price: 20, description: 'A working contact form that sends enquiries directly to your inbox.' },
    { id: 'f-land-2', name: 'Photo / Media Gallery', price: 30, description: 'Showcase photos, videos, or work samples in a clean gallery.' },
    { id: 'f-land-3', name: 'Testimonials / Reviews Section', price: 20, description: 'Display customer reviews to build trust with new visitors.' },
    { id: 'f-land-4', name: 'FAQ Section', price: 15, description: 'Answer common questions to reduce friction for potential customers.' },
    { id: 'f-land-5', name: 'Newsletter Signup', price: 25, description: 'Collect email addresses to build your audience.' },
    { id: 'f-land-6', name: 'Promotional Banner / Countdown Timer', price: 25, description: 'Highlight a special offer or upcoming launch with a countdown.' },
    { id: 'f-land-7', name: 'Google Maps Integration', price: 20, description: 'Show your business location directly on your page.' },
    { id: 'f-land-8', name: 'WhatsApp Chat Button', price: 15, description: 'Let visitors message you on WhatsApp directly from your site.' },
    { id: 'f-land-9', name: 'Live Chat Widget', price: 30, description: 'Real-time chat so visitors can ask questions as they browse.' },
    { id: 'f-land-10', name: 'SEO Optimisation', price: 35, description: 'Structured metadata, sitemaps, and optimisation so you rank on Google.' },
    { id: 'f-land-11', name: 'Analytics Integration', price: 20, description: 'Track visitors, traffic sources, and page engagement.' },
    { id: 'f-land-12', name: 'Booking / Scheduling System', price: 70, description: 'Let customers book appointments or schedule calls directly on your page.' },
  ],
  website: [
    { id: 'f-web-1', name: 'Contact Form with Email Notifications', price: 20, description: 'A working contact form that sends messages directly to your inbox.' },
    { id: 'f-web-2', name: 'Blog / News Section', price: 50, description: 'Publish articles, news updates, or announcements on your site.' },
    { id: 'f-web-3', name: 'Photo / Media Gallery', price: 30, description: 'Showcase images, videos, or portfolio work in a gallery.' },
    { id: 'f-web-4', name: 'Video Gallery', price: 35, description: 'A dedicated section to embed or host videos.' },
    { id: 'f-web-5', name: 'Testimonials / Reviews', price: 20, description: 'Display client or customer reviews throughout your site.' },
    { id: 'f-web-6', name: 'Team / Staff Page', price: 25, description: 'Introduce your team with photos, names, and roles.' },
    { id: 'f-web-7', name: 'FAQ Section', price: 15, description: 'Answer common questions your customers typically ask.' },
    { id: 'f-web-8', name: 'Newsletter Signup', price: 25, description: 'Collect email addresses to grow your audience.' },
    { id: 'f-web-9', name: 'Booking / Scheduling System', price: 70, description: 'Let customers book appointments or reserve slots online.' },
    { id: 'f-web-10', name: 'Events Calendar', price: 50, description: 'Publish and manage upcoming events on your site.' },
    { id: 'f-web-11', name: 'Google Maps Integration', price: 20, description: 'Show your location on an interactive map.' },
    { id: 'f-web-12', name: 'WhatsApp Chat Button', price: 15, description: 'Let visitors message you on WhatsApp with one tap.' },
    { id: 'f-web-13', name: 'Search Functionality', price: 30, description: 'Let visitors search through your content easily.' },
    { id: 'f-web-14', name: 'Multi-language Support', price: 50, description: 'Serve your content in multiple languages for international audiences.' },
    { id: 'f-web-15', name: 'SEO Optimisation', price: 35, description: 'Full SEO setup so your site ranks on Google.' },
    { id: 'f-web-16', name: 'Analytics Integration', price: 20, description: 'Track visitors, traffic, and engagement across all pages.' },
    { id: 'f-web-17', name: 'Dark / Light Mode Toggle', price: 25, description: 'Give visitors the option to switch between light and dark themes.' },
  ],
  webapp: [
    { id: 'f-app-1', name: 'User Authentication (Login / Register)', price: 50, description: 'Secure sign up and login system with password hashing and session management.' },
    { id: 'f-app-2', name: 'Admin Dashboard', price: 80, description: 'A separate dashboard for you to manage users, content, and app data.' },
    { id: 'f-app-3', name: 'User Roles & Permissions', price: 60, description: 'Different access levels for different types of users (e.g. admin, staff, client).' },
    { id: 'f-app-4', name: 'Payment Integration (Paystack / Stripe)', price: 70, description: 'Accept payments securely within your application.' },
    { id: 'f-app-5', name: 'Real-Time Features (Chat / Notifications)', price: 80, description: 'Live messaging or instant notifications using WebSockets.' },
    { id: 'f-app-6', name: 'File Upload System', price: 30, description: 'Let users upload images, documents, or other files within the app.' },
    { id: 'f-app-7', name: 'Email Notifications', price: 25, description: 'Automated emails for key events like signups, confirmations, and alerts.' },
    { id: 'f-app-8', name: 'Search Functionality', price: 30, description: 'Search across users, content, or records within the app.' },
    { id: 'f-app-9', name: 'Third-party API Integration', price: 40, description: 'Connect your app to external services like Google, Twilio, or any REST API.' },
    { id: 'f-app-10', name: 'Booking / Scheduling System', price: 70, description: 'Allow users to book appointments, reserve slots, or schedule events.' },
    { id: 'f-app-11', name: 'Data Export (PDF / CSV)', price: 35, description: 'Let users or admins export data as PDF or CSV files.' },
    { id: 'f-app-12', name: 'Analytics Dashboard', price: 50, description: 'Visual charts and stats showing key metrics for your app.' },
    { id: 'f-app-13', name: 'Custom Email Templates', price: 25, description: 'Branded, well-designed email templates for all automated communications.' },
    { id: 'f-app-14', name: 'Multi-language Support', price: 50, description: 'Support multiple languages for an international user base.' },
    { id: 'f-app-15', name: 'Progressive Web App (PWA)', price: 60, description: 'Make your web app installable on mobile like a native app.' },
    { id: 'f-app-16', name: 'Two-Factor Authentication', price: 40, description: 'Extra security layer requiring users to verify their identity via email or SMS.' },
    { id: 'f-app-17', name: 'Subscription / Membership System', price: 80, description: 'Recurring billing and gated content for paying members.' },
    { id: 'f-app-18', name: 'Activity Log / Audit Trail', price: 40, description: 'Track and display a history of user or admin actions within the app.' },
  ],
  ecommerce: [
    { id: 'f-eco-1', name: 'Payment Integration (Paystack / Stripe)', price: 70, description: 'Secure payment processing so customers can pay online.' },
    { id: 'f-eco-2', name: 'User Authentication', price: 50, description: 'Customer accounts so shoppers can log in, track orders, and save details.' },
    { id: 'f-eco-3', name: 'Order Tracking System', price: 50, description: 'Let customers see the status of their orders in real time.' },
    { id: 'f-eco-4', name: 'Admin Dashboard', price: 80, description: 'Manage products, orders, customers, and revenue from one place.' },
    { id: 'f-eco-5', name: 'Inventory Management', price: 60, description: 'Track stock levels and get alerts when products run low.' },
    { id: 'f-eco-6', name: 'Discount Codes & Promotions', price: 40, description: 'Create and manage coupon codes and promotional offers.' },
    { id: 'f-eco-7', name: 'Product Search & Filters', price: 40, description: 'Let shoppers search and filter by category, price, and other attributes.' },
    { id: 'f-eco-8', name: 'Wishlist / Save for Later', price: 30, description: 'Allow customers to save products they want to buy later.' },
    { id: 'f-eco-9', name: 'Product Reviews & Ratings', price: 35, description: 'Let customers leave reviews and ratings on products.' },
    { id: 'f-eco-10', name: 'Email Order Confirmations', price: 25, description: 'Automated confirmation emails sent to customers after purchase.' },
    { id: 'f-eco-11', name: 'Returns / Refund Request System', price: 40, description: 'A structured process for customers to request returns or refunds.' },
    { id: 'f-eco-12', name: 'Multi-currency Support', price: 50, description: 'Accept payments in multiple currencies for international customers.' },
    { id: 'f-eco-13', name: 'SEO Optimisation', price: 35, description: 'Optimise product pages and store for search engine visibility.' },
    { id: 'f-eco-14', name: 'Analytics Integration', price: 20, description: 'Track sales, traffic, conversion rates, and customer behaviour.' },
    { id: 'f-eco-15', name: 'Social Media Shop Integration', price: 40, description: 'Connect your store to Instagram or Facebook Shopping.' },
    { id: 'f-eco-16', name: 'Abandoned Cart Recovery Email', price: 35, description: 'Automatically email customers who left items in their cart.' },
    { id: 'f-eco-17', name: 'Multi-language Support', price: 50, description: 'Serve international customers in their own language.' },
  ],
};

export const ADDONS = [
  { id: 'ao-1', name: 'Rush Delivery (under 1 week)', price: 0, isPercentage: true, percentage: 25, description: 'Need it fast? Rush delivery adds 25% to the total price.' },
  { id: 'ao-2', name: 'Extra Revision Round', price: 20, isPercentage: false, description: 'Standard package includes 2 revision rounds. Add more as needed.' },
  { id: 'ao-3', name: 'Hosting Setup & Deployment', price: 30, isPercentage: false, description: 'I will deploy your project to a live hosting platform and configure the domain.' },
  { id: 'ao-4', name: '1 Month Post-Launch Support', price: 40, isPercentage: false, description: 'Bug fixes and small tweaks for one month after launch.' },
  { id: 'ao-5', name: '3 Months Post-Launch Support', price: 90, isPercentage: false, description: 'Extended support for three months after launch.' },
];

export const DISCOUNT_THRESHOLD = 5;
export const DISCOUNT_PERCENTAGE = 10;

export const calculateTotal = (projectType, selectedFeatures, selectedAddons, currency = 'USD') => {
  if (!projectType) return { subtotal: 0, featuresTotal: 0, addonsTotal: 0, discount: 0, total: 0 };

  const base = projectType.basePrice;
  const featuresTotal = selectedFeatures.reduce((sum, f) => sum + f.price, 0);

  const discount = selectedFeatures.length >= DISCOUNT_THRESHOLD
    ? Math.round(featuresTotal * DISCOUNT_PERCENTAGE / 100)
    : 0;

  const discountedFeatures = featuresTotal - discount;

  const rushAddon = selectedAddons.find(a => a.isPercentage);
  const flatAddons = selectedAddons.filter(a => !a.isPercentage);
  const flatAddonsTotal = flatAddons.reduce((sum, a) => sum + a.price, 0);
  const rushAmount = rushAddon ? Math.round((base + discountedFeatures + flatAddonsTotal) * rushAddon.percentage / 100) : 0;
  const addonsTotal = flatAddonsTotal + rushAmount;

  const total = base + discountedFeatures + addonsTotal;
  const rate = CURRENCY[currency].rate;

  return {
    base: Math.round(base * rate),
    featuresTotal: Math.round(featuresTotal * rate),
    discount: Math.round(discount * rate),
    discountedFeatures: Math.round(discountedFeatures * rate),
    addonsTotal: Math.round(addonsTotal * rate),
    rushAmount: Math.round(rushAmount * rate),
    total: Math.round(total * rate),
  };
};
