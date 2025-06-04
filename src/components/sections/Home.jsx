import { RevealOnScroll } from "../RevealOnScroll";
import videoBG from "../../assets/wedding-intro.mp4";

export const Home = () => {
  return (
    <section
      id="home"
      className="flex items-center justify-center relative overflow-hidden"
    >
      <RevealOnScroll>
        <div>
          <div className=" py-14 bg-cover bg-no-repeat bg-center">
            <div>
              <video
                className="pb-2 md:mask-b-from-30% md:mask-b-to-97%"
                src={videoBG}
                autoPlay
                playsInline
                loop
                muted
              />
            </div>
            {/* overlay text on top of video*/}
          </div>
          <div className="w-full absolute flex flex-col items-center text-2xl xs:text-3xl sm:text-4xl md:text-primaryft md:text-5xl lg:text-6xl text-wht top-7/12 left-1/2 -translate-x-1/2 -translate-y-1/2 font-logo md:space-y-4">
            <h1>Glimpse and Smile Films</h1>
            <a
              href="#contact"
              className="inline-block rounded-sm font-action text-primaryft text-xs sm:text-sm md:text-md px-3 py-1 sm:py-2 md:px-4 lg:px-6  text-center bg-action hover:bg-action-hvr"
            >
              Book Now
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
