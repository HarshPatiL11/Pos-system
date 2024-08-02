import express from 'express';
import formidable from 'express-formidable';
import { 
    createItemController, 
    getAllItemController,
    getItemByNameController,
    deleteItemController,
    updateItemController 
} from '../Controller/itemController.js';


const router = express.Router();

router.post('/item/Add',formidable(),createItemController);
router.get('/item/allItems',getAllItemController);
router.get('/item/:name',getItemByNameController);
router.delete('/item/delete/:name', deleteItemController); // DELETE endpoint for deleting an item
router.put('/item/update/:name', updateItemController);

export default router;