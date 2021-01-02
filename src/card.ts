import { IncomingMessage, ServerResponse } from 'http'

export default async function handler(
  _req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Simple HeatMap</title>

    <link href="../../assets/styles.css" rel="stylesheet" />

    <style>
      #chart {
        max-width: 650px;
        margin: 35px auto;
      }
    </style>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    <script>
      // Replace Math.random() with a pseudo-random number generator to get reproducible results in e2e tests
      // Based on https://gist.github.com/blixt/f17b47c62508be59987b
      var _seed = 42
      Math.random = function () {
        _seed = (_seed * 16807) % 2147483647
        return (_seed - 1) / 2147483646
      }
    </script>

    <script>
      function generateData(count, yrange) {
        var i = 0
        var series = []
        while (i < count) {
          var x = 'w' + (i + 1).toString()
          var y =
            Math.floor(
              Math.random() * (yrange.max - yrange.min + 1)
            ) + yrange.min

          series.push({
            x: x,
            y: y,
          })
          i++
        }
        return series
      }
    </script>
  </head>

  <body>
    <div id="chart"></div>

    <script>
      var options = {
        series: [
          {
            name: 'Metric1',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric2',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric3',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric4',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric5',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric6',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric7',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric8',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: 'Metric9',
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
        ],
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
        title: {
          text: 'HeatMap Chart (Single color)',
        },
      }

      var chart = new ApexCharts(
        document.querySelector('#chart'),
        options
      )
      chart.render()
    </script>
  </body>
</html>
`
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(html)
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, an error. I derp!</p>')
    console.error(error)
  }
}
