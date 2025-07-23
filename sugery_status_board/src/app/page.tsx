import { cardData } from "@/utils/cardData";
import AuthModule from "./Auth/page";
import HomeCard from "@/components/homeCard";

export default function HomePage() {
  return (
    <main>
      {/* intro capture head */}
      <section className="flex flex-col justify-center items-center mt-6">
        <div className="flex flex-col sm:w-[40%] w-[80%] justify-center items-center">
          <div className="w-[13dvh] h-[13dvh] bg-accentMain2 rounded-sm" />
          <h1 className="text-2xl font-black font-sans">Live Orbit</h1>
          <h3 className="text-gray-600 text-center">
            Keeping families, loved ones informed and surgical teams coordinated
            with real time patient progress tracking{" "}
          </h3>
        </div>
      </section>
      {/* card section  */}
      <section className="grid mt-4  gap-y-4 sm:gap-x-4 gap-x-2 grid-cols-2 sm:grid-cols-4">
        {cardData.map((card) => {
          return (
            <HomeCard
              key={card.desc}
              Icon={card.Icon}
              header={card.header}
              desc={card.desc}
            />
          );
        })}
      </section>
      {/* auth module */}
      <section className="mx-auto mt-10">
        <AuthModule />
      </section>
    </main>
  );
}
// land page
