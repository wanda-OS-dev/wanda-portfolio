import { test, describe } from 'node:test';
import assert from 'node:assert';
import { supportsWebGL } from './webgl.ts';

describe('supportsWebGL', () => {
  test('returns true when webgl2 is supported', () => {
    // Save original
    const originalDocument = global.document;

    // Mock document
    global.document = {
      createElement: (tagName: string) => {
        if (tagName === 'canvas') {
          return {
            getContext: (type: string) => {
              if (type === 'webgl2') return {};
              return null;
            }
          };
        }
        return {};
      }
    } as any;

    try {
      assert.strictEqual(supportsWebGL(), true);
    } finally {
      // Restore
      global.document = originalDocument;
    }
  });

  test('returns true when webgl is supported but not webgl2', () => {
    const originalDocument = global.document;

    global.document = {
      createElement: (tagName: string) => {
        if (tagName === 'canvas') {
          return {
            getContext: (type: string) => {
              if (type === 'webgl') return {};
              return null;
            }
          };
        }
        return {};
      }
    } as any;

    try {
      assert.strictEqual(supportsWebGL(), true);
    } finally {
      global.document = originalDocument;
    }
  });

  test('returns false when neither webgl2 nor webgl is supported', () => {
    const originalDocument = global.document;

    global.document = {
      createElement: (tagName: string) => {
        if (tagName === 'canvas') {
          return {
            getContext: () => null
          };
        }
        return {};
      }
    } as any;

    try {
      assert.strictEqual(supportsWebGL(), false);
    } finally {
      global.document = originalDocument;
    }
  });

  test('returns false when document.createElement throws an error', () => {
    const originalDocument = global.document;

    global.document = {
      createElement: () => {
        throw new Error('Not supported');
      }
    } as any;

    try {
      assert.strictEqual(supportsWebGL(), false);
    } finally {
      global.document = originalDocument;
    }
  });

  test('returns false when document is undefined (e.g. server-side rendering)', () => {
    const originalDocument = global.document;

    // Explicitly set to undefined (or remove it from global)
    delete (global as any).document;

    try {
      assert.strictEqual(supportsWebGL(), false);
    } finally {
      global.document = originalDocument;
    }
  });
});
