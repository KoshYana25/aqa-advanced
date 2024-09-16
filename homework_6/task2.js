
function isAdult(age) {
    
    if (age >= 18) {
      return true;  
    } else {
      return false; 
    }
  }
  
  
  const result1 = isAdult(25)
  console.log('Is age 25 adult?', result1); 
  
  const result2 = isAdult(15);
  console.log('Is age 15 adult?', result2); 