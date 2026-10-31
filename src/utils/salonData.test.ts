import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDiscount, formatTelLink, getBookingUrl, SALON_INFO } from './salonData';

test('calculateDiscount computes savings and percentage accurately', () => {
  const result = calculateDiscount(135, 119);
  assert.equal(result.savings, 16);
  assert.equal(result.percent, 12);

  // Fallbacks for invalid values
  assert.deepEqual(calculateDiscount(100, 100), { savings: 0, percent: 0 });
  assert.deepEqual(calculateDiscount(100, 120), { savings: 0, percent: 0 });
});

test('formatTelLink formats French numbers to international tel format', () => {
  assert.equal(formatTelLink('06 71 87 14 00'), '+33671871400');
  assert.equal(formatTelLink('0671871400'), '+33671871400');
  assert.equal(formatTelLink('+33671871400'), '+33671871400');
});

test('getBookingUrl returns valid Planity URLs', () => {
  assert.equal(getBookingUrl(), SALON_INFO.planityUrl);
  const taggedUrl = getBookingUrl('hero_cta');
  assert.match(taggedUrl, /utm_campaign=hero_cta/);
});
