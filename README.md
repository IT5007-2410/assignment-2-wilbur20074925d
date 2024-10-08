# Ticket To Ride - Seat Booking System

### Developer: **YANG Yuebo** (E1350422)

## Project Overview

This project implements a seat reservation system using React. Users can add or delete travellers, each with unique seat numbers, and the system dynamically updates a seat map on the homepage. Seats are visually displayed as occupied or available based on user input, with validation to ensure no duplication of traveller names or seat numbers.

The main features of this project include:
- Adding travellers with unique names and seat numbers.
- Displaying a dynamic seat map on the homepage, marking seats as "occupied" or "free".
- Deleting travellers from the system, which updates the seat map.
- Validation for preventing duplicate traveller names and seat numbers.
- Ensuring seat numbers are greater than 0 and are not already occupied.

## Project Structure

The project consists of the following files:

- **index.html**: The main HTML file that renders the React app and includes external dependencies.
- **App.jsx**: The core React component file that handles adding and deleting travellers, and rendering the homepage seat map.
- **server.js**: A simple Express server to serve the project.
- **App.css**: (optional) for additional styling.

### Components Overview

1. **TicketToRide (Main Component)**:
    - Manages the state of travellers and total seats.
    - Controls which component is rendered (Homepage, Add Traveller, Delete Traveller, or Display Travellers).
    - Implements logic for adding and deleting travellers.

2. **Homepage Component**:
    - Displays the total number of available and occupied seats.
    - Dynamically updates the seat map based on travellers' seat numbers.

3. **Add Component**:
    - Provides a form for adding a new traveller with a name, phone number, seat number, and email.
    - Validates to ensure the traveller's name is unique and the seat number is valid.

4. **Delete Component**:
    - Provides a form for deleting a traveller by name and ensures only existing travellers can be deleted.

5. **Display Component**:
    - Displays a table of current travellers, showing their name, phone number, seat number, and email.

## Setup Instructions

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>