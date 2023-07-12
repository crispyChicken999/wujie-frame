//示例
import { useMock } from "@/api/hooks/mock";

export const baseUrlApi = (url: string, needMock?: boolean): string => {
  const { isMockEnable } = useMock();

  return needMock || (isMockEnable.value ?? false)
    ? `http://192.168.31.40:8848${url}`
    : process.env.NODE_ENV === "development"
    ? `http://192.168.31.130:8011/api${url}`
    : `http://www.goomaker.com/api${url}`;
};
