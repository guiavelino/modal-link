import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

     if (method === 'POST') {
        // TODO: Adicionar tipos de carga e problemas
        const { 
            modalId,
            vehicleId,
            userId,
            orderStatusId,
            userLatitude,
            userLongitude,
            problemDescription,
            loadWeight
        } = JSON.parse(req.body);
        
        try {
            const { id } = await prisma.orderService.create({
                data: {
                    modalId,
                    vehicleId,
                    userId,
                    orderStatusId,
                    userLatitude,
                    userLongitude,
                    problemDescription,
                    loadWeight
                }
            })

            return res.status(201).json({ id });
        } catch (e) {
            return res.status(400).json({ message: "Erro ao realizar solicitação, tente novamente." });
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}