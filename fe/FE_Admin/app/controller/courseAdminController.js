import eventFireBase from '../../assets/js/eventFireBase.js';
angular
    .module('myAppAdmin')
    .controller(
        'courseAdminController',
        function ($scope, $http, $rootScope, $q, $timeout) {
            // Lấy thẻ <img> theo ID
            var imgElement = $('#img-DkCourse');
            $scope.arryInsItemLesson = [];
            $scope.search_course;
            $scope.search_lesson;
            $scope.isShowListLesson = false;
            $scope.isShowBtnCourse = true;
            $scope.isShowBtnDelAllLesson = false;
            $scope.nameCourse = null;
            $scope.DescriptionCourse = null;
            $scope.PriceCourse = null;
            $scope.ImgCourse =
                'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fhinh-anh-bi-loi.jpeg?alt=media&token=75dd289b-7958-4f91-bc08-9bde26456180';
            $scope.CreateCourses = function (data) {
                var deferred = $q.defer();

                $http({
                    method: 'Post',
                    url: current_url + '/Admin/Course/create-course',
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(
                    function (response) {
                        console.log('Create: ', response.data);
                        deferred.resolve(response); // Giải quyết promise khi thành công
                    },
                    function (error) {
                        console.error('Error in CreateCourses: ', error);
                        deferred.reject(error); // Từ chối promise khi có lỗi
                    }
                );

                return deferred.promise;
            };
            $scope.GetByIdCourse = function (data, callback = () => {}) {
                $http({
                    method: 'Get',
                    url: current_url + '/Admin/Course/get-by-id/' + data,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    console.log('getbyid: ', response.data);
                    console.log(response);
                    callback(response);
                });
            };
            $scope.UpdateCourses = function (data) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: current_url + '/Admin/Course/update-course',
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(
                    function (response) {
                        console.log('Update: ', response.data);
                        deferred.resolve(response); // Giải quyết promise khi thành công
                    },
                    function (error) {
                        console.error('Error in UpdateCourses: ', error);
                        deferred.reject(error); // Từ chối promise khi có lỗi
                    }
                );

                return deferred.promise;
            };
            $scope.DeleteCourses = function (data, callback = () => {}) {
                $http({
                    method: 'DELETE',
                    url: current_url + '/Admin/Course/delete-course/' + data,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(function (response) {
                        console.log('deleteCourse: ', response.data);
                    })
                    .then(function (response) {
                        callback(response);
                    });
            };
            $scope.LoadCategorys = function (data) {
                $http({
                    method: 'Post',
                    url: current_url + '/Admin/Category/search-category',
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    $scope.listCategorys = response.data.data;
                });
            };
            $scope.LoadCourses = function (data, callback = () => {}) {
                $http({
                    method: 'Post',
                    url: current_url + '/Admin/Course/search-course',
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    $scope.listCourse = response.data;
                    console.log('Load: ', $scope.listCourse);
                    callback(response);
                });
            };
            $scope.LoadLessons = function (data, id, callback = () => {}) {
                $http({
                    method: 'post',
                    url:
                        current_url +
                        '/Admin/Lesson/search-lesson-by-courseid/' +
                        id,
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    $scope.listLessons = response.data.data;
                    console.log('loadLesson:', $scope.listLessons);
                    $timeout(() => {
                        checkInputLesson();
                        bdClickUpdate();
                    });
                    callback(response);
                });
            };
            $scope.DeleteLesson = function (data, callback = () => {}) {
                $http({
                    method: 'DELETE',
                    url: current_url + '/Admin/Lesson/delete-lesson/' + data,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(function (response) {
                        console.log('deleteLesson: ', response.data);
                    })
                    .then(function (response) {
                        callback(response);
                    });
            };
            $scope.callbackLoadCourse = (response) => {
                var x = Math.ceil(
                    response.data.totalItems / response.data.model.page_Size
                );
                // Đảm bảo x là một số nguyên dương
                x = Math.floor(x);
                if (x <= 0) {
                    throw new Error('x phải là số nguyên dương');
                }
                // Tạo mảng mới và thêm giá trị từ 1 đến x
                const resultArray = [];
                for (let i = 1; i <= x; i++) {
                    resultArray.push(i);
                }
                $scope.navigation_btn = resultArray;
            };
            $scope.LoadCourses(
                {
                    name: '',
                    page_Index: 1,
                    page_Size: 5,
                },
                $scope.callbackLoadCourse
            );
            $scope.LoadCategorys({
                name: '',
                page_Index: 0,
                page_Size: 0,
            });
            $scope.InsUpdDelLessons = function (
                data,
                status,
                callback = () => {}
            ) {
                $http({
                    method: 'post',
                    url:
                        current_url +
                        '/Admin/Lesson/Ins-Upd-Del_list_Lesssons/' +
                        status,
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    console.log(`${status}: `, response.data);
                    callback(response);
                });
            };
            $('#getFile').addEventListener('change', (event) => {
                // Kiểm tra xem đã chọn file hình ảnh chưa
                if (event.target.files.length > 0) {
                    // Lấy đối tượng File từ input file
                    var newImageFile = event.target.files[0];
                    // Tạo đường dẫn cho đối tượng File
                    var newImageUrl = URL.createObjectURL(newImageFile);
                    // Thay đổi giá trị của thuộc tính src
                    imgElement.src = newImageUrl;
                }
            });
            $scope.submitCourse = async () => {
                try {
                    var urlImg = null;
                    if (!$('#categoryId').value) {
                        return console.log('loi category');
                    }
                    if (!$scope.nameCourse) {
                        return console.log('loi name');
                    }
                    if (!$scope.DescriptionCourse) {
                        $scope.DescriptionCourse = '';
                    }
                    if (!$scope.PriceCourse) {
                        $scope.PriceCourse = 0;
                    }
                    if ($('#getFile').files[0] != undefined) {
                        await eventFireBase.UploadFile(
                            $('#getFile').files[0].name,
                            $('#getFile').files[0]
                        );
                        urlImg = await eventFireBase.getpathfile(
                            $('#getFile').files[0].name
                        );
                        $scope.ImgCourse = urlImg;
                    }
                    var data = {
                        courseId: 0,
                        name: $scope.nameCourse,
                        description: $scope.DescriptionCourse,
                        image: $scope.ImgCourse,
                        price: $scope.PriceCourse,
                        createdAt: new Date(),
                        categoryId: $('#categoryId').value,
                    };

                    var responseCreate = await $scope.CreateCourses(data);
                    // Xử lý responseCreate nếu cần
                    $scope.LoadCourses(
                        {
                            name: '',
                            page_Index: 1,
                            page_Size: 5,
                        },
                        $scope.callbackLoadCourse
                    );

                    $scope.nameCourse = null;
                    $scope.DescriptionCourse = null;
                    $scope.PriceCourse = null;
                    $('#categoryId').value = 0;
                    // imgElement.src =
                    //     'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fhinh-anh-bi-loi.jpeg?alt=media&token=75dd289b-7958-4f91-bc08-9bde26456180';
                    $scope.ImgCourse =
                        'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fhinh-anh-bi-loi.jpeg?alt=media&token=75dd289b-7958-4f91-bc08-9bde26456180';
                } catch (error) {
                    console.error('Error in submitCourse: ', error);
                }
            };
            $scope.ShowListLesson = () => {
                $scope.isShowListLesson = !$scope.isShowListLesson;
                $scope.arryInsItemLesson = [];
            };
            let checkInputLesson = function () {
                console.log($$('input[name="lessonId"]'));
                let inputs = $$('input[name="lessonId"]');
                inputs.forEach(function (input) {
                    input.addEventListener('change', function () {
                        let coInputCoGiaTri = false;
                        // Kiểm tra từng input
                        inputs.forEach(function (item) {
                            if (item.checked) {
                                coInputCoGiaTri = true;
                            }
                        });
                        // Thiết lập giá trị của $secop.isSHowBtnDelAllLessons dựa trên kết quả kiểm tra
                        if (coInputCoGiaTri) {
                            $scope.$apply(function () {
                                $scope.isShowBtnDelAllLesson = true;
                                console.log(
                                    'if: ',
                                    $scope.isShowBtnDelAllLesson
                                );
                            });
                        } else {
                            $scope.$apply(function () {
                                $scope.isShowBtnDelAllLesson = false;
                                console.log(
                                    'else: ',
                                    $scope.isShowBtnDelAllLesson
                                );
                            });
                        }
                    });
                });
            };
            let bdClickUpdate = function () {
                let listName = $$('.lesson-item td[name="nameLesson"]');
                let listDescription = $$('.lesson-item td[name="description"]');
                let listVideoId = $$('.lesson-item td[name="videoId"]');
                function handlerDblClick(item) {
                    let sectionElement = item.querySelector('section');
                    sectionElement.style.color = '#f05123';
                    sectionElement.setAttribute('contenteditable', 'true');
                    sectionElement.focus();
                    sectionElement
                        .closest('.lesson-item')
                        .setAttribute('data-update', 'true');
                }
                function handlerFocusAndBlur(item) {
                    item.querySelector('section').addEventListener(
                        'focus',
                        () => {
                            item.querySelector('section').style.setProperty(
                                'text-overflow',
                                'unset'
                            );
                            item.querySelector('section').style.setProperty(
                                'white-space',
                                'unset'
                            );
                            const range = document.createRange();
                            range.selectNodeContents(
                                item.querySelector('section')
                            );
                            range.collapse(false);
                            const selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    );
                    item.querySelector('section').addEventListener(
                        'blur',
                        () => {
                            item.querySelector('section').style.setProperty(
                                'text-overflow',
                                'ellipsis'
                            );
                            item.querySelector('section').style.setProperty(
                                'white-space',
                                'nowrap'
                            );
                        }
                    );
                }
                listName.forEach(function (item) {
                    item.addEventListener('dblclick', (e) => {
                        handlerDblClick(item);
                    });
                    handlerFocusAndBlur(item);
                });
                listDescription.forEach(function (item) {
                    item.addEventListener('dblclick', (e) => {
                        handlerDblClick(item);
                    });
                    handlerFocusAndBlur(item);
                });
                listVideoId.forEach(function (item) {
                    item.addEventListener('dblclick', (e) => {
                        handlerDblClick(item);
                    });
                    handlerFocusAndBlur(item);
                });
            };
            $scope.clickChiTiet = (id) => {
                $scope.ShowListLesson();
                $scope.LoadLessons(
                    {
                        name: '',
                        page_Index: 0,
                        page_Size: 0,
                    },
                    id,
                    (response) => {
                        $('#lesson-courseId').value = id;
                        $timeout(() => {
                            checkInputLesson();
                            bdClickUpdate();
                        });
                    }
                );
            };
            $scope.ChangeSearchCourse = () => {
                if (!$scope.search_course) {
                    var data = {
                        name: $scope.search_course,
                        page_Index: 1,
                        page_Size: 5,
                    };
                    $scope.LoadCourses(data, $scope.callbackLoadCourse);
                }
            };
            $scope.clickSearchCourse = () => {
                var data = {
                    name: $scope.search_course,
                    page_Index: 1,
                    page_Size: 5,
                };
                if ($scope.search_course) {
                    $scope.LoadCourses(data, $scope.callbackLoadCourse);
                }
            };
            $scope.clickDeleteCourse = (data) => {
                $scope.DeleteCourses(data, function () {
                    $scope.LoadCourses(
                        {
                            name: '',
                            page_Index: 1,
                            page_Size: 5,
                        },
                        $scope.callbackLoadCourse
                    );
                });
            };
            $scope.clickShowCourse = (data) => {
                $scope.GetByIdCourse(data, (response) => {
                    console.log(response);
                    $scope.isShowBtnCourse = false;
                    $('#courseId').value = data;
                    $('#CreateAtCourse').value = response.data.data.createdAt;
                    $scope.nameCourse = response.data.data.name;
                    $scope.DescriptionCourse = response.data.data.description;
                    $scope.ImgCourse = response.data.data.image;
                    $scope.PriceCourse = response.data.data.price;
                    $('#categoryId').value = response.data.data.categoryId;
                    console.log($('#CreateAtCourse').value);
                });
            };
            $scope.clickHuyUpdateCourse = () => {
                $scope.isShowBtnCourse = true;
                $('#courseId').value = null;
                $scope.nameCourse = null;
                $scope.DescriptionCourse = null;
                $scope.PriceCourse = null;
                $scope.ImgCourse =
                    'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fhinh-anh-bi-loi.jpeg?alt=media&token=75dd289b-7958-4f91-bc08-9bde26456180';
                $('#categoryId').value = 0;
            };
            $scope.clickUpdateCourse = async () => {
                try {
                    var urlImg = null;
                    if (!$('#categoryId').value) {
                        return console.log('loi category');
                    }
                    if (!$scope.nameCourse) {
                        return console.log('loi name');
                    }
                    if (!$scope.DescriptionCourse) {
                        $scope.DescriptionCourse = '';
                    }
                    if (!$scope.PriceCourse) {
                        $scope.PriceCourse = 0;
                    }
                    if ($('#getFile').files[0] != undefined) {
                        await eventFireBase.UploadFile(
                            $('#getFile').files[0].name,
                            $('#getFile').files[0]
                        );
                        urlImg = await eventFireBase.getpathfile(
                            $('#getFile').files[0].name
                        );
                        $scope.ImgCourse = urlImg;
                    }
                    var data = {
                        courseId: $('#courseId').value,
                        name: $scope.nameCourse,
                        description: $scope.DescriptionCourse,
                        image: $scope.ImgCourse,
                        price: $scope.PriceCourse,
                        createdAt: $('#CreateAtCourse').value,
                        categoryId: $('#categoryId').value,
                    };
                    console.log(data);

                    var responseUpdate = await $scope.UpdateCourses(data);
                    // Xử lý responseCreate nếu cần
                    $scope.LoadCourses(
                        {
                            name: '',
                            page_Index: 1,
                            page_Size: 5,
                        },
                        $scope.callbackLoadCourse
                    );

                    $scope.nameCourse = null;
                    $scope.DescriptionCourse = null;
                    $scope.PriceCourse = null;
                    $('#categoryId').value = 0;
                    $('#CreateAtCourse').value = null;
                    $scope.ImgCourse =
                        'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fhinh-anh-bi-loi.jpeg?alt=media&token=75dd289b-7958-4f91-bc08-9bde26456180';
                    $scope.isShowBtnCourse = true;
                } catch (error) {
                    console.error('Error in UpdateCourse: ', error);
                }
            };
            $scope.clickSearchLesson = () => {
                var data = {
                    name: $scope.search_lesson,
                    page_Index: 0,
                    page_Size: 0,
                };
                if ($scope.search_lesson) {
                    $scope.LoadLessons(data, $('#lesson-courseId').value);
                }
            };
            $scope.ChangeSearchLesson = () => {
                console.log($scope.search_lesson);
                if (!$scope.search_lesson) {
                    var data = {
                        name: '',
                        page_Index: 0,
                        page_Size: 0,
                    };
                    $scope.LoadLessons(data, $('#lesson-courseId').value);
                }
            };
            $scope.clickDeleteLesson = (data) => {
                $scope.DeleteLesson(data, function () {
                    $scope.LoadLessons(
                        {
                            name: '',
                            page_Index: 0,
                            page_Size: 0,
                        },
                        $('#lesson-courseId').value
                    );
                });
            };
            $scope.clickDeleteAllLessons = () => {
                var datas = [];
                $$('.lesson-item').forEach(function (item) {
                    let ElInput = item.querySelector('.form-check-input');
                    if (ElInput.checked) {
                        var data = {
                            lessonId: ElInput.value,
                            name: '',
                            description: '',
                            videoId: '',
                            image: '',
                            views: 0,
                            likes: 0,
                            createdAt: null,
                            courseId: 0,
                        };
                        datas.push(data);
                    }
                });
                $scope.InsUpdDelLessons(datas, 'Delete', function () {
                    $scope.LoadLessons(
                        {
                            name: '',
                            page_Index: 0,
                            page_Size: 0,
                        },
                        $('#lesson-courseId').value
                        // ,
                        // function () {
                        //     $timeout(() => {
                        //         checkInputLesson();
                        //     });
                        // }
                    );
                });
                $scope.isShowBtnDelAllLesson = false;
            };
            $scope.clickInsertLessonItem = function () {
                const getDate = new Date();
                $scope.arryInsItemLesson.push({
                    data: `${getDate.getFullYear()}-${getDate.getMonth()}-${getDate.getDay()}`,
                });
            };
            $scope.clickDeleteLessonItem = function (data) {
                $scope.arryInsItemLesson.splice(data, 1);
            };
            $scope.clickLuuListLesson = function () {
                let Upddatas = [];
                let Insdatas = [];
                $$('.lesson-item.real').forEach((item) => {
                    if (item.dataset.update == 'true') {
                        var data = {
                            lessonId: item.querySelector(
                                'input[name="lessonId"]'
                            ).value,
                            name: item.querySelector(
                                'section[name="nameLesson"]'
                            ).innerText,
                            description: item.querySelector(
                                'section[name="description"]'
                            ).innerText,
                            videoId: item.querySelector(
                                'section[name="videoId"]'
                            ).innerText,
                            image: '',
                            views: 0,
                            likes: 0,
                            createdAt: null,
                            courseId: $('#lesson-courseId').value,
                        };
                        Upddatas.push(data);
                    }
                });
                if (Upddatas.length !== 0) {
                    $scope.InsUpdDelLessons(Upddatas, 'Update', function () {
                        $scope.LoadLessons(
                            {
                                name: '',
                                page_Index: 0,
                                page_Size: 0,
                            },
                            $('#lesson-courseId').value
                        );
                    });
                }

                $$('.lesson-item.clone').forEach((item) => {
                    var data = {
                        lessonId: 0,
                        name: item.querySelector('input[name="nameLesson"]')
                            .value,
                        description: item.querySelector(
                            'input[name="description"]'
                        ).value,
                        videoId: item.querySelector('input[name="videoId"]')
                            .value,
                        image: '',
                        views: 0,
                        likes: 0,
                        createdAt: null,
                        courseId: $('#lesson-courseId').value,
                    };
                    Insdatas.push(data);
                });
                if (Insdatas.length !== 0) {
                    $scope.InsUpdDelLessons(Insdatas, 'Insert', function () {
                        $scope.LoadLessons(
                            {
                                name: '',
                                page_Index: 0,
                                page_Size: 0,
                            },
                            $('#lesson-courseId').value
                        );
                    });
                }
                $scope.arryInsItemLesson = [];
            };
        }
    );
