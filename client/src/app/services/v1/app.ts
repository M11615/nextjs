import { headerName } from "@/app/i18n/settings";
import { i18n } from "i18next";

export const getHello = async (i18n: i18n): Promise<Response> => {
  const requestUrl: URL = new URL("api/v1/app/get-hello", process.env.NEXT_PUBLIC_CLIENT_URL);
  const requestHeader: Headers = new Headers({
    [headerName]: i18n.language
  });
  const response: Response = await fetch(requestUrl.toString(), {
    method: "GET",
    headers: requestHeader,
    credentials: "include"
  });
  if (!response.ok) throw new Error();

  return response;
};
