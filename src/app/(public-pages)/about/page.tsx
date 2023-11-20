import { Metadata } from "next";
import { Fragment } from "react";
import "./style.scss";
import Image from "next/image";

export const metadata: Metadata = {
  title: "VODIY PARFUM | HAQIDA",
  description:
    "VODIY PARFUM SAYTI HAQIDA, USHBU SAYTNI ORIPOV FAXRIDDIN TASHKIL ETILDI",
};

const PublicAboutPage = () => {
  return (
    <Fragment>
      <section id="about">
        <div className="container about__container">
          <div className="img__box">
            <Image
              src="https://img.freepik.com/free-photo/online-fashion-shopping-with-laptop_23-2150400630.jpg?size=626&ext=jpg"
              alt="E-commerce"
              fill
            />
          </div>
          <div className="text">
            <h1>Lorem about</h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse nisi
            eligendi maxime aliquid nobis, obcaecati a, facilis distinctio
            laboriosam dolore quia consequuntur impedit illo! Minima dolor
            obcaecati, molestiae iusto officia culpa quibusdam vitae facilis
            maxime cupiditate aspernatur quis debitis laborum unde saepe
            suscipit corporis nostrum voluptas non consequatur ad iure tempore
            ducimus tenetur? Accusamus nam, quisquam sed dignissimos ea aliquid
            at doloribus sit tempora cumque sequi natus eum incidunt,
            accusantium sunt architecto quia cupiditate doloremque praesentium
            exercitationem rem officia facilis? Veniam, vero expedita aliquid
            inventore rerum saepe optio. Culpa ut ex perferendis repellat nemo
            sed iste soluta debitis, nostrum sequi consequuntur officia vero
            dolores quam labore. Eveniet dignissimos, quam doloribus at
            reprehenderit, neque culpa dicta perferendis architecto dolore ad,
            cupiditate earum consequatur minima sunt fugit amet dolores
            explicabo sequi voluptatum ab quisquam!
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PublicAboutPage;
