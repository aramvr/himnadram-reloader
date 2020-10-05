// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

const reloadTime = localStorage.getItem('reloadTime') ? +localStorage.get('reloadTime') : 12000;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const fundContainerSelector = () => document.querySelector('#section_61952 > div');

function getFund() {
    return fundContainerSelector().textContent;
}

function toNumber(str) {
    return str.replace(/[^0-9.-]+/g,"");
}

function appendDifference(diff) {
    let div = document.createElement('div');
    div.style = `
        color: forestgreen;
        font-size: 30px;
        font-weight: 500;
    `;
    div.textContent = '+' + (diff ? formatter.format(Math.round(diff)) : 0);
    fundContainerSelector().append(div);
}

function init(){
    if(!localStorage.getItem('fund')) {
        localStorage.setItem('fund', getFund());
    }
    else {
        console.log({
            fund: toNumber(getFund()),
            local: toNumber(localStorage.getItem('fund')),
        });
        appendDifference((toNumber(getFund()) - toNumber(localStorage.getItem('fund'))));
        localStorage.setItem('fund', getFund());
    }

    setTimeout(() => {
        location.reload();
    }, reloadTime);
}

function timeout(){
    setTimeout(()=> {
        if(fundContainerSelector()){
            init();
        }
        else {
            timeout();
        }
    }, 1000);
} 

timeout();