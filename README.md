# BerriWell

## Overview

BerriWell is a user-friendly app designed for naturopathic patients with chronic diseases and gut health issues. It provides a centralized platform to track practitioner notes, health plans, medications/vitamins, lab results, food sensitivities, appointments, and daily or weekly symptoms. By streamlining health management, BerriWell empowers users to stay organized, reduce stress, and take control of their wellness journey.


### Problem Space

Many people suffer from chronic diseases caused by chronic inflammation, such as IBS and PCOS, which often have no “cure” or quick medical fix. While medication can alleviate symptoms, it rarely addresses the root cause. Research has shown that reducing inflammation and rebalancing the gut microbiome through dietary changes can significantly reverse the effects of these chronic conditions. However, for patients, avoiding inflammatory foods often requires meticulous attention to ingredient lists when grocery shopping. Remembering these details or accessing lab results saved as PDFs can be overwhelming and impractical.

Despite the growing demand for holistic health tools, there are no apps specifically designed to support naturopathic patients in their health journey. Most rely on email communication with practitioners and save their results in multiple scattered files. This disorganized approach often leaves patients feeling unsupported and stressed, making it harder to stay consistent and track their progress.

BerriWell aims to change this by centralizing data, lab results, and naturopathic resources in one intuitive platform. Unlike generic health apps, BerriWell is tailored specifically for naturopathic care. It empowers patients to take control of their health journey, reduce chronic inflammation and pain, and improve their diet with confidence and ease.

### User Profile

**Naturopathic patients:**
    - with gut issues
    - who want to keep their health data in one place
    - who want to track their data over time

**Naturopaths** *(future implementation)*
    - to create health plans for patients
    - to add patient data

### Features

- **Food Sensitivity Results:** Easily add, edit, and view your food sensitivities at your convenience.
- **Symptom Journal:** Log any pain or unfavorable symptoms you experience in a journal to share with your doctor during appointments.
- **Appointment Reminder:** Keep track of your upcoming appointments to stay organized.
- **Health Plan:** Add, edit, and view a personalized health plan tailored to your needs.

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

- homepage --> appointment reminder and health plan
- symptom journal page
- food insensitivity page
- user page (possibly)


### Mockups

![mockup](/assets/images/mockup.png)

### Data

1. food sensitivity results
- categories: vegetables, fruit, meats, dairy/egg, grains, grains (gluten-free), fish/seafood, herbs/spices, nuts/seeds/legumes (each category has a set amount of foods i will manually type out at a later point. there are 120+ foods in the list)

2. symptom journal
- pain scale, date, time, symptoms, notes

3. health plan
- list of tasks/vitamins to take (user will input the list)

Relationships:
- Each user can have multiple symptom journal entries, food sensitivities, and a health plan: this is a one-to-many relationship between Users and Symptom_Journal and between Users and Food_Sensitivities.
- Each user has one health plan: this is a one-to-one relationship between Users and Health_Plan.

![data diagram](/assets/images/data_diagram.png)

### Endpoints

**GET /users/:id/food-sensitivities**
- Fetch all food sensitivities for a user, grouped by category.
```
{
  "vegetables": [
    {
      "id": 1,
      "food_name": "Broccoli",
      "sensitivity_level": "Moderate",
    }
  ],
  "fruits": [
    {
      "id": 2,
      "food_name": "Apple",
      "sensitivity_level": "Mild",
    }
  ]
}
```

**POST /users/:id/food-sensitivities**
- Add a new food sensitivity result.
```
{
  "category": "vegetables",
  "food_name": "Broccoli",
  "sensitivity_level": "Moderate",
}
```

**PUT /users/:id/food-sensitivities/food_name**
- Update an existing food sensitivity result.
```
{
  "sensitivity_level": "Mild",
}
```

**GET /users/:id/journals**
- Fetch all symptom journals for a user.
```
[
  {
    "id": 1,
    "date": "2024-11-01",
    "time": "08:00",
    "pain_scale": 5,
    "symptoms": ["Stomach pain", "Fatigue"],
    "notes": "Moderate stomach pain after eating oatmeal for breakfast."
  }
]
```

**POST /users/:id/journals**
- Add a new symptom journal entry.
```
[
  {
    "id": 1,
    "date": "2024-11-01",
    "time": "18:00",
    "pain_scale": 7,
    "symptoms": ["Stomach pain", "Fatigue"],
    "notes": "Severe stomach pain after eating a cheeseburger for dinner."
  }
]
```

**GET /users/:id/health-plan**
- Fetch the user’s health plan.
```
{
  "id": 1,
  "tasks": ["Take vitamin D", "Drink 2 liters of water", "Avoid processed sugar"],
  "last_updated": "2024-11-01T00:00:00Z"
}
```

**POST /users/:id/health-plan**
- Create a new health plan for a user.
```
{
  "tasks": ["Take omega-3 supplements", "Drink herbal tea daily"]
}
```

**PUT /users/:id/health-plan**
- Update the user’s health plan.
```
{
  "tasks": ["Increase fiber intake", "Add daily probiotics"]
}
```

### Roadmap

**Setup**
- Initialize the project with a clear folder structure.
- Set up Node.js and Express for the backend server.
- Define JSON files for initial data storage: users.json, symptom_journals.json, food_sensitivities.json, health_plan.json.
- Plan and outline data models for users, symptom journals, food sensitivities, and health plans.
- Write sample data for testing.

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



- think about how i would structure data eg. brainflix had a massive file in a get request, the get request already got so much so that you can filter down (ie. instead of having 3 GET requests just have 1)
- work from the most high level to most detailed pages
- start with App.jsx then work down in specificity 
- we want to create reuseable components instead of having all these separate complicated pages
- url parameter determines what we're going to see --> not necessarily creating a separate url/get request for each
- when loading a user's profile, we should be able to see everything 
- eg. patient 1: kv pair name, id, food lists, journal entries, health plan, appointment reminders. /response/data/food-list/food-name
- conditional rendering vs having a ton of pages
- hone in on the user profile
- try to group together endpoints 
- single source of truth
