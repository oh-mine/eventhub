import EventHub from "../src/index";

type TestCase = (message: string) => void;

const test1: TestCase = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object === true);
  console.log(message);
};

const test2: TestCase = (message) => {
  const eventHub = new EventHub();
  let isCalled = false;
  eventHub.on("xxx", (y) => {
    isCalled = true;
    console.assert(y === "hello");
  });
  eventHub.emit("xxx", "hello");
  setTimeout(() => {
    console.assert(isCalled === true);
    console.log(message);
  }, 2000);
};

const test3: TestCase = (message) => {
  const eventHub = new EventHub();
  let isCalled = false;
  const fn2 = () => {
    isCalled = true;
  };

  eventHub.on("yyy", fn2);
  eventHub.off("yyy", fn2);
  eventHub.emit("yyy");
  setTimeout(() => {
    console.assert(isCalled === false);
    console.log(message);
  }, 2000);
};

test1("eventHub is a object");
test2("订阅事件触发成功");
test3("取消注册订阅事件");
