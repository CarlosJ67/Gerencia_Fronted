<template>
    <div>
      <ApexChart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></ApexChart>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StackedColumnChart',
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      // Procesar los datos para la gráfica
      const series = [
        {
          name: 'Ingresos',
          data: props.data.map((item) => item.ingresos),
        },
        {
          name: 'Egresos',
          data: props.data.map((item) => item.egresos),
        },
      ];
  
      // Configurar las opciones de la gráfica
      const chartOptions = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        title: {
          text: 'Reportes de Ingresos y Egresos', // Título de la gráfica
          align: 'center', // Alinear el título al centro
          style: {
            fontSize: '18px', // Tamaño de la fuente del título
            fontWeight: 'bold', // Peso de la fuente
            color: '#333', // Color del texto
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0, // Eliminar el borderRadius (barras rectas)
            dataLabels: {
              enabled: true, // Habilitar etiquetas de datos
              formatter: function (val) {
                return val.toLocaleString(); // Formatear números con separadores de miles
              },
              style: {
                fontSize: '10px', // Tamaño de la fuente
                colors: ['#000'], // Color del texto
              },
              offsetY: -5, // Ajustar la posición vertical de las etiquetas
            },
          },
        },
        xaxis: {
          categories: props.data.map((item) => item.mes),
          title: {
            text: 'Mes',
            style: {
              fontSize: '14px', // Tamaño de la fuente del título del eje X
            },
          },
          labels: {
            style: {
              fontSize: '12px', // Tamaño de la fuente de las etiquetas del eje X
            },
          },
        },
        yaxis: {
          title: {
            text: 'Monto',
            style: {
              fontSize: '14px', // Tamaño de la fuente del título del eje Y
            },
          },
          labels: {
            formatter: function (val) {
              return val.toLocaleString(); // Formatear números con separadores de miles
            },
            style: {
              fontSize: '12px', // Tamaño de la fuente de las etiquetas del eje Y
            },
          },
        },
        legend: {
          position: 'right',
          offsetY: 40,
          fontSize: '14px', // Tamaño de la fuente de la leyenda
        },
        fill: {
          opacity: 1,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
      };
  
      return {
        series,
        chartOptions,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>