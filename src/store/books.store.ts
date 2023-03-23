import { makeAutoObservable, onBecomeObserved } from 'mobx';
import api from '../api';
import { IBook } from '../api/types';
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
      return book.volumeInfo.categories?.includes(this.category.charAt(0).toUpperCase() + this.category.slice(1));
    });
  }

  onSearch = async () => {
    try {
      this.isLoading = true;
      this.errorMessage = '';
      this.startIndex = 0;

      const result = await api.findAll(this.query, this.startIndex, this.category, this.sorted);

      if ('error' in result) {
        this.errorMessage = result.error.message;
      } else if ('items' in result) {
        this.totalItems = result.totalItems;
        this.pageCount = Math.ceil(result.totalItems / LIMIT);
        this.books = this.getFilteredBooks(result.items);
      }
    } catch (error) {
      this.errorMessage = error as string;
    } finally {
      this.isLoading = false;
    }
  };
  getMoreBooks = async () => {
    try {
      this.isLoading = true;
      this.errorMessage = '';
      this.startIndex += 1;
      const secondPage = this.startIndex;
      if (secondPage < this.pageCount) {
        const result = await api.findAll(this.query, secondPage * 30, this.category, this.sorted);

        if ('error' in result) {
          this.errorMessage = result.error.message;
        } else if ('items' in result) {
          this.books = this.books.concat(this.getFilteredBooks(result.items));
        }
      }
    } catch (error) {
      this.errorMessage = error as string;
    } finally {
      this.isLoading = false;
    }
  };
}

const booksStore = new Store();
export { booksStore };
