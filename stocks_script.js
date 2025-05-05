async function main(event) {
    event.preventDefault();
    try {
        const stocksTickerEntry = document.getElementById("stocks-input");
        const stocksTicker = stocksTickerEntry.value;

        const multiplierEntry = document.getElementById("time-selection");
        const multiplier = multiplierEntry.value;
        let from = '';
        let to= '';

        if (multiplier == '30') {
            from = '2025-04-04';
            to = '2025-05-04';
        }

        else if (multiplier =='60') {
            from = '2025-03-05';
            to = '2025-05-04';
        }

        else if (multiplier =='90') {
            from = '2025-02-03';
            to = '2025-05-04';
        }
        

        const apiKey = 	'DwYGmV7Kwt1QeU6MixNIG14hCuwKxmJW';
        const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/1/day/${from}/${to}?apiKey=${apiKey}`);
        const result = await response.json();
        console.log(result);

        const labels = Utils.months({count: 7});
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
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