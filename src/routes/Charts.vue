<!--
VFS VUE Single File Component
Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <div class="tittle-screen inside-container">

        <heat-map></heat-map>
        <PieChartByType></PieChartByType>
    </div>

</template>
<script>
    import Controller from '@/../lib/controller'
    import BarChart from '@/mixins/BarChartMixin'
    import LineChart from '@/mixins/LineChartMixin'
    import PieChartByType from '@/components/PieChartByType'
    import HeatMap from '@/components/HeatMap'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
        }
    }

    export default new ChartsController('Charts',{HeatMap, PieChartByType});

</script>
<style scoped>

</style>
