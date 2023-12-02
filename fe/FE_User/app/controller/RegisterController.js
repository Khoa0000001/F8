var app = angular.module('myApp', []);
app.controller('registerCtrl', function ($scope, $http) {
    $scope.phonenumber = '';
    $scope.password = '';
    $scope.passwordAgain = '';
    $scope.register = function () {
        if (
            /^0\d{9}$/.test($scope.phonenumber) &&
            $scope.passwordAgain == $scope.password
        ) {
            var data = {
                phoneNumber: $scope.phonenumber,
                password: $scope.password,
            };
            $http({
                method: 'POST',
                url: 'https://localhost:44392/api/Account/Create-Account',
                data: JSON.stringify(data),
            }).then(function (response) {
                console.log(response);
            });
        }
    };

    var PhoneNumberEl = $('.formbody-yop_inputSDT input');
    var phone_pattern = /^0\d{9}$/;

    let iRegister = true;

    PhoneNumberEl.addEventListener('change', function (e) {
        if (phone_pattern.test(e.target.value)) {
            $('.thong-bao-phoneNumber').setAttribute('style', 'display: none;');
            iRegister = true;
        } else {
            $('.thong-bao-phoneNumber').setAttribute(
                'style',
                'color: red;font-size: 14px;margin: 10px 0 0 28px;display:block;'
            );
            iRegister = false;
        }
    });

    $('input[name="login_password-again"]').addEventListener(
        'change',
        function (e) {
            if ($('input[name="login_password"]').value != e.target.value) {
                $('.thong-bao-password').setAttribute(
                    'style',
                    'color: red;font-size: 14px;margin: 10px 0 0 28px;display:block;'
                );
                iRegister = false;
            } else {
                $('.thong-bao-password').setAttribute(
                    'style',
                    'display: none;'
                );
                iRegister = true;
            }
        }
    );

    $('.btn_Dangnhap').addEventListener('click', function (event) {
        if (iRegister) {
            alert('Đăng ký thành công.');
        } else {
            alert('Đăng ký thất bại.');
        }
    });
});
