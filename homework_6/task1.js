//function declaration
function rectangle_square(height, width) {
    let rec_square = height * width;
    console.log(rec_square);
    return rec_square;
}

rectangle_square(4, 5);

//function expression
const square = function (height, width) {
    return height * width;
}

const rec_square1 = square(8, 10);
console.log(rec_square1); 


//arrow function
const rect_square = (width, height) => width * height;

const rec_square2 = rect_square(5, 10);
console.log(rec_square2); 

