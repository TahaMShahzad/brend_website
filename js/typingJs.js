var typedJsNative = {
    apply: function(options) {
        new TypedJs().applyEffect(options);
    }
}
function TypedJs() {
    var ele = null
      , startingPoint = 0
      , dataLen = null
      , data = null
      , typingSpeed = null
      , holdFor = null
      , writeAfter = null
      , dataAtm = null
      , displayCursor = null
      , eleParent = null
      , repeat = null

    this.applyEffect = function(options) {
        ele = document.querySelector("#" + options.id);
        data = options.data;
        dataLen = data.length;
        typingSpeed = options.typingSpeed;
        holdFor = options.holdFor;
        writeAfter = options.writeAfter;
        repeat = options.repeat;
        displayCursor = options.showCursor;
        showCursor();
        typify();
    }
    function typify() {
        dataAtm = data[startingPoint];
        createWritingEffect();
    }
    function createWritingEffect() {
        removeBlink();
        var dataLen = dataAtm.length;
        var endHere = 0;
        var timer = setInterval(function() {
            ele.innerHTML += dataAtm[endHere];
            endHere++;
            if (endHere == dataLen) {
                clearInterval(timer);
                addBlink();
                checkStatus();
            }
        }, typingSpeed);
    }
    function hold(callingFunc) {
        var time;
        if (callingFunc == "typify") {
            time = writeAfter;
            setTimeout(function() {
                typify();
            }, time);
        } else {
            time = holdFor;
            setTimeout(function() {
                clearWritten();
            }, time);
        }
    }
    function clearWritten() {
        removeBlink();
        var dataLen = dataAtm.length;
        var dataToSlice = dataAtm;
        var timer = setInterval(function() {
            dataToSlice = dataToSlice.slice(0, -1);
            ele.innerHTML = dataToSlice;
            dataLen--;
            if (dataLen == 0) {
                clearInterval(timer);
                addBlink();
                hold("typify");
            }
        }, 60);
    }
    function checkStatus() {
        if (repeat == true) {
            if (startingPoint == dataLen - 1) {
                startingPoint = 0;
            } else {
                startingPoint++;
            }
            hold("clearWritten");
        } else if (repeat == false) {
            if (startingPoint != dataLen - 1) {
                startingPoint++;
                hold("clearWritten");
            }
        }
    }
    function showCursor() {
        if (displayCursor) {
            ele.style.borderRight = "2px solid";
        }
    }
    function addBlink() {
      if (displayCursor) {
        ele.classList.add("blink");
      }
    }
    function removeBlink() {
      if (displayCursor) {
        ele.classList.remove("blink");
      }
    }
}
