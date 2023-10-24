import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === 'POST') {
        try {
            const {
                userId,
                brand,
                model,
                year,
                transitBoard,
                height,
                width,
                weight
            } = JSON.parse(req.body);

            const { id } = await prisma.vehicle.create({
                data: { userId, brand, model, year, transitBoard, height, width, weight }
            })
            
            return res.status(201).json({ id: id });
        } catch (e) {
            return res.status(400).json({ message: "Erro ao realizar cadastro, tente novamente." });
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}