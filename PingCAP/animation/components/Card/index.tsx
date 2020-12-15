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

  const cardElement = useRef<HTMLDivElement>(null);
  const imgElement = useRef<HTMLImageElement>(null);
  const backgroundElement = useRef<HTMLDivElement>(null);
  const cardBackgroundElement = useRef<HTMLDivElement>(null);
  const titleElement = useRef<HTMLDivElement>(null);
  const descElement = useRef<HTMLParagraphElement>(null);
  const dividerElement = useRef<HTMLDivElement>(null);
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
      transform: `translate(${x}px, ${y}px) scale(${scale}, ${scale}) `,
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
      scaleY = docHeight / height;
      x = -left;
      y = -top;
    }
    return {
      transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY}) `,
    };
  }, [isActive]);

  const cardBackgroundStyle = useMemo(() => {
    let scaleY = 1;
    let y = 0;
    if (
      isActive &&
      cardBackgroundElement.current &&
      backgroundElement.current
    ) {
      const parentBox = backgroundElement.current.getBoundingClientRect();
      const box = cardBackgroundElement.current.getBoundingClientRect();
      scaleY = 1.4;
      y = parentBox.height * 0.4;
    }
    return {
      transform: `translateY(${y}px) scale(1, ${scaleY})`,
    };
  }, [isActive]);

  const titleStyle = useMemo(() => {
    let scale = 1;
    let x = 0;
    let y = 0;
    if (isActive && titleElement.current && imgElement.current) {
      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;
      const box = titleElement.current.getBoundingClientRect();
      const imageWidth = imgElement.current.clientWidth;
      const { width, top, left } = box;
      scale = 1.2;
      x = -left + (docWidth - imageWidth - ImageRight - width) / 2;
      y = -top + docHeight * 0.35;
    }
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}, ${scale}) `,
    };
  }, [isActive]);

  const descStyle = useMemo(() => {
    let x = 0;
    let y = 0;
    if (descElement.current && imgElement.current && titleElement.current) {
      const docWidth = document.documentElement.clientWidth;
      const imageWidth = imgElement.current.clientWidth;
      const titleWidth = titleElement.current.clientWidth;
      const box = descElement.current.getBoundingClientRect();
      const { left } = box;
      x = -left + (docWidth - imageWidth - ImageRight - titleWidth) / 2 - 20;
    }
    if (isActive) {
      y = 20;
    }
    return {
      left: `${x}px`,
      transform: `translateY(-${y}px)`,
    };
  }, [isActive]);

  const dividerStyle = useMemo(() => {
    let x = 0;
    let y = 0;
    if (descElement.current && imgElement.current && titleElement.current) {
      const docWidth = document.documentElement.clientWidth;
      const imageWidth = imgElement.current.clientWidth;
      const titleWidth = titleElement.current.clientWidth;
      const box = descElement.current.getBoundingClientRect();
      const { left } = box;
      x = -left + (docWidth - imageWidth - ImageRight - titleWidth) / 2 - 20;
    }
    if (isActive) {
      y = 20;
    }
    return {
      left: `${x}px`,
      transform: `translateY(-${y}px)`,
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
          <div
            className={styles.imgWrapper}
            ref={imgElement}
            style={imageStyle}
          >
            <img className={styles.img} src={img} alt="title" />
          </div>
          <div
            className={styles.background}
            ref={backgroundElement}
            style={backgroundStyle}
          >
            <div
              className={styles.cardBackground}
              ref={cardBackgroundElement}
              style={cardBackgroundStyle}
            />
          </div>
          <figcaption>
            <div className={styles.title} ref={titleElement} style={titleStyle}>
              {title}
            </div>
            <div
              className={styles.divider}
              ref={dividerElement}
              style={dividerStyle}
            />
            <p className={styles.desc}>{desc}</p>
            <p className={styles.desc2} ref={descElement} style={descStyle}>
              {desc}
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
