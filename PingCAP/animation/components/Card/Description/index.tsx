import classnames from "classnames";

import styles from "./style.module.scss";

export default function Description({
  desc,
  isActive,
}: {
  desc: string;
  isActive: boolean;
}) {
  return (
    <>
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
    </>
  );
}
