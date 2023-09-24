// Note: These are 'columns' of our Post table
export type Post = {
  id: string;
  slug?: string; // Make this compulsory later?
  title: string;
  categories: string[];
  cover: string; // This's an image url
  date?: string; // TODO: Add date
  lastEditedAt?: number; // TODO: Add last edited time
};
