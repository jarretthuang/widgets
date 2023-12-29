import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets",
  description: "A collection of web widgets",
};

export default function Home() {
  return (
    <HomeLayout>
      <div>This is the home page!</div>
    </HomeLayout>
  );
}
