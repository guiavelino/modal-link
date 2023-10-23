import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

     if (method === 'POST') {
        const { name, lastName, cpf, email, password } = JSON.parse(req.body);
        
        try {
            const userByEmail = await prisma.user.findUnique({ where: { email } });
            const userByCpf = await prisma.user.findUnique({ where: { cpf } });

            if (!!userByEmail) {
                return res.status(400).json({ message: "Esse e-mail já está vinculado a um usuário." });
            }

            if (!!userByCpf) {
                return res.status(400).json({ message: "Esse CPF já está vinculado a um usuário." });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const { id } = await prisma.user.create({
                data: {
                    userTypeId: 1,
                    name, 
                    lastName,
                    fullName: `${name} ${lastName}`,
                    cpf, 
                    email, 
                    password: hash
                }
            })
            
            return res.status(201).json({ id });
        } catch (e) {
            return res.status(400).json({ message: "Erro ao realizar cadastro, tente novamente." });
        }
    }

    return res.status(404).json({ message: 'Route not found.' });
}