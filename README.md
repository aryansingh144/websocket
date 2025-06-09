# websocket
Setup and Run Server
bash
cd server
pnpm install
pnpm start
The server will start on http://localhost:8000.

Setup and Run Client
Open a new terminal:

bash
cd client
pnpm install
pnpm run dev
The client will start on http://localhost:5173.

Usage
Open the client URL in multiple browser tabs or devices.

Each client will connect with a randomly generated username.

Cast votes and see live updates reflected instantly across all clients.

Refreshing the page generates a new random username (no persistent login).

Notes
Usernames are generated randomly on each client load; no authentication is implemented.

Votes and user sessions are not persisted in a database.

Frequent server restarts may cause clients to reconnect and log multiple connections.

For production use, consider adding authentication and persistent storage.

Troubleshooting
If you encounter errors related to missing packages, ensure all dependencies are installed with pnpm install.

To avoid nodemon restarting too frequently, configure .nodemon.json to ignore unnecessary files.

If you see errors related to tailwindcss/version.js, ensure you are using compatible versions of flowbite-react and tailwindcss, or apply patch commands as per Flowbite React docs.

Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements.

License
MIT License