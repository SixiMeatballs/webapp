var salaryBar = {
    drawSingleSalaryBar: function (maxLen, freeLen, target) {
        var salary = parseInt(target.attributes["salary"].value);
        salaryBar.drawSingleSalaryBarByValue(maxLen, freeLen, salary, target);
    },
    drawSalaryBar:function(maxLen,freeLen){
        $(".salaryBar").each(function(index,target){
            salaryBar.drawSingleSalaryBar(maxLen,freeLen,target);
        });
    },
    drawSingleSalaryBarByValue: function (maxLen, freeLen, salary, target) {
        var freeSalary = parseInt(target.attributes["freeSalary"].value);
        var maxSalary = parseInt(target.attributes["maxSalary"].value);
        var salaryLen = 0;
        if (salary >= maxSalary) {
            target.getElementsByClassName("barValue")[0].style.width = maxLen + "rem";
            target.getElementsByClassName("barValue")[0].style.backgroundImage = "url(images/myteam/salaryerror.png)";
            target.getElementsByClassName("barValue")[0].style.backgroundSize = "100% 100%";
            target.getElementsByClassName("icoFootball")[0].style.left = (maxLen - 1.5) + "rem";
            return;
        }
        if (salary < freeSalary) {
            salaryLen = (salary / freeSalary) * freeLen;
        }
        else if (salary < maxSalary) {
            salaryLen = freeLen + ((salary - freeSalary) / (maxSalary - freeSalary)) * (maxLen - freeLen);
        }
        target.getElementsByClassName("barValue")[0].style.width = salaryLen + "rem";
        target.getElementsByClassName("icoFootball")[0].style.left = (salaryLen - 1.5) + "rem";

    }
}