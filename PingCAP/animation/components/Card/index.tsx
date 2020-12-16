import classnames from "classnames";
import MotionElementGroup from "../../components/MotionElementGroup";
import { ICardItem } from "../../constants/cards";
import Background from "./Background";
import SmallBackground from "./SmallBackGround";
import Img from "./Img";
import Title from "./Title";
import Description from "./Description";

import styles from "./style.module.scss";

type ICardProps = ICardItem & {
  isActive: boolean;
  onActive: () => void;
};
export default function Card({
  title,
  desc,
  img,
  isActive,
  onActive,
}: ICardProps) {
  return (
    <MotionElementGroup isActive={isActive}>
      <div
        className={classnames(styles.card, { [styles.active]: isActive })}
        onClick={onActive}
      >
        <Background />
        <SmallBackground />
        <Img src={img} />
        <Title title={title} />
        <Description desc={desc} isActive={isActive} />
      </div>
    </MotionElementGroup>
  );
}
