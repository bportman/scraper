var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
}); 
var x = require('casper').selectXPath; 
var downloadcounter = 0;
casper.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36") 

casper.start('https://www.eride.ri.gov/eride2K5/AggregateAttendance/AttendanceReports.aspx', function() {
    for(var j = 0; j < 84; j++) {
        for(var i = 2;i < 32; i++) {
            if (i < 10) {
                var handle = '#GridView1_ctl0'+i+'_imgBtnXls';
            } else {
                var handle = '#GridView1_ctl'+i+'_imgBtnXls';
            }

            if(this.exists(handle)) {
                this.thenClick(handle);
                downloadcounter++;
            }
        }
        this.thenClick('a[title="Go to the previous month"]');
    }
}); 

casper.on('resource.received', function(resource) {
    casper.echo(resource.url);
    if (resource.url.indexOf('DailyAbsenceData.csv') > -1) {
        var filenamebits = resource.url.split('/');
        casper.download(resource.url, filenamebits[filenamebits.length-1]);
    }
});

casper.run(); 