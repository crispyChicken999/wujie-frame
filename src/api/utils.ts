//示例
export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `http://192.168.31.130:8011/api${url}`
    : `http://www.goomaker.com/api${url}`;
