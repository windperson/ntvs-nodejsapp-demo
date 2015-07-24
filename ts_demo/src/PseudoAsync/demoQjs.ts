import Q = require('q');

function promiseDemoQ(runCount: number) : Q.Promise<string> {
	var deferred = Q.defer<string>();
	for (var index = 1; index <= runCount; index++) {
		setTimeout(() => {
			var result = timeOutStatus(index);
			console.log(result);

			var ranProb = Math.floor(getRandomInt(index, runCount) / runCount * 100);
			if (randomFailed(ranProb)) {
				deferred.reject("Failed at" + index + " time!");
			}
			if (index == runCount) {
				var result = "Finish async operation in " + result; 
				deferred.resolve(result);
			}
		}, index * 1000);
	}
	return deferred.promise;
}

function timeOutStatus(halt_secs: number): string {
	var printStr = 'Hold ' + halt_secs.toString() + 'second(s).';
	return printStr;
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomFailed(failProb: number): boolean {
	var random_percent = Math.floor(Math.random() * 100);
	return random_percent >= failProb;
}