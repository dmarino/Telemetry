<!--
VFS VUE Single File Component
Copyright (c) 2018. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
-->
<template>

    <div class="tittle-screen inside-container">

        <heat-map></heat-map>
        <PieChartByType></PieChartByType>
        <LineChartTime></LineChartTime>
    </div>

</template>
<script>
    import Controller from '@/../lib/controller'
    import BarChart from '@/mixins/BarChartMixin'
    import LineChartTime from '@/components/LineChartThroughtTime'
    import PieChartByType from '@/components/PieChartByType'
    import HeatMap from '@/components/HeatMap'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
        }
    }

    export default new ChartsController('Charts',{HeatMap, PieChartByType, LineChartTime});

</script>
<style scoped>

</style>
