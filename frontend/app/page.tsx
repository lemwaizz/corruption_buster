import { Landing } from "@/components/pages/home";
import { Header } from "@/components/shared/header";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Landing />
    </div>
  );
}
