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

            const vehicleByTransitBoard = await prisma.vehicle.findUnique({ where: { transitBoard } });

            if (!!vehicleByTransitBoard) {
                return res.status(400).json({ message: "Erro ao realizar cadastro, a placa informada já foi cadastrada." });
            }

            const { id } = await prisma.vehicle.create({
                data: { userId, brand, model, year, transitBoard, height, width, weight }
            })
            
            return res.status(201).json({ id: id });
        } catch (e) {
            return res.status(400).json({ message: "Erro ao realizar cadastro, tente novamente." });
        }
    }

    if (method === 'PUT') {
        try {
            const {
                id,
                userId,
                brand,
                model,
                year,
                transitBoard,
                height,
                width,
                weight
            } = JSON.parse(req.body);

            const vehicle = await prisma.vehicle.findFirst({ where: { id, userId } });

            if (vehicle) {
                const vehicleByTransitBoard = await prisma.vehicle.findUnique({ where: { transitBoard } });

                if (!!vehicleByTransitBoard) {
                    if (vehicleByTransitBoard?.id !== vehicle.id) {
                        return res.status(400).json({ message: "Erro ao atualizar informações, a placa informada está vinculada a outro usuário." });
                    }
                }
                
                if (brand && model && year && transitBoard && height && width && weight) {
                    const data = await prisma.vehicle.update({
                        where: { id },
                        data: { brand, model, year, transitBoard, height, width, weight }
                    });
                
                    return res.status(200).json({ ...data });
                }

                return res.status(200).json("Erro ao atualizar informações, preencha todos os campos.");
            }
        } catch (e) {
            return res.status(400).json({ message: "Erro ao atualizar informações, tente novamente." });
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}