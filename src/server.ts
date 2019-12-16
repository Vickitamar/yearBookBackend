import app from "./app/app";
import databaseConnection from "./database/database.connection";

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT: number = Number(process.env.PORT) || 4000;
console.log(`Running on port: ${PORT}`);

databaseConnection.then(() => app.listen(PORT)).catch(console.error);
