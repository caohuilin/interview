class VirtualNode {
  tagName: string;
  attrs: Record<string, any>;
  children: Array<VirtualNode | string>;

  constructor(
    tagName: string,
    attrs: Record<string, any>,
    children: Array<VirtualNode | string>
  ) {
    this.tagName = tagName;
    this.attrs = attrs || {};
    this.children = children || [];
  }

  render = () => {
    const element = document.createElement(this.tagName);
    for (let attr in this.attrs) {
      if (attr === "class") {
        element.className = this.attrs[attr];
      } else {
        (element as any)[attr] = this.attrs[attr];
      }
    }
    for (let child of this.children) {
      if (typeof child === "string") {
        element.innerHTML = child;
      } else {
        element.appendChild(child.render());
      }
    }
    return element;
  };
}

function el(
  tagName: string,
  attr: Record<string, any>,
  children: Array<VirtualNode | string>
): VirtualNode {
  const node = new VirtualNode(tagName, attr, children);
  return node;
}

describe("虚拟 dom 渲染", () => {
  it("list", () => {
    const ul = el("ul", { id: "list" }, [
      el("li", { class: "item" }, ["Item 1"]),
      el("li", { class: "item" }, ["Item 2"]),
      el("li", { class: "item" }, ["Item 3"]),
    ]);
    const ulRoot = ul.render();
    const targetElement = document.createElement("ul");
    targetElement.id = "list";
    const li1 = document.createElement("li");
    li1.className = "item";
    li1.innerHTML = "Item 1";
    const li2 = document.createElement("li");
    li2.className = "item";
    li2.innerHTML = "Item 2";
    const li3 = document.createElement("li");
    li3.className = "item";
    li3.innerHTML = "Item 3";
    targetElement.appendChild(li1);
    targetElement.appendChild(li2);
    targetElement.appendChild(li3);
    expect(ulRoot).toEqual(targetElement);
  });
});
