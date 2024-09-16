function divide(numerator, denominator) {
    if (typeof numerator !== 'number' || typeof denominator !== 'number') {
        throw new Error("Всі аргументи мають бути числами.");
    }
    
    if (denominator === 0) {
        throw new Error("Знаменник не може дорівнювати нулю.");
    }

    
    return numerator / denominator;
}

function executeWithHandling (func, ...args ) {
    try {
        console.log(func(...args));
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("Робота завершена");
    }
}

executeWithHandling(divide, 20, 2);
executeWithHandling(divide, 20, 0);
executeWithHandling(divide, 20, 'a');


// Виклик функції з різними аргументами
    /*try {
        console.log(divide(20, 2));
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("Робота завершена");
    }

    try {
        console.log(divide(20, 'a'));
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("Робота завершена");
    }

    try {
        console.log(divide(20, 0));
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("Робота завершена");
    }*/
