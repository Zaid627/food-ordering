import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />

        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque porta diam ac ante varius, elementum lacinia arcu
            maximus. Sed tempor sem ac odio blandit elementum. Etiam et
            tincidunt felis, non tempor purus.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque porta diam ac ante varius, elementum lacinia arcu
            maximus. Sed tempor sem ac odio blandit elementum. Etiam et
            tincidunt felis, non tempor purus.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque porta diam ac ante varius, elementum lacinia arcu
            maximus.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel;+46738123123"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
