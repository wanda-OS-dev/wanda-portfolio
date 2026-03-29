import test from 'node:test';
import assert from 'node:assert';
import { NextRequest } from 'next/server';
import { POST } from './route.ts';

// Helper to create a mocked NextRequest since the real one doesn't allow overriding json() easily
let ipCounter = 1;
function createMockRequest(jsonBodyResolver: () => Promise<any>): NextRequest {
  const uniqueIp = `127.0.0.${ipCounter++}`;
  return {
    ip: uniqueIp,
    headers: {
      get: (name: string) => name === 'x-forwarded-for' ? uniqueIp : null
    },
    json: jsonBodyResolver
  } as unknown as NextRequest;
}

test('contact API - handles malformed JSON payload', async () => {
  const req = createMockRequest(async () => { throw new Error('Malformed JSON'); }, '10.0.0.1');

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'Invalid JSON payload.');
});

test('contact API - handles missing required fields', async () => {
  const req = createMockRequest(async () => ({ name: 'John Doe', email: 'john@example.com' }), '10.0.0.2');

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'All fields must be strings.');
});

test('contact API - handles inputs exceeding maximum length', async () => {
  const req = createMockRequest(async () => ({ name: 'A'.repeat(101), email: 'john@example.com', message: 'Hello' }), '10.0.0.3');

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'Input exceeds maximum length.');
});

test('contact API - handles invalid email address', async () => {
  const req = createMockRequest(async () => ({ name: 'John Doe', email: 'not-an-email', message: 'Hello' }), '10.0.0.4');

  const res = await POST(req);
  assert.strictEqual(res.status, 400);

  const body = await res.json();
  assert.strictEqual(body.error, 'Invalid email address.');
});

test('contact API - handles valid payload', async () => {
  const req = createMockRequest(async () => ({ name: 'John Doe', email: 'john@example.com', message: 'Hello, World!' }), '10.0.0.5');

  const res = await POST(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.strictEqual(body.ok, true);
});

test('contact API - enforces rate limiting', async () => {
  const ip = '10.0.0.6';

  // Send 5 successful requests
  for (let i = 0; i < 5; i++) {
    const req = createMockRequest(async () => ({ name: 'John Doe', email: 'john@example.com', message: 'Hello, World!' }), ip);
    const res = await POST(req);
    assert.strictEqual(res.status, 200, `Request ${i + 1} should succeed`);
  }

  // The 6th request should fail due to rate limiting
  const req6 = createMockRequest(async () => ({ name: 'John Doe', email: 'john@example.com', message: 'Hello, World!' }), ip);
  const res6 = await POST(req6);
  assert.strictEqual(res6.status, 429, 'Request 6 should be rate limited');

  const body = await res6.json();
  assert.strictEqual(body.error, 'Too many requests.');
});
