import React, { useEffect, useState } from "react";
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

  const disableWheel = (e: any) => {
    e.preventDefault(0);
  };

  const disablekeyDown = (e: any) => {
    if (e.key == "ArrowDown" || e.key == "ArrowUp") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (active === null) {
      window.removeEventListener("wheel", disableWheel);
      window.removeEventListener("keydown", disablekeyDown);
    } else {
      window.addEventListener("wheel", disableWheel, { passive: false });
      window.addEventListener("keydown", disablekeyDown, { passive: false });
    }
    return () => {
      window.removeEventListener("wheel", disableWheel);
      window.removeEventListener("keydown", disablekeyDown);
    };
  }, [active]);

  return (
    <div
      className={classnames(styles.home, { [styles.active]: active !== null })}
    >
      <Head>
        <title>animation</title>
      </Head>
      <MenuIcon isActive={active !== null} onResetActive={handleResetActive} />
      <div className={styles.left}>
        {Cards.filter((_, index) => index % 2).map((card, index) => (
          <Card
            key={2 * index + 1}
            {...card}
            isActive={active === 2 * index + 1}
            onActive={() => handleActive(2 * index + 1)}
          />
        ))}
      </div>
      <div className={styles.right}>
        {Cards.filter((_, index) => index % 2 === 0).map((card, index) => (
          <Card
            key={2 * index}
            {...card}
            isActive={active === 2 * index}
            onActive={() => handleActive(2 * index)}
          />
        ))}
      </div>
    </div>
  );
}
