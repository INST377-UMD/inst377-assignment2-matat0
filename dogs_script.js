window.onload = function() {
  main();
  dogBreed();
};

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

async function dogBreed() {
  try {
    const response = await fetch(`https://dogapi.dog/api/v2/breeds`);
    const result = await response.json();
    const breeds = result.data;
    const container = document.getElementById("dog-button-container");
    const descContainer = document.getElementById("dog-desc-container");
    console.log(result);

    let activeDesc = null;

    for (let i = 0; i < breeds.length;i++) {
      let att = breeds[i].attributes;
      const button = document.createElement('button');
      button.textContent = att.name;
      container.appendChild(button);

      let descDiv = document.createElement('div');

      button.onclick = function() {

        if (activeDesc) {
          activeDesc.style.display ='none'
        }

        descDiv.innerHTML = 
        `<h2>Name:${att.name} <br>
        <p>Description:${att.description} <br>
        <p>Min Life:${att.life.min} <br>
        <p> Max Life:${att.life.max}`;
        descDiv.style.display = 'block';
        activeDesc = descDiv;
      }
      descContainer.appendChild(descDiv);
    }
    
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
          'load dog breed *breed': (breed) => {
            const buttons = document.querySelectorAll('#dog-button-container button');
            const btn = Array.from(buttons).find(b =>
              b.textContent === breed
            );
            if (btn) {
              btn.click();
            }
            console.log(breed);
          }
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