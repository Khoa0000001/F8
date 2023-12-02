angular
    .module('myAppAdmin')
    .controller(
        'participationAdminController',
        function ($scope, $http, $rootScope, $timeout) {
            let ListUpdateDf;
            let ListUpdate = [];
            function addToDataArray(itemToAdd, list) {
                const existingIndex = list.findIndex(
                    (item) => item.categoryId === itemToAdd.categoryId
                );
                if (existingIndex !== -1) {
                    // Nếu categoryId đã tồn tại, ghi đè lên
                    list[existingIndex] = itemToAdd;
                } else {
                    // Nếu categoryId chưa tồn tại, thêm vào mảng
                    list.push(itemToAdd);
                }
            }
            function addLoadToDataArray(itemToAddArray, list) {
                itemToAddArray.forEach((itemToAdd) => {
                    const existingIndex = list.findIndex(
                        (item) => item.categoryId === itemToAdd.categoryId
                    );
                    if (existingIndex !== -1) {
                        // Nếu categoryId đã tồn tại, ghi đè lên
                        list[existingIndex] = itemToAdd;
                    }
                });
            }
            function findChangedObjects(array1, array2) {
                const changedObjects = [];

                array1.forEach((obj1) => {
                    const obj2 = array2.find(
                        (o) => o.categoryId === obj1.categoryId
                    );
                    if (
                        obj2 &&
                        (obj1.name != obj2.name ||
                            obj1.description != obj2.description)
                    ) {
                        if (obj1.name != obj2.name) {
                            changedObjects.push({
                                categoryId: obj1.categoryId,
                                changes: {
                                    name: obj2.name,
                                    description: null,
                                },
                            });
                        }
                        if (obj1.description != obj2.description) {
                            changedObjects.push({
                                categoryId: obj1.categoryId,
                                changes: {
                                    name: null,
                                    description: obj2.description,
                                },
                            });
                        }
                    }
                });

                return changedObjects;
            }
            function viewsUpdate(array) {
                array.forEach((x) => {
                    let item = $(`#category-item-${x.categoryId}`);
                    console.log(item);
                    if (x.changes.name) {
                        let seletion = item.querySelector(
                            'td[name="nameCategory"]'
                        );
                        seletion.style.color = '#f05123';
                    }
                    if (x.changes.description) {
                        let seletion = item.querySelector(
                            'td[name="description"]'
                        );
                        seletion.style.color = '#f05123';
                    }
                });
            }
            let changeUpdateCategoryItem = function () {
                $$('.category-item.real').forEach((item) => {
                    function changeCategoryItem(x) {
                        x.addEventListener('blur', () => {
                            var data = {
                                categoryId: parseInt(
                                    item.querySelector(
                                        'input[name="categoryId"]'
                                    ).value
                                ),
                                name: item.querySelector(
                                    'section[name="nameCategory"]'
                                ).innerText,
                                description: item.querySelector(
                                    'section[name="description"]'
                                ).innerText,
                                createdAt: item.querySelector(
                                    'td[name="createdAt"]'
                                ).innerText,
                                status: item.querySelector(
                                    'input[name="categoryId"]'
                                ).checked,
                            };
                            console.log(data);
                            addToDataArray(data, ListUpdate);
                            console.log('ListUpdate', ListUpdate);
                        });
                    }
                    changeCategoryItem(
                        item.querySelector('section[name="nameCategory"]')
                    );
                    changeCategoryItem(
                        item.querySelector('section[name="description"]')
                    );
                });
            };
            changeUpdateCategoryItem();
            let bdClickUpdate = function () {
                let listName = $$('.category-item td[name="nameCategory"]');
                let listDescription = $$(
                    '.category-item td[name="description"]'
                );
                // function handlerDblClick(item) {
                //     let sectionElement = item.querySelector('section');
                //     sectionElement.style.color = '#f05123';
                //     sectionElement.setAttribute('contenteditable', 'true');
                //     sectionElement.focus();
                // }
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
                            item.querySelector('section').style.color =
                                '#f05123';
                            // const range = document.createRange();
                            // range.selectNodeContents(
                            //     item.querySelector('section')
                            // );
                            // range.collapse(false);
                            // const selection = window.getSelection();
                            // selection.removeAllRanges();
                            // selection.addRange(range);
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
                    // item.addEventListener('dblclick', (e) => {
                    //     console.log('bdClickUpdate-name');
                    //     handlerDblClick(item);
                    // });
                    handlerFocusAndBlur(item);
                });
                listDescription.forEach(function (item) {
                    // item.addEventListener('dblclick', (e) => {
                    //     console.log('bdClickUpdate-des');

                    //     handlerDblClick(item);
                    // });
                    handlerFocusAndBlur(item);
                });
            };
            $scope.search_category;
            $scope.arryInsItemCategory = [];
            $scope.InsUpdDelCategory = function (
                data,
                status,
                callback = () => {}
            ) {
                $http({
                    method: 'post',
                    url:
                        current_url +
                        '/Admin/Category/Ins-Upd-Del_list_Category/' +
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
            $scope.LoadCategorys = function (data, callback = () => {}) {
                $http({
                    method: 'Post',
                    url: current_url + '/Admin/Category/search-category',
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    $scope.listCategory = response.data;
                    console.log('Load: ', $scope.listCategory);
                    $timeout(() => {
                        let datas = response.data.data;
                        datas = datas.map((data) => {
                            return { ...data, status: false };
                        });
                        ListUpdateDf = response.data.data.map((data) => {
                            return { ...data, status: false };
                        });
                        console.log('ListUpdate', ListUpdate);
                        console.log('ListUpdateDf', ListUpdateDf);
                        addLoadToDataArray(ListUpdate, datas);
                        $scope.listCategory = { ...response.data, data: datas };
                        console.log(
                            '$scope.listCategory.data',
                            $scope.listCategory.data
                        );
                        $timeout(() => {
                            viewsUpdate(
                                findChangedObjects(ListUpdate, ListUpdateDf)
                            );
                            $timeout(() => {
                                bdClickUpdate();
                                changeUpdateCategoryItem();
                            });
                        });
                    });
                    callback(response);
                });
            };
            $scope.DeleteCategory = function (data, callback = () => {}) {
                $http({
                    method: 'DELETE',
                    url:
                        current_url + '/Admin/Category/delete-category/' + data,
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
            $scope.callbackLoadCategory = (response) => {
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
            $scope.LoadCategorys(
                {
                    name: '',
                    page_Index: 1,
                    page_Size: 5,
                },
                $scope.callbackLoadCategory
            );
            $scope.clickDeleteCategory = function (data) {
                $scope.DeleteCategory(data, function () {
                    $scope.LoadCategorys(
                        {
                            name: '',
                            page_Index: 1,
                            page_Size: 5,
                        },
                        $scope.callbackLoadCategory
                    );
                });
            };
            $scope.ChangeSearchCategory = () => {
                if (!$scope.search_category) {
                    var data = {
                        name: $scope.search_category,
                        page_Index: 1,
                        page_Size: 5,
                    };
                    $scope.LoadCategorys(data, $scope.callbackLoadCategory);
                }
            };
            $scope.clickSearchCategory = () => {
                var data = {
                    name: $scope.search_category,
                    page_Index: 1,
                    page_Size: 5,
                };
                if ($scope.search_category) {
                    $scope.LoadCategorys(data, $scope.callbackLoadCategory);
                }
            };
            $scope.clickInsertCategoryItem = function () {
                const getDate = new Date();
                $scope.arryInsItemCategory.push({
                    data: `${getDate.getFullYear()}-${getDate.getMonth()}-${getDate.getDay()}`,
                });
            };
            $scope.clickDeleteCategoryItem = function (data) {
                $scope.arryInsItemCategory.splice(data, 1);
            };
            $scope.clickLuuListCategory = function () {
                let Insdatas = [];
                if (ListUpdate.length !== 0) {
                    $scope.InsUpdDelCategory(ListUpdate, 'Update', function () {
                        $scope.LoadCategorys(
                            {
                                name: '',
                                page_Index: 1,
                                page_Size: 5,
                            },
                            $scope.callbackLoadCategory
                        );
                    });
                }

                $$('.category-item.clone').forEach((item) => {
                    var data = {
                        categoryId: 0,
                        name: item.querySelector('input[name="nameCategory"]')
                            .value,
                        description: item.querySelector(
                            'input[name="description"]'
                        ).value,
                        createdAt: null,
                    };
                    Insdatas.push(data);
                });
                if (Insdatas.length !== 0) {
                    $scope.InsUpdDelCategory(Insdatas, 'Insert', function () {
                        $scope.LoadCategorys(
                            {
                                name: '',
                                page_Index: 1,
                                page_Size: 5,
                            },
                            $scope.callbackLoadCategory
                        );
                    });
                }
                $scope.arryInsItemCategory = [];
            };
        }
    );
