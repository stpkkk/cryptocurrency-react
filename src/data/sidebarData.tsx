import { AiOutlineAreaChart } from "react-icons/ai";
import { MdAddchart } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { BiInfoSquare } from "react-icons/bi";
import { ISidebar } from "../models";

export const SidebarData: ISidebar[] = [
  {
    title: "Hide",
    path: "#",
    icon: <IoIosArrowBack size={30} />,
    clName: "nav-text",
  },

  {
    title: "Homepage",
    path: "/",
    icon: <AiOutlineAreaChart size={30} />,
    clName: "nav-text",
  },
  {
    title: "Exchanges",
    path: "exchanges",
    icon: <MdAddchart size={30} />,
    clName: "nav-text",
  },
  {
    title: "Cryptocurrencies",
    path: "cryptocurrencies",
    icon: <MdAddchart size={30} />,
    clName: "nav-text",
  },
  {
    title: "CryptoDetails",
    path: "cryptodetails",
    icon: <MdAddchart size={30} />,
    clName: "nav-text",
  },
  {
    title: "News",
    path: "news",
    icon: <MdAddchart size={30} />,
    clName: "nav-text",
  },
  {
    title: "About",
    path: "about",
    icon: <BiInfoSquare size={30} />,
    clName: "nav-text",
  },
];
