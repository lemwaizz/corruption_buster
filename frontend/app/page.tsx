import {
  AccessCorruptionCases,
  BecomeTheChangeYouWant,
  Landing,
  LandingImages,
} from "@/components/pages/home";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Landing />
      <AccessCorruptionCases />
      <LandingImages />
      <BecomeTheChangeYouWant />
      <Footer />
    </div>
  );
}
