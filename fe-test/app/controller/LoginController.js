var app = angular.module('myApp', []);
app.controller('LoginCtrl', function ($scope, $http) {
    $scope.phonenumber = '';
    $scope.password = '';
    $scope.dataUser;
    $scope.login = function () {
        var data = {
            phoneNumber: $scope.phonenumber,
            password: $scope.password,
        };
        $http({
            method: 'POST',
            url: 'https://localhost:44392/api/Account/login',
            data: JSON.stringify(data),
        })
            .then(function (response) {
                $scope.dataUser = response.data;
                console.log(response.data);
                localStorage.setItem('userID', $scope.dataUser.userID);
                localStorage.setItem('name', $scope.dataUser.name);
                localStorage.setItem('avatar', $scope.dataUser.avatar);
                localStorage.setItem(
                    'phoneNumber',
                    $scope.dataUser.phoneNumber
                );
                localStorage.setItem('email', $scope.dataUser.email);
                localStorage.setItem('vip', $scope.dataUser.vip);
                localStorage.setItem(
                    'token',
                    JSON.stringify($scope.dataUser.token)
                );
                switch ($scope.dataUser.typeID) {
                    case 'Us_1512kk':
                        window.location.href = 'index.html';
                        break;
                    case 'Ad_1512kk':
                        window.location.href = '';
                        break;
                    default:
                        window.location.href = '';
                }
            })
            .catch(function (error) {
                // Xử lý khi có lỗi
                if (error.status === 400) {
                    console.log('Yêu cầu không hợp lệ (BadRequest).');
                    alert(error.data.message);
                } else {
                    console.log('Lỗi không xác định: ' + error.status);
                }
            });
    };
});
