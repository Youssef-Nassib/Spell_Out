import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimitter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
/* we have add it till we can have access to the req.body that be send as a json by deff we cannot access them */

app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    })
);

/*app.use((req,res,next)=>{
    console.log(`REQ METHOD IS ${req.method} && REQ URL is ${req.url}`);
    next();
})
    */
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);


connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log("server started on PORT:",PORT);
});
});
