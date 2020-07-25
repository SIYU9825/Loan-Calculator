document.querySelector("#loan-form").addEventListener("submit", function (e) {
  //点击之后显示加载gif 并 隐藏结果显示的div
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".result").style.display = "none";

  //控制显示的时长

  setTimeout(calculateResult, 1000);
  e.preventDefault();
});

//计算结果
function calculateResult() {
  //获取表单的信息，绑定UI组件
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const year = document.getElementById("year");

  //绑定显示结果的UI组件
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //处理获取过来的信息 要从String 转化为 float
  // console.log(typeof( amount.value)); 显示为String
  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayment = parseFloat(year.value) * 12;
  //处理数据
  const x = Math.pow(1 + calculateInterest, calculatePayment);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); //方法使用定点表示法来格式化一个数值。
    totalPayment.value = (monthly * calculatePayment).toFixed(2);
    totalInterest.value = (monthly * calculatePayment - principal).toFixed(2);

    document.querySelector(".loading").style.display = "none";
    document.querySelector(".result").style.display = "block";
  } else {
    showError("Please check your numbers");
    document.querySelector(".loading").style.display = "none";
  }
}

//Show Error
function showError(errorInfo) {
  const err = document.createElement("div");
  err.className = "alert alert-danger";
  err.appendChild(document.createTextNode(errorInfo)); //将一个节点附加到指定父节点的子节点列表的末尾处

  //获取要插入的div的UI组件
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  card.insertBefore(err, heading);
  setTimeout(clearError, 1000);
}
function clearError() {
  document.querySelector(".alert").remove();
}
