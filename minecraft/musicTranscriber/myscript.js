var encode_button = document.getElementById("encode")
var input = document.getElementById("input")

let letter_to_value = new Map()
letter_to_value.set('C', 1)
letter_to_value.set('D', 3)
letter_to_value.set('E', 5)
letter_to_value.set('F', 6)
letter_to_value.set('G', 8)
letter_to_value.set('A', 10)
letter_to_value.set('B', 12)
letter_to_value.set('0', 0)

let modifier_value = new Map()
modifier_value.set('#', 1)
modifier_value.set('b', -1)
modifier_value.set('_', 0)
function encode() {
    var notes = []
    silence = false
    var inputValue = input.value
    if (inputValue.length % 3 == 0) {
        note = 0
        for (let i = 0; i < inputValue.length; i++) {
            step = i % 3
            c = inputValue[i]
            if (step == 0) {
                if (letter_to_value.has(c)) {
                    note = letter_to_value.get(c)
                }
                if (note == 0) {
                    silence = true
                }
            }
            else if (step == 1) {
                modifier = 0
                if (modifier_value.has(c)) {
                    modifier = modifier_value.get(c)
                }
                note += modifier
            }
            else if (step == 2) {
                if (silence) {
                    notes.push(0)
                } else {
                    notes.push(note + (parseInt(c) * 12))
                }
                silence = false
                note = 0
            }
        }
        var encodedStringBtoA = btoa(String.fromCharCode.apply(null, new Uint8Array(notes)));
        document.getElementById("output").value = encodedStringBtoA
    } else {
        document.getElementById("output").value = "Invalid Input"
    }

}

encode_button.onclick = encode;

