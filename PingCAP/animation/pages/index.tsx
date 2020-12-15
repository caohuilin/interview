import React, { useState } from "react";
import Head from "next/head";
import classnames from "classnames";
import MotionElementGroup from "../components/MotionElementGroup";
import MotionElement from "../components/MotionElement";
import Card from "../components/Card";
import MenuIcon from "../components/MenuIcon";
import { Cards } from "../constants/cards";

import styles from "./style.module.scss";

export default function Home() {
  // const [active, setActive] = useState<number | null>(null);

  // const handleActive = (index: number) => {
  //   setActive(index);
  // };

  // const handleResetActive = () => {
  //   setActive(null);
  // };

  const [isActive, setActive] = useState(false);

  const handleLoad = () => {
    console.log("handleLoad image");
  };

  return (
    <div className={classnames(styles.home)}>
      <Head>
        <title>animation</title>
      </Head>
      <MotionElementGroup isActive={isActive}>
        <MotionElement
          initClassName={styles.imgWrapper}
          activeClassName={classnames(styles.imgWrapper, styles.active)}
        >
          {() => (
            <img
              onLoad={handleLoad}
              className={styles.img}
              onClick={() => setActive(true)}
              src="https://img.pingcap.com/fe-hire/3-img-1.jpg"
            />
          )}
        </MotionElement>
      </MotionElementGroup>
      {/* <MenuIcon isActive={active !== null} resetActive={handleResetActive} /> */}
      {/* {Cards.map((card, index) => (
        <Card
          key={index}
          {...card}
          isActive={active === index}
          onActive={() => handleActive(index)}
        />
      ))} */}
    </div>
  );
}
