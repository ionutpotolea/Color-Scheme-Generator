const inputColor = document.getElementById("input-color")
const colorSchemeSelect = document.getElementById("color-schemes")
const getSchemeBtn = document.getElementById("get-color-scheme")

const colorScheme = document.querySelector('.color-scheme')
const hexColorCodes = document.querySelector('.hex-color-codes')

getSchemeBtn.addEventListener("click", getColorScheme)

let colorSchemeArray = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD1B6", "#A626D3"]
let userColor = inputColor.value.split("#")[1].toUpperCase()
let numberOfColors = 4

renderColorScheme()

function getColorScheme(e){
    e.preventDefault()
    colorSchemeArray = []
    
    userColor = inputColor.value.split("#")[1].toUpperCase()
    let url = `https://www.thecolorapi.com/scheme?hex=${userColor}&mode=${colorSchemeSelect.value}&count=${numberOfColors}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.colors.forEach(color => {
            colorSchemeArray.push(color.hex.value)
            })
        colorSchemeArray.unshift(inputColor.value)
        renderColorScheme()
    })
    
}

function renderColorScheme(){
    colorScheme.innerHTML = ``
    hexColorCodes.innerHTML = ``
    for(let i = 0; i<=numberOfColors; i++){
        colorScheme.innerHTML += `
            <div
                class="color"
                style="background: ${colorSchemeArray[i]}"
                onclick="copyToClipboard('${colorSchemeArray[i]}')"
            >
            </div>
            `
        hexColorCodes.innerHTML += `
            <span
                class="hex-color-code"
                onclick="copyToClipboard('${colorSchemeArray[i]}')"
            >
            ${colorSchemeArray[i].toUpperCase()}
            </span>
            `
    }
}

function copyToClipboard(hexCode){
    console.log(hexCode)
    navigator.clipboard.writeText(hexCode).then(function() {
        alert(`copied to clipboard! ${hexCode}`)
        }, function(err) {
        alert("error!", err)
        });
}