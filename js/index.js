const amountE1 = document.querySelector("#amount");
const yearsE1 = document.querySelector("#years");
const ratetE1 = document.querySelector("#rate");
const repayment1E1 = document.querySelector("#repayment1");
const repayment2E1 = document.querySelector("#repayment2");
const feeE1 = document.querySelector("#fee");
const caleE1 = document.querySelector("#cale");
const tableEl = document.querySelector(".table-container table tbody");
const resultEl = document.querySelector("#result");
const resetEl = document.querySelector("#reset");


console.log(amountE1, yearsE1, ratetE1, repayment1E1, repayment2E1, feeE1);



caleE1.addEventListener("click", calcLoan);
resetEl.addEventListener("click", clear);

function clear() {
    resultEl.style.display = "none";
    tableEl.innerHTML = "";
}

function calcLoan() {
    let amount = amountE1.value * 10000;
    let years = yearsE1.value;
    let rate = ratetE1.value / 100;
    let fee = feeE1.checked ? 5000 : 0;
    // 取得不同計算方式
    let rule = repayment1E1.checked ? 1 : 2;


    let result;
    if (rule == 1) {
        result = rule1(amount, years, rate);
        console.log(result);
    } else {
        alert("功能製作中...");
        return;
    }

    let totalInterest = result[1];
    let totalAmount = amount + totalInterest + fee;

    console.log(amount, years, rate, fee, totalAmount, interest)
    document.querySelector(".totalAmount").innerText = totalAmount + (fee == 0 ? "" : "(含手續費)");
    document.querySelector(".totalinterest").innerText = interest + "元";
    const resultEl = document.querySelector("#result");
    resultEl.style.display = "none";
    setTimeout(function () {
        resultEl.style.display = "block";
    }, 500);



    drawTable(result[0]);

    //if (feeE1.checked) {
    //  fee = 5000;
    //}

}


function drawTable(datas) {
    let tableStr = "";
    for (let i = 0; i < datas.length; i++) {
        tableStr += "<tr>";
        for (let j = 0; j < datas[i].length; j++) {
            tableStr += `<td>${datas[i][j]}</td>`;
        }
        tableStr += "</tr>";
    }
    tableEl.innerHTML = tableStr;
    // let tableStr = "<ul>";
    // for (let i = 0; i < datas.length; i++) {
    //     console.log(datas[i].join(","));
    //     tableStr += `<li>${datas[i].join(",")}</li>`;
    // }
    // tableStr += "</ul>";
    // tableEl.innerHTML = tableStr;
}

function rule1(total_amount, years, rate) {
    let amount = total_amount;
    let period = years * 12;
    let month_rate = rate / 100 / 12;
    let month_pay = parseInt(amount / period);

    let datas = [];
    let totalInterest = 0;
    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate);
        amount -= month_pay;
        //最後一期 
        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_pay + amount + interest, 0]);
        } else {
            datas.push([i + 1, month_pay, interest, month_pay + interest, amount]);
        }
        totalInterest += interest;
    }
    // console.log(datas);
    return [datas, totalInterest];
}


