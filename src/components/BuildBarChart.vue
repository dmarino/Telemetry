<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="build-barchart">

        <h1>records per build</h1>

        <div class="chart-container">
            <bar-chart :chartData="chartData" :options="options"></bar-chart>
        </div>
    </div>

</template>

<script>
    import Controller from '@/../lib/controller'
    import BarChart from '@/mixins/BarChartMixin'

    class BarChartController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                chartData:{
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true,}
                }
            }

            //these two methods are my little cheat to re render the charts when the data is updated
            this.watch = {
                data: function() {
                    this.fillChart();
                }
            }

            this.computed ={
            
                data: function() {

                    var temp = []
                    temp[0] = this.records;
                    temp[1] = this.actionTypes;
                    temp[2] = this.builds;

                    return temp;
                }
            }

            this.methods = {
                
                //here i re arrenge the data to show the chart that i want
                fillChart(){
                    
                    var sets = []

                    this.actionTypes.forEach(type =>{

                        var temp = {}
                        temp.label = type.name
                        temp.backgroundColor = type.color;
                        temp.data=[];

                        this.builds.forEach(build =>{
                            temp.data.push(0);
                        })
                        sets.push(temp);
                    });

                    this.records.forEach(element => {
                        sets.forEach(set =>{
                            if(set.label == element.action){
                                for(var i=0; i< this.builds.length; i++){
                                    if(element.buildId == this.builds[i].id){
                                        
                                        set.data[i]++;
                                    }
                                }
                            }

                        })

                    });
                    this.chartData = {}
                    this.chartData.labels =  this.builds.map(el =>{return el.id});
                    this.chartData.datasets =  sets;
                }
            }
            
            this.injectGetters(['records', 'actionTypes','builds']);
        }

        vue_mounted(){

            this.fillChart();
        }
    }

    export default new BarChartController('build-barchart',{BarChart} );
</script>

<style scoped>

.build-barchart{

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
