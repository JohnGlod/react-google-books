import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';
import api from '../api';
import { IBook, IFailedResponseGoogleBooksApi, ISuccessResponseGoogleBooksApi } from '../api/types';
import { LIMIT } from '../constants';

class Store {
  constructor() {
    makeAutoObservable(this);
    onBecomeObserved(this, 'books', this.onSearch);
  }

  isLoading = false;
  query = '';
  books: IBook[] = [];
  pageCount = 0;
  errorMessage = '';
  startIndex = 0;
  category = 'all';
  sorted = 'relevance';
  totalItems = 0;

  setQuery = (value: string) => {
    this.query = value;
  };
  setSorted = (value: string) => {
    this.sorted = value;
  };
  setCategory = (value: string) => {
    this.category = value;
  };

  private getFilteredBooks(books: IBook[]): IBook[] {
    return books.filter((book) => {
      if (this.category === 'all') return true;
      return book.volumeInfo.categories?.includes(
        this.category.charAt(0).toUpperCase() + this.category.slice(1)
      );
    });
  }

  private clear(){
    this.isLoading = true;
    this.errorMessage = '';
  }
  

  private async fetchBooks(startIndex: number) {
    const result = await api.findAll(
      this.query,
      startIndex,
      this.category,
      this.sorted
    );
    return result;
  }


  private async handleSearchResult(result: ISuccessResponseGoogleBooksApi | IFailedResponseGoogleBooksApi | IBook) {
    if ('error' in result) {
      runInAction(() => {
        this.errorMessage = result.error.message;
      });
    } else if ('items' in result) {
      runInAction(() => {
        this.totalItems = result.totalItems;
        this.pageCount = Math.ceil(result.totalItems / LIMIT);
        this.books = this.getFilteredBooks(result.items);
      });
    }
  }

  private async searchBooks(startIndex: number) {
    this.clear();
    try {
      const result = await this.fetchBooks(startIndex);
      await this.handleSearchResult(result);
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error as string;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  onSearch = async () => {
    await this.searchBooks(0);
  };

  getMoreBooks = async () => { 
    const secondPage = this.startIndex += 1;
    if (secondPage < this.pageCount) {
      await this.searchBooks(secondPage * 30);
    }
  };
}

const booksStore = new Store();
export { booksStore };
