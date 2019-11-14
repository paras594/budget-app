window.onload = function() {
   let balance = document.querySelector("#balance");
   let expense = document.querySelector("#expense");
   let budget = document.querySelector("#budget");
   let warningBudget = document.querySelector(".warning-budget");
   let warningExpense = document.querySelector(".warning-expense");
   let budgetField = document.querySelector("#budget-field");
   let expenseNameField = document.querySelector("#expense-name-field");
   let expenseValueField = document.querySelector("#expense-value-field");
   let calculateBtn = document.querySelector("#calculate-btn");
   let addExpBtn = document.querySelector("#add-expense-btn");
   let expenseList = document.querySelector(".expenses");

   let state = {
      list: [],
      amount: {
         budgetAmt: 0,
         expenseAmt: 0,
         balanceAmt: 0
      }
   };

   function updateExpAmt() {
      state.amount.expenseAmt = state.list.reduce((total, obj) => {
         return total + parseInt(obj.amt);
      }, 0);
   }

   function updateExpenses(e) {
      e.preventDefault();
      if (!expenseNameField.value) {
         warningExpense.classList.remove("d-none");
         setTimeout(() => {
            warningExpense.classList.add("d-none");
         }, 1500);
      } else {
         //updating state
         state.list.push({
            id: randomNum(),
            name: expenseNameField.value,
            amt: parseInt(expenseValueField.value) || 0
         });

         updateExpAmt();

         //resetting entry fields
         expenseNameField.value = "";
         expenseValueField.value = "";

         //render updated amount and expenses
         renderAmounts();
         renderExpenses();
      }
   }

   function updateBudget(e) {
      e.preventDefault();
      if (!budgetField.value) {
         warningBudget.classList.remove("d-none");
         setTimeout(() => {
            warningBudget.classList.add("d-none");
         }, 1500);
      } else {
         state.amount.budgetAmt = parseInt(budgetField.value);
         renderAmounts();
         budgetField.value = "";
      }
   }

   addExpBtn.addEventListener("click", updateExpenses);
   calculateBtn.addEventListener("click", updateBudget);

   //edit and delete button functionality

   function deleteItem(id) {
      let newList = state.list.filter(obj => obj.id !== id);
      state.list = newList;
      updateExpAmt();
      renderAmounts();
      renderExpenses();
   }

   function editItem(id) {
      let newList = state.list.filter(obj => obj.id !== id);
      let item = state.list.filter(obj => obj.id == id)[0];

      expenseNameField.value = item.name;
      expenseValueField.value = item.amt;

      state.list = newList;
      updateExpAmt();
      renderAmounts();
      renderExpenses();
   }

   //function render
   function renderExpenses() {
      while (expenseList.childNodes.length > 2) {
         expenseList.removeChild(expenseList.lastChild);
      }

      state.list.forEach(obj => {
         let ul = document.createElement("ul");
         ul.innerHTML = `
            <li>${obj.name}</li>
            <li>${obj.amt}</li>
            <li>
                <button class="btn-edit">
                <i class="fas fa-edit"></i>
                </button>
                <button class="btn-trash" id=${obj.id} onclick="greetings()">
                <i class="fas fa-trash-alt"></i>
                </button>
            </li>
            `;

         ul.querySelector(".btn-trash").onclick = () => deleteItem(obj.id);
         ul.querySelector(".btn-edit").onclick = () => editItem(obj.id);
         ul.setAttribute("class", "expenses-row");
         expenseList.appendChild(ul);
      });
   }

   function renderAmounts() {
      budget.childNodes[1].nodeValue = state.amount.budgetAmt;
      expense.childNodes[1].nodeValue = state.amount.expenseAmt;
      state.amount.balanceAmt =
         state.amount.budgetAmt - state.amount.expenseAmt;
      balance.childNodes[1].nodeValue = state.amount.balanceAmt;

      if (state.amount.balanceAmt < 0) {
         balance.classList.remove("clr-green");
         balance.classList.add("clr-red");
      } else {
         balance.classList.remove("clr-red");
         balance.classList.add("clr-green");
      }
   }

   renderExpenses();
   renderAmounts();

   //--------utility function------------------------------------------------
   function randomNum() {
      return Math.random() * 1000;
   }
};



