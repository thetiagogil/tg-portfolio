import { previewImage, previewStaticParams } from "@/features/link-previews/preview-route";

export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = previewStaticParams;
export const GET = previewImage;
