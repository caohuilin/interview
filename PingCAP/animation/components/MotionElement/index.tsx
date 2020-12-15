import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import usePrevious from "../../hooks/usePrevious";
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
  const preStatus = usePrevious(status);

  const render = useRef<RenderRefMap>({});
  const initElement = useRef<HTMLDivElement>(null);
  const doneElement = useRef<HTMLDivElement>(null);

  const [positionStyle, setPositionStyle] = useState({ top: 0, left: 0 });
  const [transformParams, setTransformParams] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const [isAnimating, setIsAnimating] = useState(false); // 标记是否在动画中

  useEffect(() => {
    if (status === MotionStatus.Initial) {
      if (render.current) {
        render.current.initial = children;
      }
    }
  }, [status]);

  useLayoutEffect(() => {
    if (status === MotionStatus.Reseting) {
      setPositionStyle({ top: 0, left: 0 });
      setTransformParams({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
      setIsAnimating(true);
    }
    if (status === MotionStatus.Initial && initElement.current) {
      const box = initElement.current.getBoundingClientRect();
      setPositionStyle({ top: box.top, left: box.left });
    }
  }, [status]);

  const transformStyle = useMemo(() => {
    let { x, y, scaleX, scaleY } = transformParams;
    if (status === MotionStatus.Reseting) {
      x = 0;
      y = 0;
      scaleX = 1;
      scaleY = 1;
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

  const handleTransitionEnd = useCallback(() => {
    if (
      status === MotionStatus.Initial &&
      preStatus === MotionStatus.Reseting
    ) {
      setIsAnimating(false);
    }
  }, [status]);

  const { initial } = render.current;
  const isInitial = status === MotionStatus.Initial;
  const showInitial =
    (isInitial && !isAnimating) || status === MotionStatus.Calculating;
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
      {(!isInitial || isAnimating) && (
        <div
          className={classnames(initClassName, styles.motionElement)}
          style={{ ...positionStyle, ...transformStyle }}
          onTransitionEnd={handleTransitionEnd}
        >
          {initial ? initial() : children()}
        </div>
      )}
    </>
  );
}
