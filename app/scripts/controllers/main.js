'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('MainCtrl', function ($scope, $rootScope, $document, MessagesService) {

        $rootScope.sections = [
            { id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle  },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle },
            { id: 'about', title: $rootScope.messages.navAboutTitle }
        ];
        $rootScope.navSwitch = { uri: 'docs', title: $rootScope.messages.navDocumentationTitle };

        $rootScope.showCli = function (elemendId, commands, loop, typeSpeed) {
            $('#' + elemendId + '-cursor').empty();
            $('#' + elemendId).typed({
                strings: commands,
                typeSpeed: typeSpeed || 30,
                loop: loop || false,
                backSpeed: -20
            });
        };

        _.forEach($('.navbar-collapse'), function(target) {
            $(target).collapse({'toggle': false});
        });

        // hide menu bar on click (small resolutions)
        $document.on('click.nav','.navbar-collapse.in',function() {
            _.forEach($('.navbar-collapse'), function(target) {
                $(target).collapse('hide');
            });
        });

        // workaround to remove the current class from the navbar when reaching the header
        $(window).scroll(function() {
            if (!$scope.navInProcess) {
                var windscroll = $(window).scrollTop();
                if (windscroll < 800) {
                    $('.header .nav .current').removeClass('current');
                }
            }
        });

        $rootScope.animateToElement = function (elementId) {
            var element = $('#' + elementId);
            if (element.length) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 50
                }, 400, 'swing');
            }
        };

        $scope.scrollToGettingStarted = function () {
            $rootScope.animateToElement($rootScope.sections[0].id);
        };
    }).directive('loadingPage', [function () {
        return {
            restrict: 'E',
            template: '<div class="loading-page"></div>',
            link: function () {
                Pace.on('done', function () {
                    $('div.loading-page').fadeOut('slow');
                });
            }
        };
    }]).directive('youtubeEmbed', [function () {
        return {
            restrict: 'A',
            template: '',
            link: function (scope, element) {
                var src = $(element).find('img')[0].src;
                optimizeYouTubeEmbeds(src);
            }
        };
    }]).directive('onePageNav', ['$timeout', function(timer) {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                var onePageNav = function () {
                    $(element).onePageNav({
                        currentClass: 'current',
                        changeHash: false,
                        scrollSpeed: 400,
                        scrollThreshold: 0.2,
                        filter: ':not(.external)',
                        easing: 'swing',
                        scrollOffset: 300,
                        begin: function() {
                            scope.navInProcess = true;
                        },
                        end: function() {
                            scope.navInProcess = false;
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
    }]).directive('scrollBottom', [function() {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                element.on('click', function(event) {
                    event.preventDefault();
                    $('html, body').animate({scrollTop:  $(document).height()}, 'slow', function () {
                        $('.header .nav .current').removeClass('current');
                        $(element).addClass('current');
                    });
                });
            }
        };
    }]);
