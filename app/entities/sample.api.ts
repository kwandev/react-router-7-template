import { network } from "~/shared/lib/network";

export const API_DOMAIN = {
  list: () => `https://jsonplaceholder.typicode.com/todos`,
  detail: (id: string) => `https://jsonplaceholder.typicode.com/todos/${id}`,
};

export const getList = async (): Promise<any> => {
  try {
    const response = await network().get(API_DOMAIN.list());
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getNewsDetail = async (uuid: string): Promise<any> => {
  try {
    const response = await network().get(API_DOMAIN.detail(uuid));
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
