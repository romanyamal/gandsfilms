import { RevealOnScroll } from "../RevealOnScroll";
import img1 from "../../assets/DSC08388.jpg";
import img2 from "../../assets/DSC09510.jpg";

export const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative items-center justify-center w-full min-h-2/3 py-15"
    >
      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full text-primaryft text-center items-center">
          <div className="p-8">
            <img src={img1} className="rounded object-cover" />
          </div>
          <div>
            <h2 className="font-accent p-8">BRETT + SVETLANA</h2>
            <p className="font-accent pl-8 pr-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos aliquid voluptas officiis, aliquam sapiente, modi
              totam laudantium nobis ad adipisci exercitationem saepe provident.
              Fugiat velit eos minima cum, deserunt sapiente! modi totam
              laudantium nobis ad adipisci exercitationem saepe provident.
              Fugiat velit eos minima cum, deserunt sapiente!
            </p>
            <a
              href="https://vimeo.com/772666124"
              className="m-8 inline-block rounded-sm text-lg font-action text-primaryft px-8 py-2 text-center bg-action hover:bg-action-hvr"
            >
              View Film
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full text-center  text-primaryft items-center">
          <div className="order-2 md:order-1 ">
            <h2 className="font-accent p-8">ANDREI + ANGELINA</h2>
            <p className="pl-8 pr-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              numquam nobis ex atque quidem, aut doloribus! Rem fuga deserunt
              dolorum sunt nam, ullam non dolorem officia laudantium, adipisci
              id numquam! modi totam laudantium nobis ad adipisci exercitationem
              saepe provident. Fugiat velit eos minima cum, deserunt sapiente!
            </p>
            <a
              href="https://vimeo.com/774954450"
              className="m-8 inline-block rounded-sm text-lg font-action  text-primaryft px-8 py-2 text-center bg-action hover:bg-action-hvr"
            >
              View Film
            </a>
          </div>
          <div className="order-1 md:order-2 p-8">
            <img src={img2} className="rounded object-cover" />
          </div>
        </div>
        <div className="flex flex-col items-center pt-10 text-primaryft">
          <h1 className="text-xl">For more content checkout our instagram!</h1>
          <a
            href="https://www.instagram.com/glimpseandsmilefilms/"
            className="m-8 inline-block rounded-sm text-lg font-action  text-primaryft px-8 py-2 text-center bg-action hover:bg-action-hvr"
          >
            @glimpseandsmilefilms
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
};
