# Ziggy

## Project Description

This project is a web application for a restaurant that allows customers to browse the menu and place orders, and enables restaurant staff to view and manage incoming orders. The application is built using Next.js for the front-end and back-end, and uses Supabase(PostgreSQL) as the database. Authentication is handled using Iron Session.

## Features

### Customer Interface
- **Login Page**: Customers can log in to the application using their basic details.
- **Menu Browsing**: Customers can browse the menu items, view details such as name, description, price, and image, and see items categorized into groups (e.g., appetizers, main courses, desserts, drinks).
- **Order Placement**: Customers can select their table number, add items to their cart, review their cart, adjust quantities, and remove items.
- **Order Viewing**: Customers can view the details of their current submitted orders.
- **Order History** (Bonus Feature): Customers can view their past orders.

### Restaurant Staff Interface
- **Order Management**: Staff can view a list of incoming orders with details such as table number, order items, and total amount, and mark orders as completed.
- **Manage Menu Items** (Additional Feature): Staff can add, edit, and delete menu items.
- **Manage Menu Categories** (Additional Feature): Staff can add, edit, and delete menu categories.

## Database Schema

### Tables

1. **Users**
    - `id`: Integer, Primary Key
    - `username`: String, Unique
    - `password`: String
    - `email`: String, Unique
    - `role`: Enum (CUSTOMER, STAFF)
    - `createdAt`: DateTime
    - `userOrders`: One-to-Many relationship with `Order` (UserOrder)
    - `restaurantOrders`: One-to-Many relationship with `Order` (RestaurantOrder)
    - `MenuCategory`: One-to-Many relationship with `MenuCategory`
    - `MenuItem`: One-to-Many relationship with `MenuItem`
    - `UserCart`: One-to-Many relationship with `Cart` (UserCart)
    - `RestaurantCart`: One-to-Many relationship with `Cart` (RestaurantCart)

2. **MenuCategories**
    - `id`: Integer, Primary Key
    - `name`: String
    - `description`: String
    - `restaurantId`: Integer, Foreign Key to `Users`
    - `status`: Enum (AVAILABLE, UNAVAILABLE)
    - `user`: Foreign Key to `Users`
    - `menuItems`: One-to-Many relationship with `MenuItem`

3. **MenuItems**
    - `id`: Integer, Primary Key
    - `name`: String
    - `restaurantId`: Integer, Foreign Key to `Users`
    - `user`: Foreign Key to `Users`
    - `description`: String
    - `price`: Float
    - `imageUrl`: String
    - `categoryId`: Integer, Foreign Key to `MenuCategories`
    - `status`: Enum (AVAILABLE, UNAVAILABLE)
    - `category`: Foreign Key to `MenuCategories`
    - `orderItems`: One-to-Many relationship with `OrderItem`
    - `Cart`: One-to-Many relationship with `Cart`

4. **Orders**
    - `id`: Integer, Primary Key
    - `userId`: Integer, Foreign Key to `Users`
    - `orderTotal`: Float
    - `tableNumber`: Integer
    - `restaurantId`: Integer, Foreign Key to `Users`
    - `user`: Foreign Key to `Users` (UserOrder)
    - `restaurant`: Foreign Key to `Users` (RestaurantOrder)
    - `status`: Enum (PENDING, COMPLETED, DECLINED)
    - `createdAt`: DateTime
    - `completedAt`: DateTime
    - `orderItems`: One-to-Many relationship with `OrderItem`

5. **OrderItems**
    - `id`: Integer, Primary Key
    - `orderId`: Integer, Foreign Key to `Orders`
    - `order`: Foreign Key to `Orders`
    - `itemId`: Integer, Foreign Key to `MenuItems`
    - `item`: Foreign Key to `MenuItems`
    - `quantity`: Integer
    - `price`: Float

6. **Cart**
    - `id`: Integer, Primary Key
    - `userId`: Integer, Foreign Key to `Users` (UserCart)
    - `restaurantId`: Integer, Foreign Key to `Users` (RestaurantCart)
    - `restaurant`: Foreign Key to `Users` (RestaurantCart)
    - `user`: Foreign Key to `Users` (UserCart)
    - `itemId`: Integer, Foreign Key to `MenuItems`
    - `item`: Foreign Key to `MenuItems`
    - `quantity`: Integer
    - `price`: Float

### Enums

1. **Role**
    - `CUSTOMER`
    - `STAFF`

2. **OrderStatus**
    - `PENDING`
    - `COMPLETED`
    - `DECLINED`

3. **MenuStatus**
    - `AVAILABLE`
    - `UNAVAILABLE`

## Setup and Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Ary0405/ziggy
   cd ziggy
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   APPLICATION_SECRET=your32characterlongsecret
   DATABASE_URL="your_database_url"
   NEXT_PUBLIC_PROJECT_URL="your_project_url"
   NEXT_PUBLIC_SUPABASE_KEY="your_supabase_anon_key"
   ```

4. **Setup Database**
   ```sh
   npx prisma db push
   npx prisma generate
   ```

5. **Start the Application**
   ```sh
   npm run dev
   ```

## Authentication

Authentication is implemented using Iron Session, which provides secure, stateless, server-side sessions. Here's a brief overview of how it works:

1. **Session Initialization**: Iron Session is initialized with a secret key stored in environment variables.
2. **Session Management**: When a user logs in, a session is created and encrypted with the secret key, then stored in a cookie.
3. **Session Validation**: On subsequent requests, the session cookie is decrypted and validated to authenticate the user.

## Hosted URL

The application is hosted at: [https://ziggy-eta.vercel.app](https://ziggy-eta.vercel.app)

## Additional Features

- **Edit Menu Items**: Staff can edit the details of existing menu items.
- **Delete Menu Items**: Staff can delete menu items from the menu.
- **Edit Menu Categories**: Staff can edit the details of existing menu categories.
- **Delete Menu Categories**: Staff can delete menu categories.

## Technologies Used

- **Framework**: Next.js
- **Database**: Supabse(PostgreSQL)
- **Authentication**: Iron Session
- **ORM**: Prisma

## Contributing

If you wish to contribute to this project, please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

Made with ❤️ [Aryan Sethia](https://www.linkedin.com/in/aryan-sethia/)