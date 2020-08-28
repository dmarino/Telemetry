<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="time-lineChart">

        <h1>Players Stats Over Time</h1>

        <div class="map-container">
            <line-chart :chartData="chartData" :options="options"></line-chart>
        </div>
    </div>

</template>

<script>
    import Controller from '@/../lib/controller'
    import LineChart from '@/mixins/LineChartMixin'

    class LineChartController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                chartData:{
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true,}
                },
                months:[
                        {name:"January", number:0},
                        {name:"February", number:1},
                        {name:"March", number:2},
                        {name:"April", number:3},
                        {name:"May", number:4},
                        {name:"June", number:5},
                        {name:"July", number:6},
                        {name:"August", number:7},
                        {name:"September", number:8},
                        {name:"October", number:9},
                        {name:"November", number:10},
                        {name:"December", number:11},
                ] 
                
            }

            this.methods = {
                
                fillChart(){
                    var sets = []

                    this.actionTypes.forEach(type =>{

                        var temp = {}
                        temp.label = type.name
                        temp.backgroundColor = type.color;
                        temp.data = [0,0,0,0,0,0,0,0,0,0,0,0];

                        sets.push(temp);
                    });

                    this.records.forEach(element => {

                        var time = new Date()
                        time.setTime(element.recordedTime.seconds*1000);

                        sets.forEach(set =>{

                            if(set.label == element.action){
                                set.data[time.getMonth()]++;
                            }

                        })

                    });

                    this.chartData = {}
                    this.chartData.labels =  this.months.map(el =>{return el.name});
                    this.chartData.datasets =  sets;
                }
            }
            
            this.injectGetters(['records', 'actionTypes']);
        }
        
        vue_mounted(){

            this.fillChart();
        }
    }

    export default new LineChartController('Line-throught-time',{LineChart} );
</script>

<style scoped>

.game-pieChart{

    text-align: center;
}

.legend{

    margin: 2%;
}

.color-label{

    display: inline-block;
    width: 20%;
}

</style>
