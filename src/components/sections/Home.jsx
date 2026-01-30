import { useEffect, useState } from "react";
import videoBG from "../../assets/wedding-intro.mp4";
import videoplaceholder from "../../assets/BandS thumbnail.avif";
import herotextimg from "../../assets/GS logo text.png";

export const Home = () => {
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoWidth(window.innerWidth);
    const resize = () => setVideoWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("click", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="flex relative items-center justify-center object-top overflow-hidden 2xl:h-screen"
    >
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gr">
          <img
            src={videoplaceholder}
            alt="Placeholder"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      )}
      <div>
        <div className="bg-cover bg-no-repeat bg-center">
          <video
            className={`w-full h-auto ${videoLoaded ? "opacity-100" : "opacity-0"}`}
            src={videoBG}
            onLoadedData={() => setVideoLoaded(true)}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            style={{ width: videoWidth }}
            // This ensures the attribute is actually on the DOM element for iOS
            onCanPlayThrough={() => setVideoLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-blk opacity-35"></div>
        <div className="w-full absolute flex flex-col items-center text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl top-7/12 left-1/2 -translate-x-1/2 -translate-y-1/2 md:space-y-4">
          <img className="max-w-7/13" src={herotextimg} alt="G and S Logo" />
          <h1 className="font-body text-wht uppercase font-extralight tracking-[6px] md:tracking-[15px]">
            Films
          </h1>
        </div>
      </div>
    </section>
  );
};
