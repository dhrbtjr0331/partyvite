# PartyApp - College Party Invitation System

A full-stack web application that allows college students to create, discover, and RSVP to parties. Built with Spring Boot, React, and PostgreSQL.

**Live Demo:** [http://www.partyvite.xyz/](http://www.partyvite.xyz/)

![Party App Banner](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

### User Management
- Secure user registration and login with JWT authentication
- Password encryption using BCrypt
- Persistent session management
- User profile customization

### Party Management
- **Create Parties** - Host your own events with custom details
- **Browse Events** - Discover upcoming public parties
- **Party Details** - View comprehensive information including location, time, capacity, and guest list
- **Edit & Delete** - Full control over your hosted parties
- **Capacity Management** - Set maximum guest limits
- **Public/Private Options** - Control party visibility

### RSVP System
- **Easy RSVP** - One-click registration for parties
- **Guest List** - View who's attending your events
- **RSVP Status Tracking** - Going, Maybe, or Cancelled status
- **Capacity Alerts** - Automatic notifications when parties reach capacity
- **My RSVPs** - Track all events you're attending

### User Experience
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- **Real-time Updates** - Dynamic content loading
- **Intuitive Navigation** - Clean, modern UI
- **Date/Time Formatting** - User-friendly date displays
- **Error Handling** - Comprehensive validation and error messages
- **Loading States** - Smooth user experience with loading indicators

---

## Tech Stack

### Backend
- **Framework:** Spring Boot 3.5.6
- **Language:** Java 17
- **Database:** PostgreSQL 15
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security
- **ORM:** Hibernate/JPA
- **Build Tool:** Maven
- **Validation:** Bean Validation (Jakarta)

### Frontend
- **Framework:** React 18
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router DOM v6
- **State Management:** React Context API
- **Date Handling:** date-fns
- **Build Tool:** Create React App

### Infrastructure
- **Deployment:** AWS EC2
- **Web Server:** Nginx
- **Containerization:** Docker & Docker Compose (optional)
- **Version Control:** Git & GitHub

---

## Known Issues

Date validation may fail if server timezone differs from client
Guest list may take a moment to update after RSVP

---

## Roadmap
### Future enhancements planned:

 Search and filter parties by date, location, or tags
 Party categories (house party, study group, sports event, etc.)
 Image upload for parties
 QR code check-in system
 Email notifications for RSVP confirmations
 Comments and ratings for parties
 Google Maps integration for party locations
 Social sharing features
 Mobile app (React Native)
 Admin dashboard for moderation




### This project is licensed under the MIT License - see the LICENSE file for details.

### MIT License

Copyright (c) 2025 Carrick Oh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
