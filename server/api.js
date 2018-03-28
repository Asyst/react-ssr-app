
import { Router } from 'express';

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action);
    res.status(200).json(action);
}

const router = Router();

router.get('/people', (req, res) => {
    // console.log('server api -> ', req.store);
    res.status(200).json(req.store.getState().people)
});

export default router;