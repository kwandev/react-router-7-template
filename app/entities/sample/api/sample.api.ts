import type { Todo } from "~/entities/sample/model/sample.types";
import { network } from "~/shared/lib/network";

export const API_DOMAIN = {
  list: () => `https://jsonplaceholder.typicode.com/todos`,
};

export const getList = async (): Promise<Todo[]> => {
  const response = await network().get(API_DOMAIN.list());
  return await response.json();
};
