<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="game-heatmap">

        <h1>GAME HEATMAP</h1>

        <div class="legend">

            <span v-for="(item, i) in actionTypes" :key="i">{{item.name}}</span>
        </div>

        <div class="map-container">
            <bubble-chart :chartData="chartData" :options="options"></bubble-chart>
        </div>
    </div>

</template>

<script>
    import Controller from '@/../lib/controller'
    import BubbleChart from '@/mixins/BubbleChartMixin'
    import Record from '../models/TelemetryRecord';

    class HeatMapController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                chartData:{},
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: false,}
                }
                
            }

            
            this.injectGetters(['records', 'actionTypes']);
            this.injectActions(['loadRecords', 'loadActionTypes']);
        }

        vue_beforeMount(){

            this.loadActionTypes()
            this.loadRecords()

        }

        vue_mounted(){

            var dataS = []

            this.actionTypes.forEach(type =>{

                var set = {}
                set.backgroundColor = type.color;
                set.label = type.name;
                set.data = []

                dataS.push(set);
            });

            this.records.forEach(element => {
                
                dataS.forEach(type =>{
                    if(element.action == type.label){
                        var record = {}
                        record.x = element.posX;
                        record.y = element.posY;
                        record.r =5;

                        type.data.push(record);
                    }
                });
            });

            this.chartData = {}
            this.chartData.datasets = dataS;
        }
    }

    export default new HeatMapController('heat-map',{BubbleChart} );
</script>

<style scoped>

.game-heatmap{

    text-align: center;
}

.map-container{

    background-image:url("../assets/gamemap.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

}

</style>
