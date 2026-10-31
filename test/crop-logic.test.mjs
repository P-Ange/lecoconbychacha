import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRotatedBox, parseAspectRatio } from '../src/utils/cropImage.ts';

test('calculateRotatedBox calculates correct bounding box for 0, 90, 180, 270 degrees', () => {
  const box0 = calculateRotatedBox(800, 600, 0);
  assert.equal(box0.width, 800);
  assert.equal(box0.height, 600);

  const box90 = calculateRotatedBox(800, 600, 90);
  assert.equal(box90.width, 600);
  assert.equal(box90.height, 800);

  const box180 = calculateRotatedBox(800, 600, 180);
  assert.equal(box180.width, 800);
  assert.equal(box180.height, 600);

  const box270 = calculateRotatedBox(800, 600, 270);
  assert.equal(box270.width, 600);
  assert.equal(box270.height, 800);
});

test('parseAspectRatio accurately parses aspect strings', () => {
  assert.equal(parseAspectRatio('16:9'), 16 / 9);
  assert.equal(parseAspectRatio('16:10 Panoramique'), 16 / 10);
  assert.equal(parseAspectRatio('4:3 ou Carré'), 4 / 3);
  assert.equal(parseAspectRatio('Portrait vertical 3:4'), 3 / 4);
  assert.equal(parseAspectRatio('3:2 Horizontal'), 3 / 2);
  assert.equal(parseAspectRatio('4:5'), 4 / 5);
  assert.equal(parseAspectRatio('Carré / Portrait'), 1);
});
