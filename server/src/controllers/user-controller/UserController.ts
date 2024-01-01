import express from 'express'
const userRouter = express.Router();


userRouter.get('/', (req, res) => {
    res.send('Hello World! USER');
});
export default userRouter;