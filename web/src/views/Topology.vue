<template>
  <v-container fluid fill-height justify-center>
    <div id="dag" style="width:100%;height:600px"></div>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.drawDAG();
  },
  methods: {
    async drawDAG() {
      let res = await this.$store.dispatch("serviceDAG", {});
      res.legend.textStyle = { color: "white" };
      this.$echarts.init(document.getElementById("dag")).setOption({
        backgroundColor: "#303030",
        title: {
          text: "Services DAG",
          textStyle: {
            color: "white"
          }
        },
        series: [
          {
            label: {
              normal: {
                position: "top",
                textStyle: {
                  fontSize: 22
                },
                show: true
              }
            },
            edgeSymbol: ["circle", "arrow"],
            edgeLabel: {
              normal: {
                formatter: function(param) {
                  return param.data.category;
                },
                show: true,
                textStyle: {
                  fontSize: 20
                }
              }
            },
            type: "graph",
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            },
            data: res.data,
            links: res.links,
            categories: res.categories,
            layout: "force",
            symbolSize: 25,
            force: {
              repulsion: 1000,
              edgeLength: [150, 300]
            },
            roam: true,
            focusNodeAdjacency: true
          }
        ],
        legend: res.legend,
        tooltip: {
          formatter: function(param) {
            if (param.dataType === "edge") {
              return param.data.category + ": " + param.data.target;
            }
            return param.data.category + ": " + param.data.name;
          }
        },
        animationEasingUpdate: "quinticInOut",
        animationDurationUpdate: 1500
      });
    }
  }
};
</script>

