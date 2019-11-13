import EventHub from "../../eventHub/index";

type TestCase = (message: string) => void;

const test1: TestCase = message => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true, "eventHub 是个对象");
  console.log(message);
};

const test2: TestCase = message => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on("xxx",(y, z) => {
    called = true;
    console.assert(y === "今天林志玲结婚了");
    console.assert(z === "我哭了");
  });
  eventHub.emit("xxx", "今天林志玲结婚了", "我哭了");
  console.assert(called);
  console.log(message);
};

const test3: TestCase = message => {
  const eventHub = new EventHub();
  let called = false;
  const fn1 = () => {
    called = true;
  };

  eventHub.on("yyy", fn1);
  eventHub.off("yyy", fn1);
  eventHub.emit("yyy");
  console.assert(called === false);
  console.log(message);
};


const test4: TestCase = message => {
  const eventHub = new EventHub();
  let called = false;
  let n = 0;
  const fn1 = () => {
    n++
  };

  eventHub.once("yyy", fn1);
  eventHub.emit("yyy");
  eventHub.emit("yyy");
  console.assert(n === 1);
  console.log(message);
};

test1("EventHub 可以创建对象");
test2(".on 了之后 .emit，会触发 .on 的函数");
test3(".off 有用");
test4(".once 有用");