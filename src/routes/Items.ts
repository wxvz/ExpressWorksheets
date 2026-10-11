import { Router } from "express";
import { ItemsController } from "../controllers/Items";
import { authenticateKey } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { itemSchemaZod, updateItemSchemaZod } from "../models/Items";

const router = Router();
const itemsController = new ItemsController();

router.get("/", itemsController.getItems);

router.get("/:id", itemsController.getItemById);

router.post(
  "/",
  authenticateKey,
  validate(itemSchemaZod),
  itemsController.createItem,
);

router.put(
  "/:id",
  authenticateKey,
  validate(updateItemSchemaZod),
  itemsController.updateItem,
);
router.delete("/:id", authenticateKey, itemsController.deleteItem);

export default router;
