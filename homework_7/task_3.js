function divide(numerator, denominator) {
    if (typeof numerator !== 'number' || typeof denominator !== 'number') {
        throw new Error("Всі аргументи мають бути числами.");
    }
    
    if (denominator === 0) {
        throw new Error("Знаменник не може дорівнювати нулю.");
    }

    
    return numerator / denominator;
}

// Виклик функції з різними аргументами
    try {
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
    }
