import Head from "next/head";
import { useState } from "react";
import Card from "../components/Card";
import { Cards } from "../constants/cards";

import style from "./style.module.scss";

export default function Home() {
  const [active, setActive] = useState<number | null>(null);

  const handleActive = (index: number) => {
    setActive(index);
  };
  return (
    <div className={style.home}>
      <Head>
        <title>animation</title>
      </Head>
      {Cards.map((card, index) => (
        <Card
          key={index}
          {...card}
          isActive={active === index}
          onActive={() => handleActive(index)}
        />
      ))}
    </div>
  );
}
