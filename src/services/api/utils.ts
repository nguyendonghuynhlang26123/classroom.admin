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
