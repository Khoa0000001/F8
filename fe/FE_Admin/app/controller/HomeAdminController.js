angular
    .module('myAppAdmin')
    .controller(
        'HomeAdminController',
        function ($scope, $http, $rootScope, $timeout) {
            $scope.valueDate = 'tuan';
            $scope.renderChart = function () {
                Thongke();
            };
            var listsale = document.getElementsByClassName('sales');
            var listsalew = document.getElementsByClassName('sales_week');

            $scope.LoadThongKeWeek = function (callback = () => {}) {
                $http({
                    method: 'get',
                    url: current_url + '/Admin/ThongKe/get-tk-data-week',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    callback(response);
                });
            };
            $scope.LoadThongKeMonths = function (callback = () => {}) {
                $http({
                    method: 'get',
                    url: current_url + '/Admin/ThongKe/get-tk-data-months',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    callback(response);
                });
            };
            $scope.LoadThongKeYears = function (callback = () => {}) {
                $http({
                    method: 'get',
                    url: current_url + '/Admin/ThongKe/get-tk-data-years',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    callback(response);
                });
            };
            function Bieutuan(dataPoints) {
                var chart = new CanvasJS.Chart('chartContainerTuan', {
                    animationEnabled: true,
                    theme: 'light2',
                    title: {
                        text: 'Thống kê theo tuần',
                        fontWeight: 'bolder',
                        fontColor: '#008B8B',
                        fontfamily: 'tahoma',
                        fontSize: 30,
                        padding: 10,
                    },
                    data: [
                        {
                            type: 'column',
                            dataPoints: dataPoints,
                        },
                    ],
                });
                chart.render();
            }
            function Bieuthang(dataPoints) {
                $scope.LoadThongKeMonths();
                var chart = new CanvasJS.Chart('chartContainerthang', {
                    animationEnabled: true,
                    theme: 'light2',
                    title: {
                        text: 'Thống kê theo tháng',
                        fontWeight: 'bolder',
                        fontColor: '#008B8B',
                        fontfamily: 'tahoma',
                        fontSize: 25,
                        padding: 10,
                    },
                    data: [
                        {
                            type: 'column',
                            dataPoints: dataPoints,
                        },
                    ],
                });
                chart.render();
            }
            function Bieunam(dataPoints) {
                $scope.LoadThongKeYears();
                var chart = new CanvasJS.Chart('chartContainer', {
                    animationEnabled: true,
                    theme: 'light2',
                    title: {
                        text: 'Thống kê theo năm',
                        fontWeight: 'bolder',
                        fontColor: '#008B8B',
                        fontfamily: 'tahoma',
                        fontSize: 25,
                        padding: 10,
                    },
                    data: [
                        {
                            type: 'column',
                            padding: 20,
                            dataPoints: dataPoints,
                        },
                    ],
                });
                chart.render();
            }

            function Thongke() {
                if ($('#txt_over').value == 'tuan') {
                    [...listsale].forEach((x) => {
                        x.style.display = 'none';
                    });
                    [...listsalew].forEach((x) => {
                        x.style.display = 'none';
                    });
                    listsale[0].style.display = 'block';
                    listsalew[0].style.display = 'grid';
                    $scope.LoadThongKeWeek((response) => {
                        var dataPoints = response.data.data;
                        dataPoints = dataPoints.map((item, index) => {
                            if (index === 0) {
                                return {
                                    label: 'Chủ nhật',
                                    y: item.money,
                                };
                            } else {
                                return {
                                    label: `Thứ ${item.timeNumber}`,
                                    y: item.money,
                                };
                            }
                        });
                        console.log(dataPoints);
                        Bieutuan(dataPoints);
                    });
                }
                if ($('#txt_over').value == 'thang') {
                    [...listsale].forEach((x) => {
                        x.style.display = 'none';
                    });
                    [...listsalew].forEach((x) => {
                        x.style.display = 'none';
                    });
                    listsale[1].style.display = 'block';
                    listsalew[1].style.display = 'grid';
                    $scope.LoadThongKeMonths((response) => {
                        var dataPoints = response.data.data;
                        console.log(dataPoints);
                        dataPoints = dataPoints.map((item, index) => {
                            item.timeNumber = item.timeNumber.substring(0, 10);
                            return {
                                label: `Ngày ${item.timeNumber}`,
                                y: item.money,
                            };
                        });
                        console.log(dataPoints);
                        Bieuthang(dataPoints);
                    });
                }
                if ($('#txt_over').value == 'nam') {
                    [...listsale].forEach((x) => {
                        x.style.display = 'none';
                    });
                    [...listsalew].forEach((x) => {
                        x.style.display = 'none';
                    });
                    listsale[2].style.display = 'block';
                    listsalew[2].style.display = 'grid';
                    $scope.LoadThongKeYears((response) => {
                        var dataPoints = response.data.data;
                        dataPoints = dataPoints.map((item, index) => {
                            return {
                                label: `Tháng ${item.timeNumber}`,
                                y: item.money,
                            };
                        });
                        console.log(dataPoints);
                        Bieunam(dataPoints);
                    });
                }
            }
            Thongke();
        }
    );
