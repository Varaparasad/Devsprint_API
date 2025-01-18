import {Router} from "express"
import {home,year} from '../controllers/articles.controller.js'
const router=Router()

router.get('/:category',home)
router.get('/:category/:page',home)


export {router}