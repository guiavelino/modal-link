import { PrismaClient} from "@prisma/client";
import jwtDecode from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next"
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === 'GET') {
        try {
            const orderServiceId = req.query.id as string;

            const id: number = parseInt(orderServiceId);
            const { accessToken } = (jwtDecode(req.cookies['next-auth.session-token'] as string)) as JWT;
            const { id: userId } = jwtDecode(accessToken as string) as any;

            const orderService = await prisma.orderService.findUnique({ 
                where: { id, userId }, 
                include: { 
                    modal: {
                        include: {
                            user: true,
                            modalCategory: true
                        }
                    }
                } 
            })
            
            return res.status(200).json({ ...orderService });
        } catch (e) {
            return res.status(400).json([]);
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}