import classnames from "classnames";
import MotionElement, {
  ElementStatus,
} from "../../../components/MotionElement";

import styles from "./style.module.scss";

export default function Title({ title }: { title: string }) {
  return (
    <MotionElement
      initClassName={styles.wrapper}
      activeClassName={classnames(styles.wrapper, styles.active)}
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
  );
}
