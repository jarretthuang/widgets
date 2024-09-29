import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import CountdownWidget from "@/app/time/countdown/CountdownWidget";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const till = parseDate(searchParams["till"]);
  const date = till ? `till ${till.toLocaleDateString()}` : "";
  return {
    title: `Countdown ${date}`,
    description: `A widget that displays a countdown.`,
  };
}

export default function CountdownPage({ params, searchParams }: Props) {
  const till = parseDate(searchParams["till"]);
  const description = searchParams["description"];
  return (
    <CountdownWidget date={till} description={description} />
  );
}

function parseDate(utcNumber: string): Date | undefined {
  const date = new Date(parseInt(utcNumber));
  return isNaN(date.getTime()) ? undefined : date;
}
