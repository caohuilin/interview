import { useState } from "react";
import Head from "next/head";
import classnames from "classnames";
import Card from "../components/Card";
import MenuIcon from "../components/MenuIcon";
import { Cards } from "../constants/cards";

import styles from "./style.module.scss";

export default function Home() {
  const [active, setActive] = useState<number | null>(null);

  const handleActive = (index: number) => {
    setActive(index);
  };

  const handleResetActive = () => {
    setActive(null);
  };

  return (
    <div
      className={classnames(styles.home, { [styles.fixed]: active !== null })}
    >
      <Head>
        <title>animation</title>
      </Head>
      <MenuIcon isActive={active !== null} resetActive={handleResetActive} />
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
