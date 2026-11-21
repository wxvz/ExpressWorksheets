import { Router } from 'express';
import { CarController } from '../controllers/cars';
import {authenticateKey} from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import { createCarSchemaZod, updateCarSchemaZod, carParamsSchema }  from '../models/cars';
import { authenticateJWT } from '../middleware/auth.middleware';


const router = Router();
const carController = new CarController();

router.get('/', authenticateKey, carController.getCars);

router.get('/:id', authenticateKey, validate(carParamsSchema), carController.getCarById);
router.post('/',  authenticateKey, validate(createCarSchemaZod), carController.createCar);
router.put('/:id', authenticateKey, validate(updateCarSchemaZod), carController.updateCar);
router.delete('/:id', authenticateJWT, authenticateKey, validate(carParamsSchema), carController.deleteCar);

export default router;
