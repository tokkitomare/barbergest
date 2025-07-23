import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export async function addEvent(req: Request, res: Response) {
    const { entity } = req.params;
    const payload = req.body;

    try {
        switch (entity) {
            case 'clients':
                await prisma.clients.create({ data: payload });
                break;

            case 'staff':
                await prisma.staff.create({ data: { ...payload, uuid: crypto.randomUUID() } });
                break;

            case 'services':
                await prisma.services.create({
                    data: {
                        name: payload.name,
                        description: payload.description ?? 'Sem descrição',
                        price: payload.price,
                    },
                });
                break;

            case 'appointments':
                await prisma.appointments.create({ data: payload });
                break;

            case 'payments':
                await prisma.payments.create({ data: payload });
                break;

            case 'products':
                await prisma.products.create({
                    data: {
                        name: payload.name,
                        description: payload.description ?? 'Sem descrição',
                        price: payload.price,
                        stock: payload.stock,
                    },
                });
                break;

            case 'cash_register':
                await prisma.cashRegister.create({
                    data: {
                        openedAt: payload.opened_at,
                        closedAt: payload.closed_at ?? new Date(),
                        initialBalance: payload.initial_balance,
                        finalBalance: payload.final_balance ?? 0,
                    },
                });
                break;

            case 'reports':
                await prisma.reports.create({ data: payload });
                break;

            case 'client_appointments':
                await prisma.clientAppointments.create({ data: payload });
                break;

            default:
                return res.status(400).json({ error: 'Entity type not supported' });
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: String(error) });
    }
}

export async function viewEvents(req: Request, res: Response) {
    const { entity } = req.params;

    try {
        let data;
        switch (entity) {
            case 'clients':
                data = await prisma.clients.findFirst();
                if (!data) return res.status(404).json({ error: 'No clients' });
                break;

            case 'staff':
                data = await prisma.staff.findFirst();
                if (!data) return res.status(404).json({ error: 'No staff' });
                break;

            case 'services':
                data = await prisma.services.findFirst();
                if (!data) return res.status(404).json({ error: 'No services' });
                break;

            case 'appointments':
                data = await prisma.appointments.findFirst();
                if (!data) return res.status(404).json({ error: 'No appointments' });
                break;

            case 'payments':
                data = await prisma.payments.findFirst();
                if (!data) return res.status(404).json({ error: 'No payments' });
                break;

            case 'products':
                data = await prisma.products.findFirst();
                if (!data) return res.status(404).json({ error: 'No products' });
                break;

            case 'cash_register':
                data = await prisma.cashRegister.findFirst();
                if (!data) return res.status(404).json({ error: 'No cash register entries' });
                break;

            case 'reports':
                data = await prisma.reports.findFirst();
                if (!data) return res.status(404).json({ error: 'No reports' });
                break;

            case 'client_appointments':
                data = await prisma.clientAppointments.findFirst();
                if (!data) return res.status(404).json({ error: 'No client appointments' });
                break;

            default:
                return res.status(400).json({ error: 'Entity type not supported' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: String(error) });
    }
}
