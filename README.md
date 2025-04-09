[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5CdpQuHc)

# DGL-113 Project

1. Add your exisitng HTML/CSS website to the `docs/` folder.
1. Write your project proposal directly in this file in the
   section below. At a minimum, you should describe the 3 features
   that you plan to implement. See the project description in
   Brightspace for more details.
1. This part of the project is _due Wed Feb 28 at 11:59pm_.

## Proposal

## Project Proposal: Enhancing Ascent Physiotherapy Website with JavaScript Interactivity

In my previous DGL 103, I created a website for **Ascent Physiotherapy** using **HTML** and **CSS** as my final project. While the website was functional, it lacked interactivity and dynamic features. To enhance the user experience, I am now planning to improve my project using **JavaScript** by adding features like **appointment booking confirmation**, **Google Maps integration**, and a **product/service search filter**. These enhancements will make the website more interactive, user-friendly, and practical for visitors. Additionally, if time permits, I may also add an **expandable team member profile section** to make the **Our Team** page more compact and easy to navigate.

Project Overview:

The purpose of this project is to enhance the Ascent Physiotherapy website by integrating JavaScript functionalities to improve user experience, engagement, and navigation. The proposed features will provide dynamic content, interactive forms, and a seamless navigation experience. This will make the website feel more modern, responsive, and user-friendly.
Proposed Features

## 1. Dynamic Appointment Booking System (With Confirmation Message)

**Description:**

- Enhance the Appointment Booking Form (appointment.html) by adding real-time form validation, error messages, and a dynamic confirmation message upon successful form submission.
- After the user fills out the form and clicks "Book Appointment", a JavaScript modal will pop up confirming the appointment details without refreshing the page.
- If the user makes a mistake (such as leaving a required field empty), a red error message will appear in real-time without the need to reload the page.
- **How it works:**

- Use JavaScript’s addEventListener() for form validation.
- Trigger a pop-up modal (or overlay) displaying the submitted information like:
  - Name, Email, Date, Time, and Notes.
- Provide an option to either confirm or edit the appointment.

**Bonus Feature:**

Save the appointment data in LocalStorage so if the user refreshes the page, the form fields remain filled.

**Expected Outcome:**

- Improved user experience with instant feedback and confirmation.
- Prevent form submission errors without page reload.

## 2. Dynamic Product and Service Filter/Search Feature

**Description:**

- Improve the Products & Services page (products.html) by adding a real-time search and filter feature.
- Users can type a product or service name in the search bar, and JavaScript will dynamically filter the visible items.
- Implement a category filter (like All Products, Therapy Services, Rehabilitation Equipment) to allow users to quickly find what they need.

**How it works:**

- Use JavaScript’s filter() method to dynamically display only relevant products.
- Add a dropdown for category-based filtering.
- Provide real-time search functionality using the input event.

**Expected Outcome:**

- Enhanced navigation for users, allowing them to find specific products or services without scrolling endlessly.
- Improves accessibility and user experience.


## 3. Interactive Team Member Profiles (Expandable Sections)

**Description:**

- Improve the Our Team page (team.html) by adding expandable and collapsible team member profiles.
- Instead of displaying long biographies upfront, JavaScript will create a “Read More” toggle button for each team member.
- When the user clicks "Read More", the content expands smoothly, showing the full biography.

**How it works:**

- Use JavaScript’s classList.toggle() method to show/hide content.
- Implement smooth height animation using JavaScript with CSS transitions.
- Automatically collapse other team members' biographies when a new one is opened (accordion-style).

**Expected Outcome:**

- Clean and compact design for team members.
- Allows users to only read information they’re interested in, improving the browsing experience.
  
<br>
<br>
  
**(Additional feature I would like to do if I got time)**

## 4. Dynamic Google Maps Location with Appointment Booking Integration

**Description:**

- Enhance the Contact Us page (contactus.html) by embedding an interactive Google Maps API that shows the clinic’s exact location.
- Add a “Book Appointment” button directly on the map marker that redirects users to the Appointment Booking Form (appointment.html).
- If the user is using mobile devices, clicking the button can also open Google Maps Navigation for easier route guidance.

**How it works:**

- Use JavaScript to integrate Google Maps API.
- Create a custom map marker with the clinic’s exact location.
- Add an event listener that triggers a pop-up “Book Appointment” button when the user clicks the marker.
- Provide navigation options if accessed on mobile.

**Expected Outcome:**

- Users can easily find the clinic and navigate to it.
- It also creates a convenient booking flow by allowing users to book appointments straight from the map pop-up.


**Expected Benefits of This Project:**

- Improved user experience through real-time form validation and dynamic appointment confirmation.
- Enhanced website navigation with searchable product listings and collapsible team member profiles.
- Increased engagement and interactivity, making the website feel modern and professional.
- Enhanced website navigation with searchable product listings and collapsible team member profiles.(If 4 is implemented)

## Technologies to Use:

- HTML5 (existing structure)
- CSS3 (for styling)
- JavaScript (for interactivity)
- LocalStorage API (for temporary data storage)
