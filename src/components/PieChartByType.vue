<!-- Copyright (c) 2020 Daniela Mariño -->

<template>

    <div class="game-pieChart">

        <h1>Players Actions By Type</h1>

        <div class="map-container">
            <pie-chart :chartData="chartData" :options="options"></pie-chart>
        </div>
    </div>

</template>

<script>
    import Controller from '@/../lib/controller'
    import PieChart from '@/mixins/PieChartMixin'

    class PieChartController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                chartData:{},
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true,}
                },
                filter: "",
                
            }

            this.methods = {
                
                fillChart(){

                    var dataS = []

                    this.actionTypes.forEach(type =>{

                        var temp = {}
                        temp.label = type.name;
                        temp.color = type.color;
                        temp.data = 0;

                        dataS.push(temp);
                    });

                    this.records.forEach(element => {
                
                        dataS.forEach(temp =>{

                            if(element.action == temp.label){
                        
                                temp.data +=1;
                            }
                        });
                    });


                    this.chartData = {}
                    this.chartData.labels = dataS.map(el => {return el.label});

                    var set ={};
                    set.backgroundColor = dataS.map(el => {return el.color});
                    set.data = dataS.map(el => {return el.data});

                    this.chartData.datasets = [];
                    this.chartData.datasets.push(set);
                }
            }
            
            this.injectGetters(['records', 'actionTypes']);
        }

        vue_mounted(){

            this.fillChart();
        }
    }

    export default new PieChartController('pie-by-type',{PieChart} );
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
