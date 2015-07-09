/**
 * demo function to consume many resource
 */
export function spin(count: Number) {
    "use strict";
    var x = 0;
    for (var i = 0; i <= count; i++) {
        x += Math.sqrt(x) / Math.sqrt(x + 1) + Math.random();
    }
    return x;
}
