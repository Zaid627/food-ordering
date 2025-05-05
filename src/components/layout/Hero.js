import Image from "next/image";
import Right from "../icons/Rights";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          EveryThing <br />
          is better <br />
          with a&nbsp;
          <span className="text-[#f13a01]">Pizza</span>
        </h1>
        <p className="py-6 text-gray-500 text-sm">
          Pizza is the missing piece thay make every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className=" bg-[#f13a01] uppercase flex items-center gap-2 text-white px-8 py-2 rounded-full">
            Order Now
            <Right />
          </button>
          <button
            className=" flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold"
            style={{ border: 0 }}
          >
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/pizza.png"}
          alt="piza"
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
}
