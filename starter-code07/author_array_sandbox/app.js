var authors = ['James','Wesley','Grizelda','James','Eliot','Elliotte','Maria','Jane','Jane','Jane','The Final Jane'];
//
// var uniq = authors.reduce(function(arr, ele) {
//   if (arr.indexOf(ele) < 0) {
//     arr.push(ele);
//     return arr;
//   }
// },[]);
//
// console.log(uniq);

var arrayUnique = function(a) {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
};

console.log(arrayUnique(authors));
