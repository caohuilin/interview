import classnames from "classnames";
import MotionElement, {
  ElementStatus,
} from "../../../components/MotionElement";

import styles from "./style.module.scss";

export default function Img({ src }: { src: string }) {
  return (
    <MotionElement
      initClassName={styles.wrapper}
      activeClassName={classnames(styles.wrapper, styles.active)}
    >
      {(status) => (
        <img
          className={classnames(styles.img, {
            [styles.init]: status === ElementStatus.Init,
            [styles.end]: status === ElementStatus.End,
          })}
          src={src}
        />
      )}
    </MotionElement>
  );
}
