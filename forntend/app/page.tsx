'use client';

import { useState, useEffect } from 'react';
import GenerateButton from '@/components/GenerateButton';
import NumberDisplay from '@/components/NumberDisplay';
import HistoryList from '@/components/HistoryList';
import { generateNumber, getHistory } from '@/lib/api';
import { NumberEntry } from '@/types';

export default function Home() {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentTimestamp, setCurrentTimestamp] = useState<string | null>(null);
  const [history, setHistory] = useState<NumberEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load history');
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await generateNumber();
      setCurrentNumber(data.number);
      setCurrentTimestamp(data.created_at);

      // Refresh history after generating
      await fetchHistory();
    } catch (err) {
      console.error('Error generating number:', err);
      setError('Failed to generate number');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Random Number Generator
          </h1>
          <p className="text-gray-600">
            Practice project with Next.js, FastAPI, and PostgreSQL
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <div className="flex justify-center">
          <GenerateButton onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Current Number Display */}
        <NumberDisplay number={currentNumber} timestamp={currentTimestamp} />

        {/* History List */}
        <HistoryList history={history} />
      </div>
    </main>
  );
}