# 题目一 设计还原

实现下方 GIF 展示的形变效果，可以做适当的抽象和可复用性。

<image src="https://img.pingcap.com/fe-hire/3-demo.gif" />

## 实现思路

该题目核心问题有一下几点

1. 如何实现流畅的动画。

2. 如何对核心逻辑进行抽象，组织合适的代码结构。

### 流畅动画

实现流畅动画涉及浏览器渲染原理，只有让浏览器尽可能少的进行回流和重绘才能使动画看起来更加流畅。

众所周知，使用 transform 进行动画的实现是基于 GPU 渲染的，不涉及回流和重绘的操作，能够加快动画的渲染。

所以选用 transform 进行相关动画的实现。

### 动画实现原理

#### 状态机

动画实现过程维护了一个状态机，包含以下几种状态：

- 初始化(Initial)

- 计算相关动画参数(Calculating)

- 动画中(Animating)

- 动画结束(Done)

- 重置中(Reseting)

状态机如下图:

<image src="https://github.com/caohuilin/interview/blob/master/PingCAP/animation/status.jpg" />

1. 首次渲染为初始化状态，按照组件正常在 dom 中位置渲染。

2. 点击事件发生后，渲染页面动画完成后状态，并记录初始化 dom 和动画完成后 dom 相关信息。

3. 下一次渲染，根据记录的相关信息，计算 transform 属性值，完成动画渲染。

4. 将状态标记为完成状态。

5. 接收到关闭的点击事件，将状态标记为重置中，并将 transform 属性值重置为默认状态，完成动画回退。

6. 将状态回归初始状态。

#### Dom 实现

动画过程中维护了三份 Dom 的拷贝：

1. 初始化 dom， 保证 dom 渲染位置不变，并由此计算动画 dom 的初始大小位置信息。

2. 动画完成后 dom，后台渲染动画完成后 dom，将其 visible 属性设置为 hidden，获取动画完成后 dom 大小位置信息。

3. 动画中 dom，该 dom 脱离文档流 由初始态变为动画完成后状态，通过 transform 属性实现。

## 相关组件设计与文档

### MotionElementGroup

该组件用于维护动画过程中一些列相关状态信息的转换，比如该例子中每一个卡片中各个元素的动画状态由该组件统一管理。

#### Props：

- isActive boolean 当该参数从 false 变为 true 时会触发相关一系列动画。

#### 内部实现

1. 提供了 MotionContext，子组件和通过该上下文获取到当前动画的状态。

2. 状态机转换逻辑

### MotionElement

该组件封装了动画实现的流程。

#### Props：

1. initClassName 初始化状态类名。

2. activeClassName 动画完成后状态类名。

3. ignoreScale 是否忽略 Scale 变化，默认值为 false。比如字体相关的变化，如果不忽略会变形。

4. children render 函数（RenderPorps 模式。

函数格式： (status: 'init' | 'end') => React.ReachChild

> 需要参数的原因： 内部实现中动画是基于旧的 dom 变化生成的，除了 transform 相关的样式，其他样式需要通过状态来增加。

#### 内部实现

1. 获取上下文的状态来维护内部三个 dom 副本的渲染逻辑。

2. 通过 onTransitionEnd 来判断是否动画结束，维护了一个 isAnimating 状态。渲染过程中状态变化不会等待动画的完成，维护这样一个状态，来标记动画中间态。
