/**
 * card 类型组成
 * title 标题
 * desc 描述
 * img 图片路径
 */
export interface ICardItem {
  title: string;
  desc: string;
  img: string;
}
export const Cards: ICardItem[] = [
  {
    title: "Straight Out",
    desc: "ELIZABETH SMITH",
    img: "https://img.pingcap.com/fe-hire/3-img-1.jpg",
  },
  {
    title: "Tower Records",
    desc: "ELIZABETH SMITH",
    img: "https://img.pingcap.com/fe-hire/3-img-2.jpg",
  },
  {
    title: "Tower Records",
    desc: "ELIZABETH SMITH",
    img: "https://img.pingcap.com/fe-hire/3-img-3.jpg",
  },
  {
    title: "Straight Out",
    desc: "ELIZABETH SMITH",
    img: "https://img.pingcap.com/fe-hire/3-img-1.jpg",
  },
];
