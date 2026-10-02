"use client";

import { useMemo, useSyncExternalStore } from "react";
import { searchFromView, type View, viewFromSearch } from "../timeline-filters";

const URL_EVENT = "timeline:url";

export function useTimelineView(knownTools: readonly string[]) {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const view = useMemo(() => viewFromSearch(search, knownTools), [search, knownTools]);

  function setView(patch: Partial<View>) {
    const url = `${window.location.pathname}${searchFromView({ ...view, ...patch })}`;

    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(URL_EVENT));
  }

  return [view, setView] as const;
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);

  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}
