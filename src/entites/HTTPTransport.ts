const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions = {
  timeout?: number;
  method?: METHODS;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
};

function queryStringify(data: Record<string, unknown>): string {
  return `?${Object.entries(data).reduce(
    (res, [key, value], i, arr) =>
      `${res}${encodeURIComponent(key)}=${encodeURIComponent(String(value))}${i !== arr.length - 1 ? '&' : ''}`,
    '',
  )}`;
}

export class HTTPTransport {
  get(url: string, options: RequestOptions = {}) {
    const { data, ...restOptions } = options;
    const query = data ? queryStringify(data) : '';
    return this.request(
      `${url}${query}`,
      {
        ...restOptions,
        method: METHODS.GET,
      },
      options.timeout,
    );
  }

  post(url: string, options: RequestOptions = {}) {
    const { timeout, ...restOptions } = options;
    return this.request(
      url,
      {
        ...restOptions,
        method: METHODS.POST,
      },
      timeout,
    );
  }

  put(url: string, options: RequestOptions = {}) {
    const { timeout, ...restOptions } = options;
    return this.request(
      url,
      {
        ...restOptions,
        method: METHODS.PUT,
      },
      timeout,
    );
  }

  delete(url: string, options: RequestOptions = {}) {
    const { timeout, ...restOptions } = options;
    return this.request(
      url,
      {
        ...restOptions,
        method: METHODS.DELETE,
      },
      timeout,
    );
  }

  request(url: string, options: RequestOptions, timeout = 5000) {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();

      const timeoutID = setTimeout(() => {
        xhr.abort();
        rej(xhr);
      }, timeout);

      const loadHandler = () => {
        clearTimeout(timeoutID);
        res(xhr);
      };

      const errorHandler = () => {
        clearTimeout(timeoutID);
        rej(xhr);
      };

      const stringify = (data: Record<string, unknown>) => {
        try {
          return JSON.stringify(data);
        } catch (err: unknown) {
          console.error(err);
          return '';
        }
      };

      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.addEventListener('load', loadHandler, { once: true });
      xhr.addEventListener('abort', errorHandler, { once: true });
      xhr.addEventListener('error', errorHandler, { once: true });
      xhr.addEventListener('loadend', errorHandler, { once: true });

      xhr.open(options.method || METHODS.GET, url);

      if (options.method === METHODS.GET || !options.data) {
        xhr.send();
      } else {
        xhr.send(stringify(options.data));
      }
    });
  }
}
