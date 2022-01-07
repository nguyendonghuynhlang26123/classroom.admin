export type QueryType = {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_type?: 'asc' | 'desc';
  is_deleted?: boolean;
  query?: string;
};
