import { PrismaClient} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === 'GET') {
        try {
            const modalCategoryId = req.query.id as string;

            const id: number = parseInt(modalCategoryId);

            const modals = await prisma.modal.findMany({ where: { modalCategoryId: id } });
            
            return res.status(200).json(modals);
        } catch (e) {
            return res.status(400).json([]);
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}