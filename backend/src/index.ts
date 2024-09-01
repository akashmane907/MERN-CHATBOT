import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 5000;

connectToDatabase()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Connected to database & server running on port ${PORT}`);
        });

        server.on('error', (err) => {
            console.error(`Error occurred while trying to bind port ${PORT}:`, err);
            process.exit(1);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    });
