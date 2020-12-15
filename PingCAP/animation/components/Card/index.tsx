import { useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { ICardItem } from "../../constants/cards";

import styles from "./style.module.scss";

type ICardProps = ICardItem & {
  isActive: boolean;
  onActive: () => void;
};

const ImageRight = 64; // 图片放大后距离屏幕右边距离

export default function Card(props: ICardProps) {
  const { title, desc, img, isActive, onActive } = props;

  const imgElement = useRef<HTMLImageElement>(null);
  const backgroundElement = useRef<HTMLDivElement>(null);
  const cardElement = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<DOMRect | null>(null);

  useEffect(() => {
    const cardDom = cardElement.current!;
    const box = cardDom.getBoundingClientRect();
    setBox(box);
  }, []);

  const imageStyle = useMemo(() => {
    let scale = 1;
    let x = 0;
    let y = 0;
    if (isActive && imgElement.current) {
      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;
      const box = imgElement.current.getBoundingClientRect();
      const { width, height, top, left } = box;
      scale = Math.min(docWidth / 2.5 / width, docHeight / height);
      x = -left + docWidth - width * scale - ImageRight;
      y = -top + (docHeight - height * scale) / 2;
    }
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}) `,
    };
  }, [isActive]);

  const backgroundStyle = useMemo(() => {
    let scaleX = 1;
    let scaleY = 1;
    let x = 0;
    let y = 0;
    if (isActive && backgroundElement.current) {
      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;
      const box = backgroundElement.current.getBoundingClientRect();
      const { width, height, top, left } = box;
      scaleX = docWidth / width;
      scaleY = (docHeight * 0.6) / height;
      x = -left;
      y = -top + docHeight * 0.4;
    }
    return {
      transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY}) `,
    };
  }, [isActive]);

  return (
    <div
      className={styles.card}
      onClick={onActive}
      ref={cardElement}
      style={box ? { height: box.height, width: box.width } : {}}
    >
      <div className={classnames(styles.item, { [styles.active]: isActive })}>
        <figure>
          <img
            className={styles.img}
            src={img}
            alt="title"
            ref={imgElement}
            style={imageStyle}
          />
          <div
            className={styles.background}
            ref={backgroundElement}
            style={backgroundStyle}
          ></div>
          <figcaption>
            <div className={styles.title}>{title}</div>
            <p>{desc}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
