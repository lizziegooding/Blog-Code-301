var x = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

var SMx = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,';

console.log(x.split(' ').length);

console.log(SMx.split(' ').length);

(function() {console.log('Example IIFE invoked.'); }());
(function() {console.log('Other example IIFE invoked.');})(); // But this one works just as well
console.log(window);
console.log(window.x);
console.log(window.SMx);
