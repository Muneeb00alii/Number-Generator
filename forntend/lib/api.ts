import { NumberEntry, GenerateResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function generateNumber(): Promise<GenerateResponse> {
    const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to generate number');
    }

    return response.json();
}

export async function getHistory(): Promise<NumberEntry[]> {
    const response = await fetch(`${API_URL}/history`);

    if (!response.ok) {
        throw new Error('Failed to fetch history');
    }

    return response.json();
}