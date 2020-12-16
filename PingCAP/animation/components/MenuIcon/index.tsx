import classnames from "classnames";
import styles from "./style.module.scss";

interface IMenuIconProps {
  isActive: boolean;
  onResetActive: () => void;
}
export default function MenuIcon(props: IMenuIconProps) {
  const { isActive, onResetActive } = props;
  const handleToggleInput = () => {
    if (isActive) {
      onResetActive();
    }
  };
  return (
    <div
      className={classnames(styles.menuIcon, { [styles.active]: isActive })}
      onClick={handleToggleInput}
    >
      <label className={styles.label}>
        <i className={classnames(styles.icon, styles.iconMenu)}></i>
      </label>
    </div>
  );
}
