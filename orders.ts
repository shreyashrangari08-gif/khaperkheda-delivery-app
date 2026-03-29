import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db/schema";
import { CreateOrderBody, GetOrdersResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
    const data = GetOrdersResponse.parse(
      orders.map((order) => ({
        id: order.id,
        customerName: order.customerName,
        address: order.address,
        phone: order.phone ?? "",
        items: order.items,
        totalAmount: Number(order.totalAmount),
        notes: order.notes ?? "",
        status: order.status,
        createdAt: order.createdAt.toISOString(),
      }))
    );
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orders");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const body = CreateOrderBody.parse(req.body);

    const [order] = await db
      .insert(ordersTable)
      .values({
        customerName: body.customerName,
        address: body.address,
        phone: body.phone ?? "",
        items: body.items,
        totalAmount: String(body.totalAmount),
        notes: body.notes ?? "",
        status: "pending",
      })
      .returning();

    res.status(201).json({
      id: order.id,
      customerName: order.customerName,
      address: order.address,
      phone: order.phone ?? "",
      items: order.items,
      totalAmount: Number(order.totalAmount),
      notes: order.notes ?? "",
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(400).json({ error: "Invalid order data" });
  }
});

export default router;
