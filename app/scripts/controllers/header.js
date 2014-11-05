'use strict';

angular.module('scoreWebsiteApp')
    .controller('HeaderCtrl', function ($scope, $rootScope, $document) {
        // hide menu bar on click (small resolutions)
        $document.on('click.nav','.navbar-collapse.in',function(e) {
            if ($(e.target).is('a') || $(e.target).is('button')) {
                $(this).collapse('hide');
            }
        });

        // workaround to remove the current class from the navbar when reaching the header
        $(window).scroll(function() {
            var windscroll = $(window).scrollTop();
            if (windscroll < 800) {
                $('.header .nav .current').removeClass('current');
            }
        });

        function animateToElement(elementId) {
            var element = $('#' + elementId);
            if (element.length) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 50
                }, 750, 'swing');
            }
        }

        $scope.scrollToGettingStarted = function () {
            animateToElement($rootScope.sections[0].id);
        };
    }).directive('onePageNav', ['$timeout', function(timer) {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                var onePageNav = function () {
                    element.onePageNav({
                        currentClass: 'current',
                        changeHash: false,
                        scrollSpeed: 750,
                        scrollThreshold: 0.2,
                        filter: '',
                        easing: 'swing',
                        scrollOffset: 300,
                        begin: function() {

                        },
                        end: function() {

                        }
                    });
                };

                timer(onePageNav, 0); // must be refresh after dom is finished
            }
        };
    }]).directive('scrollTop', [function() {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                element.on('click', function(event) {
                    event.preventDefault();
                    $('html, body').animate({scrollTop: 0}, 'slow', function () {
                        $('.header .nav .current').removeClass('current');
                    });
                });
            }
        };
    }]);