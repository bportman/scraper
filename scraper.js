// set our desired start and end indexes
var startIndex = 6587;
var finishIndex = 6500;

// create our main date object
var d = new Date();
var dayOfMonth = d.getDate();

// replicate their function to traverse months and days
var ourForm = document.forms1;
function ourDoPostBack(eventTarget, eventArgument) {
    if (!ourForm) {
        ourForm = document.form1;
    }
    if (!ourForm.onsubmit || (ourForm.onsubmit() != false)) {
        ourForm.__EVENTTARGET.value = eventTarget;
        ourForm.__EVENTARGUMENT.value = eventArgument;
        ourForm.submit();
    }
}

// loop until we get to the finish line we set
while(startIndex > finishIndex) {

    // step backwards 1 day
    d.setDate(--dayOfMonth);
    startIndex -= 1;
    
    // change month if day is 0
    if (dayOfMonth == 0) {
        dayOfMonth = d.getDate();
        let monthIndex = 'V'+(startIndex-dayOfMonth+1).toString();
        console.log(monthIndex);
        ourDoPostBack('calDateSelection', monthIndex);
        var monthLoaded = false;
        while(!monthLoaded) {
            var monthText = document.getElementsByClassName('TitleStyle')[0].children[0].children[0].children[1].innerHTML;
            var monthTextId = (new Date(monthText)).getMonth();
            if(monthTextId == d.getMonth()) {
                monthLoaded = true;
            }
            console.log(monthText, monthTextId, d.getMonth(), monthLoaded);
        }
    }
    console.log(dayOfMonth, d, startIndex);
}




