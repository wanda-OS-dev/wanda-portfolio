// Helper to escape HTML and prevent XSS/HTML Injection
export function escapeHtml(unsafe: unknown): string {
  const str = typeof unsafe === 'string' ? unsafe : String(unsafe ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
