#  Kai Barker – ReadyUP

##  Table of Contents

1. [About the Project](#1-about-the-project)
   - 1.1 [Project Description](#11-project-description)
   - 1.2 [Built With](#12-built-with)
2. [Getting Started](#2-getting-started)
   - 2.1 [Prerequisites](#21-prerequisites)
   - 2.2 [How to Install](#22-how-to-install)
3. [Features and Usage](#3-features-and-usage)
   - [Screenshots & Explanations](#screenshots--explanations)
4. [Demonstration Video](#4-demonstration-video)
5. [Architecture / System Design](#5-architecture--system-design)
6. [Unit Testing and User Testing](#6-unit-testing-and-user-testing)
7. [Highlights and Challenges](#7-highlights-and-challenges)
8. [Roadmap – Future Improvements](#8-roadmap--future-improvements)
9. [Contributing and License](#9-contributing-and-license)
10. [Authors and Contact Info](#10-authors-and-contact-info)
11. [Acknowledgements](#11-acknowledgements)

---

## 1. About the Project

### 1.1 Project Description

**ReadyUP** is a full stack "Looking For Group" (LFG) web application with a focus on connecting gamers to play their favourite video games with other players. No more bad randoms, only minor misplays from *very* skilled friends. Finding the right teammates for your competitive or casual play style can be difficult and ReadyUP aims to solve that issue by allowing users to create posts to find others that seek a similar experience. ReadyUP is a like the gathering hub where you can find, join or create groups for your games.

**Whats included?** Users can register an account, or browse before creating one, select the game they wish to play from the listed categories and browse, join, or create posts within that category. User's can join and create many posts, which can all be viewed in their own *My Posts* section, which allows easy access to the posts that you are a part of. User's can customise their profiles and attach their preferred method of communication to easily connect on their gaming platform/console. Furthermore, users can add other users as friends to easily queue up and have fun again. For admins, there is an admin panel that allows the creation and deletion of categories, and the deletion of posts, presumably rude ones.

The application is built with a decoupled frontend and backend, with a focus on modularity and scalability.

### 1.2 Built With

#### Frontend
<!-- React, React Router, React Bootstrap, Material-UI, Axios -->
![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/-ReactBootstrap-41E0FD?style=for-the-badge&logo=reactbootstrap&logoColor=white)
![ReactRouter](https://img.shields.io/badge/-ReactRouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![CSS](https://img.shields.io/badge/-CSS-663399?style=for-the-badge&logo=css&logoColor=white)
![AXIOS](https://img.shields.io/badge/-axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MUI](https://img.shields.io/badge/-material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

#### Backend

![Node.js](https://img.shields.io/badge/-Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

#### Database

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

#### Authentication

![BCrypt](https://img.shields.io/badge/-BCRYPT-000000?style=for-the-badge&logo=bcrypt&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

#### File Storage
 ![Cloudinary](https://img.shields.io/badge/Cloudinary-007FFF?style=for-the-badge&logo=cloudinary&logoColor=white)
#### Middleware

![Multer](https://img.shields.io/badge/Multer-000000?style=for-the-badge&logo=npm&logoColor=white) ![CORS](https://img.shields.io/badge/CORS-000000?style=for-the-badge&logo=cors&logoColor=white)

#### Config
![Dotenv](https://img.shields.io/badge/Dotenv-fff?style=for-the-badge&logo=dotenv&logoColor=black)


## 2. Getting Started

### 2.1 Prerequisites

- Node.js (v18 or newer)
- npm
- MySQL (a local instance like XAMPP, or a hosted database)
- Git

### 2.2 How to Install

This project is divided into a frontend and backend directory. You will need two separate terminals to run them.

1. **Clone the Repository**

```bash
git clone https://github.com/Kai-Barker/DV200_S2_ReadyUP.git
```

2. **Install Frontend**

```bash
cd frontend
npm install
```

Your frontend .env should look like this
```bash
# This tells your React app where to send API requests
REACT_APP_API_URL=http://localhost:3001
```

```bash
# 4. Start the React development server
npm start
```

3. **Install Backend** 

Open a new terminal:

```bash
cd backend
npm install
```

Your backend .env should look like this

```bash
# MySQL Database
DB_HOST=your_db_host
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_database_name

# Authentication
JWT_SECRET=your_super_secret_key_for_jwt

# Cloudinary
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

---

## 3. Features and Usage

-  **User Authentication**: Secure registration done using bcrypt for password hashing and JWT for secure user identification
-  **Dynamic LFG System**:
- - Browse Categories: A homepage with all game categories, dynamically loaded from the database and showing the number of active posts.
- - Browse Posts: A filterable and searchable page for each category, allowing users to find the exact group they're looking for.
- - Create & Join: An intuitive modal for creating new posts and a simple "join" system for group management.
- - Post Tags: Posts can be created with a tagging system that helps cover extra information or requirements related to the post
- - My Posts: A dedicated page showing all posts a user has either created or joined.
-  **User Profiles and Socials**:
- - Users can view and edit their own profiles (profile picture, bio, social links).
- - Users can view other users' public profiles.
- - A complete friends system with friend requests and a friends list.
-  **Modular Architecture**: The frontend follows a component-based architecture to follow best practices in programming modular systems. This improves readability, scalability, and maintainability. The structure also allows for quick updates or the addition of new features with minimal disruption to existing code.
- **Admin Moderation**:
- - Protected routes that can only be accessed by administrators
- - Admins can delete any category or post on the platform
- - Admins can easily add any categories for users to post on
- **SEO**: Client-side SEO is handled with a custom useSeo hook to add dynamic page titles and meta tags. A sitemap is further used to aid Google's crawlers with key categories.
- **Responsiveness**: The web app is 100% mobile responsive using bootstraps layout tools and custom media queries

### Screenshots & Explanations

**Register Page**

- The register page is where users create an account, with a username, email, password, and a MFA Cheat code password
![](./documentation/documentation_assets/Register.png)
![](./documentation/documentation_assets/Register2.png)

**Login Page**

- Very similar to the register page, users sign into their account here
![](./documentation/documentation_assets/Login.png)

**Home Page**

- Introduces the user to the site and shows the top categories

![](./documentation/documentation_assets/HomePage.png)
![](./documentation/documentation_assets/HomePage2.png)

**Categories Page**

- Shows a list of available categories with filter options. Pagination included

![](./documentation/documentation_assets/Categories.png)

**Browse Posts Page**

- Shows a list of posts within a category. Signed in users can create and join these posts as well

![](./documentation/documentation_assets/Browse%20Posts.png)
![](./documentation/documentation_assets/CreatePost.png)
![](./documentation/documentation_assets/ViewPost.png)

**My Posts**

- Shows the user a list of all posts they have joined or created

![](./documentation/documentation_assets/MyPosts.png)

**User Profile**

- Shows information related to the user, can be loaded with own profile or a public profile

![](./documentation/documentation_assets/UserProfile.png)
![](./documentation/documentation_assets/EditProfile.png)

Public profile

![](./documentation/documentation_assets/PublicProfile.png)


**Friends List**
- Shows the user's friends

![](./documentation/documentation_assets/FriendsList.png)
![](./documentation/documentation_assets/FriendsReq.png)
---

## 4. Walkthrough Video

[🔗 Watch Here](https://drive.google.com/file/d/1jteR_gssTpy4qVp2O5urMd0dseb1GlMZ/view?usp=sharing)

---

## 5. Architecture / System Design


- **Frontend**:
- - **Responsibility**: Renders the user interface, manages client-side state, and handles all user interactions
- - **Deployment**: Hosted on Vercel.
- **Backend**:
- - **Responsibility**: Handles logic, authenticates users (via JWT), processes data, and interacts with the database.
- - **Deployment**: Hosted on Render.
- **Database**: A relational MySQL database.
- - **Responsibility**: Stores all persistent data, such as user credentials, LFG posts, categories, friend relationships, and joined posts.
- **External Services**: 
- - **Cloudinary**: A cloud-based service used for storing and serving all user-uploaded media (profile pictures and category images).

#### System Diagrams

![System Architecture Diagram](./documentation/documentation_assets//ReadyUP%20ER%20Diagram.drawio.png)

---

## 6. Highlights and Challenges

### Highlights

- Experimenting with JWT for user authentication making it easy and secure to query a user's role.
- Creating a dynamic LFG system 
- Creating a modular and readable codebase for simple add-ons.
- Role based admin control for accessing the admin dashboard and protected routes
- Designing a clean application that is visually pleasing to navigate
- Implementing pagination which i had overcomplicated in my head.
- Receiving and implementing user feedback via public user testing
- Setting up custom events for Google analytics
- Creating a friends feature which is something ive always wanted to attempt and accomplish
- Working on a video-game related website :) 

### Challenges

- Refactoring code for deployment
- - Needed to make some necessary changes to my routes and how i was calling my api
- Integrating an api hook to use Axios better (Worth it as it made my frontend codebase much more readable)
- Adding SEO to my application
- - I added a hook that dynamically adds title and meta tags to my react application as well as a sitemap for my main categories for google to crawl through.
- Setting up a mysql database and handling complex queries
- - Suffered through but picked up on the sql decently quickly, learning from online resources and AI to be more comfortable
- Media uploads
- - Having prior stored images directly to a database in x64 string format, i decided to learn how to integrate cloudinary with multer to be able to effectively upload and display images. This time only storing the URL. I needed to add a delete to prevent orphaned images when user's change profile pictures. Deleting the images required extracting the public ID's from the stored URLs which posed a challenge as well but came right
- Synchronizing react states
- - This was done largely through useState and useEffect but sometimes i needed to refresh somewhat unrelated components. Only in the login does the page require a refresh to function, which it does automatically

---

## 7. Roadmap – Future Improvements

- Integrate Google Ads to make the application profitable
- A live messaging feature for users to chat to their friends
- Factions/Clans to support more competitive users who wish to partake in tournaments
- Have the navbar refresh to display pfp without a full page refresh
- Further improvements to the friends feature
- Being able to block users
- Improvements to the user journey and having users properly connect.
- Being able to set profile to private

---

## 8. Contributing and License

Any contributions to this project are **greatly appreciated!** It inspires us and helps us all learn! To add any contributions follow these steps :)

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

### 9. License

Distributed under the MIT License.

---

## 10. Authors

- Kai Barker – Developer and Designer – [Kai-Barker](https://github.com/Kai-Barker)

Feel free to reach out for questions, feedback, or collaboration opportunities.

---

## 11. Contact Info

- Kai Barker – [241065@virtualwindow.co.za](mailto\:241065@virtualwindow.co.za)
---

## 12. Acknowledgements

- [Tsungai Katsuro](https://github.com/TsungaiKats)
- StackOverflow
- Google Analytics & Gemini
- Cloudinary 
- [React Bits for the awesome cursor](https://reactbits.dev/animations/target-cursor)
- MDN Web Docs
- Material UI
- React-Bootstrap
- Render, Vercel, and AWS for hosting my backend, frontend, and database, respectively

