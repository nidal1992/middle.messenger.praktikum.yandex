import { queryString } from '@/lib/utils/queryStringify';
import { API_HOST } from '@/model/const';
import { PlainObject } from '@/model/types';

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  timeout?: number;
  method?: METHODS;
  data?: PlainObject;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
};

export class HTTPTransport {
  private static host = API_HOST;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<ResponseType = unknown>(url: string, options: RequestOptions = {}) {
    const { data, ...restOptions } = options;
    const query = data ? queryString(data) : '';
    return this.request<ResponseType>(`${url}${query}`, {
      ...restOptions,
      method: METHODS.GET,
    });
  }

  post<BodyType extends PlainObject | undefined, ResponseType = unknown>(
    url: string,
    body: BodyType,
    options: Omit<RequestOptions, 'data'> = {},
  ) {
    return this.request<ResponseType>(url, {
      method: METHODS.POST,
      data: body,
      ...options,
    });
  }

  put<BodyType extends PlainObject | undefined, ResponseType = unknown>(
    url: string,
    body: BodyType,
    options: Omit<RequestOptions, 'data'> = {},
  ) {
    return this.request<ResponseType>(url, {
      method: METHODS.PUT,
      data: body,
      ...options,
    });
  }

  delete(url: string, options: RequestOptions = {}) {
    return this.request(url, {
      method: METHODS.DELETE,
      ...options,
    });
  }

  request<ResponseType>(url: string, options: RequestOptions): Promise<ResponseType> {
    const {
      data,
      headers = {},
      method,
      timeout = 6000,
      withCredentials = true,
      responseType = 'json',
    } = options;

    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      const resultUrl = HTTPTransport.host + this.baseUrl + url;

      const timeoutID = setTimeout(() => {
        xhr.abort();
        rej(xhr);
      }, timeout);

      const loadHandler = () => {
        clearTimeout(timeoutID);
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          res(xhr.response);
        } else {
          const message = {
            '0': 'abort',
            '100': 'Information',
            '200': 'Ok',
            '300': 'Redirect failed',
            '400': 'Failed',
            '500': 'Internal Error',
          }[Math.floor(status / 100) * 100];
          rej({
            status,
            reason: xhr.response?.reason || message,
          });
        }
      };

      const stringify = (data: Record<string, unknown>) => {
        try {
          return JSON.stringify(data);
        } catch (err: unknown) {
          console.error(err);
          return '';
        }
      };

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.addEventListener('load', loadHandler, { once: true });
      xhr.addEventListener('abort', () => rej({ reason: 'abort' }), { once: true });
      xhr.addEventListener('error', () => rej({ reason: 'error' }), { once: true });
      xhr.addEventListener('loadend', () => rej({ reason: 'timeout' }), { once: true });

      xhr.responseType = responseType;
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;

      xhr.open(options.method || METHODS.GET, resultUrl);

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(stringify(data));
      }
    });
  }
}
