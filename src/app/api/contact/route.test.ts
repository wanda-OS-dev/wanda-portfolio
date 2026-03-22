import test from 'node:test';
import assert from 'node:assert';
import { POST } from './route.ts';
import { NextRequest } from 'next/server';

test('contact API - rate limiting works', async () => {
  const ip = `test-ip-rate-limit-${Date.now()}`;
  const req = () => new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: new Map([['x-forwarded-for', ip]]),
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    })
  });

  for (let i = 0; i < 5; i++) {
    const res = await POST(req());
    assert.strictEqual(res.status, 200, `Request ${i + 1} should be allowed`);
  }

  const blockedRes = await POST(req());
  assert.strictEqual(blockedRes.status, 429, '6th request should be rate limited');
});

test('contact API - invalid input returns 400', async () => {
  const ip = `test-ip-invalid-${Date.now()}`;
  const tests = [
    { body: {}, error: 'All fields must be strings.' },
    { body: { name: '', email: 'foo@bar.com', message: 'test' }, error: 'All fields are required.' },
    { body: { name: 'Foo', email: 'not-an-email', message: 'test' }, error: 'Invalid email address.' },
  ];

  for (const { body, error } of tests) {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: new Map([['x-forwarded-for', ip]]),
      body: JSON.stringify(body)
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, error);
  }
});

test('contact API - SMTP sending failure should return 500', async () => {
  const oldHost = process.env.SMTP_HOST;
  const oldUser = process.env.SMTP_USER;
  const oldPass = process.env.SMTP_PASS;
  const oldMockErr = process.env.TEST_MOCK_NODEMAILER_ERROR;

  process.env.SMTP_HOST = 'smtp.example.com';
  process.env.SMTP_USER = 'test_user';
  process.env.SMTP_PASS = 'test_pass';
  process.env.TEST_MOCK_NODEMAILER_ERROR = '1';

  const req = new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: new Map([['x-forwarded-for', `test-ip-smtp-${Date.now()}`]]),
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    })
  });

  const response = await POST(req);

  assert.strictEqual(response.status, 500);
  const data = await response.json();
  assert.strictEqual(data.error, 'Failed to send. Please email directly.');

  // Restore process.env
  if (oldHost === undefined) delete process.env.SMTP_HOST; else process.env.SMTP_HOST = oldHost;
  if (oldUser === undefined) delete process.env.SMTP_USER; else process.env.SMTP_USER = oldUser;
  if (oldPass === undefined) delete process.env.SMTP_PASS; else process.env.SMTP_PASS = oldPass;
  if (oldMockErr === undefined) delete process.env.TEST_MOCK_NODEMAILER_ERROR; else process.env.TEST_MOCK_NODEMAILER_ERROR = oldMockErr;
});
