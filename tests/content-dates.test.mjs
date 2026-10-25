// Run on Node 22+: node --experimental-strip-types --test tests/content-dates.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { contentLastModified } from '../src/lib/content-dates.ts';

test('an unchanged article keeps its publication date across rebuilds', () => {
    assert.equal(contentLastModified('2026-01-22'), '2026-01-22T00:00:00.000Z');
});

test('a recorded content update advances the modification date', () => {
    assert.equal(contentLastModified('2026-01-22', '2026-10-25'), '2026-10-25T00:00:00.000Z');
});

test('an older update cannot move lastmod before publication', () => {
    assert.equal(contentLastModified('2026-10-23', '2026-10-01'), '2026-10-23T00:00:00.000Z');
});

test('reject invalid dates instead of silently rolling them into another month', () => {
    for (const date of ['2026-02-29', '2026-04-31', 'not-a-date', '10/25/2026']) {
        assert.throws(() => contentLastModified(date), /Invalid editorial date/);
        assert.throws(() => contentLastModified('2026-01-22', date), /Invalid editorial date/);
    }
    assert.equal(contentLastModified('2024-02-29'), '2024-02-29T00:00:00.000Z');
});
