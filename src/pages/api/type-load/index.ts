import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    
     if (method === 'GET') {
        const typeLoads = await prisma.typeLoad.findMany();
        return res.status(200).json({ typeLoads });
    }

    return res.status(404).json({ message: 'Route not found.' });
}