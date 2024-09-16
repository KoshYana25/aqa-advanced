function countdown(num) {
    console.log(num);
    
    
    if (num > 0) {
        countdown(num - 1);
    }
}


countdown(8);
