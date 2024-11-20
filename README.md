# Project Title

## Overview

BerriWell is a user-friendly app designed for naturopathic patients with chronic diseases and gut health issues. It provides a centralized platform to track practitioner notes, health plans, medications/vitamins, lab results, food sensitivities, appointments, and daily or weekly symptoms. By streamlining health management, BerriWell empowers users to stay organized, reduce stress, and take control of their wellness journey.


### Problem Space

Many people suffer from chronic diseases caused by chronic inflammation, such as IBS and PCOS, which often have no “cure” or quick medical fix. While medication can alleviate symptoms, it rarely addresses the root cause. Research has shown that reducing inflammation and rebalancing the gut microbiome through dietary changes can significantly reverse the effects of these chronic conditions. However, for patients, avoiding inflammatory foods often requires meticulous attention to ingredient lists when grocery shopping. Remembering these details or accessing lab results saved as PDFs can be overwhelming and impractical.

Despite the growing demand for holistic health tools, there are no apps specifically designed to support naturopathic patients in their health journey. Most rely on email communication with practitioners and save their results in multiple scattered files. This disorganized approach often leaves patients feeling unsupported and stressed, making it harder to stay consistent and track their progress.

BerriWell aims to change this by centralizing data, lab results, and naturopathic resources in one intuitive platform. Unlike generic health apps, BerriWell is tailored specifically for naturopathic care. It empowers patients to take control of their health journey, reduce chronic inflammation and pain, and improve their diet with confidence and ease.

### User Profile

- Naturopathic patients:
    - with gut issues
    - who want to keep their health data in one place
    - who want to track their data over time

- Naturopaths:
    - to create health plans for patients
    - to add patient data

### Features

- food sensitivity results
- symptom journal
- appointment reminder
- health plan (maybe)


## Implementation

### Tech Stack

- front-end: react
- back-end: express + mysql

### APIs

I'm not planning on using any external APIs but will be uploading my own data to populate my own MySQL database.

### Sitemap

- symptom journal page (homepage)
- food insensitivity page
- appointment reminder (might be on homepage)


### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

1. food sensitivity results
- vegetables, fruit, meats, dairy/egg, grains, grains (gluten-free), fish/seafood, herbs/spices, nuts/seeds/legumes

2. symptom journal
- emotions scale, pain scale, title, body paragraph, date, time, symptom, pain location

### Endpoints

- POST /journal:id 
- POST /journal
- GET /journal
- GET /food
- POST /food


### Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 



---

## Future Implementations

- calendar
- appointment reminder
- analytics dashboard
- login authentication
- user profile
- messaging system
- blog posts (eg. IgE vs IgG)
- hormone balancing tab