import express from "express";
import { insertHero, updateHero, selectHeroes, selectHero, deleteHero } from './Controler/Hero.js';

const router = express();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/heroes', selectHeroes);
router.get('/hero', selectHero);
router.post('/hero', insertHero);
router.put('/hero', updateHero);
router.delete('/hero', deleteHero);

export default router;