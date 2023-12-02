app.controller(
    'MainController',
    function ($scope, $http, $timeout, $rootScope) {
        $rootScope.AvataruserRoot = localStorage.getItem('avatar');
        $rootScope.NameUserRoot = localStorage.getItem('name');
        $scope.listParticipations;
        $scope.listSearch;
        $scope.isShowSideBar = true;
        $scope.isShowSearch = false;
        $scope.LoadSearch = function (data) {
            $http({
                method: 'GET',
                url: `https://localhost:44395/api/User/Search/search-course-lesson-blog?search=${data}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                $scope.listSearch = response.data.data;
                console.log($scope.listSearch);
            });
        };
        $scope.LoadParticipations = function () {
            $http({
                method: 'GET',
                url:
                    current_url +
                    '/User/User/get-all-CourseParticipations-by-id/' +
                    localStorage.getItem('userID'),
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(function (response) {
                $scope.listParticipations = response.data.data;
            });
        };
        $scope.name = localStorage.getItem('name');
        $scope.avatar = localStorage.getItem('avatar');
        $timeout(function () {
            $('.NarBar--action_myLearn').addEventListener(
                'click',
                function (e) {
                    $('.NarBar-list_courses').classList.toggle(
                        'active_mycourse'
                    );
                    $('.My-everythings').classList.remove(
                        'active_myEverthings'
                    );
                }
            );
            //st: My everythings
            $('.NavBar--actions_Avarta').addEventListener(
                'click',
                function (e) {
                    $('.My-everythings').classList.toggle(
                        'active_myEverthings'
                    );
                    $('.NarBar-list_courses').classList.remove(
                        'active_mycourse'
                    );
                }
            );
            $$('.UserMenu-list a').forEach((e) => {
                e.addEventListener('click', () => {
                    $('.My-everythings').classList.toggle(
                        'active_myEverthings'
                    );
                });
            });
            // st: hiệu ứng của thành search trên heading
            $scope.handleFocus = function () {
                if ($('.NavBar--search_input').value != '') {
                    $scope.isShowSearch = true;
                    $scope.LoadSearch($('.NavBar--search_input').value);
                }
                $('.NavBar--seach').style.border = '2px solid #333';
            };
            $scope.handleBlur = function () {
                $scope.isShowSearch = false;
                $('.NavBar--seach').style.border = '2px solid #e8e8e8';
            };
            $('.Body_seach').addEventListener('mousedown', function (e) {
                e.preventDefault();
            });
            //////////////////////////////// end //////////////////////////////////

            //st: hiện blog
            let SideBar__blogIconEl = $('.SideBar--blogIcon');

            SideBar__blogIconEl.addEventListener('click', function (e) {
                $('.SideBar--blogIcon > i').setAttribute(
                    'style',
                    'transform: rotate(45deg);font-size: 20px;'
                );
                e.stopPropagation();
            });

            window.addEventListener('click', function (e) {
                $('.SideBar--blogIcon > i').removeAttribute('style');
            });

            $$('.SideBar--list li').forEach((e) => {
                e.addEventListener('click', function () {
                    $$('.SideBar--list li a').forEach(function (btn) {
                        btn.classList.remove('activate');
                    });
                    this.querySelector('a').classList.add('activate');
                    window.scrollTo(0, 0);
                });
            });
            $scope.searchTerm = '';
            $scope.onChangeSearch = function () {
                $scope.isShowSearch = true;
                if ($('.NavBar--search_input').value == '') {
                    $scope.isShowSearch = false;
                } else {
                    $scope.LoadSearch($('.NavBar--search_input').value);
                }
            };
        }, 100);
    }
);
