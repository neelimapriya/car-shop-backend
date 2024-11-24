import express, { Request, Response } from 'express'
import cors from 'cors'
import orderRouter from './app/modules/orders/order.route';
import carRouter from './app/modules/cars/car.route';
const app = express()

// parser or middleware
app.use(express.json());
app.use(cors());




// Order routes
app.use('/api/orders', orderRouter)

// car routes
app.use('/api/cars', carRouter)

app.get('/', (req:Request, res:Response) => {
  res.send('Car shop server is running!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
export default app;