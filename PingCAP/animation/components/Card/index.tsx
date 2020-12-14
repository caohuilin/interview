import { useEffect, useRef, useState } from "react";
import { ICardItem } from "../../constants/cards";
import styles from "./style.module.scss";

type ICardProps = ICardItem & {
  isActive: boolean;
  onActive: () => void;
};
export default function Card(props: ICardProps) {
  const { title, desc, img, isActive, onActive } = props;

  const itemElement = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const [scale, setScale] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    const dom = itemElement.current!;
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    setSize([width, height]);
  }, []);
  useEffect(() => {
    if (isActive) {
      // 滚动条的高度 20px
      const winWidth = window.outerWidth + 20;
      const winHeight = window.outerHeight + 20;
      const sx = winWidth / size[0];
      const sy = winHeight / size[1];
      setScale([sx, sy]);
    } else {
      setScale([1, 1]);
    }
  }, [isActive]);
  return (
    <div className={styles.card} onClick={onActive}>
      <div
        ref={itemElement}
        className={`${styles.item} ${isActive ? styles.active : ""}`}
        style={{
          width: size[0] || "inhert",
          height: size[1] || "inhert",
          transform: `scale(${scale[0]}, ${scale[1]})`,
        }}
      >
        <img className={styles.img} src={img} alt="title" />
        {/* <figure>
          <img className={styles.img} src={img} alt="title" />
          <div className={styles.background}></div>
          <figcaption>
            <div className={styles.title}>{title}</div>
            <p>{desc}</p>
          </figcaption>
        </figure> */}
      </div>
    </div>
  );
}
