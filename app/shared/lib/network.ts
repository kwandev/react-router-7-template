import ky from "ky";

/**
 * 서버 API 도메인
 */
export const API_DOMAIN = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
} as const;

/**
 * 경로에서 앞에 '/'가 있으면 제거함
 * @param path 경로
 * @returns 앞에 '/'가 제거된 경로
 */
const removeLeadingSlash = (path: string): string => {
  return path.startsWith("/") ? path.substring(1) : path;
};

export const network = (baseUrl = API_DOMAIN.BASE_URL) => {
  const api = ky.create({
    prefixUrl: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    retry: 1,
    timeout: 30_000,
  });

  const get = async (path: string, params?: Record<string, unknown>) => {
    const url = removeLeadingSlash(path);
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
    }
    return api.get(url, { searchParams });
  };

  const post = async <T = unknown>(path: string, params?: T) => {
    const url = removeLeadingSlash(path);
    return api.post(url, { json: params });
  };

  const put = async <T = unknown>(path: string, params?: T) => {
    const url = removeLeadingSlash(path);
    return api.put(url, { json: params });
  };

  const remove = async (path: string, params?: Record<string, unknown>) => {
    const url = removeLeadingSlash(path);
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
    }
    return api.delete(url, { searchParams });
  };

  return { get, post, put, delete: remove };
};
