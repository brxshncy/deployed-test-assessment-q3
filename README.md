# Barbershop Queue Management System

## Overview

This project implements a backend system for managing the queue at a barbershop. The system calculates waiting time estimation based on barbers' shift schedules for the day. It includes three main database models: Barber, Customer, and Queue. This README provides an overview of each model and its attributes.

## Barber Model

- **name**: Stores the name of each barber working at the barbershop. It allows the system to identify each barber uniquely.
- **shiftStart**: Represents the start time of each barber's shift. This information is crucial for determining when each barber is available to serve customers.
- **shiftEnd**: Indicates the end time of each barber's shift. This information, along with the start time, defines the working hours for each barber.

## Customer Model

- **name**: Stores the name of each customer in the barbershop's queue. This field helps identify customers and personalize their experience.
- **arrivalTime**: Represents the time when each customer arrives at the barbershop. This information is essential for calculating waiting time and managing the queue effectively.

## Queue Model

- **customerId**: This field establishes a relationship between the customer and the queue. By referencing the Customer model, it associates each customer with their position in the queue.
- **barberId**: This field links each customer in the queue with the barber who will serve them. By referencing the Barber model, it indicates which barber is responsible for providing service to each customer.
- **position**: Stores the position of each customer in the queue. This information helps determine the order in which customers will receive service.

## Usage

- This system facilitates the efficient management of the barbershop's queue system.
- The Barber model captures information about the barbers' schedules.
- The Customer model tracks customers' arrival times.
- The Queue model maintains the queue order and associates customers with their respective barbers.
- This structured approach enables accurate waiting time estimation based on available resources and helps streamline the barbershop's operations.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)

## Environment Variables

- **MONGO_URI**: MongoDB connection URI. Set this variable in your environment to connect to your MongoDB database.
  
## How to Run

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm dev`.

