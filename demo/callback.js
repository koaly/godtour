var floppy = require("floppy");

//floppy.load .prompt must return in to promise

//using async/await in ES7
const handle = async floppy => {
  try {
    const data1 = await floppy.load("disk1");

    floppy.prompt("Please insert disk 2");
    const data2 = await floppy.load("disk2");

    floppy.prompt("Please insert disk 3");
    const data3 = await floppy.load("disk3");

    floppy.prompt("Please insert disk 4");
    const data4 = await floppy.load("disk4");

    floppy.prompt("Please insert disk 5");
    const data5 = await floppy.load("disk5");

    floppy.prompt("Please insert disk 6");
    const data6 = await floppy.load("disk6");

    /**
     * do something floopy data1..data6
     */
    data = data1 + data2 + data3 + data4 + data5 + data6;
  } catch (error) {
    /**
     * handing errors
     */
  }
};

handle(floppy);
