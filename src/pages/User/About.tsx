import Frans from '@/assets/img/frans.jpg'
import TyperwritterEffect from "@/layouts/user/component/TyperwritterEffect"

function About() {
  const words = ["Lie Frans Febrianto", "Full Stack Developer"];
  return (
    <div>
      <div className="flex">
        <div className="flex flex-row">
          <div className="grid grid-cols-3 grid-rows-1 gap-3">
            <div className="col-span-2 mt-5">
              <p className="w-full text-xl">
                <TyperwritterEffect phrases={words} />
                <br />
                Aku sangat suka pemrograman, impian saya menjadi master dalam
                Developer, Hacking, dan Cyber Security, saya menguasai beberapa
                bahasa pemrograman; PHP, Javascript, Go. <br />
                Saya juga mengusai beberapa framework, Laravel, CodeIgniter,
                express, gin, vue, nuxt. Sekarang saya sedang belajar React JS,
                dan mungkin setelah ini Next JS dan NestJS. Selain itu saya juga
                suka membaca, belajar adalah keseharian saya, sembari di selingi
                dengan olahraga futsal dan mini soccer.
              </p>
            </div>
            <div className="flex justify-center col-start-3 p-0 overflow-hidden rounded-full w-96 h-96">
              <img
                className="object-cover object-center w-full h-full col-start-3 transition-transform ease-in-out delay-200 scale-110 rounded-full shadow-2xl hover:scale-125"
                src={Frans}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;