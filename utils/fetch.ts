import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "https://www.vote62.com/candidates/ส.ส.เขต",
  timeout: 10000,
});

const httpGet = <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<T>> => apiClient.get(url, config);

const httpPost = <T = any, U = any>(
  url: string,
  body: T,
  config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<U>> => apiClient.post(url, body, config);

const httpPut = <T = any, U = any>(
  url: string,
  body: T,
  config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<U>> => apiClient.put(url, body, config);

const httpDelete = <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<T>> => apiClient.delete(url, config);

const httpPatch = <T = any, U = any>(
  url: string,
  body: T,
  config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<U>> => apiClient.patch(url, body, config);

export { apiClient, httpDelete, httpGet, httpPatch, httpPost, httpPut };
