import { Request, Response } from "express";
import { ItemService } from "../services/Items";
import { itemSchemaZod } from "../models/Items";

const itemService = new ItemService();

export class ItemsController {
  /**
   * @openapi
   * /items:
   *   get:
   *     summary: Retrieve all items
   *     tags:
   *       - Items
   *     responses:
   *       200:
   *         description: Successfully retrieved items
   *       500:
   *         description: Internal server error
   */
  getItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await itemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  };

  /**
   * @openapi
   * /items/{id}:
   *   get:
   *     summary: Get an item by ID
   *     tags:
   *       - Items
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Item found
   *       404:
   *         description: Item not found
   *       500:
   *         description: Internal server error
   */
  getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const item = await itemService.getItemById(id);
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching item", error });
    }
  };

  /**
   * @openapi
   * /items:
   *   post:
   *     summary: Create a new item
   *     tags:
   *       - Items
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateItemInput'
   *     responses:
   *       201:
   *         description: Successfully created item
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  createItem = async (req: Request, res: Response): Promise<void> => {
    const validation = itemSchemaZod.safeParse(req.body);

    console.log(validation);

    if (!validation.success) {
      res
        .status(400)
        .json({ message: "Invalid item data", errors: validation.error.issues });
      return;
    }

    try {
      const newItem = await itemService.createItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Error inserting item into MongoDB", error });
    }
  };

  updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const updatedItem = await itemService.updateItem(id, req.body);
      if (!updatedItem) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error });
    }
  };
  /**
   * @openapi
   * /items/{id}:
   *   delete:
   *     summary: Delete an item by ID
   *     tags:
   *       - Items
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Item Deleted successfully
   *       404:
   *         description: Item not found
   *       500:
   *         description: Internal server error
   */
  deleteItem = async (_req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(_req.params.id)
        ? _req.params.id[0]
        : _req.params.id;
      const deletedItem = await itemService.getItemById(id);
      if (!deletedItem) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(200).json(deletedItem);
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  };
}
