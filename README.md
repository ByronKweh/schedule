# Schedule MERN backend
## Prerequisites

Before you can run this project, ensure you have the following dependencies installed:

1. [Node.js](https://github.com/nvm-sh/nvm) (v16 or later) using [NVM](https://github.com/nvm-sh/nvm).
2. [MongoDB](https://www.mongodb.com/try/download/community) (local installation).

## Installation

Follow these steps to set up and run the project:

## Install Node.js via NVM:

   ```bash
   # Install NVM (Node Version Manager)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

   # Install Node.js (v16)
   nvm install 16

   # Use Node.js v16
   nvm use 16

## Clone the Repository:

```bash
git clone https://github.com/ByronKweh/schedule-monorepo.git
```
## Backend Setup:
```bash
# Change directory to schedule-backend
cd ./schedule-backend

# Install dependencies
npm install

```


## run the app:
```bash
# Start the full application (backend and frontend)
npm start
```

## Setting up MongoDB Locally:

Ensure you have MongoDB installed and running locally. You can download it here (https://www.mongodb.com/try/download/community) and follow the installation instructions for your OS.

Once MongoDB is running, configure the MongoDB connection in the .env file in the schedule-backend directory (as mentioned in step 3).
