import test from 'node:test';
import assert from 'node:assert';
import { NextRequest } from 'next/server';
import { POST, requestCounts } from './route';

// Helper to create a mocked NextRequest since the real one doesn't allow overriding json() easily
function createMockRequest(jsonBodyResolver: () => Promise<any>): NextRequest {
  return {
    headers: {
      get: (name: string) => name === 'x-forwarded-for' ? '127.0.0.1' : null
    },
    json: jsonBodyResolver
  } as unknown as NextRequest;
}

test('contact API - handles malformed JSON payload', async () => {
  const req = createMockRequest(async () => { throw new Error('Malformed JSON'); });

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'Invalid JSON payload.');
});

test('contact API - handles missing required fields', async () => {
  const req = createMockRequest(async () => ({ name: 'John Doe', email: 'john@example.com' }));

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'All fields must be strings.');
});

test('contact API - handles inputs exceeding maximum length', async () => {
  const req = createMockRequest(async () => ({ name: 'A'.repeat(101), email: 'john@example.com', message: 'Hello' }));

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'Input exceeds maximum length.');
});

test('contact API - handles invalid email address', async () => {
  const req = createMockRequest(async () => ({ name: 'John Doe', email: 'not-an-email', message: 'Hello' }));

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'Invalid email address.');
});

test('contact API - handles valid payload', async () => {
  const req = createMockRequest(async () => ({ name: 'John Doe', email: 'john@example.com', message: 'Hello, World!' }));

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.strictEqual(body.ok, true);
});

test('contact API - rate limiter soft limit cleanup', async (t) => {
  t.mock.timers.enable({ apis: ['Date'] });
  const now = Date.now();

  // Fill the map to exactly 1000 items
  requestCounts.clear();
  for (let i = 0; i < 1000; i++) {
    requestCounts.set(`192.168.0.${i}`, { count: 5, resetAt: now - 1000 }); // All expired
  }

  // The next request should trigger the soft limit cleanup
  const req = createMockRequest(async () => ({ name: 'John', email: 'j@example.com', message: 'Hello' }));
  req.headers.get = (name: string) => name === 'x-forwarded-for' ? '127.0.0.1' : null;

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  // 1000 items were expired and should be removed. 1 new item was added.
  assert.strictEqual(requestCounts.size, 1);
});

test('contact API - rate limiter hard limit clear', async () => {
  const now = Date.now();

  // Fill the map to exactly 5000 items
  requestCounts.clear();
  for (let i = 0; i < 5000; i++) {
    // Make them NOT expired, so soft limit wouldn't clear them
    requestCounts.set(`10.0.0.${i}`, { count: 5, resetAt: now + 10000 });
  }

  // The next request should trigger the hard limit clear
  const req = createMockRequest(async () => ({ name: 'John', email: 'j@example.com', message: 'Hello' }));
  req.headers.get = (name: string) => name === 'x-forwarded-for' ? '127.0.0.1' : null;

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  // 5000 items were cleared. 1 new item was added.
  assert.strictEqual(requestCounts.size, 1);
});
