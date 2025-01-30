# Next.js Admin Panel with TypeScript, Shadcn UI, and Prisma

This project is a simple admin panel built using Next.js, TypeScript, Shadcn UI, and Prisma to manage data in a MongoDB database. It allows you to view, edit, add, and delete users and movies.

## Features

*   **Tabbed Navigation:** Organized with three tabs: Home, Users, and Movies.
*   **User Management:**
    *   Displays a table of users with their name, ID, image, and email.
    *   Allows editing user information with a drawer.
*   **Movie Management:**
    *   Displays a table of movies with their ID, title, thumbnail, genre, and duration.
    *   Allows adding and editing movie information with a drawer.
    *   Allows deleting movies.
*   **Search Functionality:** Tables include search to filter data.
*   **Shadcn UI Components:** Uses modern and customizable UI components from Shadcn UI.
*   **Prisma ORM:** Manages database interactions with a type-safe approach.
*   **TypeScript:** Ensures code quality and type safety.
*   **Responsive design:** The page is made to be responsive.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version 18 or higher)
*   **npm:** (Comes with Node.js) or yarn or pnpm
*   **MongoDB database:** You will have to have an existing MongoDB database.

## Setup and Installation

Follow these steps to set up the project locally:

1.  **Environment Configuration:**

    *   Rename `env.example` to `.env` in the root of the project.
    *   Set the `DATABASE_URL` environment variable with the connection string to your MongoDB database. Example: `DATABASE_URL="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority"`

    ```
    DATABASE_URL="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority"
    ```
    *   Make sure to replace `your_username`, `your_password`, `your_cluster`, and `your_database` with the values of your database.

2.  **Install Dependencies:**

    Open your terminal in the project directory and run:

    ```bash
    npm install
    ```
    or

      ```bash
      yarn install
    ```
    or

      ```bash
    pnpm install
      ```
3.  **Run the Development Server:**

    Start the development server by running:

    ```bash
    npm run dev
    ```
    or

     ```bash
    yarn dev
     ```
     or

       ```bash
      pnpm dev
    ```
4.  **Open in Browser:**

    Open your web browser and navigate to `http://localhost:3000` to view the admin panel.

## Key Files and Folders

*   **`src/app/page.tsx`:** Main component that renders the tabbed admin panel.
*   **`src/components/DataTable.tsx`:** Reusable component for displaying data tables.
*   **`src/components/UserDrawer.tsx`:** Component for editing user information in a drawer.
*   **`src/components/MovieDrawer.tsx`:** Component for editing movie information in a drawer.
*    **`src/components/SearchInput.tsx`:**  Component for search input.
*   **`src/components/AddMovieButton.tsx`:** Component for Add Movie button.
*   **`src/app/api/users/route.ts`:** API route for fetching and updating user data.
*   **`src/app/api/movies/route.ts`:** API route for fetching, updating, adding, and deleting movie data.
*   **`src/lib/utils.ts`:** Utility functions for the app.
*   **`prisma/schema.prisma`:** Prisma schema file defining database models.

