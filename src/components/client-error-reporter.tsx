'use client';

import { useEffect } from 'react';

async function reportError(error: any) {
  try {
    await fetch('/api/client-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        error,
      }),
    });
  } catch (e) {
    console.error('Failed to report error:', e);
  }
}

export function ClientErrorReporter() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      reportError(event.error);
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      reportError(event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  return null;
}