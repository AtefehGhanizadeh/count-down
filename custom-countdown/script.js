
const inputContainer=document.querySelector('.input-container')
const dateEl=document.querySelector('#date-picker')
const inputTitle=document.querySelector('#title')
const countdownForm=document.querySelector('#countdownForm')
const countdownEl=document.querySelector('.countdown')
const countdownElTitle=document.querySelector('.countdown-title')
const countdownBtn=document.querySelector('#countdown-btn')
const timeElements=document.querySelectorAll('span')
const completeEl=document.querySelector(".complete")
const completeInfo=document.querySelector(".complete-info")
const completeBtn=document.querySelector(".complete-btn")

let countdownTitle='';
let countdownDate='';
let countdownValue=new Date();
let countdownActive;
let savedCountdown;


const second=1000;
const minute=60*second;
const hour=60*minute;
const day=24*hour;




const today=new Date().toISOString().split('T')[0]

dateEl.setAttribute('min',today)



function updateDom(){

    // یک ثانیه وایمیسته بعد تابع اجرا میشه

    countdownActive=setInterval(()=>{

        const now=new Date().getTime()
        const distance=countdownValue-now
        inputContainer.hidden=true

        if (distance<0){
        
            completeInfo.textContent=`${countdownTitle} finished on ${countdownDate}`
            countdownEl.hidden=true
            completeEl.hidden=false
        }

        else{
            const days=Math.floor(distance/day)
            const hours=Math.floor((distance%day)/hour)
            const minutes=Math.floor((distance%hour)/minute)
            const secondes=Math.floor((distance%minute)/second)
            countdownElTitle.textContent=countdownTitle
            timeElements[0].innerText=days
            timeElements[1].innerText=hours
            timeElements[2].innerText=minutes
            timeElements[3].innerText=secondes
            countdownEl.hidden=false

        }
        

        
    },second)
    
}

// Take values from form

function updateCountdown(e){
    e.preventDefault()
    countdownTitle=e.srcElement[0].value
    countdownDate=e.srcElement[1].value

    savedCountdown={
        title:countdownTitle,
        date:countdownDate,
    }

    localStorage.setItem("savedCountdown",JSON.stringify(savedCountdown))

    if(countdownDate===''){
        alert('Please select a date for the countdown')
    }
    else{
        countdownValue=new Date(countdownDate).getTime()
        updateDom()
    }
    
    
}


function reset(){

    clearInterval(countdownActive)
    countdownEl.hidden=true
    completeEl.hidden=true
    inputContainer.hidden=false
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem("savedCountdown")
}

function restorePreviousCountdown(){

    if(localStorage.getItem("savedCountdown")){

        inputContainer.hidden=true
        savedCountdown=JSON.parse(localStorage.getItem('savedCountdown'))
        countdownTitle=savedCountdown.title
        countdownDate=savedCountdown.date
        countdownValue=new Date(countdownDate).getTime()
        updateDom()
    }
}


countdownForm.addEventListener('submit',updateCountdown)
countdownBtn.addEventListener('click' , reset)
completeBtn.addEventListener('click',reset)

restorePreviousCountdown()

