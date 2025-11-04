const terminal = document.getElementById('terminal');
const outputContainer = document.getElementById('output-container');
const inputLine = document.getElementById('input-line');
const hiddenInput = document.getElementById('hidden-input');

function randomUint64() {
    const array = new Uint32Array(2);
    crypto.getRandomValues(array);
    return (BigInt(array[0]) << 32n) | BigInt(array[1]);
}

var highestLevelReached = 0;
var iterateAttempts = 0;

function iteratorSim() {
    var solutionExists = randomUint64();
    var solutionIsPortable = randomUint64();
    var solutionGenApplicable = randomUint64();
    var message = "";
    var currentLevel = 0;
    if (solutionExists === randomUint64()) {
      currentLevel = 1;
        if (solutionIsPortable === randomUint64()) {
          currentLevel = 2;
            if (solutionGenApplicable === randomUint64()) {
              currentLevel = 3;
                message = "SOLUTION HAS BEEN FOUND, IS PORTABLE, AND IS GENERALLY APPLICABLE. THE GREAT PROBLEM HAS BEEN SOLVED.";
            } else {
                message = "SOLUTION HAS BEEN FOUND AND IS PORTABLE, BUT ISN'T GENERALLY APPLICABLE.";
            }
        } else {
            message = "SOLUTION HAS BEEN FOUND BUT ISN'T PORTABLE.";
        }
    } else {
        message = "SOLUTION HASN'T BEEN FOUND.";
    }
    if (currentLevel > highestLevelReached) {
        highestLevelReached = currentLevel;
    }
    printOutput(message);
}

function getHighestLevelReached() {
    if (highestLevelReached === 0) {
      printOutput("SOLUTION HASN'T BEEN FOUND.");
    } else if (highestLevelReached === 1) {
      printOutput("SOLUTION HAS BEEN FOUND BUT ISN'T PORTABLE.");
    } else if (highestLevelReached === 2){
      printOutput("SOLUTION HAS BEEN FOUND AND IS PORTABLE, BUT ISN'T GENERALLY APPLICABLE.");
    } else if (highestLevelReached === 3){
      printOutput("SOLUTION HAS BEEN FOUND, IS PORTABLE, AND IS GENERALLY APPLICABLE. THE GREAT PROBLEM HAS BEEN SOLVED.");
    }
    printOutput(`\nYOU HAVE MADE ${iterateAttempts} ATTEMPT(S) TO ITERATE SO FAR.`)
}

function scrollToBottom() {
    setTimeout(() => {
        terminal.scrollTo({
            top: terminal.scrollHeight,
            behavior: 'smooth'
        });
    }, 0);
}

let command = '';
let history = [];
let historyIndex = -1;

terminal.addEventListener('click', () => hiddenInput.focus());

hiddenInput.addEventListener('input', () => {
    command = hiddenInput.value;
    inputLine.textContent = command;
});

hiddenInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        runCommand(command);
        command = '';
        inputLine.textContent = '';
        hiddenInput.value = '';
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;

        if (historyIndex === -1) {
            historyIndex = history.length - 1;
        } else if (historyIndex > 0) {
            historyIndex--;
        }

        command = history[historyIndex];
        inputLine.textContent = command;
        hiddenInput.value = command;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (history.length === 0) return;

        if (historyIndex === -1) return;

        if (historyIndex < history.length - 1) {
            historyIndex++;
            command = history[historyIndex];
        } else {
            historyIndex = -1;
            command = '';
        }

        inputLine.textContent = command;
        hiddenInput.value = command;
    }
});

document.addEventListener('keydown', e => {
    if (document.activeElement === hiddenInput) return;

    e.preventDefault();

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        command += e.key;
    } else if (e.key === 'Backspace') {
        command = command.slice(0, -1);
    } else if (e.key === 'Enter') {
        runCommand(command);
        command = '';
    }

    inputLine.textContent = command;
    scrollToBottom();
});

function runCommand(cmd) {
    appendCommandLine(cmd);
    processCommand(cmd);
    command = '';
    inputLine.textContent = '';
    hiddenInput.value = '';
    history.push(cmd);
    historyIndex = -1;
    scrollToBottom();
}

function appendCommandLine(cmd) {
    const line = document.createElement('div');
    line.innerHTML = `<span class="user">pepsimint@pepsimint</span>:<span class="tilde">~</span>$ ${cmd}`;
    outputContainer.appendChild(line);
    scrollToBottom();
}

function printOutput(text) {
    const out = document.createElement('div');
    out.classList.add('output');
    out.innerHTML = text.replace(/\n/g, '<br>');
    outputContainer.appendChild(out);
    scrollToBottom();
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toString();
}

function processCommand(cmd) {
    const c = cmd.trim();

    if (c === 'help') {
        printOutput('Available commands:\nhelp - show this\ninfo - general information about me\naliases - my aliases\nclear - clear the terminal\ndate - display current date\nmusic - music artists i like most');
    } else if (c === 'info') {
        printOutput('I am 17 years old, my birthday is on the 26th of October. Aspiring IT technician and the greatest programmer on earth (that’s why god chose me)');
    } else if (c === 'clear') {
        outputContainer.innerHTML = '';
    } else if (c === '') {
        printOutput('');
    } else if (c === 'aliases') {
        printOutput('I go by either pepsimint, pebbsimint, peppermint, fyrmint or fyrment on most platforms.');
    } else if (c === 'tole') {
        slowlyLoad('tole.jpeg');
    } else if (c === 'date') {
        printOutput(getCurrentDateTime());
    } else if (c === 'music') {
        printOutput('I like Edward Skeletrix, ICP, M.I.A, Osamason, Radiohead, Deftones, Goreshit...');
    } else if (c === 'iterate') {
        iteratorSim();
    } else if (c === 'iterateprogress'){
        getHighestLevelReached();
        iterateAttempts = iterateAttempts + 1;
    } else {
        printOutput(`Command not found: ${c}`);
    }

    scrollToBottom();

    function slowlyLoad(src) {
        const container = document.createElement('div');
        container.classList.add('output');
        outputContainer.appendChild(container);

        const img = new Image();
        img.src = src;
        img.style.clipPath = 'inset(100% 0 0 0)';
        container.appendChild(img);

        let progress = 100;
        const interval = setInterval(() => {
            progress -= 1;
            img.style.clipPath = `inset(${progress}% 0 0 0)`;
            scrollToBottom();
            if (progress <= 0) {
                clearInterval(interval);
                printOutput('THE FELINE IS DEPLOYED');
            }
        }, 500);
    }
}
