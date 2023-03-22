interface IBookFormat {
  isAvailable: boolean;
  acsTokenLink?: string;
}
interface IOffersPrice {
  amountInMicros: number;
  currencyCode: currencyCodeType;
}

interface IBookPrice {
  amount: number;
  currencyCode: currencyCodeType;
}

type currencyCodeType = string;

interface IVolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description?: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount?: number;
  printedPageCount?: number;
  printType: string;
  categories: [string];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  averageRating?: number;
  ratingsCount?: number;
}

interface ISaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: IBookPrice;
  retailPrice?: IBookPrice;
  buyLink?: string;
  offers?: [
    {
      finskyOfferType: number;
      listPrice: IOffersPrice;
      retailPrice: IOffersPrice;
    },
  ];
}

interface IAccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  accessViewStatus: string;
  webReaderLink: string;
  quoteSharingAllowed: boolean;
  epub: IBookFormat;
  pdf: IBookFormat;
}
export interface IFailedResponseGoogleBooksApi {
  error: {
    code: number;
    message: string;
    errors: [
      {
        message: string;
        domain: string;
        reason: string;
      },
    ];
  };
}

export interface ISuccessResponseGoogleBooksApi {
  kind: string;
  totalItems: number;
  items: IBook[];
}

export interface IBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: IVolumeInfo;
  saleInfo: ISaleInfo;
  accessInfo: IAccessInfo;
  searchInfo?: {
    textSnippet: string;
  };
}
