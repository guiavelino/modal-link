import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    
    if (method === 'PATCH') {
        const { orderServiceId, orderStatusId } = JSON.parse(req.body);

        const orderService = await prisma.orderService.update({
            data: { orderStatusId }, 
            where: { id: orderServiceId }
        });

        return res.status(200).json(orderService);
    }

    return res.status(404).json({ message: 'Route not found.' });
}