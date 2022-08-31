import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
  type SpyInstance,
} from 'vitest';
import axios from 'axios';
import { env } from './env';
import { http } from './http';

vi.mock('axios');
vi.mock('./env', () => ({ env: {} }));

describe('http', () => {
  const axiosGetMock = axios.get as unknown as Mock;
  const urlMock = 'urlMock';
  const responseMock = 'responseMock';

  let response: string;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('get', () => {
    beforeEach(async () => {
      axiosGetMock.mockResolvedValue({ data: responseMock });
      response = await http.get<string>(urlMock);
    });

    it('Should use axios to make a get request', () => {
      expect(axiosGetMock).toHaveBeenCalledWith(urlMock);
      expect(response).toEqual(responseMock);
    });

    describe('When not production and request delay is set', () => {
      const delayMock = 10;

      let sleepSpy: SpyInstance;

      beforeEach(async () => {
        env.CLIENT_DEBUG_REQUEST_DELAY = delayMock;
        axiosGetMock.mockResolvedValue({ data: '' });
        sleepSpy = vi.spyOn(http, '_sleep');
        response = await http.get<string>(urlMock);
      });

      it('Should delay the response with the given value', () => {
        expect(sleepSpy).toHaveBeenCalledWith(delayMock);
      });
    });
  });
});
