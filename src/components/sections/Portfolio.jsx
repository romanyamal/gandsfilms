import img1 from "../../assets/BandS thumbnail.avif";
import img2 from "../../assets/AandA thumbnail.avif";

export const Portfolio = () => {
  return (
    <section
      id="mywork"
      className="relative w-full p-6 pt-15 xs:p-10 sm:p-15 md:pt-40 md:pb-20 flex justify-center"
    >
      <div className="flex flex-col items-center justify-center max-w-4/5 gap-15 sm:gap-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[45%_55%]">
          <div className="lg:pr-10">
            <a
              href="https://vimeo.com/772666124"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={img1}
                className="aspect-[20/9] object-cover object-top w-full h-full"
              />
            </a>
          </div>
          <div className="text-blk flex flex-col justify-center">
            <h2 className="font-light text-base text-center pt-10 pb-4">
              BRETT + SVETLANA
            </h2>
            <p className="font-extralight px-4 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos aliquid voluptas officiis, aliquam sapiente, modi
              totam laudantium nobis ad adipisci exercitationem saepe provident.
              Fugiat velit eos minima cum, deserunt sapiente! Fugiat velit eos
              minima cum, deserunt sapiente! ad adipisci exercitationem saepe
              provident. Fugiat velit eos minima cum, deserunt sapiente! Fugiat
              velit eos minima cum, deserunt sapiente!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[55%_45%]">
          <div className="order-1 lg:order-2 lg:pl-10">
            <a
              href="https://vimeo.com/774954450"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={img2}
                className="aspect-[20/9] object-cover w-full h-full"
              />
            </a>
          </div>

          <div className="order-2 lg:order-1 text-blk flex flex-col justify-center">
            <h2 className="font-light text-base text-center pt-10 pb-4">
              ANDREI + ANGELINA
            </h2>
            <p className="font-extralight px-4 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              numquam nobis ex atque quidem, aut doloribus! Rem fuga deserunt
              dolorum sunt nam, ullam non dolorem officia laudantium, adipisci
              id numquam! modi totam laudantium nobis ad adipisci exercitationem
              saepe provident. ad adipisci exercitationem saepe provident.
              Fugiat velit eos minima cum, deserunt sapiente! Fugiat velit eos
              minima cum, deserunt sapiente!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
