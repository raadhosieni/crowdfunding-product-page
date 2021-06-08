const menuBtn = document.querySelector('.menu');
const navList = document.querySelector('header ul');
// select back button
const backBtn = document.querySelector('.back-btn');
// select back modal
const backModal = document.querySelector('.selection');
//select back modal close button 
const backModalCloseBtn = document.querySelector('.selection .close');
//select stock elements 
const stockElements = document.querySelectorAll('.about .number span');
//select stock btns
const stockBtns = document.querySelectorAll('.about .btn');
//Select Selection Modal Radios
const pledges = document.querySelectorAll('.selection input[type="radio"]');
//select selection carts 
const pledgeStock = document.querySelectorAll('.selection .cart .number span');
//select progress bar
const prog = document.querySelector('.prog');
//select continue btns
const continueBtns = document.querySelectorAll('.selection .cart .btn');
//select success modal
const successModal = document.querySelector('.success');
//select gotItBtn 
const gotItBtn = document.querySelector('.success .btn');
//select stats elements
const risedAmountElement = document.querySelector('.rised-amount');
const totalBackersElement = document.querySelector('.total-backers');
const leftDayesElement = document.querySelector('.left-days');

//intial stats
risedAmount = 89914;
backedAbount = 100000;
totalBackers = 5007;
daysLeft = 56;

//set progress value
prog.firstElementChild.style.width = parseInt((risedAmount / backedAbount) * 100) + '%';

//stock array
let stock = [101, 64, 0];

//intial stock
initialStockElements();

//open mobile menu
menuBtn.onclick = function() {
    navList.classList.toggle('show');
    menuBtn.classList.toggle('close');
    if (!menuBtn.classList.contains('close')) {
        menuBtn.setAttribute('src', 'images/icon-close-menu.svg');
    } else {
        menuBtn.setAttribute('src', 'images/icon-hamburger.svg');
    }
}

//open back modal
backBtn.onclick = function() {
    backModal.classList.toggle('show');
    pledges[0].checked = true;
    window.scrollTo(0, 0);
    stylePledge(pledges[0]);
}

//select pledge from back modal
stockBtns.forEach(function(btn) {
    btn.onclick = function() {
        const cat = this.getAttribute('data-cat');
        backModal.classList.toggle('show');
        let y = 0;
        pledges.forEach(function(pledge) {
            if (pledge.getAttribute('data-cat')
            === cat) {
                pledge.checked = true;
                pledge.scrollIntoView({block: "center", inline: "nearest"});
                stylePledge(pledge);
            }
        });
    
    }
})

//close backModal 
backModalCloseBtn.onclick = function() {
    backModal.classList.remove('show');
}

pledges.forEach(function(pledge) {
    pledge.onchange = function() {
        stylePledge(pledge) ;
    }
})

//continue buttons add oncick event
continueBtns.forEach(function(btn, i) {
    btn.onclick = function() {
        let pledge = btn.previousElementSibling.value;
        let cat = btn.previousElementSibling.getAttribute('placeholder');
        updatePledgeQuantity(pledge, cat, i);
        totalBackers++;
        risedAmount += parseInt(pledge);
        updateStats();
        successModal.classList.add('show');
    }
})

//got it button add close success modal onclick 
gotItBtn.onclick = function() {
    successModal.classList.remove('show');
    backModal.classList.remove('show');
    initialStockElements();
}

//style selected pledge and show inputs
function stylePledge(pledge) {
    pledges.forEach(function(item) {
        item.parentElement.parentElement.classList.remove('cyan-border');
    })
    pledge.parentElement.parentElement.classList.add('cyan-border');
}

//update stats elements in the document
function updateStats() {
    risedAmountElement.textContent = risedAmount;
    totalBackersElement.textContent = totalBackers;
    prog.firstElementChild.style.width = parseInt((risedAmount / backedAbount) * 100) + '%';   
}

//update pledge quantity
function updatePledgeQuantity(pledge, cat, i) {
    let pledgeQuantity = parseInt(pledge) / parseInt(cat);
    stock[i] -= parseInt(pledgeQuantity);
    if (stock[i] < 0) 
        stock[i] = 0;
    initialStockElements();
}

//initial stock elements 
function initialStockElements() {
    stockElements.forEach(function(element, i) {
        element.textContent = stock[i];
        if(element.textContent === '0') {
            element.parentElement.parentElement.classList.add('disable');
            stockBtns[i].innerHTML = 'Out of Stock';
        }
    });
    
    pledgeStock.forEach(function(pledge, i){
        pledge.textContent = stock[i];
        if (pledge.textContent === '0') {
            pledge.parentElement.parentElement.classList.add('disable');
        }
    });
}