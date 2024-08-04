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
import { addBillControl,getAllBills,getBillById } from '../Controller/billController.js';


const router = express.Router();

router.post('/item/Add',formidable(),createItemController);
router.get('/item/allItems',getAllItemController);
router.get('/item/:name',getItemByNameController);
router.delete('/item/delete/:name', deleteItemController); 
router.put('/item/update/:name', updateItemController);

// login
router.post('/POS/user/newUser', registerUser);
router.get('/POS/user/allUsers',getAllUser);                      
router.get('/POS/user/:id',getUserByID);      
router.post('/POS/user/:id',userLoginController);                      
router.put('/POS/user/edit/:id',userUpdateController);         
router.delete('/POS/user/removeUser/:id',userDelete);                  

router.post('/bill/addBill',addBillControl);
router.get('/bill/getAllBills',getAllBills);
router.get('/bill/:billID',getBillById);


export default router;