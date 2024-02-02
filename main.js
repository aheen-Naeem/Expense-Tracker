import inquirer from "inquirer";
import chalk from "chalk";
let expenseList = [];
let monthlyIncome = 0;
async function expenses() {
    let monthIncome = await inquirer.prompt({
        type: "number",
        name: "income",
        message: "What is your monthly income?"
    });
    monthlyIncome = monthIncome.income;
    do {
        let expenseTracker = await inquirer.prompt({
            type: "list",
            name: "doCheck",
            message: "What do you want to do in your expense tracker?",
            choices: ["Add Expense", "Delete Expenses", "View Expenses"]
        });
        if (expenseTracker.doCheck === "Add Expense") {
            let addExpense = await inquirer.prompt({
                name: "add",
                type: "input",
                message: "What did you spend money on?"
            });
            const { add } = addExpense;
            let expenseDetail = await inquirer.prompt([{
                    type: "number",
                    name: "amount",
                    message: `How much money did you spend on ${add}`
                }, {
                    type: "input",
                    name: "date",
                    message: `Date of ${add}`
                }]);
            let { amount, date } = expenseDetail;
            if (amount >= monthlyIncome) {
                console.log(chalk.redBright.bold("Your income is not enough for this expense! , you can't purchase it"));
            }
            else {
                monthlyIncome -= amount;
                console.log(chalk.greenBright.bold(`Your Remaining amount after purchasing of ${add} is ${monthlyIncome}`));
                expenseList.push(`Item : ${add} , Amount : ${expenseDetail.amount} , Date : ${expenseDetail.date}`);
            }
        }
        if (expenseTracker.doCheck === "Delete Expenses") {
            let deleted = await inquirer.prompt({
                type: "list",
                name: "delete",
                message: "Which expense do want to delete from expense list",
                choices: expenseList
            });
            let deletedItem = expenseList.find((val) => val === deleted.delete);
            if (deletedItem) {
                let [, amount] = deletedItem.split(", Amount : ");
                monthlyIncome += Number(amount.trim());
            }
            expenseList = expenseList.filter((val) => val != deleted.delete);
            console.log(expenseList);
        }
        if (expenseTracker.doCheck === "View Expenses") {
            console.log(expenseList);
        }
    } while (true);
}
expenses();
