import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import authRoutes from './routes/auth';
import {authenticateKey} from './middleware/auth.middleware';
import { routeLogging } from './middleware/route.middleware';
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from "./middleware/errorHandling.middleware";



export const app: Application = express();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cars',authenticateKey, carRoutes);
app.use(errorHandler)
app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);
  
app.use((req, _res, next) => {  
    routeLogging(req, _res, next);
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
