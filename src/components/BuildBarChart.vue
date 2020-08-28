<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="game-pieChart">

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

            this.methods = {
                
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

                    console.log(this.chartData)

                    this.chartData = {}
                    this.chartData.labels =  this.builds.map(el =>{return el.id});
                    this.chartData.datasets =  sets;
                }
            }
            
            this.injectGetters(['records', 'actionTypes','builds']);
            this.injectActions(['loadRecords', 'loadActionTypes','loadBuilds']);
        }

        vue_beforeMount(){

            this.loadActionTypes()
            this.loadRecords()
            this.loadBuilds()
        
        }

        vue_mounted(){

            this.fillChart();
        }
    }

    export default new BarChartController('build-barchart',{BarChart} );
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
