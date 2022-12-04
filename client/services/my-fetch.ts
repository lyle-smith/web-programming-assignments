export const API_ROOT = "http://localhost:3003/api/v1/";

export default function myFetch<T>(
  url: string,
  data: any = null,
  method?: string
): Promise<T> {
  const options: RequestInit = {
    method: method || (data ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };
  return fetch(API_ROOT + url, options).then((res) => res.json());
}
