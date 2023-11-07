import { Router } from 'express';

const authRouter = Router();
authRouter.get('/signin', async (req, res) => {
  res.render('Layout', { });
});
authRouter.get('/signup', async (req, res) => {
  res.render('Layout', { });
});
export default authRouter;