import { RevealOnScroll } from "../RevealOnScroll";
import aboutImg from "../../assets/DSC00472.jpg";

export const About = () => {
  return (
    <section
      id="about"
      className="min-h-2/3 flex items-center justify-center py-15"
    >
      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[30%_70%] w-full">
          <div className="p-8 md:pl-10 flex items-center">
            <img src={aboutImg} className="rounded" />
          </div>
          <div className=" space-y-8 p-10 text-primaryft">
            <h2 className=" text-3xl font-bold mb-8 lg:pt-15">
              Hi, i am Vitaliy
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
              provident nemo illum voluptate, eaque quod in? Minus, facere
              reiciendis unde neque provident, animi in dignissimos corrupti
              accusamus exercitationem quibusdam ipsa. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Odio aperiam maxime officia
              consequuntur est veniam repellat obcaecati voluptatum, voluptas
              totam eius, sit doloribus adipisci corporis aliquam? Ex odit
              tempore iste! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Temporibus aut laudantium voluptatibus natus voluptate
              deserunt animi, iure totam ducimus officiis qui aperiam explicabo
              ab voluptatum a fugiat eos saepe sapiente.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              accusamus, expedita totam, error maiores commodi numquam, natus
              suscipit dolorem minima dolore eligendi laborum minus sunt cum
              tempore quia cumque doloribus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              sunt, vero aut ducimus facilis, nobis assumenda ipsam quas beatae
              accusantium, alias illo molestiae fugit reprehenderit recusandae
              tempore molestias laudantium quidem.
            </p>
            <h4 className="text-xl text-center">Recording your memories!</h4>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
