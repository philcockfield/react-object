require("babel/register")({ stage: 1 });
require("ui-harness/server").start("./src/specs");
