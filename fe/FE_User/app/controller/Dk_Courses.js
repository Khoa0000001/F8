angular
    .module('myApp')
    .controller('Dk_CoursesController', function ($scope, $http, $routeParams) {
        window.scrollTo(0, 0);
        $scope.InfoCourse;
        $scope.listLessons;
        $scope.CourseID = $routeParams.id;
        $scope.GetInfoCourse = function () {
            $http({
                method: 'GET',
                url:
                    current_url +
                    '/User/Course/get-course-by-id/' +
                    $routeParams.id,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                $scope.InfoCourse = response.data.data;
            });
        };
        $scope.GetListLessons = function () {
            $http({
                method: 'GET',
                url:
                    current_url +
                    '/User/Lesson/get-list-lesson-by-courseid/' +
                    $routeParams.id,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                $scope.listLessons = response.data.data;
            });
        };
        $scope.RegisterCourse = function () {
            var data = {
                participationId: 0,
                courseId: parseInt($routeParams.id),
                userId: parseInt(localStorage.getItem('userID')),
                registrationDate: '2023-11-06T16:28:56.234Z',
                list_json_Courses: [
                    {
                        courseId: 0,
                        name: 'string',
                        description: 'string',
                        image: 'string',
                        price: 0,
                        createdAt: '2023-11-06T16:28:56.234Z',
                        categoryId: 0,
                    },
                ],
            };
            console.log(JSON.stringify(data));

            $http({
                method: 'POST',
                url: current_url + '/User/User/create-courseParticipation',
                data: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                console.log(response);
            });
        };
        $scope.GetListLessons();
        $scope.GetInfoCourse();
    });
