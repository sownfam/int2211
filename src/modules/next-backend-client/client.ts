// TODO: Error handling?
export async function httpGet(apiPath: string, searchParams?: URLSearchParams) {
  const fetchPath = searchParams ? `/api/${apiPath}?${searchParams.toString()}` : `/api/${apiPath}`;
  const response = await fetch(fetchPath);
  const body = await response.text();
  const data = JSON.parse(body);
  return data;
}
