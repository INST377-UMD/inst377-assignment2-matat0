window.onload = table;

async function table() {
    try {
        const response = await fetch(`https://tradestie.com/api/v1/apps/reddit?date=2022-04-03`);
        const result = await response.json();
        console.log(result);


        const container = document.getElementById("tickers-table");
        const table = document.createElement('table');
        const headerRow = table.insertRow();

        const tickerHeader = document.createElement('th');
        tickerHeader.textContent='Ticker';

        const commentHeader = document.createElement('th');
        tickerHeader.textContent='Number of Comments';
        headerRow.appendChild(commentHeader);

        const sentimentHeader = document.createElement('th');
        sentimentHeader.textContent='Sentiment';
        headerRow.appendChild(sentimentHeader);

        for (let i = 0;i < 5;i++) {
            const item = result[i];
            const row = table.insertRow();

            const cellTicker = row.insertCell();
            cellTicker.textContent = item.ticker;

            const cellComments = row.insertCell();
            cellComments.textContent = item.no_of_comments;

            const cellSentiment = row.insertCell();
            const img = document.createElement("img");
            if (item.sentiment == 'Bullish') {
                img.src="bullish.png"
            }
            else if (item.sentiment == 'Bearish') {
                img.src="bearish.jpg"
            }

            img.width = 50;
            img.height = 50;
            cellSentiment.appendChild(img);
        }

        container.innerHTML = '';
        container.appendChild(table);
        console.log(table);
        
        
    }
    
    catch(err) {
        console.log(err);
        return err.message;
    }

    finally {
        console.log("finally");
    }
}








let stocks = null;

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

        const bars = result.results;
        const labels = [];
        const dataPoints = [];
        for (let i = 0; i < bars.length; i++) {
            const date = new Date(bars[i].t);
            labels.push(date.toLocaleDateString());
            dataPoints.push(bars[i].c);
        }
        console.log(labels);
        console.log(dataPoints);

        const data = {
            labels: labels,
            datasets: [{
                label: '($) Stock Price',
                data: dataPoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
        }


        if (stocks) {
            stocks.destroy();
        }

        const chartDiv = document.getElementById("stock-prices");
        stocks = new Chart (
            chartDiv,
            {
                type:'line',
                data: data,
            }
        )
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
          'lookup *stock': (stock) => {
            audioStock(stock);
            console.log(stock);
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

async function audioStock(stock) {
    try {
        const apiKey = 	'DwYGmV7Kwt1QeU6MixNIG14hCuwKxmJW';
        const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${stock}/range/1/day/2025-04-04/2025-05-04?apiKey=${apiKey}`);
        const result = await response.json();
        console.log(result);

        const bars = result.results;
        const labels = [];
        const dataPoints = [];
        for (let i = 0; i < bars.length; i++) {
            const date = new Date(bars[i].t);
            labels.push(date.toLocaleDateString());
            dataPoints.push(bars[i].c);
        }
        console.log(labels);
        console.log(dataPoints);

        const data = {
            labels: labels,
            datasets: [{
                label: '($) Stock Price',
                data: dataPoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
        }


        if (stocks) {
            stocks.destroy();
        }

        const chartDiv = document.getElementById("stock-prices");
        stocks = new Chart (
            chartDiv,
            {
                type:'line',
                data: data,
            }
        )
    }

    catch(err) {
        console.log(err);
        return err.message;
    }

    finally {
        console.log("finally");
    }
}