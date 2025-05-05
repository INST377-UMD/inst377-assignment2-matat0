window.onload = main;

async function main() {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random/10`);
    const result = await response.json();
    console.log(result);

    const container = document.getElementById("slider");

    for (let i = 0; i < result.message.length;i++) {
      const img = document.createElement('img');
      img.src = result.message[i];
      container.appendChild(img);
    }

    simpleslider.getSlider();
  }

  catch(err) {
    console.log(err);
    return err.message;
  }

  finally {
    console.log("finally");
  }

  simpleslider.getSlider();
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