import { useState } from "react";
import Head from "next/head";
import classnames from "classnames";
import Card from "../components/Card";
import { Cards } from "../constants/cards";

import styles from "./style.module.scss";

export default function Home() {
  const [active, setActive] = useState<number | null>(null);

  const handleActive = (index: number) => {
    if (active === null) {
      setActive(index);
    } else {
      setActive(null);
    }
  };

  return (
    <div
      className={classnames(styles.home, { [styles.fixed]: active !== null })}
    >
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
