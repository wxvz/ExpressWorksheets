import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";




const port = env.port;


const app: Application = express();

app.use('/api/v1/cars', carRoutes);
app.use(express.json());

app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Frank's server"
    });
});
app.get("/pineapple", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Pineapple route"
    });
});

app.listen(port, () => {
    console.log("Server is running on port", port   );
    });

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
startServer();