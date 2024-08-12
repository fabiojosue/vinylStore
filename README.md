# Vinyl Store Project Documentation

## 1. Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript.
- **Vite**: A frontend build tool that focuses on speed.

### Backend
- **Java Spring Boot**: A framework for building Java applications.
- **GraphQL**: A query language for APIs.
- **Maven**: A build automation tool for Java projects.

## 2. Project Distribution and Structure

### Frontend
- The frontend is located under the `src/` directory, with the following subdirectories:
  - **assets/**: Contains static assets like images.
  - **components/**: Contains React components that make up the UI. Examples include:
    - `Carousel.tsx`: A component for displaying a carousel of images.
    - `Vinyl.tsx`: A component for displaying vinyl records.
    - `DashboardSideNav.tsx`: A component for the sidebar navigation in the dashboard.
  - **pages/**: Contains the different pages of the application, such as:
    - `login.tsx`: The login page.
    - `dashboard.tsx`: The dashboard page.
    - `home.tsx`: The homepage.
  - **Service/**: Contains service files responsible for handling API requests. Examples include:
    - `VinylService.ts`: Service for managing vinyl records.
    - `ArtistService.ts`: Service for managing artists.
    - `AuthServiceGraphql.ts`: Service for handling authentication via GraphQL.

### Backend
- The backend is located under the `backend/` directory, structured as a typical Java Spring Boot project:
  - **`src/main/java/com/example/backend`**: Contains the main application code.
  - **`controller/`**: Handles incoming HTTP requests.
  - **`service/`**: Contains the business logic of the application.
  - **`repository/`**: Handles database interactions using Spring Data JPA.
  - **`resources/graphql`**: Contains GraphQL schema files.

## 3. Packages and Dependencies

### Frontend
- **react**: Core React library for building the user interface.
- **react-dom**: React library for DOM rendering.
- **typescript**: Adds static types to JavaScript, helping in catching errors during development.
- **@apollo/client**: Apollo client for handling GraphQL queries and mutations on the frontend.

### Backend
- **spring-boot-starter-web**: Starter for building web applications using Spring MVC.
- **spring-boot-starter-data-jpa**: Starter for using Spring Data JPA with Hibernate for database operations.
- **graphql-java**: GraphQL server implementation for Java, enabling the backend to handle GraphQL queries and mutations.

## 4. Backend Details

### Controllers
Controllers handle incoming HTTP requests and map them to the appropriate services. The following controllers are present in your project:

1. **`ArtistController.java`**:
   - Manages HTTP requests related to artists, such as adding, updating, retrieving, or deleting artist records.
   - Interacts with `ArtistService` to perform business logic.

2. **`AuthController.java`**:
   - Handles authentication-related operations, such as login and registration.
   - Utilizes `AuthService` for authentication processes.

3. **`VinylController.java`**:
   - Manages HTTP requests related to vinyl records.
   - Works with `VinylService` to handle the core operations.

4. **`UserController.java`**:
   - Manages user-related operations, like retrieving user profiles or managing user data.
   - Collaborates with `UserService` for the underlying logic.

### Services
Services contain the business logic of the application. They interact with repositories to perform CRUD operations.

1. **`ArtistService.java`**:
   - Contains the logic for managing artists, including operations like searching, saving, or deleting artists.
   - Utilizes `ArtistRepository` for database operations.

2. **`AuthService.java`**:
   - Manages authentication processes such as user verification, password encryption, and token generation.
   - Works closely with `UserRepository` to validate user credentials.

3. **`VinylService.java`**:
   - Handles all vinyl-related business logic, including creating, retrieving, updating, and deleting vinyl records.
   - Communicates with `VinylRepository` for database interactions.

4. **`UserService.java`**:
   - Manages user-related operations, such as retrieving user details or updating user information.
   - Leverages `UserRepository` for database access.

### Repositories
Repositories are responsible for data access. They interact with the database to perform CRUD operations.

1. **`ArtistRepository.java`**:
   - Provides methods for querying the artist data in the database.
   - Extends `JpaRepository` to leverage Spring Data JPA.

2. **`VinylRepository.java`**:
   - Manages database operations related to vinyl records.
   - Inherits from `JpaRepository` to utilize pre-defined CRUD methods.

3. **`UserRepository.java`**:
   - Handles operations related to user data in the database.
   - Also extends `JpaRepository`, providing built-in CRUD functionalities.
