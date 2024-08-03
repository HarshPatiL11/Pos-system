import express from 'express';
import formidable from 'express-formidable';
import { 
    createItemController, 
    getAllItemController,
    getItemByNameController,
    deleteItemController,
    updateItemController 
} from '../Controller/itemController.js';
import { getAllUser, registerUser,getUserByID, userUpdateController, userDelete, userLoginController } from '../Controller/userController.js';


const router = express.Router();

router.post('/item/Add',formidable(),createItemController);
router.get('/item/allItems',getAllItemController);
router.get('/item/:name',getItemByNameController);
router.delete('/item/delete/:name', deleteItemController); // DELETE endpoint for deleting an item
router.put('/item/update/:name', updateItemController);

// login
router.post('/POS/user/newUser', registerUser);
router.get('/POS/user/allUsers',getAllUser);                      //working
router.get('/POS/user/:id',getUserByID);      
router.post('/POS/user/:id',userLoginController);                      //working
router.put('/POS/user/edit/:id',userUpdateController);         //working
router.delete('/POS/user/removeUser/:id',userDelete);                  //working


export default router;