import jwt from 'jsonwebtoken';
import { TOKEN } from './constants';

export interface Claims {
    exp: number;
    iat: number;
    is_client: boolean;
    email: string;
}

export function encodeJWT(email: string, is_client: boolean): string {
    const now = Math.floor(Date.now() / 1000);
    const expire = 30 * 24 * 60 * 60;

    const claims: Claims = {
        exp: now + expire,
        iat: now,
        email,
        is_client,
    };

    if (!TOKEN) throw new Error('TOKEN não definido');

    return jwt.sign(claims, TOKEN);
}

export function decodeJWT(token: string): Claims | null {
    if (!TOKEN) throw new Error('TOKEN não definido');

    try {
        const decoded = jwt.verify(token, TOKEN) as Claims;
        return decoded;
    } catch (err) {
        return null;
    }
}
