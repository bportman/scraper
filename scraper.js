// set our desired start and end indexes
var startIndex = 6587;
var finishIndex = 6200;

// create our main date object
var d = new Date();
var dayOfMonth = d.getDate();

// loop until we get to the finish line we set
while(startIndex > finishIndex) {

    // step backwards 1 day
    d.setDate(--dayOfMonth);
    startIndex -= 1;
    
    // change month if day is 0
    if (dayOfMonth == 0) {
        dayOfMonth = d.getDate();
        var clickTarget = document.getElementsByClassName('TitleStyle')[0].children[0].children[0].children[0].children[0];
        clickTarget.click();
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
