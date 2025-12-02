'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-4">
                {error.message || "An unexpected error occurred."}
            </p>
            {error.digest && (
                <p className="text-xs text-gray-500 mb-6">Error Digest: {error.digest}</p>
            )}
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
