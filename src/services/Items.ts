import { ItemModel, IItem } from "../models/Items";
import { HydratedDocument } from "mongoose";

export class ItemService {
  async getAllItems(): Promise<IItem[]> {
    return await ItemModel.find().lean();
  }

  async getItemById(id: string): Promise<IItem | null> {
    return await ItemModel.findById(id).lean();
  }

  async createItem(itemData: IItem): Promise<HydratedDocument<IItem>> {
    const item = new ItemModel(itemData);
    return await item.save();
  }

  async updateItem(
    id: string,
    itemData: Partial<IItem>,
  ): Promise<IItem | null> {
    return await ItemModel.findByIdAndUpdate(id, itemData, {
      returnDocument: "after",
    }).lean();
  }

  async deleteItem(id: string): Promise<IItem | null> {
    return await ItemModel.findByIdAndDelete(id).lean();
  }
}
