var app = angular.module('APP', [
    'ngMaterial',
    "leaflet-directive"
]);

app.controller('HeaderCtrl', ['$scope', function ($scope) {
    $scope.scrollTo = function (scrolledId) {
        var elem = $('#' + scrolledId),
            top = elem.offset().top;
        $('html, body').animate({
            scrollTop: top - 70
        }, 800);
    }
}]);

app.controller('SocialListCtrl', ['$scope', function ($scope) {
    $scope.config = {
        isOpen: false,
        selectedMode: 'md-scale',
        selectedDirection: 'up'
    };
}]);

app.controller('UniversitiesCtrl', ['$scope', '$http', 'leafletData', function ($scope, $http, leafletData) {

    $http.get('data/universities.json').success(function (data) {
        $scope.universities = data.universities;
        $scope.universitiesCount = data.universities.length;
        $scope.markers = data.markers;
    });


    angular.extend($scope, {
        center: {
            lat: 58.53959,
            lng: 62.40234,
            zoom: 3
        },
        defaults: {
            zoomControlPosition: 'topright',
            maxZoom: 18,
            minZoom: 3,
            scrollWheelZoom: false
        },
        maxbounds: {
            southWest: {
                lat: 79.18783,
                lng: 160.83984
            },
            northEast: {
                lat: 16.63619,
                lng: -26.2793
            }
        },
        layers: {
            baselayers: {
                mapbox_light: {
                    name: 'Mapbox Light',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                        mapid: 'bufanuvols.lia22g09'
                    },
                    layerParams: {
                        showOnSelector: false
                    }
                }
            }
        },
        markers: $scope.markers
    });
}]);









app.directive('headerAnimation', function ($window) {
    var $win = angular.element($window);

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            function contentScroll() {
                var scroll = $win.scrollTop();
                if (scroll > 30) {
                    element.addClass("scrolled");
                } else {
                    element.removeClass("scrolled");
                }
            }

            $($win).scroll(function () {
                contentScroll();
            });

            contentScroll();
        }
    };
});

app.directive('teamsSlider', function ($interval) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var timer = null,
                item = $('.slider .item'),
                stopTime,
                slideWidth = 163,
                scrollSlider = element.position().left - slideWidth;

            function autoplay() {
                element.animate({
                    left: scrollSlider
                }, 300, function () {
                    element
                        .find('.item:first')
                        .appendTo(element)
                        .parent()
                        .css({
                            'left': 0
                        });
                });
            }

            function play() {
                timer = $interval(autoplay, 7000);
            }

            element.hover(
                function () {
                    $interval.cancel(timer);
                },
                function () {
                    play();
                }
            );

            play();
        }
    };
});


app.directive('parallax', function ($window) {
    var $win = angular.element($window);

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            $($win).scroll(function () {
                var yPos = ($win.scrollTop() / 2);
                var coords = '100% ' + yPos + 'px';

                element.css({
                    backgroundPosition: coords
                });

            });
        }
    };
});
