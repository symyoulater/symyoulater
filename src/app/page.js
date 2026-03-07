import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  if (host.includes("symyoulater.co.uk")) {
    redirect("/coming-soon");
  }
  
  redirect("/home");
}