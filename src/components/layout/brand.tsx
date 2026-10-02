import { profile } from "@/content";
import { MonoMark } from "./mono-mark";

export function Brand() {
  return (
    <>
      <MonoMark />
      <span className="text-[15px] font-medium tracking-[-0.01em]">{profile.name}</span>
    </>
  );
}
