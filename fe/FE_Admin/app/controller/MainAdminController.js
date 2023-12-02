angular
    .module('myAppAdmin')
    .controller(
        'MainAdminController',
        function ($scope, $http, $timeout, $rootScope) {
            $rootScope.avatarRoot = localStorage.getItem('avatar');
            $rootScope.nameRoot = localStorage.getItem('name');
            $scope.isShowheader_userMenu = false;

            $scope.handelClickActions_Avatar = () => {
                $scope.isShowheader_userMenu = !$scope.isShowheader_userMenu;
            };
        }
    );
