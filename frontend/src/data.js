// imagini
import Logo from "../src/assets/img/header/logo.svg";
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
import CommunityIcn from "../src/assets/img/community/icons/community-icn.svg";
import QuestionMarkIcn from "../src/assets/img/faq/icons/question-mark.svg";

export const header = {
  logo: Logo,
  btnLoginText: "Autentificare",
  btnSignupText: "Înregistrare",
};

export const nav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Workouts", href: "/" },
  { name: "Pricing", href: "/" },
  { name: "Community", href: "/" },
  { name: "FAQ", href: "/" },
];

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
  link: "Join Now",
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
      name: "Battle Rope",
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
      name: "Culturism",
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
      question: "How can I book a workout class?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.",
    },
    {
      question: "Can I pay by cash for my membership?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.",
    },
    {
      question: "What age do I need to be to join?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.",
    },
    {
      question: "Are there any lockers?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.",
    },
    {
      question: "How do I cancel my membership?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.",
    },
    {
      question: "Is there water available at the gym?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae temporibus beatae, totam repudiandae nam recusandae ea dolores tempora maxime.",
    },
  ],
};

export const join = {
  image: JoinImg,
  title: "Wanna join & have fun?",
  subtitle:
    "We’ll keep you updated on the things you need to know about Gymme. Nothing more, nothing less.",
  btnText: "Join now",
};

export const footer = {
  logo: Logo,
  copyrightText: "All rights reserved. Gymme 2022.",
};
