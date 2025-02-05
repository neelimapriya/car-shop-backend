import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import orderRouter from './app/modules/orders/order.route';
import carRouter from './app/modules/cars/car.route';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parser or middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:['http://localhost:5173'], credentials:true}));



app.use('/api',router)
const getAController = (req: Request, res: Response) => {
  res.send('Car shop server is running!')
};

app.get('/', getAController);

// console.log(process.cwd());

app.use(globalErrorHandler);

// not found
app.use(notFound);


export default app;