<template>
  <line-chart-element
    :chart-id="chartId"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :width="width"
    :height="height"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { Line as LineChartElement } from 'vue-chartjs/legacy'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip
} from 'chart.js'

Chart.register(LineElement, PointElement, LineController, LinearScale, CategoryScale, Tooltip)

export default defineComponent({
  name: 'LineChart',
  components: {
    LineChartElement
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    chartData: {
      type: Object,
      default: null
    },
    // chartOptions: {
    //   type: Object,
    //   default: null
    // },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 150
    }
  },
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            display: false
          },
          x: {
            display: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    }
  }
})
</script>
