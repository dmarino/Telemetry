<!--
VFS VUE Single File Component
Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <div class="tittle-screen inside-container">

        <heat-map></heat-map>
    </div>

</template>
<script>
    import Controller from '@/../lib/controller'
    import BarChart from '@/mixins/BarChartMixin'
    import LineChart from '@/mixins/LineChartMixin'
    import PieChart from '@/mixins/PieChartMixin'
    import BubbleChart from '@/mixins/BubbleChartMixin'
    import HeatMap from '@/components/HeatMap'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
        }
    }

    export default new ChartsController('Charts',{HeatMap});

</script>
<style scoped>

</style>
