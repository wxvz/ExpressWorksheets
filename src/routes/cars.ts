import { Router } from 'express';
import { CarController } from '../controllers/cars';
import {authenticateKey} from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import { carSchemaZod, updateCarSchemaZod }  from '../models/cars';


const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', carController.getCarById);
router.post('/',  authenticateKey, validate(carSchemaZod), carController.createCar);
router.put('/:id', authenticateKey, validate(updateCarSchemaZod), carController.updateCar);
router.delete('/:id', authenticateKey, carController.deleteCar);

export default router;
