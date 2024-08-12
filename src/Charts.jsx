import { useGet, useMutate } from "restful-react";
import React from 'react';
import style from "./Charts.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  BarController,
  Filler
} from 'chart.js';
import { Bar, Bubble, Radar, Chart } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  LineController,
  BarController,
  Filler

);
export default function Charts() {

  const { data: rawFoods, refetch: refetchFoods } = useGet({
    path: "/foods/",
  });
  let foods = rawFoods ?? []
  console.log("foods", foods)
  let labelsList = foods.map((food) => food.name)
  let likesList = foods.map((food) => food.likes)
  let dislikesList = foods.map((food) => food.dislikes)
  const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(55, 99, 132, 0.5)', 'rgba(255, 255, 0, 0.5)']
  console.log("tagObjectList", likesList)
  console.log("labelsList", labelsList)

  const optionsLikes = {
    // indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
   // maintainAspectRatio : false,
    scales: {

      x: {
        // stacked: true,
        // type: "logarithmic",
        reverse: false,
        title: {
          display: true,
          text: "Foods name"
        },
        grid: {
          color: "blue",
          borderColor: 'yellow',
          tickColor: 'green'
        },
        ticks: {
          includeBounds: true,
          maxTicksLimit: 1000,
        },
        // min: 0.5,
        // min:"1960",
        // max: 10,
        // type: 'time',
        //   time: {
        //     unit: 'year'
        // },
        // time: {
        //   displayFormats: {
        //     quarter: 'MMM YYYY'
        //   }
        // }
      },
      y: {
        // stacked: true,
        reverse: false,
        title: {
          display: true,
          text: "Number"
        },
        grid: {
          color: "blue",
        },
      }
    },
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Likes Chart',
      },

    },
  };
  const optionsDisLikes = {
    // indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    //maintainAspectRatio : false,
    scales: {

      x: {
        // stacked: true,
        // type: "logarithmic",
        reverse: false,
        title: {
          display: true,
          text: "Foods name"
        },
        grid: {
          color: "blue",
          borderColor: 'yellow',
          tickColor: 'green'
        },
        ticks: {
          includeBounds: true,
          maxTicksLimit: 1000,
        },
        // min: 0.5,
        // min:"1960",
        // max: 10,
        // type: 'time',
        //   time: {
        //     unit: 'year'
        // },
        // time: {
        //   displayFormats: {
        //     quarter: 'MMM YYYY'
        //   }
        // }
      },
      y: {
        // stacked: true,
        reverse: false,
        title: {
          display: true,
          text: "number"
        },
        grid: {
          color: "blue",
        },
      }
    },
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'DisLikes Chart',
      },

    },
  };

  const dataLikes = {
    labels: labelsList,
    datasets: [

      {
        label: "Likes",
        data: likesList,
        borderColor: 'rgb(545, 99, 132)',
        backgroundColor: backgroundColors[0],
      },


    ],
  };
  const dataDislikes = {
    labels: labelsList,
    datasets: [

      {
        label: "DisLikes",
        data: dislikesList,
        borderColor: 'rgb(100, 99, 132)',
        backgroundColor: backgroundColors[2],
      },


    ],
  };

  return <>
    <div className={style.bar}><Bar  options={optionsLikes} data={dataLikes} /></div>
    <div className={style.bar}><Bar  options={optionsDisLikes} data={dataDislikes} /></div>
  </>
}