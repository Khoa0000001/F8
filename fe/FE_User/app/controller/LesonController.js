var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller(
    'LessonController',
    function ($scope, $http, $routeParams, $location, $sce) {
        $scope.listLesson;
        $scope.dataCourse;
        $scope.videoId = '';
        $scope.nameLesson = '';
        $scope.dateTime;
        $scope.inexLesson = 1;
        $scope.showIcon = true;
        function convertDate(inputDate) {
            const date = new Date(inputDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const months = [
                'tháng 1',
                'tháng 2',
                'tháng 3',
                'tháng 4',
                'tháng 5',
                'tháng 6',
                'tháng 7',
                'tháng 8',
                'tháng 9',
                'tháng 10',
                'tháng 11',
                'tháng 12',
            ];

            return `Đăng ngày ${day} ${months[month - 1]} năm ${year}`;
        }

        function parseQueryString(queryString) {
            // Loại bỏ "?" nếu có
            queryString = queryString.substring(1);

            // Chia chuỗi thành mảng các cặp "tên=giá trị"
            const keyValuePairs = queryString.split('&');

            // Khởi tạo đối tượng để lưu trữ kết quả
            const result = {};

            // Duyệt qua mảng các cặp và thêm chúng vào đối tượng kết quả
            for (let i = 0; i < keyValuePairs.length; i++) {
                const pair = keyValuePairs[i].split('=');
                const key = decodeURIComponent(pair[0]);
                const value = decodeURIComponent(pair[1]);
                result[key] = value;
            }

            return result;
        }

        // Sử dụng hàm parseQueryString với window.location.search
        const queryObject = parseQueryString(window.location.search);

        $scope.loadCourse = function () {
            $http({
                method: 'GET',
                url:
                    current_url +
                    '/User/Course/get-course-by-id/' +
                    queryObject.id,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                $scope.dataCourse = response.data.data;
            });
        };

        $scope.loadListLessons = function () {
            $http({
                method: 'GET',
                url:
                    current_url +
                    '/User/Lesson/get-list-lesson-by-courseid/' +
                    queryObject.id,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                $scope.listLesson = response.data.data;
                console.log(response.data.data);
                if (response.data.data.length == 0) {
                    response.data.data = [
                        {
                            videoId: '',
                            name: '',
                            createdAt: '',
                        },
                    ];
                }
                $scope.videoId = response.data.data[0].videoId;
                $scope.nameLesson = response.data.data[0].name;
                $scope.dateTime = convertDate(response.data.data[0].createdAt);
            });
        };

        $scope.loadCourse();
        $scope.loadListLessons();

        // $$('.lesson-item').addEventListener('click', function (e) {
        //     $$('.lesson-item').forEach((element) => {
        //         element.removeAttribute('style');
        //     });
        //     e.target.setAttribute('style', 'background: rgba(240,81,35,.2);');
        // });

        $scope.clickLesson = function (videoId, name, date, index, e) {
            $scope.videoId = videoId;
            $scope.nameLesson = name;
            $scope.dateTime = convertDate(date);
            $scope.inexLesson = index;
            e.preventDefault();
            e.stopPropagation();
            $$('.lesson-item').forEach((element) => {
                element.removeAttribute('style');
            });
            e.currentTarget.setAttribute(
                'style',
                'background: rgba(240,81,35,.2);'
            );
        };
        $scope.$watch('videoId', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                // Nếu giá trị mới khác giá trị cũ, cập nhật ng-src của iframe
                $scope.iframeSrc = $sce.trustAsResourceUrl(
                    'https://www.youtube.com/embed/' + newVal
                );
            }
        });
        $scope.hideLeft = function () {
            $scope.showIcon = !$scope.showIcon;
            if ($scope.showIcon) {
                $('.body-right').setAttribute('style', 'width:23%');
                $('.body-left').setAttribute('style', 'width:77%');
            } else {
                $('.body-right').setAttribute('style', 'width:0%');
                $('.body-left').setAttribute('style', 'width:100%');
            }
        };
    }
);
