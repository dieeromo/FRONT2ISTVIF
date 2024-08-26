// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';

// const DocumentoGrafico = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartInstance = echarts.init(chartRef.current);

//     const option = {
//       title: {
//         text: 'Número de Documentos por Indicador y Estado',
//         left: 'center',
//       },

//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           type: 'shadow',
//         },
//       },

//       legend: {
//         data: ['Por Revisar', 'Aprobado', 'Por Corregir', 'Sin Subir'],
//         bottom: 10,
//       },

//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '15%',
//         containLabel: true,
//       },

//       xAxis: {
//         type: 'category',
//         data: Object.keys(data),
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [
//         {
//           name: 'Por Revisar',
//           type: 'bar',
//           stack: 'total',
//           label: {
//             show: true,
//           },
//           data: Object.values(data).map((item) => item['Por Revisar']),
//         },
//         {
//           name: 'Aprobado',
//           type: 'bar',
//           stack: 'total',
//           label: {
//             show: true,
//           },
//           data: Object.values(data).map((item) => item['Aprobado']),
//         },
//         {
//           name: 'Por Corregir',
//           type: 'bar',
//           stack: 'total',
//           label: {
//             show: true,
//           },
//           data: Object.values(data).map((item) => item['Por Corregir']),
//         },
//         {
//           name: 'Sin Subir',
//           type: 'bar',
//           stack: 'total',
//           label: {
//             show: true,
//           },
//           data: Object.values(data).map((item) => item['Sin Subir']),
//         },
//       ],
//     };

//     chartInstance.setOption(option);

//     // Cleanup function to dispose of chart instance
//     return () => {
//       chartInstance.dispose();
//     };
//   }, [data]);

//   return <div ref={chartRef} className="w-full h-96"></div>;
// };

// export default DocumentoGrafico;


import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DocumentoGrafico = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Distribución por documento',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: '10%',
        data: ['Por revisar','Aprobado','Corregir','Sin subir',],
      },
      series: [
        {
          name: 'Documentos',
          type: 'pie',
          radius: '50%',
          data: [
            
            
            { value: data.Por_revisar, name: 'Por revisar' },
            { value: data.Aprobado, name: 'Aprobado' },
            
            { value: data.Por_corregir, name: 'Corregir' },
            { value: data.Sin_subir, name: 'Sin subir' },
            
  
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    chartInstance.setOption(option);

    // Cleanup to dispose chart instance on component unmount
    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full h-96"></div>;
};

export default DocumentoGrafico;
