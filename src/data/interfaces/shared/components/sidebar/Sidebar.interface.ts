export interface ICategories {
  id: string,
  name: string;
  children_categories: Array<ICategories>
}

export interface ICategoriesStorage {
  categories: Array<ICategories>;
  subCategories: any;
  state: boolean;
}

export interface ISidebarItem {
  item: ICategories;
}
