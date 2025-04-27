# This is the backend of NUVANCE TECH
## all the api's for admin and others

# Setup

1. Clone the Repo:
    ```bash
    git clone https://github.com/Nuvance-Technologies/nuvance-api.git
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add the following:
    ```bash
    PORT=
    DATABASE_URL=
    JWT_ADMIN_SECRET=
    ```
4. Run the server:
    ```bash
    npm run dev
    ```

# API's

## Signup

```bash
POST /api/v1/auth/admin/signup
```
