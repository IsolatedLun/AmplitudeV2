import { MongoClient, ServerApiVersion } from "mongodb";
import { envVariables } from "../globals";

async function ping() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("[Ampl] Ping successful, connected to db");
    } catch(err) {
        console.error(err);
    }
}

const client = new MongoClient(envVariables.mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});


ping();

let mongoClient = client.db("amplitude");
export default mongoClient;