import test from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyAdminCredentials,
  DEFAULT_PHOTOS,
  DEFAULT_NOVELTY_OFFER,
  PHOTO_CATALOG,
} from './siteStore';

test('verifyAdminCredentials checks admin/chacha accurately with case insensitivity', () => {
  assert.equal(verifyAdminCredentials('admin', 'chacha'), true);
  assert.equal(verifyAdminCredentials('ADMIN', 'CHACHA'), true);
  assert.equal(verifyAdminCredentials(' admin ', ' chacha '), true);

  assert.equal(verifyAdminCredentials('admin', 'wrong'), false);
  assert.equal(verifyAdminCredentials('user', 'chacha'), false);
  assert.equal(verifyAdminCredentials('', ''), false);
});

test('DEFAULT_PHOTOS has entries for all key sections', () => {
  const expectedKeys = [
    'hero',
    'heroCardCoiffure',
    'heroCardHeadSpa',
    'heroCardRituels',
    'exclusiveOffer',
    'headSpa',
    'coiffure',
    'rituels',
    'holistic',
    'carteCadeau',
    'parfums',
    'portrait',
    'galerie1',
    'galerie2',
    'galerie3',
    'galerie4',
  ];

  for (const key of expectedKeys) {
    assert.ok(DEFAULT_PHOTOS[key], `Missing key in DEFAULT_PHOTOS: ${key}`);
  }

  assert.ok(PHOTO_CATALOG.length >= 12, 'Catalog should describe all editable photo slots');
});

test('DEFAULT_NOVELTY_OFFER contains complete structured offer details', () => {
  assert.equal(DEFAULT_NOVELTY_OFFER.discountedPrice, 119);
  assert.equal(DEFAULT_NOVELTY_OFFER.originalPrice, 135);
  assert.equal(DEFAULT_NOVELTY_OFFER.services.length, 3);
  assert.ok(DEFAULT_NOVELTY_OFFER.title.includes('Évasion'));
});
