import FundRise from '../../../assets/projects/fundrise/FundriseMain.png'
import FundRiseLOGIN from '../../../assets/projects/fundrise/FundriseLogin.png'
import FundRiseDonate from '../../../assets/projects/fundrise/FundriseMakeDonation.png'
import FundRiseCreate from '../../../assets/projects/fundrise/FundriseCreateCampaign.png'
import FundRiseProfile from '../../../assets/projects/fundrise/FundriseMyProfile.png'
import FundRisePaystack from '../../../assets/projects/fundrise/FundrisePaystack.png'
import FundRiseVerify from '../../../assets/projects/fundrise/FundriseVerify.png'
import FundRiseFollow from '../../../assets/projects/fundrise/FundriseFollow.png'
import FundRiseEmail from '../../../assets/projects/fundrise/FundRiseReciept.png'
import FundRiseHistory from '../../../assets/projects/fundrise/FundriseDonationHistory.png'
import FundRiseRegister from '../../../assets/projects/fundrise/FundRiseRegister.png'
import FundRiseOnboarding from '../../../assets/projects/fundrise/FundriseOnboarding.png'
import FundRiseView from '../../../assets/projects/fundrise/FundriseViewCampaign.png'
import FundRiseModal from '../../../assets/projects/fundrise/FundriseMainModal.png'
import QPlus from '../../../assets/projects/QPlusMain.png'
import CHATAPP from '../../../assets/projects/SchoolChatLogin.png'
import ECCOMERCE from '../../../assets/projects/EcommerceMain.png'
import PROJECTHIVE from '../../../assets/projects/ProjectHiveMain.png'
import MOVIEBASE from '../../../assets/projects/MovieBaseLanding.png'
import IDICE from '../../../assets/projects/idiceLanding.png'
import COVENANT from '../../../assets/projects/CovenantUniMain.png'
import ESTHINGTON from '../../../assets/projects/EstingtonMain.png'

const PROJECTS = [
    {
      project_id: 1,
      title: "FundRise",
      short_description: "A Crowdfunding Web App where users can create campaigns, set fundraising targets, and receive donations.",
      long_description: "FundRise is a crowdfunding platform designed to empower users to launch impactful campaigns. It provides features like user authentication, campaign creation, secure donation handling, and social features such as following and liking campaigns. The app integrates Paystack for payments and Nodemailer for automated email notifications, ensuring a secure and engaging user experience.",
      stack: [
        { 
          stack_id: 1, 
          name: "React JS", 
          description: "Using React to build FundRise taught me the importance of component-based architecture and state management. Developing reusable components and handling dynamic data across the UI pushed me to master structuring large-scale applications efficiently." 
        },
        { 
          stack_id: 2, 
          name: "Node.js (Express)", 
          description: "Building the backend with Node.js and Express helped me understand middleware, routing, and designing scalable RESTful APIs. I learned to optimize performance while balancing flexibility and security." 
        },
        { 
          stack_id: 3, 
          name: "MySQL (Sequelize)", 
          description: "Using Sequelize with MySQL deepened my understanding of relational databases and how to model complex data relationships. Debugging query issues taught me the importance of database indexing and optimization." 
        },
        { 
          stack_id: 4, 
          name: "Redux", 
          description: "Managing state with Redux highlighted the power of centralized state management in complex apps. I overcame challenges related to state normalization and asynchronous updates, enhancing my ability to structure scalable state logic." 
        },
        { 
          stack_id: 5, 
          name: "Socket.IO", 
          description: "Implementing real-time features with Socket.IO taught me the intricacies of WebSocket connections. Debugging and handling concurrency issues enhanced my skills in building reliable, interactive applications." 
        },
        { 
          stack_id: 6, 
          name: "JWT (JSON Web Token)", 
          description: "Integrating JWT for authentication strengthened my understanding of token-based security. I overcame challenges in token lifecycle management and role-based access control, ensuring secure user experiences." 
        },
        { 
          stack_id: 7, 
          name: "Multer", 
          description: "Learning to manage file uploads with Multer taught me the importance of secure file handling and validation. Implementing this feature improved my understanding of backend file storage solutions." 
        },
        { 
          stack_id: 8, 
          name: "Nodemailer", 
          description: "Implementing email notifications with Nodemailer taught me the importance of ensuring reliable email delivery. Debugging issues like provider configurations improved my ability to handle third-party integrations." 
        },
        { 
          stack_id: 9, 
          name: "Date-fns", 
          description: "Using Date-fns for date manipulation helped me appreciate the importance of precise date handling in deadline-driven applications. It also taught me how to keep utilities lightweight and efficient." 
        }
      ],
      category: ["Web Application", "Personal Projects"],
      features: [
        { 
          feature_id: 123, 
          name: "User Registration", 
          description: "Users can register a new account on the system by filling out and submitting an intuitive registration form. The form is designed to be user-friendly, with a clean, minimal interface that prevents users from feeling overwhelmed by lengthy fields. Validation is performed both on the frontend and backend to ensure data accuracy, improving the overall user experience and security." 
        },
        { 
          feature_id: 1, 
          name: "User Authentication", 
          description: "This feature enables secure user login and registration, leveraging JSON Web Tokens (JWT) for authentication and bcrypt for password hashing. These technologies ensure that user credentials are securely stored and transmitted. The frontend adjusts dynamically based on the user's authentication state, allowing for personalized content such as user details and campaigns. This feature also ensures proper user identification, facilitating secure and user-specific server-side actions." 
        },
        { 
          feature_id: 134, 
          name: "Onboarding", 
          description: "After a user registers for the first time, the system automatically checks if the user has completed the onboarding process. If not, the user is guided through a series of steps to update necessary details, with an engaging step-by-step interface. The onboarding process is designed to prevent users from feeling fatigued, using a progressive flow to keep the experience light and user-friendly." 
        },
        { 
          feature_id: 2, 
          name: "Create Campaigns", 
          description: "Users can easily create campaigns by providing a title, description, and fundraising target. The creation process uses React forms with controlled components, ensuring real-time validation feedback for a smooth user experience. Once submitted, the data is securely transmitted to the backend, where SQL handles insertion and establishes necessary relationships, ensuring proper data management." 
        },
        { 
          feature_id: 29, 
          name: "View Campaign", 
          description: "Users can click on a campaign to view its full details, including the fundraising target and the current amount raised. This allows users to assess the campaign before deciding whether to contribute or not." 
        },
        { 
          feature_id: 3, 
          name: "Make Donations", 
          description: "Donors can securely contribute to campaigns via Paystack, a trusted payment gateway. I integrated Paystack on the backend to handle all transactions and callbacks securely. The frontend dynamically updates the campaign's total donations in real-time, ensuring that users are always informed about the success of their donations." 
        },
        { 
          feature_id: 31, 
          name: "Payment Integration", 
          description: "Payments are securely processed through Paystack, providing users with a smooth, seamless, and secure donation experience. This integration ensures that users can donate to causes they care about without any concerns about fraud or data security, contributing to a trustworthy and reliable payment environment." 
        },
        { 
          feature_id: 32, 
          name: "Payment Verification", 
          description: "Payment verification is handled using Paystack's webhooks, which trigger a server route to securely verify the payment's success. Upon successful payment, the donor receives confirmation emails from both the server and Paystack, providing transparency. The user is redirected to a success page where payment details are displayed, confirming the completion of the donation process." 
        },
        { 
          feature_id: 5, 
          name: "Email Notifications", 
          description: "Using Nodemailer, the backend sends personalized confirmation emails for successful donations. These emails include donor details and campaign information, offering a professional and transparent touch. The email template is designed to provide clear, concise information and a user-friendly layout, ensuring that donors have all necessary information about their donation." 
        },
        { 
          feature_id: 53, 
          name: "Donation History", 
          description: "Users can track their previous donations, providing transparency and allowing them to easily re-engage with causes they care about. From their donation history, users can choose to donate again, explore campaign creator profiles, or see the impact of their previous donations, ensuring continuous engagement with the platform." 
        },
        { 
          feature_id: 41, 
          name: "User Profile Management", 
          description: "Users can manage their profiles and track key analytics such as followers, campaigns they have created, and donations they have made. This central dashboard simplifies the process of monitoring user activity on the platform, allowing for better user engagement and easy tracking of personal and campaign progress." 
        },
        { 
          feature_id: 4, 
          name: "Follow Users", 
          description: "The follow feature promotes community engagement by allowing users to follow other users and stay updated on their campaigns. This functionality is powered by a relational SQL table to track follower connections. Real-time updates are reflected in user profiles using React Context API, allowing users to engage with campaigns based on the activity of people they follow, fostering a stronger community bond." 
        },
        { 
          feature_id: 6, 
          name: "Like Campaigns", 
          description: "The like feature enables users to express support for campaigns. Using SQL to track likes and Redux for handling optimistic updates, users receive immediate feedback on the UI, improving the overall experience by showing real-time reactions to their interactions with campaigns." 
        },
        { 
          feature_id: 67, 
          name: "Live Notifications", 
          description: "Live notifications provide real-time alerts to users when someone likes, donates to, or follows their campaign. WebSockets (socket.io) powers this feature, sending instant notifications while also updating the database to store these events. This ensures users remain engaged and informed about activity related to their campaigns, further enhancing the platform's interactivity." 
        },
        { 
          feature_id: 101, 
          name: "Modal Components", 
          description: "The modal component enables users to view content or perform actions in an overlay without leaving the current page. It features smooth transitions, is easily triggered, and can be customized for various use cases like confirmation dialogs or image previews, enhancing the overall user experience." 
        }                
      ],
      project_images: [
        { project_id: 1, entity_id: 1, entity_type: "feature", img_url: FundRiseLOGIN },
        { project_id: 1, entity_id: 123, entity_type: "feature", img_url: FundRiseRegister },
        { project_id: 1, entity_id: 134, entity_type: "feature", img_url: FundRiseOnboarding },
        { project_id: 1, entity_id: 2, entity_type: "feature", img_url: FundRiseCreate },
        { project_id: 1, entity_id: 3, entity_type: "feature", img_url: FundRiseDonate },
        { project_id: 1, entity_id: 4, entity_type: "feature", img_url: FundRiseFollow },
        { project_id: 1, entity_id: 31, entity_type: "feature", img_url: FundRisePaystack },
        { project_id: 1, entity_id: 32, entity_type: "feature", img_url: FundRiseVerify },
        { project_id: 1, entity_id: 41, entity_type: "feature", img_url: FundRiseProfile },
        { project_id: 1, entity_id: 5, entity_type: "feature", img_url: FundRiseEmail },
        { project_id: 1, entity_id: 53, entity_type: "feature", img_url: FundRiseHistory },
        { project_id: 1, entity_id: 29, entity_type: "feature", img_url: FundRiseView },
        { project_id: 1, entity_id: 101, entity_type: "feature", img_url: FundRiseModal }
      ],
      main_img: FundRise,
      github: "https://github.com/edohadevelops/FundRise.git",
      site: "https://edoha-fundrise.netlify.app/login",
      createdAt: "Sept 29 (2 months ago)"
    },
    {
      project_id: 2,
      title: "QampusPlus Secondary (Frontend)",
      short_description: "A comprehensive school management app simulating secondary school processes.",
      long_description: "QampusPlus Secondary (Owned by Techvibes International Limited) provides an all-in-one platform for managing school operations. The app includes features like class creation, subject management, staff and student record keeping, assessments, and attendance tracking . I contributed as part of the frontend team that built the user-friendly interface which ensures smooth navigation for educators and administrators.",
      stack: [
        { 
            "stack_id": 1, 
            "name": "React JS", 
            "description": "React was used to build the user-friendly interface of QampusPlus. I collaborated with the frontend team to build the user interface and user experience of QampusPlus using React's robust library." 
        },
        { 
            "stack_id": 2, 
            "name": "Redux Toolkit", 
            "description": "The frontend team used Redux Toolkit to handle state management across various components of the application." 
        },
        { 
            "stack_id": 3, 
            "name": "RTK Query", 
            "description": "The frontend team used RTK Query to consume the APIs provided by the backend team. This made it easier to handle data caching and automated refetch calls." 
        },
        { 
            "stack_id": 4, 
            "name": "TailwindCSS", 
            "description": "The frontend team used TailwindCSS to handle the styling and responsiveness of the application. Tailwind helped speed up the development process by reducing the time spent on complex styling and media queries." 
        },
        { 
            "stack_id": 5, 
            "name": "Other Libraries", 
            "description": "The frontend team used various other libraries that work well with React to handle smaller functionalities of the application and make the application more scalable and up to industry standards." 
        }
      ],
      category: ["Web Application", "Live Projects"],
      features: [
        {
          feature_id: 89,
          name: "Modal Component",
          description: "I was tasked with building a modal component that was reused throughout the application. The component was made dynamic using React's props to handle various modals of different sizes, validations, loading states, and functionalities. I implemented the modal UI based on the Figma design provided by the UI/UX designer at the company."
        },
        {
          feature_id: 1,
          name: "Parent Page on Admin Module",
          description: "I was assigned the task of implementing the Figma design for the parent page on the admin module. The page featured a group of analytics cards that showed information on various categories of parents, a table listing the parents in the school with menu actions for each parent that opened a modal to perform each action when clicked. It also included a 'View Profile' button to preview information about the parent. I was also tasked with implementing the APIs provided by the backend team for pulling the parent list, creating parents, updating parents, and disabling parent logins."
        },
        {
          feature_id: 2,
          name: "Student Page on Admin Module",
          description: "I was assigned the task of implementing the APIs provided by the backend team for the student page. This included creating students, updating students, viewing student profiles, disabling student logins, and deactivating students."
        },
        {
          feature_id: 3,
          name: "Class Page on Admin Module",
          description: "I was assigned the task of implementing the APIs provided by the backend team for the class page. This included pulling class records, displaying class analytics, creating classes, updating classes, and deactivating classes. I was also tasked with building tab components to display tables for class names, class divisions, and classes."
        },
        {
          feature_id: 34,
          name: "Subject Page on Admin Module",
          description: "I was assigned the task of implementing the APIs provided by the backend team for the subject page. This included pulling subject records, displaying subject analytics, creating subjects, updating subjects, and deactivating subjects."
        },
        {
          feature_id: 4,
          name: "Settings Page on Admin Module",
          description: "I was assigned the task of implementing the Figma design for the settings page and various tabs on the settings page. This included billing and subscription, school information, password and security, and theme personalization, where users could choose their preferred themes."
        },
        {
          feature_id: 45,
          name: "Bulk Upload Students, Staff, and Parents",
          description: "I was tasked with implementing the Figma design for bulk uploading students. This included building a custom component to handle the drag-and-drop feature with necessary validations and a button to download the template for the bulk upload."
        },
        {
          feature_id: 5,
          name: "Parent Module UI",
          description: "I was tasked with implementing the Figma design for the pages in the parent module. The module included a dashboard, parent calendar, attendance page, etc."
        },
        {
          feature_id: 6,
          name: "Student Page on Staff Module",
          description: "I was tasked with implementing the APIs on the frontend for the student page, which included pulling student records assigned to the staff's class."
        },
        {
          feature_id: 6,
          name: "Subject Page on Staff Module",
          description: "I was tasked with implementing the APIs on the frontend for the subject page. This included pulling subject records assigned to the staff and providing a 'View Subject' option that displayed the students taking that subject and their assessments. The staff could also view the results of the students from that list."
        },
        {
          feature_id: 66,
          name: "View Assessment Page on Staff Module",
          description: "I was tasked with implementing the Figma design for the view assessment page, where staff could preview students' assessments and results."
        },
        {
          feature_id: 76,
          name: "Result Template",
          description: "I was tasked with implementing the Figma design for two result templates. These templates displayed student records in different formats depending on the definitions provided by the admin. I was also tasked with implementing the APIs to pull student results and display them on the result templates."
        }
      ],
      project_images: [],
      main_img: QPlus,
      site: "https://cts.qampusplusapp.com/",
      createdAt: "Nov 20 (1 week ago)"
    },
    {
      project_id: 3,
      title: "School Chat App (Frontend)",
      short_description: "A dynamic school chat application designed to enable real-time messaging between users, built with React JS and WebSockets for an engaging and responsive experience.",
      long_description: "This project, the School Chat Application, was an exciting opportunity to bring a school system to life digitally. It simulates real-world school dynamics with distinct user roles like staff, students, and parents. My primary focus was crafting an intuitive and engaging user interface that highlights functionality while ensuring ease of use. The application features a clean, interactive dashboard showcasing user analytics, user management for administrators to manage roles and permissions, and a real-time messaging system that fosters seamless communication. Working on this project not only improved my ability to design user-centric interfaces but also expanded my knowledge of frontend integration with WebSocket-based communication, as my colleague handled the backend.",
      stack: [
          {
              stack_id: 1,
              name: "React JS",
              description: "I developed this application using React JS. By leveraging the customizability and reusability of React components, the development process was smooth and scalable. React's component-based architecture allowed for the efficient creation of dynamic and interactive UI elements."
          },
          {
              stack_id: 2,
              name: "TailwindCSS",
              description: "Using TailwindCSS's predefined utility classes, I was able to rapidly implement a responsive and interactive UI. I defined custom global styles for spacing, typography, and color schemes, ensuring visual consistency across the application while reducing development time."
          },
          {
              stack_id: 3,
              name: "WebSockets (Socket.IO)",
              description: "This was my first experience building an application utilizing WebSockets, and I learned a great deal about socket connections and event handling. The knowledge I gained from this project has equipped me to develop more complex and innovative real-time applications in the future."
          }
      ],
      category: ["Web Application", "Personal Projects"],
      features: [
          {
              feature_id: 12,
              name: "Protected User Routes",
              description: "I implemented frontend route protection to ensure users could only access pages relevant to their roles. For example, a student cannot access staff-specific pages and vice versa. My colleague handled backend role verification using JSON Web Tokens (JWT), while I ensured robust route protection on the frontend."
          },
          {
              feature_id: 142,
              name: "Real-Time Messaging",
              description: "Users can send and receive messages in real time through WebSockets (Socket.IO), delivering a seamless communication experience. Messages are stored and displayed instantaneously, with notifications triggered for new messages. Building this feature allowed me to create a chat system comparable to popular apps like WhatsApp."
          },
          {
              feature_id: 1134,
              name: "User Dashboard",
              description: "I designed and implemented an interactive dashboard that provides users with personalized information, including key analytics about the school system. The dashboard combines functionality with an intuitive layout to enhance the user experience."
          },
          {
              feature_id: 1,
              name: "User Management",
              description: "Administrators can create and manage user roles, as well as add users to each role. This feature makes the application flexible and adaptable to different needs, closely mimicking the functionality of real-world systems."
          }
      ],
      project_images: [],
      main_img: CHATAPP,
      github: "https://github.com/edohadevelops/ChatApp-Frontend.git",
      site: "https://edohachatapp.netlify.app/login",
      createdAt: "June 15 (5 months ago)"
    },
    {
        "project_id": 4,
        "title": "Ecommerce Web Shop",
        "short_description": "A fully functional e-commerce web shop that allows users to browse products, add items to their cart, and proceed to a secure checkout process.",
        "long_description": "The Ecommerce Web Shop is designed to provide a seamless shopping experience. It allows users to browse products, add items to their cart, and proceed to a secure checkout process. The site includes user authentication, order tracking, payment integration with Paystack, and a responsive design for cross-device compatibility.",
        "stack": [
          {
            "stack_id": 1,
            "name": "React JS",
            "description": "React JS was used for building the frontend, providing a dynamic and interactive user interface for seamless browsing and checkout."
          },
          {
            "stack_id": 2,
            "name": "Node JS",
            "description": "Node JS was used for the backend server, handling API requests and managing the business logic of the e-commerce application."
          },
          {
            "stack_id": 3,
            "name": "Express JS",
            "description": "Express JS was used to build the backend API API's, enabling communication between the frontend and the database, and handling user requests."
          },
          {
            "stack_id": 4,
            "name": "MongoDB",
            "description": "MongoDB was used as the database for storing user data, product information, and order details in a NoSQL format."
          },
          {
            "stack_id": 5,
            "name": "Paystack",
            "description": "Paystack was integrated for secure payment processing, enabling users to make payments for their orders directly on the platform."
          },
          {
            "stack_id": 6,
            "name": "Material UI",
            "description": "Material UI was used to implement the frontend design, ensuring a responsive and user-friendly interface across different devices."
          }
        ],
        "category": ["Web application", "Personal Projects"],
        "features": [
          {
            "feature_id": 1,
            "name": "Product Browsing",
            "description": "Users can browse a wide range of products with detailed descriptions and images."
          },
          {
            "feature_id": 2,
            "name": "Shopping Cart",
            "description": "Users can add items to their cart and review their selections before proceeding to checkout."
          },
          {
            "feature_id": 3,
            "name": "User Authentication",
            "description": "Users can create accounts, log in, and manage their profiles securely."
          },
          {
            "feature_id": 4,
            "name": "Order Tracking",
            "description": "Users can track their orders and receive updates on shipping status."
          },
          {
            "feature_id": 5,
            "name": "Payment Integration",
            "description": "The platform integrates with Paystack to process secure payments for orders."
          },
          {
            "feature_id": 6,
            "name": "Responsive Design",
            "description": "The site adapts to various screen sizes, providing a seamless shopping experience across devices."
          }
        ],
        "project_images": [
            { entity_id: 1, entity_type: "feature", img_url: COVENANT },
            { entity_id: 2, entity_type: "feature", img_url: IDICE },
            { entity_id: 3, entity_type: "feature", img_url: ESTHINGTON },
            { entity_id: 4, entity_type: "feature", img_url: CHATAPP },
            { entity_id: 1, entity_type: "stack", img_url: QPlus },
            { entity_id: 3, entity_type: "stack", img_url: FundRise }
          ],
        main_img: ECCOMERCE,
        github: "https://github.com/edohadevelops/ecommerce.git",
        site: "https://edoha-ecommerce.netlify.app/",
        "createdAt": "March 5 (8 months ago)"
    },
    {
        project_id: 5,
        title: "ProjectHive",
        short_description: "A portfolio generator web app where users can create and showcase their projects on unique subdomain landing pages.",
        long_description: "ProjectHive is a portfolio generator web app where users can create and showcase their projects on unique subdomain landing pages. Users can add project categories, descriptions, images, and links to live projects or GitHub, delivering a creative and user-friendly interface that helps users showcase their projects effectively.",
        stack: [
          {
            stack_id: 1,
            name: "React JS",
            description: "React JS was used for building the frontend, allowing users to dynamically create and display project information on their personalized subdomain landing pages."
          },
          {
            stack_id: 2,
            name: "Redux",
            description: "Redux was used for state management, ensuring a consistent data flow and handling user interactions smoothly across the app."
          },
          {
            stack_id: 3,
            name: "Node JS",
            description: "Node JS was used for the backend server, handling API requests and managing the business logic of project creation and management."
          },
          {
            stack_id: 4,
            name: "Express JS",
            description: "Express JS was used to build the API API's, enabling communication between the frontend and the database for storing user projects."
          },
          {
            stack_id: 5,
            name: "SQL",
            description: "SQL was used for the database, storing project details, categories, images, and links in a structured format for easy retrieval."
          },
          {
            stack_id: 6,
            name: "TailwindCSS",
            description: "TailwindCSS was used to design the responsive and user-friendly interface, ensuring a clean and consistent layout across different devices."
          }
        ],
        category: ["Web application", "Personal Projects", "Live Projects"],
        features: [
          {
            feature_id: 1,
            name: "Project Creation",
            description: "Users can create new projects with detailed information, including categories, descriptions, and images."
          },
          {
            feature_id: 2,
            name: "Subdomain Landing Pages",
            description: "Each user gets a unique subdomain for their portfolio, where they can showcase their projects on personalized landing pages."
          },
          {
            feature_id: 3,
            name: "Project Categories",
            description: "Users can organize their projects into categories, making it easy to filter and display different types of projects."
          },
          {
            feature_id: 4,
            name: "Project Descriptions",
            description: "Users can add detailed descriptions to their projects to provide context and explain the purpose of each project."
          },
          {
            feature_id: 5,
            name: "Project Images",
            description: "Users can upload images of their projects to visually showcase their work."
          },
          {
            feature_id: 6,
            name: "GitHub/Project Links",
            description: "Users can add links to their live projects or GitHub repositories, allowing others to explore their work in more detail."
          }
        ],
        project_images: [
            { entity_id: 1, entity_type: "feature", img_url: COVENANT },
            { entity_id: 2, entity_type: "feature", img_url: IDICE },
            { entity_id: 3, entity_type: "feature", img_url: ESTHINGTON },
            { entity_id: 4, entity_type: "feature", img_url: CHATAPP },
            { entity_id: 1, entity_type: "stack", img_url: QPlus },
            { entity_id: 3, entity_type: "stack", img_url: FundRise }
          ],
        main_img: PROJECTHIVE,
        site: "https://edohathedev.netlify.app/portfolio",
        createdAt: "Nov 30 (2 days ago)"
    },
    {
        project_id: 6,
        title: "MovieBase",
        short_description: "A movie streaming web app with a visually appealing landing page where users can sign in to explore a vast library of movies across various genres.",
        long_description: "MovieBase is a movie streaming web app with a visually appealing landing page where users can sign in to explore a vast library of movies across various genres. The platform offers a seamless viewing experience with features like personalized accounts and an intuitive interface designed for effortless navigation. It ensures a smooth experience for discovering and streaming movies with easy-to-use functionalities.",
        stack: [
          {
            stack_id: 1,
            name: "React JS",
            description: "React JS was used for building the frontend, allowing users to browse movies and manage their personalized accounts efficiently."
          },
          {
            stack_id: 2,
            name: "Redux",
            description: "Redux was used for state management, ensuring that the movie library, user preferences, and authentication state are consistent throughout the app."
          },
          {
            stack_id: 3,
            name: "TailwindCSS",
            description: "TailwindCSS was used for styling the web app, providing a responsive and clean design that adapts to various screen sizes."
          },
          {
            stack_id: 4,
            name: "Video Player",
            description: "The video player allows users to stream movies directly from the platform, ensuring smooth playback and a great viewing experience."
          }
        ],
        category: ["Web application", "Live Projects", "Landing Pages"],
        features: [
          {
            feature_id: 1,
            name: "User Authentication",
            description: "Users can create accounts, log in, and manage their profiles to access personalized content and preferences."
          },
          {
            feature_id: 2,
            name: "Movie Library",
            description: "A vast collection of movies across various genres is available for browsing and streaming."
          },
          {
            feature_id: 3,
            name: "Personalized Accounts",
            description: "Users can save their favorite movies, create watchlists, and manage their personal settings."
          },
          {
            feature_id: 4,
            name: "Movie Categories",
            description: "Movies are categorized into various genres, making it easy for users to explore and find movies that match their preferences."
          },
          {
            feature_id: 5,
            name: "Search Functionality",
            description: "Users can search for movies by title, genre, or actor to find specific content quickly."
          },
          {
            feature_id: 6,
            name: "Streaming",
            description: "Movies can be streamed directly from the platform with high-quality video playback."
          },
          {
            feature_id: 7,
            name: "Responsive Design",
            description: "The app is designed to be fully responsive, ensuring a smooth experience on desktops, tablets, and mobile devices."
          }
        ],
        project_images: [],
        main_img: MOVIEBASE,
        site: "https://tempgstv.netlify.app/landing",
        createdAt: "Nov 10 (3 weeks ago)"
    },
    {
        project_id: 7,
        title: "iDice Website",
        short_description: "A professional landing page for an IT solutions company in Nigeria, showcasing their expertise in delivering innovative technology services.",
        long_description: "The iDice Website serves as the landing page for an IT solutions company in Nigeria. It highlights the company's commitment to providing cutting-edge solutions, including software development, IT consultancy, and digital transformation services, all tailored to help businesses achieve their goals efficiently. The site is designed to provide a comprehensive overview of the services offered, ensuring a professional and user-friendly experience.",
        stack: [
          {
            stack_id: 1,
            name: "React JS",
            description: "React JS was used to build a dynamic and interactive frontend, providing smooth user interactions and a modern feel."
          },
          {
            stack_id: 2,
            name: "TailwindCSS",
            description: "TailwindCSS enabled rapid, responsive, and customizable styling, ensuring the landing page adapts to various screen sizes with ease."
          }
        ],
        category: ["Landing Pages", "Live Projects"],
        features: [
          {
            feature_id: 1,
            name: "Service Overview",
            description: "The site provides an overview of the IT services offered by iDice, making it easy for users to understand the company's offerings."
          },
          {
            feature_id: 2,
            name: "IT Solutions",
            description: "The landing page highlights the IT solutions iDice provides, including software development, consultancy, and digital transformation."
          },
          {
            feature_id: 3,
            name: "Software Development",
            description: "iDice showcases its software development expertise, offering solutions to meet various business needs."
          },
          {
            feature_id: 4,
            name: "Consultancy",
            description: "The site emphasizes iDice's consultancy services, providing expert advice to businesses looking to innovate and streamline their operations."
          },
          {
            feature_id: 5,
            name: "Digital Transformation",
            description: "iDice's digital transformation services are highlighted, showcasing their ability to help businesses modernize and enhance efficiency."
          },
          {
            feature_id: 6,
            name: "Responsive Design",
            description: "The landing page is designed to be fully responsive, ensuring an optimal viewing experience across all devices."
          }
        ],
        project_images: [],
        main_img: IDICE,
        site: "https://edohaidice.netlify.app/",
        createdAt: "Sept 20 (2 months ago)"
    },
    {
        project_id: 9,
        title: "Esthington Website",
        short_description: "A real estate website developed as a practice project, featuring property listings, search filters, and detailed property pages.",
        long_description: "The Esthington Website is a real estate platform developed as a practice project to showcase property listings with search filters and detailed pages for each property. The site provides an easy-to-use interface for browsing properties, offering users the ability to view images, descriptions, and contact information for each listing. The responsive design ensures the site is accessible on both desktop and mobile devices.",
        stack: [
          {
            stack_id: 1,
            name: "React JS",
            description: "React was used to develop the user interface, ensuring smooth navigation between pages and a responsive design for real-time property filtering and searching."
          },
          {
            stack_id: 2,
            name: "Tailwind CSS",
            description: "Tailwind CSS was utilized to style the website, enabling fast development of responsive, clean, and reusable UI components for a professional and modern look."
          }
        ],
        category: ["Landing Pages", "Personal Projects"],
        features: [
          {
            feature_id: 1,
            name: "Property Listings",
            description: "The website allows users to browse available properties with a listing of key details such as price, location, and brief descriptions."
          },
          {
            feature_id: 2,
            name: "Search Filters",
            description: "Users can filter the property listings based on specific criteria like price range, location, and property type for a customized search experience."
          },
          {
            feature_id: 3,
            name: "Property Details",
            description: "Each property has its own detailed page, which includes images, descriptions, features, and contact information."
          },
          {
            feature_id: 4,
            name: "Responsive Design",
            description: "The site is designed to be fully responsive, ensuring it provides an optimal browsing experience across devices, from desktop to mobile."
          },
          {
            feature_id: 5,
            name: "User Interface",
            description: "The interface is user-friendly and intuitive, designed to offer a seamless experience for users looking for properties to buy or rent."
          }
        ],
        project_images: [],
        main_img: ESTHINGTON,
        site: "https://esthingtongroup.netlify.app/",
        createdAt: "April 13 (7 months ago)"
    }   
];

export const GITHUB = "https://github.com/edohadevelops"
  
export default PROJECTS;