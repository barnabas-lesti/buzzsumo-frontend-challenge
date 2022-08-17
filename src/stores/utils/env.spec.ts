import { beforeEach, describe, expect, it } from 'vitest';

import { env } from './env';

describe('env', () => {
  const baseUrlMock = 'baseUrlMock';

  beforeEach(() => {
    import.meta.env.BASE_URL = baseUrlMock;
  });

  it('Should contain environment properties', () => {
    expect(env).toBeDefined();
    expect(env.BASE_URL).toEqual(baseUrlMock);
  });
});
