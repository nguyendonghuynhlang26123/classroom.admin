import { QueryType } from './../../common/type/query.type';
const get = (url: string) => ({
  url,
});

const post = (url: string, body: any) => ({
  url,
  data: body,
  method: 'POST',
});

const put = (url: string, body: any) => ({
  url,
  data: body,
  method: 'PUT',
});

const deleteReq = (url: string) => ({
  url,
  method: 'DELETE',
});

export const _request = {
  get,
  post,
  put,
  delete: deleteReq,
};
export const queryToUrl = (url: string, query: QueryType) => {
  const queryData = {
    page: 1,
    per_page: 10,
    sort_type: 'desc',
    sort_by: 'created_at',
    ...query,
  };
  return url + '?' + new URLSearchParams(queryData as any).toString();
};
