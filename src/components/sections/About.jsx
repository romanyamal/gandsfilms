import aboutImg from "../../assets/About image.webp";

export const About = () => {
  return (
    <section
      id="about"
      className="min-h-2/3 flex items-center justify-center py-20"
    >
      {/* <RevealOnScroll> */}
      <div className="flex flex-col lg:flex-row lg:relative items-center mx-auto w-11/13 lg:w-9/13">
        <div className="aspect-[3/4] lg:aspect-[2.9/1]">
          <img
            src={aboutImg}
            className="filter saturate-0 contrast-80 w-full h-full object-cover object-[10%_10%] lg:object-top"
            alt="Desaturated about image"
          />
        </div>
        <div className="lg:absolute lg:inset-0 lg:grid lg:grid-cols-7 lg:grid-rows-5 p-6">
          <div className="lg:col-start-3 xl:col-start-4 lg:col-span-5 xl:col-span-3 lg:row-start-2 lg:row-span-3 flex items-center justify-center">
            <div className="text-blk font-body flex flex-col text-center">
              <h1 className="p-1 text-lg font-normal uppercase">About me</h1>
              <p className="px-8 py-2 lg:py-0 text-md md:text-sm lg:text-md font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium vel asperiores eos illo animi voluptatum repudiandae
                error quo cum quae, sed voluptas laudantium. Alias inventore ex
                dolores sint odio dolorem. Delfugit! Harum quasi quas enim
                veritatis? Eveniet veritatis.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </RevealOnScroll> */}
    </section>
  );
};
