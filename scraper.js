var startIndex = 6587;
var d = new Date();
var dayOfMonth = d.getDate();
var finishIndex = 6500;
var ready = true;
var waiting = false;

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

// step one day backwards
while(startIndex > finishIndex) {
        //dayOfMonth -= 1;
        d.setDate(--dayOfMonth);
        startIndex -= 1;
        
        // change month
        if (dayOfMonth == 0) {
            dayOfMonth = d.getDate();
            let monthIndex = 'V'+(startIndex-dayOfMonth+1).toString();
            console.log(monthIndex);
            __doPostBack('calDateSelection', monthIndex);
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
