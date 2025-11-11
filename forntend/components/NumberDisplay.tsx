'use client';

interface NumberDisplayProps {
    number: number | null;
    timestamp: string | null;
}

export default function NumberDisplay({ number, timestamp }: NumberDisplayProps) {
    if (!number) {
        return (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-500">Click the button to generate a number</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white shadow-xl">
            <p className="text-sm opacity-90 mb-2">Latest Number</p>
            <h2 className="text-6xl font-bold mb-4">{number}</h2>
            <p className="text-sm opacity-75">
                Generated at: {new Date(timestamp!).toLocaleString()}
            </p>
        </div>
    );
}