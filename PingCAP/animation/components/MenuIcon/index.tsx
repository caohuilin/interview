import classnames from "classnames";
import styles from "./style.module.scss";

interface IMenuIconProps {
  isActive: boolean;
  resetActive: () => void;
}
export default function MenuIcon(props: IMenuIconProps) {
  const { isActive, resetActive } = props;
  const handleToggleInput = () => {
    if (isActive) {
      resetActive();
    }
  };
  return (
    <div className={styles.menuIcon} onClick={() => handleToggleInput()}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isActive}
        onChange={handleToggleInput}
      />
      <label className={styles.label}>
        <i className={classnames(styles.icon, styles.iconMenu)}></i>
      </label>
    </div>
  );
}
