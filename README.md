<div align="center" id="readme-top">

<h3 align="center">Catalyst</h3>

  <p align="center">
    Catalyst is a site to share, organize and expand your ideas.
    <br />
    <a href="https://github.com/gomisroca/catalyst"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://be-catalyst.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/gomisroca/catalyst/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/gomisroca/catalyst/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#api-specification">API Specification</a>
      <ul>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#users">Users</a></li>
      </ul>
    </li>
    <li>
      <a href="#adjustments">Adjusting the Codebase</a>
      <ul>
        <li><a href="#login-providers">Login Providers</a></li>
        <li><a href="#database-options">Database Options</a></li>
        <li><a href="#image-handling">Image Handling</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project">📡 About The Project</h2>

![Catalyst Screen Shot](screenshot.webp)

The project is a web application that allows the creation of projects and the collaboration within them. A project in this web application can be understood as multiple branches and posts containing text and media content. As such, what purpose each project has is left to its author, as is the way in which collaboration will happen.

### Built With

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)  
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Zod Badge](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=fff&style=for-the-badge)  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- GETTING STARTED -->
<h2 id="getting-started">📋 Getting Started</h2>

Follow these steps to get your own local copy of the project up and running.

<h3 id="prerequisites">Prerequisites</h3>

Make sure you have node.js and npm installed on your machine.

- npm
  ```sh
  npm install npm@latest -g
  ```
  Beyond this, if you plan on adjusting the codebase, you might need some knowledge of Express, React, APIs, authentication processess or databases.

<h3 id="installation">Installation</h3>

1. Set up your login providers. By default, we use [Google OAuth](https://www.passportjs.org/packages/passport-google-oauth/), [Facebook OAuth](https://www.passportjs.org/packages/passport-facebook/) and [Discord OAuth](https://www.passportjs.org/packages/passport-discord/) via [Passport](https://www.passportjs.org/). If you want to use different login methods, you will have to adjust the codebase accordingly. More details [here](#login-providers).
2. Set up your database. By default, we use PostgreSQL via Prisma. If you want to use a different database, you will have to adjust the codebase accordingly. More details [here](#database-options).
3. Set up image hosting. By default, we use Supabase Buckets. If you want to use a different image hosting service, you will have to adjust the codebase accordingly. More details [here](#image-hosting).
4. Clone the repo
   ```sh
   git clone https://github.com/gomisroca/catalyst.git
   ```
5. Install NPM packages in both _backend_ and _frontend_ folders
   ```sh
   npm install
   ```
6. Check `.env.example` and create an `.env` file in both _backend_ and _frontend_ folders
   ```js
   DATABASE_URL="postgresql://postgres:password@localhost:5432/catalyst"
   DIRECT_URL="postgresql://postgres:password@localhost:5432/catalyst"
   etc...
   ```
7. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- USAGE EXAMPLES -->
<h2 id="usage">💠 Usage</h2>

You can run the project in development mode with **npm run dev** in both _backend_ and _frontend_ folders.

After initializing the database, run **npm run db:push** in the _backend_ folder to apply the Prisma schema.

All necessary environment variables can be found in **.env.example** in both _backend_ and _frontend_ folders.

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- API SPECIFICATION -->
<h2 id="api-specification">🚀 API Specification</h2>

<h3 id="projects">📚 Projects</h3>
<details>
  <summary>Methods and Procedures</summary>

| Method | Endpoint                   | Description               | Input                                                                     | Output    |
| ------ | -------------------------- | ------------------------- | ------------------------------------------------------------------------- | --------- |
| GET    | `/`                        | Get all projects          |                                                                           | Project[] |
| POST   | `/`                        | Create a project          | Name, Description, Avatar, Permissions, Branch Name?, Branch Description? | Project   |
| GET    | `/:id`                     | Get a unique project      |                                                                           | Project   |
| PUT    | `/:id`                     | Update a project          | Name, Description, Avatar?, Permissions                                   | Project   |
| POST   | `/:projectId/branch`       | Create a branch           | Name, Description, Parent Branch?, Permissions                            | Project   |
| GET    | `/branch/:id`              | Get a unique branch       |                                                                           | Branch    |
| PUT    | `/branch/:id`              | Update a branch           | Name, Description, Permissions, Project ID                                | Branch    |
| POST   | `/branch/:id/post`         | Create a post             | Content, Media?                                                           | Post      |
| PUT    | `/post/:id`                | Update a post             | Content, Media?                                                           | Post      |
| POST   | `/branch/:id/interactions` | Add Branch Interaction    | Interaction                                                               | 200       |
| DELETE | `/branch/:id/interactions` | Remove Branch Interaction | Interaction                                                               | 200       |
| POST   | `/post/:id/interactions`   | Add Post Interaction      | Interaction                                                               | 200       |
| DELETE | `/post/:id/interactions`   | Remove Post Interaction   | Interaction                                                               | 200       |

</details>

<h3 id="users">👤 Users</h3>
<details>
  <summary>Methods and Procedures</summary>

| Method | Endpoint             | Description                             | Input                                       | Output       |
| ------ | -------------------- | --------------------------------------- | ------------------------------------------- | ------------ |
| GET    | `/`                  | Health Check                            |                                             | 200          |
| GET    | `/discord`           | Discord OAuth Authentication            |                                             | 200          |
| GET    | `/discord/callback`  | Discord OAuth Callback                  |                                             | JWT          |
| GET    | `/facebook`          | Facebook OAuth Authentication           |                                             | 200          |
| GET    | `/facebook/callback` | Facebook OAuth Callback                 |                                             | JWT          |
| GET    | `/google`            | Google OAuth Authentication             |                                             | 200          |
| GET    | `/google/callback`   | Google OAuth Callback                   |                                             | JWT          |
| POST   | `/sign-in`           | Register or log in user                 | Email, Password                             | Access Token |
| GET    | `/info`              | Logged-in user info                     |                                             | User         |
| GET    | `/:id`               | Specific user info                      |                                             | User         |
| PUT    | `/settings`          | Update logged-in user settings          | Username, Nickname, Email, Avatar, Password | JWT          |
| GET    | `/follows`           | Logged-in user follows                  |                                             | User[]       |
| POST   | `/:id/follow`        | Logged-in user follows specified user   | Profile ID                                  | 200          |
| POST   | `/:id/unfollow`      | Logged-in user unfollows specified user | Profile ID                                  | 200          |

</details>

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- ADJUSTMENTS -->
<h2 id="adjustments">🔨 Adjusting the Codebase</h2>

  <h3 id="login-providers">🔑 Login Providers</h3>

By default, we use [Google OAuth](https://www.passportjs.org/packages/passport-google-oauth/), [Facebook OAuth](https://www.passportjs.org/packages/passport-facebook/) and [Discord OAuth](https://www.passportjs.org/packages/passport-discord/) via [Passport](https://www.passportjs.org/).  
 If you wish to keep using Passport, you can easily add more strategies to your project. You can read more about how to do this [here](https://www.passportjs.org/packages/).

However, if you wish to move away from Passport, you will have to remove its package.
Then, you can implement your own authentication logic by reworking or removing the auth and oauth2 files found in _/utils_. Depending on the needs of your authentication process, you might need to adjust the database schemas and/or the sign in/out buttons.

  <h3 id="database-options">💾 Database Options</h3>

By default, we use PostgreSQL via Prisma. If you wish to use a different relational database, the switch should be mostly trivial, having only to adjust the settings in the backend folder _prisma/schema.prisma_.

If you wish to use a non-relational database (e.g. MongoDB), Prisma will help make the transition easier, but you will have to tinker the schema. You can read more about it in this [MongoDB article](https://www.mongodb.com/resources/compare/mongodb-postgresql/dsl-migrating-postgres-to-mongodb) and in the [Prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb).

  <h3 id="image-handling">🖼️ Image Handling</h3>

By default we use [Supabase Buckets](https://supabase.com/docs/guides/storage) for image handling. If you want to switch to a different method, in the backend, you can remove the _src/utils/supabase.js_ file and adjust the settings in _src/utils/upload-image_. Furthermore, in _src/utils/upload-checks_ you can modify which types of files and sizes are allowed.

The implementation of each image hosting method is beyond the scope of this documentation, but easy steps to follow should be provided by the option you choose.

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- ROADMAP -->
<h2 id="roadmap">📍 Roadmap</h2>

- [ ] Improve API structure (e.g. repetition, redundancy)
  - [ ] Decouple projects, branches, posts
- [ ] API User Verification as Middleware
- [ ] Improve Frontend structure
  - [ ] Group components by their use (i.e. Navbar components in the navbar folder)
  - [ ] Remove redundant or unused components
  - [ ] Simplify components (i.e. buttons instead of dropdowns)
- [ ] Add many more testing instances
- [ ] Reintroduce Typescript for backend
- [ ] Improve 'For You' page with more fine-tuned decision-making

See the [open issues](https://github.com/gomisroca/catalyst/issues) for a full list of proposed features (and known issues).

<p align="right">[<a href="#readme-top">back to top</a>]</p>

<!-- LICENSE -->
<h2 id="license">🔒 License</h2>

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
<h2 id="contact">📧 Contact</h2>

Adrià Gomis - [@gomisroca](https://github.com/gomisroca) - gomisroca@gmail.com

<p align="right">[<a href="#readme-top">back to top</a>]</p>
