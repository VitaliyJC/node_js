import colors from 'colors'

const firstNum = +process.argv[2]
const secondNum = +process.argv[3]
const primeNumbers = [];

function isPrime(num) {
  for(let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

const collorPrime = (data) => {
  let count = 1;
  data.forEach((el) => {
    switch (count) {
      case 1: {
        count++;
        console.log(colors.green(el));
        break;
      }
      case 2: {
        count++;
        console.log(colors.yellow(el));
        break;
      }
      case 3: {
        count = 1;
        console.log(colors.red(el));
        break;
      }
    }
  })
}

if (isNaN(firstNum) || isNaN(secondNum)) {
  console.log('Вы ввели не число')
} else {
  for(let i = firstNum; i <= secondNum; i++) {
    if (isPrime(i))
      primeNumbers.push(i)
  }
  if (primeNumbers.length === 0){
    console.log('В Вашем диапазоне простых чисел нет')
  } else {
    collorPrime(primeNumbers)
  }
}

console.log(collorPrime)


