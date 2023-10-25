const gElements = document.querySelectorAll(".cls-1");
console.log(gElements);
        gElements.forEach((gElement) => {
            gElement.addEventListener("click", function () {
                if (gElement.classList.contains("color-red")) {
                    gElement.classList.remove("color-red");
                    gElement.classList.add("color-green");
                } else if (gElement.classList.contains("color-green")) {
                    gElement.classList.remove("color-green");
                    gElement.classList.add("color-blue");
                } else {
                    gElement.classList.remove("color-blue");
                    gElement.classList.add("color-red");
                }
            });
        });