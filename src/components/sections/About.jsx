import aboutImg from "../../assets/About image.webp";

export const About = () => {
  return (
    <section
      id="about"
      className="min-h-2/3 flex items-center justify-center py-15"
    >
      {/* <RevealOnScroll> */}
      <div className="flex relative items-center mx-auto w-9/13">
        <div className="aspect-[2.9/1]">
          <img
            src={aboutImg}
            className="filter saturate-0 contrast-80 w-full h-full object-cover object-top"
            alt="Desaturated about image"
          />
        </div>
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-5 p-6">
          <div className="col-start-4 col-span-3 row-start-2 row-span-3 flex items-center justify-center">
            <div className="text-blk font-body flex flex-col text-center">
              <h1 className="p-1 text-sm text uppercase">About me</h1>
              <p className="px-8 text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium vel asperiores eos illo animi voluptatum repudiandae
                error quo cum quae, sed voluptas laudantium. Alias inventore ex
                dolores sint odio dolorem. Deleniti voluptates architecto ea
                fugit! Harum quasi quas enim veritatis? Eveniet veritatis.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </RevealOnScroll> */}
    </section>
  );
};
