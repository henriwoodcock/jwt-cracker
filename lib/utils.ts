import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtVerify } from 'jose/jwt/verify';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function getWordList(url: string) {
    const resp = await axios.get(url);
    const wordlist: string[] = resp.data.split('\n').map((s: string) => s.trim()).filter((s: string) => s !== '');
    return wordlist;
}

export async function verifyToken(token: string, secret: string) {
    try {
        await jwtVerify(token, new TextEncoder().encode(secret));
        return true;
    } catch (e) {
        return false;
    }
}
