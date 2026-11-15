import { HomeUnified } from "@/components/sections/HomeUnified";
import { FooterUnified } from "@/components/shared/FooterUnified";

export default function Home() {
  return (
    <>
      <HomeUnified />
      <FooterUnified />
    </>
  );
}

// Canónica propia de la home: el layout raíz ya no declara una global.
export const metadata = {
  alternates: { canonical: "/" },
};
