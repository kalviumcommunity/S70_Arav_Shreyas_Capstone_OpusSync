# S70_Arav_Shreyas_Capstone_OpusSync
# OpusSync - Multi-Tenancy Project Management System

## Project Idea
OpusSync is a multi-tenancy project management system built using the MERN stack. It is designed to help teams and organizations efficiently manage projects, tasks, and collaboration. The system includes role-based authentication, real-time collaboration, analytics, scheduling, and notifications, making it a powerful and scalable project management solution. The platform will be deployed on **Vercel (frontend), Render (backend), and MongoDB Atlas (database)**, with additional technologies like **Redux Toolkit, Framer Motion, Tailwind CSS, React Query, Socket.io, Redis, and Docker**.

---

## Key Features
### **1. Authentication & Security**
- Google Sign-In, Email, and Password authentication
- Two-Factor Authentication (Google Authenticator, OTP)
- Cookie Session Management
- Logout & Session Termination
- Role-Based Access Control (Owner, Admin, Member, Read-Only)
- Granular Role-Based Access Control – Custom permissions for different roles

### **2. Workspaces & Project Management**
- Create & Manage Multiple Workspaces
- Invite Members to Workspaces
- Projects & Epics Management
- Tasks (CRUD, Status, Priority, Assignee)
- Task Dependencies – Link tasks so one task can't start until another is completed
- Task Timers & Productivity Tracking – Track time spent on tasks
- Task Deadlines & Due Dates – Automatically sync with the calendar
- Milestone Tracking – Highlight project phases and key deliverables
- Activity Logs & Audit Trails – Track who did what in the workspace

### **3. Collaboration & Communication**
- Team Chat & Direct Messaging
- Voice Notes in Chat – Record and send voice messages
- Video Call for Team Meetings & One-on-One Meetings
- Screen Sharing & Whiteboard in Video Calls

### **4. Productivity & Analytics**
- Analytics Dashboard
- Filters & Search (Status, Priority, AssignedTo)
- Pagination & Load More for performance optimization
- Time Tracking & Workload Management – Shows how much time is allocated to each team member

### **5. Calendar & Scheduling**
- Meeting Scheduling – Book team or one-on-one meetings directly from the calendar
- Availability Tracking – Check when team members are free
- In-App & Email Notifications – Notify users of upcoming meetings/tasks
- Task Progress Updates – Auto-update calendar based on task status
- Shared Team Calendar – View workspace-wide schedules for better planning
- Color-Coded Events & Categories – Differentiate between meetings, tasks, and deadlines
- Task Reminders & Alerts – Notify users about upcoming deadlines
- Task Drag & Drop – Adjust deadlines easily by dragging tasks on the calendar

### **6. Notifications & Alerts**
- Email & Push Notifications for task deadlines, project updates, and mentions
- Real-time alerts for new messages, task changes, and meeting updates

---

## Tech Stack
### **Frontend**
- React.js – For a dynamic and interactive user interface
- Redux Toolkit – For state management
- Framer Motion – For smooth animations
- Tailwind CSS – For modern UI styling
- React Query – For API caching and data fetching optimization
- Socket.io – For real-time messaging and notifications
- FullCalendar.js – For calendar functionalities

### **Backend**
- Node.js & Express.js – For handling server-side logic
- MongoDB & Mongoose – For database management
- Redis – For caching and session storage
- Socket.io – For real-time communication
- Mongoose Transactions – For robust data integrity
- JWT & OAuth – For authentication
- Bcrypt.js – For password hashing
- Nodemailer – For email notifications
- Cloudinary – For media storage (profile pictures, attachments)
- Render – For backend deployment

### **DevOps & Deployment**
- Docker – For containerized deployment
- Vercel – For frontend deployment
- MongoDB Atlas – For database hosting
- Render – For backend hosting

---

## Daily Plan & Timeline

### **Week 1: Foundation & Core Setup**
#### **Day 1-4: Project Setup & Core Design**
- Create Low-Fidelity Wireframes
- Create High-Fidelity UI Designs
- Set up GitHub Repository (Add README, Issues, Project Boards)
- Initialize MERN stack (React frontend, Node.js backend, MongoDB)
- Setup Project structure & linting rules

#### **Day 5-7: Authentication & Security**
- Implement Email/Password Authentication (JWT-based)
- Implement Google Sign-In Authentication
- Setup Role-Based Access Control (RBAC)
- Implement Session Management (Cookies, JWT Expiry Handling)
- Deploy Backend to Render

### **Week 2: Workspace & Project Management**
#### **Day 8-11: Workspaces, Projects & Tasks**
- Implement Create, Read, Update, Delete (CRUD) Workspaces
- Implement Project Creation & Management (CRUD)
- Implement Task Management (CRUD, Status, Priority, Assignee)

#### **Day 12-14: Task Dependencies & Timers**
- Implement Task Dependencies
- Implement Task Timer (Track Time Spent on Tasks)

### **Week 3: Collaboration & Advanced Features**
#### **Day 15-18: Collaboration Features**
- Implement Real-time Chat (Socket.io)
- Implement Direct Messaging
- **Capstone Submission:** Submit proof for WebSocket-based Real-time Communication

#### **Day 19-21: Calendar, Scheduling & Notifications**
- Implement Task Scheduling & Calendar (FullCalendar.js)
- Implement Meeting Scheduling & Availability Tracking
- Implement Email & Push Notifications

### **Week 4: Productivity, Testing & Final Touches**
#### **Day 22-24: Dockerization & Testing**
- Implement Docker Support (Dockerfile, Compose Setup)
- Write Jest Unit Tests (at least 5 test cases)

#### **Day 25-27: Final Deployment & AI Feature**
- Final Debugging & Optimization
- Implement LLM/AI-powered Autocomplete for Task Management
- Ensure Mobile Responsiveness & UI Enhancements
- Submit Project for Beta Testing (At least 10 users)

#### **Day 28: Capstone Submission & Evaluation**
- Submit GitHub Project Tracking Entries (At least 10 days proof)
- Work on Open Source Pull Requests (3 PRs on external projects)
- Aim to get 3 External Contributors on OpusSync (PR Merging Proof)
- Prepare for Microsoft Applied Skills Certification

---



## Deployment 

Backend : https://api-opus-sync.onrender.com