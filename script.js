//var empty = [];
var empty = [];

function addSign(tile) {
    document.querySelector(`.${tile}`).children[0].classList.add("circle");
    const list = document.querySelector("#board").children;
    const newList = Object.assign({}, list);
    // console.log(newList);
    for (const key in newList) {
        if (newList[key].firstElementChild.classList.length < 1) {
            empty.push(parseInt(key));
        }

        //  console.log(newList[key].firstElementChild.classList.length);
    }
    let x = Math.floor(Math.random() * empty.length);
    document
        .querySelector(`.tile${empty[x]}`)
        .children[0].classList.add("square");
    //let x = Math.floor(Math.random() * 8);
    //console.log(x);
    // document
    //     .querySelector(`.tile${empty[x]}`)
    //     .children[0].classList.add("square");

    // //console.log(empty);
    empty = [];
}

function clearAll() {}
document.querySelector("#board").addEventListener("click", function(e) {
    var emptyy = [];
    let rem;

    function calculateScore() {
        let scores = setTimeout(() => {
            const list = document.querySelector("#board").children;
            const newList = Object.assign({}, list);
            //     // console.log(newList);
            for (const key in newList) {
                newList[key].firstElementChild.className;
                emptyy.push(newList[key].firstElementChild.className);
                rem = emptyy[0];
                //console.log(newList[key].firstElementChild);
            }
            //console.log(emptyy);
        }, 20);
        return rem;
    }
    var jeff = "before";

    function test() {
        setTimeout(function() {
            const list = document.querySelector("#board").children;
            const newList = Object.assign({}, list);
            //     // console.log(newList);
            for (const key in newList) {
                newList[key].firstElementChild.className;
                emptyy.push(newList[key].firstElementChild.className);

                //console.log(newList[key].firstElementChild);
            }
            //console.log(emptyy);

            test2();
        }, 10);
    }

    test();
    let scenerios = [false, false, false, false, false, false, false, false];

    function test2() {
        console.log(emptyy);

        // if (
        if (emptyy[0] + emptyy[1] + emptyy[2] === "circlecirclecircle") {
            alert("cwin");
            document.querySelectorAll(".circle").forEach((element) => {
                if (element.classList.contains("circle")) {
                    element.classList.remove("circle");
                }
            });

            document.querySelectorAll(".square").forEach((element) => {
                if (element.classList.contains("square")) {
                    element.classList.remove("square");
                }
            });
        }

        if (emptyy[0] + emptyy[1] + emptyy[2] === "squaresquaresquare") {
            alert("swin");
        }
        //  "circlecirclecircle"
        //  ) {

        //  }
    }
    test2();

    console.log(scenerios);

    //console.log(calculateScore());
    // console.log(x[1].one);
    // console.log(x[2].one);
    // console.log(x[3].one);
    // console.log(x[7].one);
    // console.log(x[5].one);
    // console.log(x[6].one);
    // console.log(x[7].one);
    // console.log(x[8].one);
    // console.log(x[9].one);
    //         //  console.log(newList[key].firstElementChild.classList.length);
    //     }
    //     let x = Math.floor(Math.random() * empty.length);
    //     document
    //         .querySelector(`.tile${empty[x]}`)
    //      .children[0].classList.add("square");
    //     // console.log(x, empty);
    //     //console.log(x);
    //     //theOne = empty[x];
    //     //empty = [];
    // }, 10);

    if (2 < 1) {
        alert("whatever");
    } else {
        if (e.target.className === "tile tile0") {
            addSign(e.target.classList[1]);
        }

        if (e.target.className === "tile tile1") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile2") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile3") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile4") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile5") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile6") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile7") {
            addSign(e.target.classList[1]);
        }
        if (e.target.className === "tile tile8") {
            addSign(e.target.classList[1]);
        }
    }

    // console.log(e);
});