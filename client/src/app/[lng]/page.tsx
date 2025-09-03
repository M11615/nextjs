import { i18n } from "i18next";
import { getT } from "@/app/i18n/index";
import { getHello } from "@/app/services/v1/app";
import Page from "./components/Page";

export default async function Home(): Promise<React.ReactNode> {
  const { i18n }: { i18n: i18n } = await getT("", [null, ""]);
  const response: Response = await getHello(i18n);
  if (response.ok) {
    const requestBody: string = await response.text();
    console.log(requestBody);
  }

  return (
    <Page />
  );
}
