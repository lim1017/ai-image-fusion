export interface postData {
  name: string;
  prompt: string;
  photo: string;
  email: string;
}

export interface SinglePost extends postData {
  __v: number;
  _id: string;
  createdAt: string;
}

export interface PostsResponse {
  data: SinglePost[];
  currentPage?: number;
  totalPages?: number;
}

export enum QueryFetchMode {
  MY_POSTS = "my-posts",
  FAVOURITES = "favourites",
  POSTS = "posts",
}
