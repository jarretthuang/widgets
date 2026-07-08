import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import CountdownWidget from "@/app/time/countdown/CountdownWidget";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const till = parseDate(getSingleValue(resolvedSearchParams["till"]));
  const date = till ? `till ${till.toLocaleDateString()}` : "";
  return {
    title: `Countdown ${date}`,
    description: `A widget that displays a countdown.`,
  };
}

export default async function CountdownPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const till = parseDate(getSingleValue(resolvedSearchParams["till"]));
  const description = getSingleValue(resolvedSearchParams["description"]);
  return (
    <CountdownWidget date={till} description={description} />
  );
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseDate(utcNumber: string | undefined): Date | undefined {
  if (!utcNumber) {
    return undefined;
  }

  const date = new Date(parseInt(utcNumber));
  return isNaN(date.getTime()) ? undefined : date;
}
