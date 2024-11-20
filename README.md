# Project Title

## Overview

What is your app? Give a brief description in a couple of sentences.

BerriWell is a user-friendly app designed for naturopathic patients with chronic diseases and gut health issues. It provides a centralized platform to track practitioner notes, health plans, medications/vitamins, lab results, food sensitivities, appointments, and daily or weekly symptoms. By streamlining health management, BerriWell empowers users to stay organized, reduce stress, and take control of their wellness journey.


### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

Many people suffer from chronic diseases caused by chronic inflammation, such as IBS and PCOS, which often have no “cure” or quick medical fix. While medication can alleviate symptoms, it rarely addresses the root cause. Research has shown that reducing inflammation and rebalancing the gut microbiome through dietary changes can significantly reverse the effects of these chronic conditions. However, for patients, avoiding inflammatory foods often requires meticulous attention to ingredient lists when grocery shopping. Remembering these details or accessing lab results saved as PDFs can be overwhelming and impractical.

Despite the growing demand for holistic health tools, there are no apps specifically designed to support naturopathic patients in their health journey. Most rely on email communication with practitioners and save their results in multiple scattered files. This disorganized approach often leaves patients feeling unsupported and stressed, making it harder to stay consistent and track their progress.

BerriWell aims to change this by centralizing data, lab results, and naturopathic resources in one intuitive platform. Unlike generic health apps, BerriWell is tailored specifically for naturopathic care. It empowers patients to take control of their health journey, reduce chronic inflammation and pain, and improve their diet with confidence and ease.

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

- Naturopathic patients:
    - with gut issues
    - who want to keep their health data in one place
    - who want to track their data over time

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

- food sensitivity results
- symptom journal
- appointment reminder
- health plan (maybe)


## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

front-end: react
back-end: express + mysql

### APIs

List any external sources of data that will be used in your app.

I'm not planning on using any external APIs but will be uploading my own data to populate my own MySQL database.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

- symptom journal page (homepage)
- food insensitivity page
- appointment reminder (might be on homepage)


### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out. 

1. food sensitivity results
- vegetables, fruit, meats, dairy/egg, grains, grains (gluten-free), fish/seafood, herbs/spices, nuts/seeds/legumes

2. symptom journal
- emotions scale, pain scale, title, body paragraph, date, time, symptom, pain location

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

write out endpoints eg. 
POST /journal:id 
POST /journal
GET /journal
GET /food
POST /food


### Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 



---

## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

- calendar
- appointment reminder
- analytics dashboard
- login authentication
- user profile
- messaging system
- blog posts (eg. IgE vs IgG)
- hormone balancing tab

// The naturopathic/allopathic space is underepresented, not as well respected, and practitioners are lacking tools in the space to track their patients
// focus on accessibility and ui than design, plain language, high contrast colours, very accessible and descriptive alt tags
// Material UI library for component building
// what is the user looking for in your app? generate non-inflamatory meals based off settings the user sets? eg. non-inflammatory breakfast in 30min
// can I eat this food? search functionality for inflammatory foods
// think of 3-4 pieces of functionality that a user with chronic inflammation would want to see

// patient-physician relationship, what does a doctor what you to see? wants u to see foods you need to increase or decrease --> messages form your naturopath, 
updated meal plan, (having a secure place to view all your documents), appointment reminders, symptom manager, dm functionality
// grocery list functionality
// food sensitivities list for ingredients list functionality

//msg zanab if you need to


Steps: 
Mockup --> Back-end --> Front-end