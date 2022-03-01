const allBtnLock = document.querySelectorAll('.block-btn')
const inputsColor = document.querySelectorAll('.codigo-cor')
const allColors = document.querySelectorAll('.cor')
const btnChangeAll = document.querySelector('.btn-mudar-cor')


function lockColor(e) {
    const item = e.currentTarget.parentElement
    const button = e.currentTarget

    if (item.dataset.lock == "unlocked") {
        item.dataset.lock = "locked";
        button.innerHTML = "<i class='bi bi-lock-fill'></i>"
        button.setAttribute('aria-pressed','true')
        button.setAttribute('aria-label','Descongelar cor')
    } else {
        item.dataset.lock = "unlocked";
        button.innerHTML = "<i class='bi bi-unlock'></i>"
        button.setAttribute('aria-pressed','false')
        button.setAttribute('aria-label','Congelar cor')
    }
}

function copyCode(e) {
    const code = e.currentTarget.nextElementSibling;
    const textCopy = e.currentTarget.firstChild

    code.select()
    code.setSelectionRange(0, 7)
    navigator.clipboard.writeText(code.value);
    textCopy.innerText = 'Copiado!'
    
    setTimeout(() => {
         e.target.innerText = 'Clique para copiar'
    }, 1500)
}

function changeColor(e, previousValue) {
    const input = e.currentTarget
    const divColor = e.currentTarget.previousElementSibling
    var hex = /[0-9A-Fa-f]{6}/g;
    
    if (input.value.indexOf('#') !== 0) {
        input.value = "#" + input.value
    }
    if (input.value.length !== 4 && input.value.length !== 7) {
       const inputCopy = input.value.slice(1, input.value.length)
       input.value = '#' + inputCopy.repeat(6)
    }
    if (input.value.length <= 1 || (!hex.test(input.value))) {
        input.value = previousValue
    }

    input.value = input.value.slice(0, 7)
    divColor.style.background = input.value

}

function validateHexa(e) {

    const hexad = /^[0-9a-fA-F]+$/;

    if (!hexad.test(e.key)) {
        e.preventDefault()
    }

}

function generateColor() {
    return Math.random().toString(16).substring(2, 8)
}

function changeAllColors() {

    inputsColor.forEach((input, index) => {

        if (input.parentElement.dataset.lock == "unlocked") {
            let color = generateColor()
            input.value = '#' + color;
            allColors[index].style.background = input.value
        }      

    })  
}

inputsColor.forEach((input) => {
    input.addEventListener('keypress', validateHexa)
    input.addEventListener('click', (e) => {
        const previousValue = e.currentTarget.value
        input.addEventListener('change', (e) => {
          changeColor(e, previousValue)  
        })       
    })
})

allBtnLock.forEach((btn) => {
    btn.addEventListener('click', lockColor)
})

allColors.forEach((div) => {
    div.addEventListener('click', copyCode)
})

btnChangeAll.addEventListener('click', changeAllColors)

document.addEventListener('keypress', (e) => {
    if (e.code == "Space") changeAllColors()
})

changeAllColors()
