import type { ReactNode } from "react";
import type { ISODate } from "@/content/types";

/** Markers that start closer than this (a share of the chart's width) go on separate lanes. */
const LANE_GAP = 0.018;

export const LANE_HEIGHT = 16;

export type Marker = {
  key: string;
  href: string;
  external: boolean;
  title: string;
  date: string;
  pos: number;
  lane: number;
  glyph: ReactNode;
};

export function oldestFirst<T extends { dateStart: ISODate }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => Date.parse(a.dateStart) - Date.parse(b.dateStart));
}

/** Puts each marker on the first lane where it doesn't crowd the one before. */
export function lanes(markers: Omit<Marker, "lane">[]): Marker[] {
  const lastPos: number[] = [];

  return markers.map((marker) => {
    let lane = lastPos.findIndex((pos) => marker.pos - pos >= LANE_GAP);

    if (lane < 0) lane = lastPos.length;

    lastPos[lane] = marker.pos;

    return { ...marker, lane };
  });
}
