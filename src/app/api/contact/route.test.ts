import test from 'node:test';
import assert from 'node:assert';
import { POST } from './route.ts';
import { NextRequest } from 'next/server';

test('POST - fallback to console.log when SMTP is not configured', async () => {
    const originalLog = console.log;
    let logOutput: any;
    console.log = (...args) => {
        logOutput = args;
    };

    try {
        const req = new NextRequest('http://localhost', {
            method: 'POST',
            headers: new Headers({
                'x-forwarded-for': '127.0.0.100'
            }),
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                message: 'Hello, world!'
            })
        });

        delete process.env.SMTP_HOST;
        delete process.env.SMTP_USER;
        delete process.env.SMTP_PASS;

        const response = await POST(req);

        assert.strictEqual(response.status, 200);

        const data = await response.json();
        assert.deepStrictEqual(data, { ok: true });

        assert.ok(logOutput);
        assert.strictEqual(logOutput[0], '[contact] New message:');
        assert.deepStrictEqual(logOutput[1], {
            name: 'Test User',
            email: 'test@example.com',
            message: 'Hello, world!'
        });
    } finally {
        console.log = originalLog;
    }
});

test('POST - throws error when SMTP configured but send fails', async () => {
    const originalError = console.error;
    let errorOutput: any;
    console.error = (...args) => {
        errorOutput = args;
    };

    try {
        const req = new NextRequest('http://localhost', {
            method: 'POST',
            headers: new Headers({
                'x-forwarded-for': '127.0.0.101'
            }),
            body: JSON.stringify({
                name: 'Test User 2',
                email: 'test2@example.com',
                message: 'Hello, world again!'
            })
        });

        process.env.SMTP_HOST = 'fake-host';
        process.env.SMTP_USER = 'fake-user';
        process.env.SMTP_PASS = 'fake-pass';

        const response = await POST(req);

        assert.strictEqual(response.status, 500);

        const data = await response.json();
        assert.deepStrictEqual(data, { error: 'Failed to send. Please email directly.' });

        assert.ok(errorOutput);
        assert.strictEqual(errorOutput[0], '[contact] email send failed:');
    } finally {
        console.error = originalError;
        delete process.env.SMTP_HOST;
        delete process.env.SMTP_USER;
        delete process.env.SMTP_PASS;
    }
});
