function textWithDelay (text, miliseconds) {
    setTimeout(() => {
        console.log(text);
    }, miliseconds);
}

textWithDelay("Hello my friend", 1000);