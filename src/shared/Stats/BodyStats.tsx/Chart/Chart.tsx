import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarElement } from 'chart.js';
import { currentDay } from "../../../Heplers/Heplers";
import { useSelector } from "react-redux";
import { rootState } from "../../../Redux/Redux";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarElement);

export const ChartElement = () => {
  const activityTime = useSelector((state: rootState) => state.activityTime.payload)

  const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [{
      label: 'Активность',
      data: [0, 0, 0, 0, 0, 0, 0].map((i, ind) => ind === currentDay - 1 ? activityTime : i),
      backgroundColor: '#DC3E22',
      borderColor: '#ac230b',
      borderWidth: 2
    }]
  }

  return <Bar data={data} options={{
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true
      },
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (val) {
            if (val >= 60) {
              return (Number(val) / 60).toFixed(1) + 'm'
            } else {
              return (Number(val)).toFixed(1) + 's'
            }
          }
        }
      },
    },
    layout: {
      padding: {
        top: 20
      }
    }

  }} />
}
