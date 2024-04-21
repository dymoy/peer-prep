# Peer-Prep

Peer-Prep is a MERN application tailored for aspiring developers seeking collaborative study groups to enhance their skills in coding and web development. The platform simplifies the organization of future study sessions, enabling users to create, explore, and enroll in sessions relevant to coding and web development topics. With Peer-Prep, users can seamlessly engage in a collaborative learning environment, fostering skill development and knowledge sharing among peers.

## Table of Contents

- [Peer-Prep](#peer-prep)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [Authentication](#authentication)
  - [Installation Process](#installation-process)
    - [Prerequisites](#prerequisites)
    - [Database Setup](#database-setup)
    - [Application Launch](#application-launch)
  - [Usage Instructions](#usage-instructions)
  - [Future Plans/Developments](#future-plansdevelopments)
  - [Links](#links)

## Features 

- **Session Creation**: Users can create study sessions with a title, description, start time, and end time, allowing them to specify the details of the session they intend to host.
  
- **JWT Authentication**: The application employs JSON Web Token (JWT) authentication to secure user access and ensure data privacy.
  
- **Session Listings**: Study sessions are listed for users to browse through and apply for in the main page.
  
## Technologies Used 

### Frontend
- React

### Backend 
- Node.js
- GraphQL

  ### Database 
- MongoDB
- Mongoose ODM

  ### Authentication 
- JSON Web Token (JWT)

## Installation Process

### Prerequisites
- Node.js version 16.*
- MongoDB

### Database Setup 
 This must be executed before launching the application
1. Start MongoDB server.
2. Navigate to the directory containing the schema file.
3. Execute the following command:
 mongorestore -d study_session_db path_to_dump_directory

### Application launch: 
1. Download the source code.
2. Navigate to the root directory.
3. Run the following commands:
$ npm install
$ npm start

## Usage Instructions 
1. Open the application.
2. Log in or create an account.
3. Create new study sessions or browse existing ones.
4. Apply for study sessions to participate.
5. Track upcoming study sessions and manage your schedule.


### Future Plans/Developments 
- Implement payment integration using the Stripe payment platform, to support charitable donations or premium features.
- Enhance the application's Progressive Web App (PWA) capabilities by integrating features such as a web manifest and service worker for offline functionality.
- Enables features that don't necessarily have to do with the sessions, such as a posting and commenting system for less collaborative and long-formatted queries that just require small clarifications and avoiding potentially unnecessary time for the user.


### Links 
- [Deployed Application](#) *()*
- [Github Repo](#) *(https://github.com/dymoy/peer-prep)*





