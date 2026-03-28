/**
 * Centralized logging utility to ensure consistent logging
 * and prevent sensitive information exposure in production.
 */

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    if (context) {
      console.info(`[INFO] ${message}`, context);
    } else {
      console.info(`[INFO] ${message}`);
    }
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    if (context) {
      console.warn(`[WARN] ${message}`, context);
    } else {
      console.warn(`[WARN] ${message}`);
    }
  },
  error: (message: string, error?: unknown) => {
    // Sanitize error object to prevent leaking sensitive details
    let sanitizedError = 'Unknown error';
    if (error instanceof Error) {
      sanitizedError = error.message;
    } else if (typeof error === 'string') {
      sanitizedError = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      sanitizedError = String((error as any).message);
    }
    console.error(`[ERROR] ${message} - ${sanitizedError}`);
  }
};
