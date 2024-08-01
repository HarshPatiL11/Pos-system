import express from 'express';
import formidable from 'express-formidable';
import { createItemController, getAllItemController, getItemByNameController } from '../Controller/itemController.js';


const router = express.Router();

router.post('/item/Add',formidable(),createItemController);
router.get('/item/allItems',getAllItemController);
router.get('/item/:name',getItemByNameController)

export default router;