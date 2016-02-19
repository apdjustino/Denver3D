/**
 * Created by jmartinez on 2/18/16.
 */
var app = angular.module('app', []);

app.controller('ctrl', function($scope){
    var viewer = new Cesium.Viewer('cesiumContainer');
    var promise = Cesium.GeoJsonDataSource.load('../Data/rino.geojson');
    promise.then(function(dataSource){
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities.values;
        for(var i =0; i<entities.length; i++){
            var entity = entities[i];
            entity.polygon.extrudedHeight = entity.properties.Bldg_Heigh /2;
            entity.polygon.material = Cesium.Color.BURLYWOOD;
            entity.polygon.outlineColor = Cesium.Color.BURLYWOOD;
        }
    }).otherwise(function(error){
        //Display any errrors encountered while loading.
        window.alert(error);
    });
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(-104.9912641, 39.7489947, 1500.0),
        orientation : {
            heading : Cesium.Math.toRadians(20.0),
            pitch : Cesium.Math.toRadians(-35.0),
            roll : 0.0
        },
        duration: 5.5,
        complete: function(){

        }
    });

    $scope.changeView = function() {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(-104.9912641, 39.7694511, 500.0),
            orientation: {
                heading: Cesium.Math.toRadians(90.0),
                pitch: Cesium.Math.toRadians(-35.0),
                roll: 0.0
            },
            duration: 5.5,
            complete: function () {

            }
        });
    }

});

