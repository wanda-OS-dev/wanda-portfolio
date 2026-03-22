import test from 'node:test';
import assert from 'node:assert';
import { rateLimit, requestCounts } from './rate-limit.ts';

test('rateLimit', async (t) => {
  t.beforeEach(() => {
    requestCounts.clear();
  });

  await t.test('allows up to 5 requests within the window', () => {
    const ip = '192.168.1.1';

    assert.strictEqual(rateLimit(ip), true);
    assert.strictEqual(rateLimit(ip), true);
    assert.strictEqual(rateLimit(ip), true);
    assert.strictEqual(rateLimit(ip), true);
    assert.strictEqual(rateLimit(ip), true);

    // 6th blocked
    assert.strictEqual(rateLimit(ip), false);
  });

  await t.test('tracks different IPs separately', () => {
    const ip1 = '10.0.0.1';
    const ip2 = '10.0.0.2';

    for (let i = 0; i < 5; i++) {
      rateLimit(ip1);
    }
    assert.strictEqual(rateLimit(ip1), false);

    assert.strictEqual(rateLimit(ip2), true);
  });

  await t.test('resets after 1 minute (60_000ms)', (t) => {
    t.mock.timers.enable({ apis: ['Date'] });
    const ip = '192.168.1.2';

    for (let i = 0; i < 5; i++) {
      rateLimit(ip);
    }
    assert.strictEqual(rateLimit(ip), false);

    t.mock.timers.tick(60000);
    assert.strictEqual(rateLimit(ip), false);

    t.mock.timers.tick(1);
    assert.strictEqual(rateLimit(ip), true);
    assert.strictEqual(requestCounts.get(ip)?.count, 1);
  });
});
