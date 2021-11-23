import {catchError, map, Observable} from 'rxjs';
import {ajax, AjaxConfig, AjaxResponse} from 'rxjs/ajax';
import {RESPONSE_STATUS} from '../consts';
import {IResponse} from '../interfaces';
import {errorHandler} from './error-handle.service';

interface ConfigRequest {
  body?: AjaxConfig['body'];
  headers?: AjaxConfig['headers'];
}

class ApiService {
  private url = 'https://0479-171-255-247-210.ngrok.io/api';
  private defaultHeaders: any = {
    'Content-Type': 'application/json',
  };

  private handleError(error: any) {
    errorHandler.handle(error);
  }

  protected handleException(response: IResponse) {
    // switch (this.getResponseStatus(response)) {
    console.log('ressponse', response);
    // case RESPONSE_STATUS.NORMAL:
    //   break;
    // default:
    //   throw new Error();
    // }
  }

  private getResponseStatus(response: IResponse): RESPONSE_STATUS {
    switch (response.code) {
      case 200:
        return RESPONSE_STATUS.NORMAL;
      default:
        return RESPONSE_STATUS.ERROR;
    }
  }

  setAuthHeader(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  private async getHeaders(confiHeader: any) {
    const headers: any = {
      ...this.defaultHeaders,
      ...confiHeader,
    };

    return headers;
  }

  private handleResponse(ob: Observable<AjaxResponse<IResponse>>) {
    return ob.pipe(
      map(ajaxResponse => {
        console.log('ajac', ajaxResponse);
        this.handleException(ajaxResponse.response);
        return ajaxResponse.response;
      }),
      catchError(error => {
        this.handleError(error);
        throw error;
      }),
    );
  }

  get(path: string, config: ConfigRequest = {}): Observable<IResponse> {
    config.headers = this.getHeaders(config.headers);
    return this.handleResponse(
      ajax<IResponse>({
        url: `${this.url}${path}`,
        method: 'GET',
        ...config,
      }),
    );
  }

  put(path: string, config: ConfigRequest = {}): Observable<IResponse> {
    config.headers = this.getHeaders(config.headers);
    return this.handleResponse(
      ajax<IResponse>({
        url: `${this.url}${path}`,
        method: 'PUT',
        ...config,
      }),
    );
  }

  post(path: string, config: ConfigRequest = {}): Observable<IResponse> {
    config.headers = this.getHeaders(config.headers);
    return this.handleResponse(
      ajax<IResponse>({
        url: `${this.url}${path}`,
        method: 'POST',
        ...config,
      }),
    );
  }

  delete(path: string, config: ConfigRequest = {}): Observable<IResponse> {
    config.headers = this.getHeaders(config.headers);
    return this.handleResponse(
      ajax<IResponse>({
        url: `${this.url}${path}`,
        method: 'DELETE',
        ...config,
      }),
    );
  }
}

export const apiService = new ApiService();
