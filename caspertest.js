var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false
    }
}); 
var x = require('casper').selectXPath; 
var count;
casper.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36") 

casper.start('https://www.eride.ri.gov/eride2K5/AggregateAttendance/AttendanceReports.aspx', function() {
    for(var j = 0; j < 84; j++) {
        count = this.evaluate(function() { 
            var elements = __utils__.findAll('#GridView1 tr');
            return elements.length; 
        });
        this.echo(count);
        if(j > 41) { // we had to comment this out first, run til it failed, then uncomment and run again to get complete data
            for(var i = 2; i <= count; i++) {
                if (i < 10) {
                    var handle = '#GridView1_ctl0'+i+'_imgBtnXls';
                } else {
                    var handle = '#GridView1_ctl'+i+'_imgBtnXls';
                }
                this.echo(handle);
                if(this.exists(handle)) {
                    this.thenClick(handle);
                }
            }
        }
        this.thenClick('a[title="Go to the previous month"]');
    }
}); 

casper.on('resource.received', function(resource) {
    casper.echo(resource.url);
    if (resource.url.indexOf('DailyAbsenceData.csv') > -1) {
        var filenamebits = resource.url.split('/');
        var filename = filenamebits[filenamebits.length-1];
        var year = filename.substr(4,4);
        var month = filename.substr(0,2);
        var day = filename.substr(2,2);
        var rest = ".csv";
        filename = year + "_" + month + "_" + day + rest;
        casper.download(resource.url, filename);
    }
});

casper.run(); 