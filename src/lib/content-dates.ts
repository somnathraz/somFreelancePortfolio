/** Editorial dates are stable across checkouts, builds, and deployments. */
export function contentLastModified(published: string, updated?: string): string {
    const parse = (value: string) => {
        const date = new Date(value);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
            throw new Error(`Invalid editorial date: ${value}. Use YYYY-MM-DD.`);
        }
        return date.getTime();
    };
    const publishedMs = parse(published);
    return new Date(Math.max(publishedMs, updated ? parse(updated) : publishedMs)).toISOString();
}
