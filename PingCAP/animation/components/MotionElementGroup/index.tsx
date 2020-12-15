import React, { useEffect, useLayoutEffect, useState } from "react";

export enum MotionStatus {
  Initial = "initial", // 初始状态
  Calculating = "calculating", // 计算动画相关参数
  Animating = "animating", // 动画中
  Done = "done", // 结束
}

interface IMotionContextValue {
  status: MotionStatus;
}
export const MotionContext = React.createContext<IMotionContextValue>({
  status: MotionStatus.Initial,
});

interface IMotionElementGroupProps {
  /**
   * 标记当前动画是否激活
   */
  isActive: boolean;
}
export default function MotionElementGroup(
  props: React.PropsWithChildren<IMotionElementGroupProps>
) {
  const [status, setStatus] = useState(MotionStatus.Initial);
  const { isActive, children } = props;

  const contextValue = { status };

  useEffect(() => {
    if (isActive) {
      if (status === MotionStatus.Initial) {
        setStatus(MotionStatus.Calculating);
      }
    } else {
      if (status !== MotionStatus.Initial) {
        setStatus(MotionStatus.Initial);
      }
    }
  }, [isActive]);

  useLayoutEffect(() => {
    switch (status) {
      case MotionStatus.Calculating:
        setStatus(MotionStatus.Animating);
        break;
      case MotionStatus.Animating:
        setStatus(MotionStatus.Done);
    }
  });

  return (
    <MotionContext.Provider value={contextValue}>
      {children}
    </MotionContext.Provider>
  );
}
