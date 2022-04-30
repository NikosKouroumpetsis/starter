'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);






// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function(mov, i ) {

    const type = mov > 0 ? 'deposit' : "withdrawal"

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i +1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`

  containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}



const calcDisplayBalance = function(movements) {
  const balance = movements.reduce((acc,mov) => acc+mov,0)
  labelBalance.textContent = `${balance}€`
}



const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov) =>acc+mov,0)

  labelSumIn.textContent = `${incomes}€`

  const out = acc.movements.filter(mov => mov <0).reduce((acc,mov) => acc+mov,0)

  labelSumOut.textContent = `${Math.abs(out)}€`


  const interest = acc.movements.filter(mov => mov >0).map(deposit => (deposit * acc.interestRate)/100)
  .filter((int,i,arr) => {
    // console.log(arr);
    return int >= 1;
  }).reduce((acc,int) => acc+int,0)

  labelSumInterest.textContent = `${interest}€`
}


const user = "Steven Thomas Williams"


const createUsernames = function(accs) {

  accs.forEach(function(acc) {
    acc.username = acc.owner.toLocaleLowerCase().split(" ").map((word) => word.at(0)).join("")
  } )
}

createUsernames(accounts)

// Event handler
let currentAccount;


btnLogin.addEventListener('click',function(e) {
  // Prevent form from submitting
  e.preventDefault()
 
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value) 
  console.log(currentAccount);

  if(currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').at(0)}`

    containerApp.style.opacity = 100;

    // Cleaer input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements  
    displayMovements(currentAccount.movements)
    //Display balance
    calcDisplayBalance(currentAccount.movements)
    // Display summary
    calcDisplaySummary(currentAccount)

  }

})


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


/////////////////////////////////////////////////
/*

let  arr = ["a","b","c", "d","e"]

const arr2 = ["j","i","h","g","f"]
console.log(arr2.reverse());
console.log(arr2);

const letters = arr.concat(arr2);

console.log(letters,arr);


console.log(letters.join(""));





const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov) {
  return mov * eurToUsd;
})


const movementsDescriptions = movements.map((mov, i) => {
 
 `Movement ${i+1} : You ${ mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
  // if( mov > 0) {
  //   return `Movement ${i+1}: You deposited ${mov}`
  // } else {
  //   return `Movement ${i+1}: You withrew ${Math.abs(mov)}`
  // }
})



const deposits = movements.filter(function(mov){
  return mov >0
})

const depositsWithdrew = movements.filter(function(mov){
  return mov <0
})

const balance = movements.reduce(function(acc,cur,i,arr) {
  return acc+cur;
},0)


//Maximum value 

const max = movements.reduce((acc,mov) => {
  if(acc >mov) {
    return acc
  } else {
    return mov;
  }
},movements.at(0))

// console.log(max);

const eurToUsd = 1.1;

const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc,mov) => acc+mov, 0)

// console.log(totalDepositsUSD);

const firstWithdrawal = movements.find(mov => mov <0)

console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === "Jessica Davis") 
console.log(account);

*/