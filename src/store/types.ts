export interface Image {
  id: number;
  reletedId: number;
  image: string;
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
  image?: string;
  order?: number;
  require?: boolean;
}

export interface IConstuctorItemOptionItemOptions extends IItem {
  itemId: number;
  price: string;
  showIn: boolean;
}

export interface IConstuctorOptionItems extends IItem {
  reletedId: number;
  price?: string;
  ConstuctorItemOptionItemOptions: IConstuctorItemOptionItemOptions;
}

export interface IConstuctorItemOptions extends IItem {
  itemId: number;
  price: string;
  showIn: boolean;
  ConstuctorOptionItems: IConstuctorOptionItems;
}

export interface IConstuctorItems extends IItem {
  reletedId: number;
  ConstuctorItemOptions: IConstuctorItemOptions;
}

export interface IConstructor extends ITranslatableContent {
  image: string;
  width: string;
  height: string;
  ConstuctorItems: IConstuctorItems;
}

export interface SelectedData {
  variant: string | undefined;
  [key: number]: number | number[];
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
