import { PrismaClient, Problem, TypeLoad } from "@prisma/client";
import jwtDecode from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next"
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

type Payload = {
    vehicleId: number;
    userId: number;
    orderStatusId: number;
    userLatitude: string;
    userLongitude: string;
    problemDescription: string;
    loadWeight: number;
    problems: Problem[];
    typeLoads: TypeLoad[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

     if (method === 'POST') {
        const { 
            vehicleId,
            userId,
            orderStatusId,
            userLatitude,
            userLongitude,
            problemDescription,
            loadWeight,
            problems, 
            typeLoads
        }: Payload = JSON.parse(req.body);
     
        try {
            const { id: orderServiceId } = await prisma.orderService.create({
                data: {
                    vehicleId,
                    userId,
                    orderStatusId,
                    userLatitude: userLatitude.toString(),
                    userLongitude: userLongitude.toString(),
                    problemDescription,
                    loadWeight
                }
            });

            for (const problem of problems) {
                await prisma.orderServiceToProblem.create({ data: { orderServiceId, problemId: problem.id } });
            }
            
            for (const typeLoad of typeLoads) {
                await prisma.orderServiceToTypeLoad.create({ data: { orderServiceId, typeLoadId: typeLoad.id } });
            }

            return res.status(201).json({ orderServiceId });
        } catch (e) {
            return res.status(400).json({ message: "Erro ao realizar solicitação, tente novamente." });
        }
    }

    if (method === 'PATCH') {
        const { orderServiceId, modalId } = JSON.parse(req.body);

        try {
            const orderService = await prisma.orderService.update({
                data: { modalId }, 
                where: { id: orderServiceId }
            });
    
            return res.status(200).json(orderService);
        } catch(e) {
            return res.status(400).json({ message: "Erro ao procurar modal, tente novamente." });
        }
    }

    if (method === 'GET') {
        try {
            const { accessToken } = (jwtDecode(req.cookies['next-auth.session-token'] as string)) as JWT;
            const { id: userId } = jwtDecode(accessToken as string) as any;

            const serviceOrders = await prisma.orderService.findMany({ 
                where: { userId },
                include: { vehicle: true, orderStatus: true },
                orderBy: { createdAt: 'desc' }
            });
            
            return res.status(200).json(serviceOrders);
        } catch (e) {
            return res.status(400).json([]);
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}