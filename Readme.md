# LearnVerse
*** A universe of learing and courses.***

# Backend

 ## Schemas
    - UserSchema: To store the user information
    - CourseSchema: To store the course created by admins
    - PurchaseSchema: To realte to the user table and show purchases
    - AdminSchema: To CRUD on courses

 ## Routes
    - UserRoutes: To signup/signin/ user
    - AdminCourseRoute: To Crud on courses by admin
    - UserCourseRoute: To see all courses, get a particular course, purchase a particular course and view a particular course (this one will be used to view course before purchasing)
    - publicCourseRoute: to show all the courses if not logged in on Courses(FrontEnd) page

 ## Middlewares
    - UserMiddleware: To authenticate user before accessing the courses route
    - AdminMiddlware: To authenticate admin before accessing admin coruseRoute

 ## Main:- Index.js
    - Accepts the body using express middleware
    - Route to diffrent routes usgin express middlewares

### How to locally start the backend:
- cd backend
- npm i
- setup the .env.example as .env
- nodemon index.js


# Frontend

  ## Tech stack used:
  - TailwindCss, React.js, Recoi(for statemanagement), notistack(for notification on every CRUD operation).

  ## Routing:
  -Have used ***React-router-dom*** for routing and redirecting the webpage to another one.

  ## Authentication:
  -Done by JWT

**Routes**:-
    - '/': Landing page
    - '/singin': Signin Page
    - '/singup': Signup Page
    - '/home': will land the user to his personal dashboard

### How to bootup the frontend locally:
 - cd frontend
 - npm i
 - npm run dev

# Figma Designs

- **Main Landing Page** :- ![alt text](image.png)
- **Signup Page** :- ![alt text](image-3.png)
- **Signin Page** :- ![alt text](image-4.png)
