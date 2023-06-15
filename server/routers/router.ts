import Router from 'koa-router'
const router = new Router();

router.post('/user')
router.post('/dogs')
router.get('/user')
router.get('dogs')
router.put('/dogs')

export default router;