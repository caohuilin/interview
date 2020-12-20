# 题目二 组件设计

设计一个高性能的 List 组件（可选用任意框架或 Vanilla JavaScript，不用考虑浏览器兼容性）。可以参考 iOS UITableView 或 Andorid RecyclerView 的 API 设计，具体的功能可以自由实现，这里给出几个例子：支持上拉刷新、无限滚动渲染、列表项操作（添加、删除和更新等）、数据变化后的渲染重排重绘优化和动画等功能。

## 实现思路

该题目核心为：

- 封装 List 组件

- 高性能

### 高性能

大数量列表渲染的核心解决思路是虚拟 Dom，根据当前窗口信息和总数据量，只渲染用户可见部分即可，其他部分只需占位，无需真正渲染 Dom。

### List 组件

#### Props

- height 当前窗口高度

- width 当前窗口宽度

- itemCount 一共渲染的数据量

- itemHeight 每一条数据的高度

- children (index: number, style: React.CSSProperties) => React.ReactNode RenderProps，每一条数据的渲染函数

## 后续需实现功能

- [ ] 测量当前窗口高度和宽度组件(在 List 组件外部使用，动态计算当前窗口大小)

- [ ] 动态计算每条数据高度 (当每条数据高度不一致时使用，虚拟渲染计算每条数据高度)

- [ ] 组件功能丰富
