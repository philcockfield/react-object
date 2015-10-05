export const inlineSection = function() {
  section("inline", () => {
    it("`inline:true`", () => this.props({ inline: true }));
    it("`inline:false`", () => this.props({ inline: false }));
  });
};


export const italicSection = function() {
  section("italic", () => {
    it("`italic:true`", () => this.props({ italic: true }));
    it("`italic:false`", () => this.props({ italic: false }));
  });
};


export const sizeSection = function() {
  section("size", () => {
    it("`size:12 (default)`", () => this.props({ size: 12 }));
    it("`size:14`", () => this.props({ size: 14 }));
    it("`size:16`", () => this.props({ size: 16 }));
    it("`size:22`", () => this.props({ size: 22 }));
  });
};



export const objectValueSection = function () {
  class MyClass {
    constructor(props) {
      this.foo = "abc";
    }
    bar() { return "hello"; }
  };
  MyClass.number = 123;

  section("Object Value", () => {
    it("`{}`", () => this.props({ value: {}}));
    it("`{ foo, bar }`", () => this.props({ value: { foo: 123, bar: "hello", baz: { number: -1 }}}));
    it("`MyClass{}`", () => this.props({ value: new MyClass() }));
  });
};


export const arrayValueSection = function () {
  section("Array Value", () => {
    it("`[]`", () => this.props({ value: [] }));
    it("`[1, 2, 3]`", () => this.props({ value: [1, 2, 3] }));
    it("`['one', 2, { label:'three' }]`", () => {
      const value = ["one", 2, { label: "three" }];
      value.myProp = "foo";
      this.props({ value });
    });
  });
};
