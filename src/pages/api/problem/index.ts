import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    
     if (method === 'GET') {
        const problems = await prisma.problem.findMany();
        return res.status(200).json({ problems });
    }

    return res.status(404).json({ message: 'Route not found.' });
}