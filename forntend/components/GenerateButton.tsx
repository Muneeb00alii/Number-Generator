'use client';

interface GenerateButtonProps {
    onGenerate: () => void;
    isLoading: boolean;
}

export default function GenerateButton({ onGenerate, isLoading }: GenerateButtonProps) {
    return (
        <button
            onClick={onGenerate}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
            {isLoading ? 'Generating...' : 'Generate Random Number'}
        </button>
    );
}