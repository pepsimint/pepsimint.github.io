const terminal = document.getElementById('terminal');
const outputContainer = document.getElementById('output-container');
const inputLine = document.getElementById('input-line');
const hiddenInput = document.getElementById('hidden-input');

let command = '';

terminal.addEventListener('click', () => {
  hiddenInput.focus();
});

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
  terminal.scrollTop = terminal.scrollHeight;
});

function runCommand(cmd) {
  appendCommandLine(cmd);
  processCommand(cmd);
  command = '';
  inputLine.textContent = '';
  hiddenInput.value = '';
  terminal.scrollTop = terminal.scrollHeight;
}

function appendCommandLine(cmd) {
  const line = document.createElement('div');
  line.innerHTML = `<span class="user">pepsimint@pepsimint</span>:<span class="tilde">~</span>$ ${cmd}`;
  outputContainer.appendChild(line);
}

function printOutput(text) {
  const out = document.createElement('div');
  out.classList.add('output');
  out.innerHTML = text.replace(/\n/g, '<br>');
  outputContainer.appendChild(out);
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
  } else if(c ==='date') {
    printOutput(getCurrentDateTime());
  } else if(c === 'music') {
    printOutput('I like Edward Skeletrix, ICP, M.I.A, Osamason, Radiohead, Deftones, Goreshit...  ')
  } else {
    printOutput(`Command not found: ${c}`);
  }
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
    if (progress <= 0) {
      clearInterval(interval);
      printOutput('THE FELINE IS DEPLOYED');
    }
  }, 500);
}
}


