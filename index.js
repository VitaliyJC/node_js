import EventEmitter from "events";

class MyEmitter extends EventEmitter { }
const emitter = new MyEmitter();

// дата в формате ХХ.ХХ.ХХ.ХХ.ХХХХ - час.мин.день.мес.год
const finalDate = process.argv[2];
const parseFinalDate = finalDate.split(".")

const checkDate = (date) => {
  const splitDate = date.split(".");
  if (true) {
    if (splitDate[0] < 0 || splitDate[0] > 24) {
      console.log("Вы ввели некорректное время");
      return false;
    }
    if (splitDate[1] < 0 || splitDate[1] > 59) {
      console.log("Вы ввели некорректное время");
      return false;
    }
    if (splitDate[2] < 0 || splitDate[2] > 31) {
      console.log("Вы ввели некорректный день");
      return false;
    }
    if (splitDate[3] < 0 || splitDate[3] > 12) {
      console.log("Вы ввели некорректный месяц");
      return false;
    }
    if (splitDate[4] < new Date().getFullYear()) {
      console.log("Вы ввели некорректный год");
      return false;
    }
    console.log(
      `Таймер установлен до ${splitDate[0]} час. ${splitDate[1]} мин. ${splitDate[2]} день ${splitDate[3]} месяц ${splitDate[4]} год`
    );
    emitter.emit("timerUpdate", date);
    return true;
  }
};

const timer = () => {
  let curDate = new Date().getTime();
  let endDate = new Date(`Oct ${parseFinalDate[2]}, ${parseFinalDate[4]} ${parseFinalDate[0]}:${parseFinalDate[1]}:00`).getTime();
  let diffDate = endDate - curDate;
  if (diffDate < 0) {
    emitter.emit("timerFinish");
  }
  return diffDate
}

const converter = () => {
  let time = timer()
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let secs = Math.floor((time % (1000 * 60)) / 1000);
  return `${days} дней : ${hours} часов : ${mins} минут : ${secs} секунд`
}

const intervalID = setInterval((resolve) =>
  console.log(converter()), 1000)

const timerUpdate = async () => {
  await new Promise((resolve) => intervalID);
};

const timerEnd = () => {
  clearInterval(intervalID);
  console.log('КОНЕЦ');
};

emitter.on("timerUpdate", timerUpdate);
emitter.on('timerFinish', timerEnd);

checkDate(finalDate);
