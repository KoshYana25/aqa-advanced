const averageGrade = 59;

if(averageGrade < 60){
    console.log("Незадовільно");
}
else if (averageGrade <= 70) {
    console.log("Задовільно");
} else if (averageGrade <= 80) {
    console.log("Добре");
} else if (averageGrade <= 90) {
    console.log("Дуже добре");
} else if (averageGrade <= 100) {
    console.log("Відмінно");
} 
//averageCrade is not in the range from 0 to 100 
 else {
    console.log("Помилка: оцінка поза допустимим діапазоном");
}