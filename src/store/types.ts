export interface Image {
  id: number;
  reletedId?: number;
  image?: string;
  src?: string;
  width?: string;
  height?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Self {
  id: number;
  titleAm: string;
  titleRu: string;
  titleEn: string;
  titleGe: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
  SelfWashImages: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Spare {
  id: number;
  titleAm: string;
  titleRu: string;
  titleEn: string;
  titleGe: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
  SpareImages: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: number;
  titleAm: string;
  titleRu: string;
  titleEn: string;
  titleGe: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
  imageAm: string;
  imageRu: string;
  imageEn: string;
  imageGe: string;
  constId: number;
  ModuleImages: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Equipment {
  id: number;
  titleAm: string;
  titleRu: string;
  titleEn: string;
  titleGe: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
  EquipmentImages: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: number;
  titleAm: string;
  titleRu: string;
  titleEn: string;
  titleGe: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
  BoardImages: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  title: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
interface ITranslatableContent {
  id: number;
  nameAm: string;
  nameRu: string;
  nameEn: string;
  nameGe: string;
  descAm: string;
  descRu: string;
  descEn: string;
  descGe: string;
}

interface IIdentifiable {
  id: number;
}

interface IItem extends IIdentifiable, ITranslatableContent {
  id: number;
  image?: string;
  order?: number;
  require?: boolean;
  withValue?: boolean;
}

export interface IConstuctorItemOptionItemOptions extends IItem {
  itemId: number;
  price: string;
  showIn: boolean;
}

export interface IConstuctorOptionItems extends IItem {
  reletedId: number;
  price?: string;
  ConstuctorItemOptionItemOptions: IConstuctorItemOptionItemOptions[];
}

export interface IConstuctorItemOptions extends IItem {
  itemId: number;
  price: string;
  showIn: boolean;
  width: string;
  height: string;
  ConstuctorOptionItems: IConstuctorOptionItems[];
}

export interface IConstuctorItems extends IItem {
  reletedId: number;
  ConstuctorItemOptions: IConstuctorItemOptions[];
}

export interface IConstructor extends ITranslatableContent {
  image: string;
  width: string;
  height: string;
  ConstuctorItems: IConstuctorItems[];
}

export interface SelectedData {
  [key: number]: number | number[];
  variant: string | undefined;
  services: { [key: number]: number | number[] };
}

export interface Currency {
  AMD: number;
  RUB: number;
  EUR: number;
  USD: number;
}

export interface About {
  titleAm: string;
  titileRu: string;
  titileEn: string;
  titleGe: string;
  textAm: string;
  textRu: string;
  textEn: string;
  textGe: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGallery {
  id: number;
  src: string;
  width: string;
  height: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPartner {
  id: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// ---

interface ServiceOption {
  id: number;
  price: string; // Assuming price is a string
  nameAm?: string;
  nameRu?: string;
  nameEn?: string;
  nameGe?: string;
}

interface ServiceItem {
  id: number;
  nameAm?: string;
  nameRu?: string;
  nameEn?: string;
  nameGe?: string;
}

interface ServicePrice {
  id: number;
  nameAm?: string;
  nameRu?: string;
  nameEn?: string;
  nameGe?: string;
}

export interface PriceResponse {
  variant: {
    id: number;
    name: string;
  };
  items: {
    item: ServiceItem;
    options: ServiceOption | ServiceOption[];
    price: number;
  }[];
  services: {
    service: ServicePrice;
    options: ServiceOption | ServiceOption[];
    price: number;
  }[];
  price: number; // Total price
}
