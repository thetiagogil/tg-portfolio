import { HomePage } from "@/features/home/HomePage";
import { homeMetadata } from "@/lib/pages";

export const metadata = homeMetadata("en");
export default function Page() {
  return <HomePage lang="en" />;
}
