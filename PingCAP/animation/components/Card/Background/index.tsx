import classnames from "classnames";
import MotionElement, {
  ElementStatus,
} from "../../../components/MotionElement";

import styles from "./style.module.scss";

export default function Background() {
  return (
    <MotionElement
      initClassName={styles.wrapper}
      activeClassName={classnames(styles.wrapper, styles.active)}
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
  );
}
