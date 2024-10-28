
function createboxes() {
    // צבעים לדיבים
    const colors = ["#FF6347", "#4682B4", "#FFD700", "#8A2BE2"];
    const container = document.getElementById("container");

    // יצירת הדיבים עם לולאה
    for (let i = 1; i <= 4; i++) {
        const box = document.createElement("div");
        box.className = "box";
        box.id = "id" + i;
        box.textContent = i;
        box.style.backgroundColor = colors[i - 1];
        container.appendChild(box);
    }
}
createboxes()
// פונקציית הבהוב אקראי
function flash(box) {
    box.classList.add("flash");

    setTimeout(() => {
        box.classList.remove("flash");
    }, 500);
}

function getBoxElement(id) {
    const box = document.getElementById("id" + id);
    return box;
}

// ----------------------------------------------------------------

const boxIds = [];

function getRandomNumber() {
    num = Math.floor(Math.random() * 4 + 1);
    boxIds.push(num);
    return num;
}


function flashAllBoxs(i = 0) {
    const box = getBoxElement(boxIds[i]);

    flash(box)

    i++

    if (i >= boxIds.length) {
        console.log('boxIds is empty')
        playerTurn()
        colorCircle(true)
        return

    }
    setTimeout(() => { flashAllBoxs(i) }, 1000)
}


function pcTurn() {
    colorCircle(false)

    console.log('pc turn')
    console.log(boxIds)

    getRandomNumber()
    flashAllBoxs()


}

function colorCircle(isPlayer) {
    if (isPlayer) {
        document.querySelector('.circle').classList.add('player')
    } else {
        document.querySelector('.circle').classList.remove('player')
    }
}

function playerTurn() {

    colorCircle(true)
    console.log('player turn')
    console.log(boxIds)

    const boxes = document.querySelectorAll('.box')
    boxes.forEach(b => {
        b.addEventListener('click', clickBox)
    })


    //---
    let i = 0

    function clickBox(e) {
        console.log(e)

        const boxId = e.target.id[2]
        console.log(boxId)

        if (boxId == boxIds[i]) {
            console.log('good')
            flash(e.target)
            i++

            if (i >= boxIds.length) {
                boxes.forEach(b => {
                    b.removeEventListener('click', clickBox)
                })
                setTimeout(pcTurn, 1000)
            }

        } else {
            console.log('bad')

            alert('failed')
            restart()
        }
    }


}

function restart() {
    boxIds.length = 0
    pcTurn()
}

function play() {
    console.log('playing')

    pcTurn()

    // pcTurn()
    // pcTurn()

    // flashAllBoxs()

}

// העברנו את play() לקובץ ה html במקום שבו יצרנו את ההשהיה לפני תחילת המשחק וכאן כיבינו (בשורה מתחת)
// play()


function restartGame() {
    location.reload();
}


//כאן יוגדר שבפתיחת האתר תהיה המתנה של 2 שניות לפני תחילת המשחק

// window.onload = function() {
//     setTimeout(play, 2000); // 2000 מילישניות = 2 שניות
// };



