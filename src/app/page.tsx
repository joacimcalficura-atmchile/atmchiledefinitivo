import { HomeUnified } from "@/components/sections/HomeUnified";
import { FooterUnified } from "@/components/shared/FooterUnified";
import { InstagramReels } from "@/components/sections/InstagramReels";

// ISR: la home se regenera como máximo una vez por hora (feed de reels de Instagram).
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HomeUnified reels={<InstagramReels />} />
      <FooterUnified />
    </>
  );
}

