import classnames from "classnames";
import MotionElementGroup from "../../components/MotionElementGroup";
import MotionElement, { ElementStatus } from "../../components/MotionElement";
import { ICardItem } from "../../constants/cards";

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
        <MotionElement
          initClassName={styles.backgroundWrapper}
          activeClassName={classnames(
            styles.backgroundWrapper,
            styles.activeBackgroundWrapper
          )}
        >
          {(status?: ElementStatus) => (
            <div
              className={classnames(styles.background, {
                [styles.init]: status === ElementStatus.Init,
                [styles.end]: status === ElementStatus.End,
              })}
            ></div>
          )}
        </MotionElement>
        <MotionElement
          initClassName={styles.smallBackgroundWrapper}
          activeClassName={classnames(
            styles.smallBackgroundWrapper,
            styles.activeSmallBackgroundWrapper
          )}
        >
          {(status) => (
            <div
              className={classnames(styles.smallBackground, {
                [styles.init]: status === ElementStatus.Init,
                [styles.end]: status === ElementStatus.End,
              })}
            ></div>
          )}
        </MotionElement>
        <MotionElement
          initClassName={styles.imgWrapper}
          activeClassName={classnames(
            styles.imgWrapper,
            styles.activeImgWrapper
          )}
        >
          {(status) => (
            <img
              className={classnames(styles.img, {
                [styles.init]: status === ElementStatus.Init,
                [styles.end]: status === ElementStatus.End,
              })}
              src={img}
            />
          )}
        </MotionElement>
        <MotionElement
          initClassName={styles.titleWrapper}
          activeClassName={classnames(
            styles.titleWrapper,
            styles.activeTitleWrapper
          )}
          ignoreScale={true}
        >
          {(status) => (
            <div
              className={classnames(styles.title, {
                [styles.init]: status === ElementStatus.Init,
                [styles.end]: status === ElementStatus.End,
              })}
            >
              {title}
            </div>
          )}
        </MotionElement>
        <div className={styles.desc}>{desc}</div>
        <div
          className={classnames(styles.divider, {
            [styles.activeDivider]: isActive,
          })}
        />
        <div
          className={classnames(styles.desc2, {
            [styles.activeDesc2]: isActive,
          })}
        >
          {desc}
        </div>
      </div>
    </MotionElementGroup>
  );
}
