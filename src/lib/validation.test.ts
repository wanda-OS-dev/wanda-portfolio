import { test, describe } from 'node:test';
import assert from 'node:assert';
import { escapeHtml } from './validation.ts';

describe('escapeHtml', () => {
  test('returns normal strings unchanged', () => {
    assert.strictEqual(escapeHtml('hello world'), 'hello world');
    assert.strictEqual(escapeHtml('12345'), '12345');
    assert.strictEqual(escapeHtml(''), '');
  });

  test('escapes HTML tags properly', () => {
    assert.strictEqual(escapeHtml('<div>test</div>'), '&lt;div&gt;test&lt;/div&gt;');
    assert.strictEqual(escapeHtml('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  test('escapes special characters', () => {
    assert.strictEqual(escapeHtml('Mac & Cheese'), 'Mac &amp; Cheese');
    assert.strictEqual(escapeHtml('"Quotes" and \'apostrophes\''), '&quot;Quotes&quot; and &#039;apostrophes&#039;');
  });

  test('handles multiple special characters', () => {
    assert.strictEqual(
      escapeHtml('A & B < C > D " E \' F'),
      'A &amp; B &lt; C &gt; D &quot; E &#039; F'
    );
  });

  test('handles non-string inputs gracefully', () => {
    assert.strictEqual(escapeHtml(null), '');
    assert.strictEqual(escapeHtml(undefined), '');
    assert.strictEqual(escapeHtml(123), '123');
    assert.strictEqual(escapeHtml(true), 'true');
    assert.strictEqual(escapeHtml(false), 'false');
    assert.strictEqual(escapeHtml({}), '[object Object]');
    assert.strictEqual(escapeHtml([]), '');
    assert.strictEqual(escapeHtml([1, 2, 3]), '1,2,3');
  });

  test('does not double escape HTML entities', () => {
    assert.strictEqual(escapeHtml('&amp;'), '&amp;amp;');
    assert.strictEqual(escapeHtml('&lt;'), '&amp;lt;');
  });
});
