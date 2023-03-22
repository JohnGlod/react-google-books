import { BASE_URL } from '../constants';
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

  findAll(query: string, start = 0, category: string, sorted: string) {
    return this.performRequest(
      `${this.url}?q=${
        category !== 'all' ? `${query}+subject:${category}` : `intitle:${query}`
      }&orderBy=${sorted}&startIndex=${start}&maxResults=30&printType=books`,
    );
  }

  findOne(id: string) {
    return this.performRequest(this.url + '/' + id);
  }
}

export default new Api();
