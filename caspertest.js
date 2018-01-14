var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
}); 
var x = require('casper').selectXPath; 

casper.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36") 

casper.start('https://www.eride.ri.gov/eride2K5/AggregateAttendance/AttendanceReports.aspx'); 
casper.wait(5000); // probably not necessary 

casper.on('resource.received', function(resource) {
    casper.echo(resource.url);
    // if (resource.stage !== "end") {
    //     return;
    // }
    if (resource.url.indexOf('DailyAbsenceData.csv') > -1) {
        casper.echo('this file matches');
        var filenamebits = resource.url.split('/');
        casper.download(resource.url, filenamebits[filenamebits.length-1]);
    }
});

for(var i = 2;i < 32; i++) {
    if (i < 10) {
        casper.thenClick('#GridView1_ctl0'+i+'_imgBtnXls');
    } else {
        casper.thenClick('#GridView1_ctl'+i+'_imgBtnXls');
    }
}

casper.run(); 