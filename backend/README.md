# Campaign Assistment Backend

## Description
This is the backend of the Campaign Assistment project. It is a RESTful API built using Nest.js. The API is used to manage the data of the campaign assistment project.

## Prerequisites
- Node.js
- PostgreSQL

## Getting Started

### Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/tejasghlade/Campaign-Assistment/tree/main/backend
  ```
2. Navigate to the project directory:
  ```bash
  cd backend
  ```
3. Install the dependencies:
  ```bash
  npm install
  ```

### Configuration
1. Create a `.env` file in the root directory of the project.
2. Copy the contents of `.env.example` into the `.env` file:
  ```bash
  PORT=3000

  # postgresql database

  DB_TYPE=postgres
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=your_username
  DB_PASSWORD=your_password
  DB_DATABASE=your_database
  ```
3. Update the values in the `.env` file with your database credentials.

### Running the Project
1. Start the development server:
  ```bash
  npm run start:dev
  ```
2. Open your browser and navigate to `http://localhost:3000`.

## License
This project is licensed under the MIT License.