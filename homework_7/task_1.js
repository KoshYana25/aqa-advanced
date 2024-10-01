
function handleNum(number, callback1, callback2) {
    //variant 1
    /*if (number % 2 === 0) {
        callback1(); 
    } else {
        callback2(); 
    }*/


    //variant 2
    (number % 2 === 0 ? callback1 : callback2)();
}


const handleEven = () => {
    console.log("The number is even.");
};


const handleOdd = () => {
    console.log("The number is odd.");
};


handleNum(10, handleEven, handleOdd);
