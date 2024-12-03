# BerriWell

## Overview

BerriWell is a user-friendly app designed for naturopathic patients with chronic diseases and gut health issues. It provides a centralized platform to track health plans, medications/vitamins, food sensitivities, appointments, and daily or weekly pain symptoms. By streamlining health management, BerriWell empowers users to stay organized, reduce stress, and take control of their wellness journey.


### Problem Space

Many people suffer from chronic diseases caused by chronic inflammation, such as IBS and PCOS, which often have no “cure” or quick medical fix. While medication can alleviate symptoms, it rarely addresses the root cause. Research has shown that reducing inflammation and rebalancing the gut microbiome through dietary changes can significantly reverse the effects of these chronic conditions. However, for patients, avoiding inflammatory foods often requires meticulous attention to ingredient lists when grocery shopping. Remembering these details or accessing lab results saved as PDFs can be overwhelming and impractical.

Despite the growing demand for holistic health tools, there are no apps specifically designed to support naturopathic patients in their health journey. Most rely on email communication with practitioners and save their results in multiple scattered files. This disorganized approach often leaves patients feeling unsupported and stressed, making it harder to stay consistent and track their progress.

BerriWell aims to change this by centralizing data, lab results, and naturopathic resources in one intuitive platform. Unlike generic health apps, BerriWell is tailored specifically for naturopathic care. It empowers patients to take control of their health journey, reduce chronic inflammation and pain, and improve their diet with confidence and ease.

### User Profile

**Naturopathic patients:**
- with gut issues and food sensitivities
- who want to keep their health data in one place
- who want to track their symptoms over time

**Naturopaths** *(future implementation)*:
- to create health plans for patients
- to add patient data

### Features

- **Appointment Reminder:** Keep track of your upcoming appointments to stay organized.
- **Health Plan:** Add, edit, and view your personalized health plan tailored to your needs.
- **Food Sensitivity Results:** Easily edit your food sensitivities results at your convenience. This feature is based off of LifeLab's Food Sensitity Lab Test that tracks your sensitivities to over 220+ different foods.
- **Symptom Journal:** Log any pain or unfavorable symptoms you experience in a journal to share with your doctor during appointments. View your detailed notes on your symptom by clicking on your symptom and viewing the pop-up.

## Implementation

### Tech Stack

**Front-end:**
- Framework: React
- Client libraries: 
    - react
    - react-router
    - axios
    - sass

**Back-end:**
- Database: MySQL
- Framework: Express
- Server libraries:
    - knex
    - express

### APIs

I'm not planning on using any external APIs but will be uploading my own data to populate my own MySQL database.

### Sitemap

1. HomePage (appointment reminder and health plan)
2. Food Sensitivity Page
3. Symptom Journal Page


### Mockups

![mockup](/assets/images/mockup.png)

### Data

![data diagram](/assets/images/data_diagram.png)

### Endpoints


**GET /users/:id**
- Fetch details for a specific user.
```
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "created_at": "2024-11-01T12:00:00Z",
  "updated_at": "2024-11-01T12:00:00Z"
}
```
**GET /appointments**
Sample request: 
```
GET /appointments?userId=1
```
Sample Response:
```
[
  {
    "id": 1,
    "user_id": 1,
    "date": "2024-11-10",
    "time": "10:00",
    "doctor_name": "Dr. Smith",
    "appointment_type": "Checkup"
  }
]
```
**POST /appointments**
Request Body:
```
{
  "user_id": 1,
  "date": "2024-11-20",
  "time": "14:30",
  "doctor_name": "Dr. Adams",
  "appointment_type": "Consultation"
}
```
Sample Response:
```
{
  "id": 2,
  "user_id": 1,
  "date": "2024-11-20",
  "time": "14:30",
  "doctor_name": "Dr. Adams",
  "appointment_type": "Consultation"
}
```
**PUT /appointments**
Request Body:
```
{
  "date": "2024-11-22",
  "time": "16:00",
  "doctor_name": "Dr. Green",
  "appointment_type": "Follow-up"
}
```
Sample Response:
```
{
  "message": "Appointment updated successfully"
}
```
**DELETE /appointments**
Sample request: 
```
DELETE /appointments?userId=1
```
Sample Response:
```
{
  "message": "Appointment deleted successfully"
}
```
**GET /health-plan**
Sample request: 
```
GET /health-plan?userId=1
```
Sample Response:
```
[
  {
    "id": 1,
    "user_id": 1,
    "task": "Take vitamin D supplements",
    "amount": "2000 IU",
    "frequency": "Daily"
  },
  {
    "id": 2,
    "user_id": 1,
    "task": "Drink 2 liters of water",
    "amount": "2 liters",
    "frequency": "Daily"
  }
]
```
**POST /health-plan**
Request Body:
```
{
  "user_id": 1,
  "task": "Increase fiber intake",
  "amount": "30 grams",
  "frequency": "Daily"
}
```
Sample Response:
```
{
  "id": 3,
  "task": "Increase fiber intake",
  "amount": "30 grams",
  "frequency": "Daily"
}
```
**PUT /health-plan**
Request Body:
```
{
  "task": "Add daily probiotics",
  "amount": "10 billion CFU",
  "frequency": "Once per day"
}
```
Sample Response:
```
{
  "message": "Health plan updated successfully"
}
```
**DELETE /health-plan**
Sample request: 
```
DELETE /health-plan?id=1&userId=1
```
Sample Response:
```
{
  "message": "Health plan deleted successfully."
}
```
**GET /sensitivities**
Sample request: 
```
GET /sensitivities?userId=1
```
Sample Response:
```
[
  {
    "id": 1,
    "user_id": 1,
    "food_name": "Broccoli",
    "category": "Vegetables",
    "severity": "Moderate"
  },
  {
    "id": 2,
    "user_id": 1,
    "food_name": "Apple",
    "category": "Fruits",
    "severity": "Mild"
  }
]
```
**PUT /sensitivities/:id**
Request Body:
```
{
  "user_id": 1,
  "id": 45,
  "severity": "Severe"
}
```
Sample Response:
```
{
  "message": "Severity updated successfully."
}
```
**GET /journals**
Sample request: 
```
GET /journals?userId=1
```
Sample Response:
```
[
  {
    "id": 1,
    "user_id": 1,
    "date": "2024-11-15",
    "pain_scale": 6,
    "symptoms": ["Headache", "Fatigue"],
    "notes": "Severe headache after consuming dairy."
  },
  {
    "id": 2,
    "user_id": 1,
    "date": "2024-11-16",
    "pain_scale": 4,
    "symptoms": ["Stomach ache"],
    "notes": "Mild discomfort after eating spicy food."
  }
]
```
**POST /journals**
Request Body:
```
{
  "user_id": 1,
  "date": "2024-11-18",
  "pain_scale": 7,
  "symptoms": ["Stomach pain", "Bloating"],
  "notes": "Severe bloating after a heavy meal."
}
```
Sample Response:
```
{
  "id": 3,
  "user_id": 1,
  "date": "2024-11-18",
  "pain_scale": 7,
  "symptoms": ["Stomach pain", "Bloating"],
  "notes": "Severe bloating after a heavy meal."
}
```
**PUT /journals**
Request Body:
```
{
  "date": "2024-11-19",
  "pain_scale": 5,
  "symptoms": ["Fatigue"],
  "notes": "Mild fatigue after an intense workout."
}
```
Sample Response:
```
{
  "message": "Symptom journal updated successfully."
}
```
**DELETE /journals**
Sample request: 
```
DELETE /journals?id=1&userId=1
```
Sample Response:
```
{
  "message": "Symptom journal entry deleted."
}
```


### Roadmap

**Setup**
- Initialize the project with a clear folder structure.
- Set up Node.js and Express for the backend server.
- Define JSON files for initial data storage: users.json, symptom_journals.json, food_sensitivities.json, health_plan.json.
- Plan and outline data models for users, symptom journals, food sensitivities, and health plans.
- Write sample data for testing (5 seed files).

**Backend Development**
- Implement GET /users/:id to fetch user profiles.
- Implement POST /users to create a new user.
- Implement GET /users/:id/journals to fetch symptom journal entries.
- Implement POST /users/:id/journals to add a new symptom journal entry.
- Implement GET /users/:id/food-sensitivities to fetch food sensitivities grouped by category.
- Implement POST /users/:id/food-sensitivities to add a new food sensitivity.
- Implement PUT /users/:id/food-sensitivities/:sensitivity_id to update severity level (reaction) of food sensitivities.
- Write integration tests for all endpoints developed so far.
- Implement GET /users/:id/health-plan to fetch a user’s health plan.
- Implement POST /users/:id/health-plan to create a new health plan.
- Refactor backend code for reusability and scalability.
- Write error handling for edge cases (e.g., missing fields, invalid IDs).
- Set up the frontend framework (e.g., React).
- Create a basic navigation structure with tabs for Journals, Food Sensitivities, and Health Plan.
- Test backend endpoints with mock frontend calls.

**Frontend Development**

- Create a form for adding symptom journal entries and connect it to the POST /journals endpoint.
- Create a display page for symptom journal entries, fetching data from GET /journals.
- Build a category-based view for food sensitivities, fetching data from GET /food-sensitivities.
- Create a form for adding food sensitivities and connect it to the POST /food-sensitivities endpoint.
- Add functionality for updating food sensitivity severity and connect it to PUT /food-sensitivities.
- Create a health plan view, fetching data from GET /health-plan.
- Add a form for creating health plans and connect it to POST /health-plan.

**Testing, Polishing, and Documentation**
- Test the entire application flow for bugs or inconsistencies.
- Optimize the UI for a clean and intuitive user experience.
- Write detailed documentation for all backend endpoints and frontend interactions.
- Conduct user testing (optional) and gather feedback for final adjustments.
- Prepare a presentation or summary for the final capstone submission.

---

## Future Implementations

- calendar
- analytics dashboard
- login authentication
- user profile
- messaging system
- blog posts (eg. IgE vs IgG)
- hormone balancing tab
- react native implementation for iOS and Andriod users

## Installation Instructions

Front-end:
```
npm install  axios knex react react-dom react-modal react-router-dom sass
npm run dev
```
Back-end:
```
npm install  cors dotenv express knex mysql2 node nodemon vite
```
Create a MySQL database called "berriwell"
```
knex migrate:latest
knex seed:run
node index.js
```
