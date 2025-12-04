import { NextRequest, NextResponse } from "next/server";

export interface UserGenerateRequest {
  inputText: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const requestUrl: URL = new URL("v1/generate/user-generate", process.env.SERVER_URL);
  const requestHeader: Headers = request.headers;
  const requestBody: UserGenerateRequest = await request.json();
  const response: Response = await fetch(requestUrl.toString(), {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(requestBody),
    signal: request.signal
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers
  });
}
