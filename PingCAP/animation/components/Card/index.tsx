import { ICardItem } from "../../constants/cards";
import styles from "./style.module.scss";

type ICardProps = ICardItem & {};
export default function Card(props: ICardProps) {
  const { title, desc, img } = props;
  return (
    <div className={styles.card}>
      <figure>
        <img className={styles.img} src={img} alt="title" />
        <div className={styles.background}></div>
        <figcaption>
          <div className={styles.title}>{title}</div>
          <p>{desc}</p>
        </figcaption>
      </figure>
    </div>
  );
}
