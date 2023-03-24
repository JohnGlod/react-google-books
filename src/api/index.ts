import { BASE_URL, LIMIT } from '../constants';
import { IBook, IFailedResponseGoogleBooksApi, ISuccessResponseGoogleBooksApi } from './types';

class Api {
  url = BASE_URL;

  private async performRequest(url: string) {
    try {
      const response = await fetch(url);
      const data: ISuccessResponseGoogleBooksApi | IFailedResponseGoogleBooksApi | IBook = await response.json();
      return data;
    } catch (error) {
      throw `The request to the server failed! ${error}`;
    }
  }

  findAll(query: string, startIndex = 0, category: string, orderBy: string) {
    const paramsObj = {
      maxResults: String(LIMIT),
      printType: 'books',
      startIndex: String(startIndex),
      orderBy,
    };

    const searchParams = new URLSearchParams(paramsObj);
    return this.performRequest(
      `${this.url}?q=${category !== 'all' ? `${query}+subject:${category}` : `intitle:${query}`}&${searchParams.toString()}`,
    );
  }

  findOne(id: string) {
    return this.performRequest(this.url + '/' + id);
  }
}

export default new Api();
