
//window.onload = main;

async function main() {
    const quoteText = document.getElementById("quote-text");

    try {
        const response = await fetch(`https://zenquotes.io/api/random`);
        const result = await response.json();
        console.log(result);

        quoteText.innerHTML = `"${result[0].q}" - ${result[0].a}`;
    }

    catch(err) {
        console.log(err);
        return err.message;
    }

    finally {
        console.log("finally");
    }
}

function enableListening() {
    if (annyang) {
        const commands = {
          'hello': () => { alert('Hello world!'); },
          'change the color to *color': (color) => {document.body.style.backgroundColor = color; },
          'navigate to *page': (page) => {
            if (page == 'home') {
                window.location.href = "index.html";
            }

            else if (page =='dogs') {
                window.location.href = "dogs.html";
            }

            else if (page =='stocks') {
                window.location.href = "stocks.html";
            }
          },
        };
      
        annyang.addCommands(commands);
      
        annyang.start();
        console.log("listening!")
      }
}

function disableListening() {
    if (annyang) {
        annyang.abort();
        console.log("stopped listening!")
      }
}