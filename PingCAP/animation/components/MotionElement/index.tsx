import { useContext, useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { MotionContext, MotionStatus } from "../MotionElementGroup";

import styles from "./style.module.scss";

type RenderFunc = () => React.ReactChild;

interface IMotionElementnProps {
  /**
   * 初始状态类名
   */
  initClassName: string;
  /**
   * 激活状态类名
   */
  activeClassName: string;
  children: RenderFunc;
}

type RenderRefMap = { [key in MotionStatus]?: RenderFunc };

export default function MotionElement({
  initClassName,
  activeClassName,
  children,
}: IMotionElementnProps) {
  const { status } = useContext(MotionContext);

  const render = useRef<RenderRefMap>({});
  const initElement = useRef<HTMLDivElement>(null);
  const doneElement = useRef<HTMLDivElement>(null);

  const [transformParams, setTransformParams] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });

  useEffect(() => {
    if (status === MotionStatus.Initial) {
      if (render.current) {
        render.current.initial = children;
      }
    }
  }, [status]);

  let positionStyle = { top: 0, left: 0 };
  if (initElement.current) {
    const box = initElement.current.getBoundingClientRect();
    positionStyle = { top: box.top, left: box.left };
  }

  const transformStyle = useMemo(() => {
    let { x, y, scaleX, scaleY } = transformParams;
    if (status === MotionStatus.Initial) {
      setTransformParams({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
    }
    if (
      status === MotionStatus.Animating &&
      initElement.current &&
      doneElement.current
    ) {
      const initBox = initElement.current.getBoundingClientRect();
      const doneBox = doneElement.current.getBoundingClientRect();
      x = doneBox.left - initBox.left;
      y = doneBox.top - initBox.top;
      scaleX = doneBox.width / initBox.width;
      scaleY = doneBox.height / initBox.height;
    }
    setTransformParams({ x, y, scaleX, scaleY });
    return {
      transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY}) `,
    };
  }, [status]);

  const { initial } = render.current;
  const isInitial = status === MotionStatus.Initial;
  const showInitial =
    status === MotionStatus.Initial || status === MotionStatus.Calculating;
  return (
    <>
      {/**
       *  初始状态 div
       */}
      <div
        ref={initElement}
        className={classnames(initClassName, { [styles.hidden]: !showInitial })}
      >
        {initial ? initial() : children()}
      </div>
      {/**
       *  终止状态 div
       */}
      {!isInitial && (
        <div
          ref={doneElement}
          className={classnames(activeClassName, styles.doneElement)}
        >
          {children()}
        </div>
      )}
      {/**
       *  动画状态 div
       */}
      {!isInitial && (
        <div
          className={classnames(initClassName, styles.motionElement)}
          style={{ ...positionStyle, ...transformStyle }}
        >
          {initial ? initial() : children()}
        </div>
      )}
    </>
  );
}
