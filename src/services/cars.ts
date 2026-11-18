import { CarModel, ICar } from '../models/cars'
import { HydratedDocument } from 'mongoose';
import { NotFoundError } from '../utils/apperror';

export class CarService {

  async getAllCars(): Promise<ICar[] | null> {
    const cars = await CarModel.find().lean();
    if (!cars) throw new NotFoundError('Car');
    return cars;
  }

  async getCarById(id: string): Promise<ICar | null> {
    const car = await CarModel.findById(id).lean();
    if (!car) throw new NotFoundError('Car');
    return car;
  }

  async createCar(carData: ICar): Promise<HydratedDocument<ICar>> {
    const car = new CarModel(carData);
    return await car.save();
  }

  async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | null> {
    const car = await CarModel.findByIdAndUpdate(id, carData, { returnDocument: 'after' }).lean();
    if (!car) throw new NotFoundError('Car');
    return car;
  }

  async deleteCar(id: string): Promise<ICar | null> {
    const car = await CarModel.findByIdAndDelete(id).lean();
    if (!car) throw new NotFoundError('Car');
    return car;
  }
}
