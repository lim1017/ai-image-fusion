export interface postData {
  name: string;
  prompt: string;
  photo: string;
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
