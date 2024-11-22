import express, { Request, Response } from 'express'
import cors from 'cors'
import orderRouter from './app/modules/orders/order.route';
const app = express()

// parser or middleware
app.use(express.json());
app.use(cors());




// Order routes
app.use('/api/orders', orderRouter)


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
export default app;