// imagini
import Logo from "../src/assets/img/header/logo.png";
import ResistanceImg from "../src/assets/img/workouts/resistance.png";
import BoxingImg from "../src/assets/img/workouts/boxing.png";
import YogaImg from "../src/assets/img/workouts/yoga.png";
import FullBodyImg from "../src/assets/img/workouts/full-body.png";
import FitnessImg from "../src/assets/img/workouts/fitness.png";
import BattleRopeImg from "../src/assets/img/workouts/battle-rope.png";
import JoinImg from "../src/assets/img/join/woman.png";
// iconite
import UsersIcn from "../src/assets/img/about/icons/users-icn.svg";
import CalendarIcn from "../src/assets/img/workouts/icons/calendar.svg";
import PriceIcn from "../src/assets/img/pricing/icons/price.svg";
import QuestionMarkIcn from "../src/assets/img/faq/icons/question-mark.svg";

export const header = {
  logo: Logo,
  btnLoginText: "Autentificare",
  btnSignupText: "Înregistrare",
};

export const banner = {
  titlePart1: "Depășește-ți limitele. ",
  titlePart2: "Fii succesul!",
  subtitle:
    "Îmbunătățește-ți forma fizică și găsește echilibrul ideal la sala noastră de fitness. Alătură-te acum comunității noastre!",
  textBtn: "Alătură-te",
  img: "",
};

export const about = {
  icon: UsersIcn,
  title: "Misiunea noastră",
  subtitle1:
    "Ne remarcăm printr-o atmosferă motivațională fără rival, echipa noastră de experți și echipamentele de fitness de cea mai bună calitate, care ajută membrii noștri să își atingă obiectivele personale de fitness.",
  subtitle2:
    "Identitatea noastră autentică este folosită pentru a încuraja fiecare individ care ne trece pragul să își depășească limitele.",
  link: "",
};

export const workouts = {
  icon: CalendarIcn,
  title: "Antrenamente",
  programs: [
    {
      image: ResistanceImg,
      name: "Rezistență",
    },
    {
      image: BoxingImg,
      name: "Box",
    },
    {
      image: BattleRopeImg,
      name: "Pilates",
    },
    {
      image: YogaImg,
      name: "Yoga",
    },
    {
      image: FullBodyImg,
      name: "Full Body",
    },
    {
      image: FitnessImg,
      name: "Cardio",
    },
  ],
};

export const pricing = {
  icon: PriceIcn,
  title: "Abonamente",
  plans: [
    {
      name: "Basic",
      price: "150",
      list: [
        { name: "12 ședințe/lună" },
        {
          name: "acces la yoga și cardio",
        },
        { name: "o invitație gratuită" },
      ],
      delay: 900,
    },
    {
      name: "Premium",
      price: "200",
      list: [
        { name: "acces nelimitat la sală" },
        { name: "acces la yoga, cardio și full-body" },
        { name: "plan alimentar personalizat pentru o lună" },
      ],
      delay: 1000,
    },
    {
      name: "Elite",
      price: "500",
      list: [
        { name: "acces nelimitat la sală" },
        { name: "acces la toate clasele de antrenament" },
        { name: "6 ședințe cu antrenor personal" },
        { name: "acces gratuit la saună și piscină" },
      ],
      delay: 1200,
    },
  ],
};

export const faq = {
  icon: QuestionMarkIcn,
  title: "FAQ",
  accordions: [
    {
      question: "Care sunt orele de funcționare?",
      answer:
        "Sala noastră este deschisă de luni până vineri în intervalul orar 7:00 - 23:00, iar sâmbătă și duminică în intervalul orar 9:00 - 21:00.",
    },
    {
      question: "Pot să plătesc numerar pentru achiziționarea unui abonament?",
      answer:
        "Da, desigur! Poți plăti abonamentul în numerar direct la recepția sălii noastre. Asigură-te că ai la tine suma exactă, iar echipa noastră te va ajuta cu toate detaliile necesare pentru a finaliza plata și a-ți activa abonamentul pe loc. Te așteptăm!",
    },
    {
      question: "Oferiți clase de grup?",
      answer:
        "Da, avem o varietate de clase de grup, inclusiv yoga, pilates, Zumba, și antrenamente funcționale.",
    },
    {
      question: "Pot să fac un tur al sălii înainte de a mă înscrie?",
      answer:
        "Da, oferim tururi gratuite ale facilităților noastre. Poți veni în orice moment în timpul orelor de funcționare pentru a vizita sala și pentru a discuta cu personalul nostru despre opțiunile de abonament.",
    },
    {
      question: "Pot aduce un prieten să se antreneze cu mine?",
      answer:
        "Da, poți aduce un prieten folosind una dintre invitațiile tale, în funcție de tipul de abonament pe care îl ai. Verifică detaliile abonamentului pentru a vedea câte invitații sunt incluse.",
    },
    {
      question: "Oferiți servicii de antrenament personal?",
      answer:
        "Da, avem antrenori personali certificați care pot crea un plan de antrenament personalizat pentru tine. Poți solicita mai multe informații la recepție.",
    },
  ],
};

export const footer = {
  logo: Logo,
};
