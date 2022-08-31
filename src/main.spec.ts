import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n';
import App from './app.vue';

vi.mock('vue');
vi.mock('pinia');
vi.mock('./i18n');

describe('main', () => {
  const createAppMock = createApp as unknown as Mock;
  const createPiniaMock = createPinia as unknown as Mock;
  const appUseMock = vi.fn();
  const appMountMock = vi.fn();
  const piniaMock = 'piniaMock';

  beforeEach(async () => {
    createAppMock.mockReturnValue({
      use: appUseMock,
      mount: appMountMock,
    });
    createPiniaMock.mockReturnValue(piniaMock);

    await import('./main');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should create the application', () => {
    expect(createAppMock).toHaveBeenCalledWith(App);
    expect(createPiniaMock).toHaveBeenCalledOnce();
    expect(appUseMock).toHaveBeenCalledWith(i18n);
    expect(appUseMock).toHaveBeenCalledWith(piniaMock);
    expect(appMountMock).toHaveBeenCalledWith('#app');
  });
});
