export interface Blog {
  id: string;
  articleId: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image: string;
  url: string;
  createdAt: Date | string;
}
