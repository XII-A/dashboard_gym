"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { RiFireLine } from "react-icons/ri";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const DailyChartComponent = ({
  data,
  bgColor,
  iconColor,
  icon,
  title,
  label,
}) => {
  const chartConfig = {
    type: "bar",
    height: 220,

    series: [
      {
        name: label,
        data: data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#fff"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 600,
          },
        },
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 600,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#000",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <div className="">
      {typeof window !== "undefined" && (
        <Card
          className=""
          style={{
            backgroundColor: bgColor,
          }}
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div
              className="w-max rounded-lg  p-2 text-white"
              style={{
                backgroundColor: iconColor,
              }}
            >
              {icon}
            </div>
            <div>
              <Typography variant="h6" color="white">
                {title}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="p-0 h-full">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DailyChartComponent;
