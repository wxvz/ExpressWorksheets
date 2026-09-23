import express, {Application, Request, Response} from "express" ;

const PORT = process.env.PORT || 3000;

const app: Application = express();

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

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });


