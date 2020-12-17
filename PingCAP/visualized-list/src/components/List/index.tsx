import React, { useState } from 'react'

import styles from './styles.module.css'

export interface IItemProps {
  /**
   * 当前列表 index
   */
  index: number
  /**
   * 当前列表样式
   */
  style: React.CSSProperties
}

export interface IListProps {
  /**
   * 容器宽度
   */
  width: number
  /**
   * 容器高度
   */
  height: number
  /**
   * 列表项总数
   */
  itemCount: number
  /**
   * 每一列高度
   */
  itemHeight: number
  /**
   * render Props
   */
  children: (props: IItemProps) => React.ReactNode
}

export default function List(props: IListProps) {
  const { width, height, itemCount, itemHeight, children } = props

  const [scrollTop, setScrollTop] = useState(0)

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const { scrollTop } = event.currentTarget
    setScrollTop(scrollTop)
  }

  const renderItems = Array(itemCount)
    .fill(null)
    .map((_, index) => {
      const top = itemHeight * index
      if (top < scrollTop - height * 1.5) {
        return null
      }
      if (top > scrollTop + height * 1.5) {
        return null
      }
      const style: React.CSSProperties = {
        position: 'absolute',
        left: 0,
        top,
        height: itemHeight
      }
      return children({ index, style })
    })

  return (
    <div
      className={styles.list}
      onScroll={handleScroll}
      style={{
        height,
        width
      }}
    >
      <div
        className={styles.itemWrapper}
        style={{
          height: itemHeight * itemCount
        }}
      >
        {renderItems}
      </div>
    </div>
  )
}
