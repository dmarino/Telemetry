<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="game-heatmap">

        <h1>GAME HEATMAP</h1>

        <div class="legend">
            <color-label v-for="(item, i) in actionTypes" :key="i" :color='item.color' :name='item.name'></color-label>
        </div>

        <div class="map-container">
            <bubble-chart :chartData="chartData" :options="options"></bubble-chart>
        </div>
    </div>

</template>

<script>
    import Controller from '@/../lib/controller'
    import BubbleChart from '@/mixins/BubbleChartMixin'
    import ColorLabel from './colorLabel';

    class HeatMapController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                chartData:{},
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: { display: false,},
                    tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems, data) {
							return 'x :' + tooltipItems.xLabel + ', y: ' + tooltipItems.yLabel;
						}
					}
				},
                }
                
            }
            
            //these two methods are my little cheat to re render the charts when the data is updated
            this.watch = {
                data: function() {
                    this.fillMap();
                }
            }

            this.computed ={
            
                data: function() {

                    var temp = []
                    temp[0] = this.records;
                    temp[1] = this.actionTypes;

                    return temp;
                }
            }

            this.methods = {
                
                //here i re arrenge the data to show the chart that i want
                fillMap(){

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
                        
                                var isNew =true;

                                for(var i =0; i< type.data.length && isNew; i++){


                                    var dataElement = type.data[i];
                                    if(dataElement.x == element.posX && dataElement.y == element.posY){

                                        dataElement.r+=5;
                                        isNew = false;
                                    }
                                }

                                if(isNew){

                                    var record = {}
                                    record.x = element.posX;
                                    record.y = element.posY;
                                    record.r =5;

                                    type.data.push(record);

                                }
                            }
                        });
                    });

                    this.chartData = {}
                    this.chartData.datasets = dataS;
                }
            }
            
            this.injectGetters(['records', 'actionTypes']);
        }

        vue_mounted(){

            this.fillMap();
        }
    }

    export default new HeatMapController('heat-map',{BubbleChart, ColorLabel} );
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

.legend{

    margin: 2%;
}

.color-label{

    display: inline-block;
    width: 20%;
}

</style>
