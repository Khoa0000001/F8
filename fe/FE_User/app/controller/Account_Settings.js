import eventFireBase from '../../assets/js/eventFireBase.js';
angular
    .module('myApp')
    .controller('SettingController', function ($scope, $http, $rootScope) {
        var ischeckfile = false;
        $rootScope.NameUserRoot;
        $scope.EmailUser;
        $scope.PhoneNumber;
        $rootScope.AvataruserRoot;
        var setScope = function () {
            $rootScope.NameUserRoot = localStorage.getItem('name');
            $scope.EmailUser = localStorage.getItem('email');
            $scope.PhoneNumber = localStorage.getItem('phoneNumber');
            $rootScope.AvataruserRoot = localStorage.getItem('avatar');
        };
        setScope();

        $scope.UpdateUser = function (data) {
            $http({
                method: 'Post',
                url: `https://localhost:44395/api/User/User/update-user`,
                data: JSON.stringify(data),
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .then(function (response) {
                    $scope.LoadUser();
                });
        };
        $scope.LoadUser = function () {
            $http({
                method: 'Get',
                url: `https://localhost:44395/api/User/User/get-user-id/${localStorage.getItem(
                    'userID'
                )}`,
            })
                .then(function (response) {
                    console.log(response.data);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('avatar', response.data.data.avatar);
                    localStorage.setItem(
                        'phoneNumber',
                        response.data.data.phoneNumber
                    );
                    localStorage.setItem('email', response.data.data.email);
                    // setScope();
                })
                .then(function (response) {
                    setScope();
                });
        };

        $$('.SideBar--list li a').forEach(function (btn) {
            btn.classList.remove('activate');
        });

        let btnChanges = function (change, saveOfcancel, save, cancel, input) {
            var OldValue;
            change.addEventListener('click', function () {
                this.setAttribute('style', 'display:none');
                saveOfcancel.setAttribute('style', 'display:block');
                if (input) {
                    input.disabled = false;
                    OldValue = input.value;
                }
            });
            cancel.addEventListener('click', function () {
                saveOfcancel.setAttribute('style', 'display:none');
                change.setAttribute('style', 'display:block');
                if (input) {
                    input.disabled = true;
                    input.value = OldValue;
                }
            });
        };
        btnChanges(
            $('#Setting-name .Setting_item-btnChange'),
            $('#Setting-name .Setting_item-btn'),
            $('#Setting-name .Setting_item-btnLuu'),
            $('#Setting-name .Setting_item-btnHuy'),
            $('#Setting-name input[name="full_name')
        );
        btnChanges(
            $('#Setting-avatar .Setting_item-btnChange'),
            $('#Setting-avatar .Setting_item-btn'),
            $('#Setting-avatar .Setting_item-btnLuu'),
            $('#Setting-avatar .Setting_item-btnHuy')
        );
        btnChanges(
            $('#Setting-email .Setting_item-btnChange'),
            $('#Setting-email .Setting_item-btn'),
            $('#Setting-email .Setting_item-btnLuu'),
            $('#Setting-email .Setting_item-btnHuy'),
            $('#Setting-email input[name="full_name')
        );
        btnChanges(
            $('#Setting-sdt .Setting_item-btnChange'),
            $('#Setting-sdt .Setting_item-btn'),
            $('#Setting-sdt .Setting_item-btnLuu'),
            $('#Setting-sdt .Setting_item-btnHuy'),
            $('#Setting-sdt input[name="full_name')
        );
        var imgOldImageUrl;
        $('#Setting-avatar #getFile').addEventListener(
            'change',

            function (event) {
                imgOldImageUrl = $('.Setting_Img-avatar img').src;
                // Lấy thẻ <img> theo ID
                var imgElement = $('.Setting_Img-avatar img');
                console.log(this.files[0]);
                // Kiểm tra xem đã chọn file hình ảnh chưa
                if (event.target.files.length > 0) {
                    // Lấy đối tượng File từ input file
                    var newImageFile = event.target.files[0];

                    // Tạo đường dẫn cho đối tượng File
                    var newImageUrl = URL.createObjectURL(newImageFile);

                    // Thay đổi giá trị của thuộc tính src
                    imgElement.src = newImageUrl;
                    ischeckfile = true;
                }
            }
        );
        $('#Setting-avatar .Setting_item-btnHuy').addEventListener(
            'click',
            function (e) {
                var imgElement = $('.Setting_Img-avatar img');
                if (imgOldImageUrl) {
                    imgElement.src = imgOldImageUrl;
                    imgOldImageUrl = null;
                }
                ischeckfile = false;
            }
        );
        $('.Setting_btn-Luu').addEventListener('click', async function () {
            if (ischeckfile) {
                eventFireBase.UploadFile(
                    $('#Setting-avatar #getFile').files[0].name,
                    $('#Setting-avatar #getFile').files[0]
                );
                var urlImg = await eventFireBase.getpathfile(
                    $('#Setting-avatar #getFile').files[0].name
                );
                console.log(urlImg);

                var data = {
                    userId: localStorage.getItem('userID'),
                    name: $('#Setting-name input[name="full_name').value,
                    avatar: urlImg,
                    phoneNumber: $('#Setting-sdt input[name="full_name').value,
                    email: $('#Setting-email input[name="full_name').value,
                    vip: true,
                    list_json_Participations: [
                        {
                            participationId: 0,
                            courseId: 0,
                            userId: 0,
                            registrationDate: '2023-11-20T11:43:34.390Z',
                            list_json_Courses: [
                                {
                                    courseId: 0,
                                    name: 'string',
                                    description: 'string',
                                    image: 'string',
                                    price: 0,
                                    createdAt: '2023-11-20T11:43:34.390Z',
                                    categoryId: 0,
                                },
                            ],
                        },
                    ],
                };
                console.log('run if');
                $scope.UpdateUser(data);
                ischeckfile = false;
            } else {
                var data = {
                    userId: localStorage.getItem('userID'),
                    name: $('#Setting-name input[name="full_name').value,
                    avatar: localStorage.getItem('avatar'),
                    phoneNumber: $('#Setting-sdt input[name="full_name').value,
                    email: $('#Setting-email input[name="full_name').value,
                    vip: true,
                    list_json_Participations: [
                        {
                            participationId: 0,
                            courseId: 0,
                            userId: 0,
                            registrationDate: '2023-11-20T11:43:34.390Z',
                            list_json_Courses: [
                                {
                                    courseId: 0,
                                    name: 'string',
                                    description: 'string',
                                    image: 'string',
                                    price: 0,
                                    createdAt: '2023-11-20T11:43:34.390Z',
                                    categoryId: 0,
                                },
                            ],
                        },
                    ],
                };

                $scope.UpdateUser(data);
                console.log('run else');
            }
            $$('.Setting_item-btn').forEach((element) => {
                element.setAttribute('style', 'display:none');
            });
            $$('.Setting_item-btnChange').forEach((element) => {
                element.setAttribute('style', 'display:block');
            });
            $$('input[name="full_name').forEach((element) => {
                element.disabled = true;
            });
            imgOldImageUrl = null;
        });
    });
