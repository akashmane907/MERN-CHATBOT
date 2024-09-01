import { connect,disconnect } from "mongoose";
export default async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log( error);
        throw new error("Failed to connect to MongoDB");
        
    }
}

async function disconnectFromDatabase(){
    try{
        await disconnect();
        console.log("Disconnected from MongoDB");
    }catch (error) {
        console.log( error);
        throw new error("Failed to disconnect from MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };