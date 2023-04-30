const reporter = require('k6-html-reporter');

const options = {
    jsonfile: './result',
    output: 'cd\c\downloads'
}

reporter.generateSummaryReport(options);