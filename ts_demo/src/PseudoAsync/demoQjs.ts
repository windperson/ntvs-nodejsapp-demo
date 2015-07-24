import Q = require('q');

function promiseDemoQ(runCount) {
	var deferred = Q.defer();
	for (var index = 1; index <= runCount; index++) {
		setTimeout(function () {
			var result = timeOutStatus(index);
			console.log(result);
			
			var ranProb = Math.floor(getRandomInt(index,runCount)/runCount * 100);
			if (randomFailed(ranProb)) {
				deferred.reject("Failed at" + index + " time!");
			}
			if (index == runCount) {
				deferred.resolve(result);
			}
		}, index * 1000);
	}
}

function timeOutStatus(halt_secs) {
	var printStr = 'Hold ' + halt_secs + 'second(s).';
	return printStr;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomFailed(failProb) {
	var random_percent = Math.floor(Math.random() * 100);
	return random_percent >= failProb;
}