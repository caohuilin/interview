import Head from "next/head";
import Card from "../components/Card";
import { Cards } from "../constants/cards";

import style from "./style.module.scss";

export default function Home() {
  return (
    <div className={style.home}>
      <Head>
        <title>animation</title>
      </Head>
      {Cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
