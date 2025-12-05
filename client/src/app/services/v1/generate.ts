import { UserGenerateRequest } from "@/app/api/v1/generate/user-generate/route";

export const userGenerate = async (requestBody: UserGenerateRequest, signal: AbortSignal): Promise<Response> => {
  const requestUrl: URL = new URL("api/v1/generate/user-generate", process.env.NEXT_PUBLIC_CLIENT_URL);
  const requestHeader: Headers = new Headers({
    "Content-Type": "application/json; charset=utf-8"
  });
  const response: Response = await fetch(requestUrl.toString(), {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(requestBody),
    signal
  });
  if (!response.ok) throw new Error();

  return response;
};
