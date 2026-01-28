import img1 from "../../assets/BandS thumbnail.avif";
import img2 from "../../assets/AandA thumbnail.avif";

export const Portfolio = () => {
  return (
    <section
      id="mywork"
      className="relative items-center justify-center w-full min-h-2/3 py-15 px-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full text-primaryft text-center items-center">
        <div className="pr-10 py-2">
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

        <div>
          <h2 className="font-accent px-8 py-2 text-md">BRETT + SVETLANA</h2>
          <p className="font-accent px-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            aliquid voluptas officiis, aliquam sapiente, modi totam laudantium
            nobis ad adipisci exercitationem saepe provident. Fugiat velit eos
            minima cum, deserunt sapiente! Fugiat velit eos minima cum, deserunt
            sapiente!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full text-center  text-primaryft items-center">
        <div className="order-2 md:order-1 ">
          <h2 className="font-accent px-8 py-2 text-md">ANDREI + ANGELINA</h2>
          <p className="px-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            numquam nobis ex atque quidem, aut doloribus! Rem fuga deserunt
            dolorum sunt nam, ullam non dolorem officia laudantium, adipisci id
            numquam! modi totam laudantium nobis ad adipisci exercitationem
            saepe provident.
          </p>
        </div>
        <div className="order-1 md:order-2 pl-10 py-2">
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
      </div>
    </section>
  );
};
