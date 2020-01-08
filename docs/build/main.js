webpackJsonp([0],{

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarPage = (function () {
    function CalendarPage(navCtrl, navParams, fire, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.viewCtrl = viewCtrl;
        this.currentEvents = [];
        this.firebaseResponse = this.navParams.get('data');
        // getting value from booknew
        this.aud = this.navParams.get('aud');
        var arr = [];
        // default sample code for calendar module
        var statusrec = 0;
        // Flags for AN & FN
        var flagAN = '0';
        var flagFN = '0';
        var core = '0';
        var obj = Object.entries(this.firebaseResponse);
        for (var i = 0; i < obj.length; i++) {
            var date = String(obj[i][1]['date']);
            var splitedDate = date.split('/');
            if ((this.aud['audID'] == obj[i][1]['audId'])) {
                core = '1';
                if ((obj[i][1]['status'] == '1')) {
                    if (flagAN == '0') {
                        flagAN = obj[i][1]['AN'];
                    }
                    if (flagFN == '0') {
                        flagFN = obj[i][1]['FN'];
                    }
                    if (flagFN == '1' && flagAN == '1') {
                        statusrec = 1;
                        this.currentEvents.push({
                            year: Number(splitedDate[2]),
                            month: Number(splitedDate[1]) - 1,
                            date: Number(splitedDate[0])
                        });
                    }
                }
            }
            if (statusrec == 1) {
                break;
            }
        }
    }
    CalendarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalendarPage');
    };
    //calendar funtion
    CalendarPage.prototype.onDaySelect = function ($event) {
        // console.log($event);
        var data = $event;
        this.viewCtrl.dismiss(data);
    };
    CalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calendar',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/calendar/calendar.html"*/'<!--\n  Generated template for the CalendarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n  <ion-calendar  class="calendar" #calendar lang="en" [events]="currentEvents" (onDaySelect)="onDaySelect($event)"  ></ion-calendar>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/calendar/calendar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], CalendarPage);
    return CalendarPage;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ReservedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReservedPage = (function () {
    function ReservedPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // get auditorium details
        this.auditorium = this.navParams.get('aud');
        // get date from the source page
        var rawDate = this.navParams.get('getData');
        var day = rawDate.date;
        var month = Number(rawDate.month) + 1;
        var year = rawDate.year;
        var date = String(day + '/' + month + '/' + year);
        // get the collection of requests from source page
        var requests = this.navParams.get('data');
        // request array
        var obj = Object.entries(requests);
        // empty the request array if any
        this.requests = [];
        obj.forEach(function (element) {
            if (element[1]['date'] == date && element[1]['status'] == '1') {
                _this.requests.push(element[1]);
                console.log(element[1]);
            }
        });
    }
    ReservedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservedPage');
    };
    ReservedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reserved',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/reserved/reserved.html"*/'<!--\n  Generated template for the ReservedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n  <ion-navbar>\n\n    <ion-title class="toolbar-title.toolbar-title-md"><b>Reserved</b></ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="one">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <!--aud image -->\n        <ion-col>\n          <ion-avatar class="image imgPicDisplay ">\n            <!--image-->\n          </ion-avatar>\n        </ion-col>\n\n        <!--aud image details -->\n        <ion-col col-6>\n          <ion-row class="leftDistance name-distance"><b>{{ auditorium.name }}</b> </ion-row>\n          <ion-row class="leftDistance dept-distance ">{{ auditorium.dept }}</ion-row>\n        </ion-col>\n\n        <!--green round details  -->\n        <ion-col col-2>\n          <ion-avatar class="avail-display">\n          </ion-avatar>\n        </ion-col>\n\n      </ion-row>\n\n      <div *ngFor="let request of requests">\n        <h3 *ngIf="request.AN == 1 && request.FN == 0">Reserved for AN</h3>\n        <h3 *ngIf="request.AN == 0 && request.FN == 1">Reserved for FN</h3>\n        <h3 *ngIf="request.AN == 1 && request.FN == 1">Reserved for AN & FN</h3>\n        <ion-row class="detail-row">\n          <ion-col col-12 class="detail-col">\n            <b>Department</b>\n          </ion-col>\n\n          <ion-col col-12 class="detail-col">\n            {{ request.dept }}\n          </ion-col>\n        </ion-row>\n\n        <ion-row class="detail-row">\n          <ion-col col-12 class="detail-col">\n            <b>Date</b>\n          </ion-col>\n\n          <ion-col col-12 class="detail-col">\n            {{ request.date }}\n          </ion-col>\n        </ion-row>\n\n        <ion-row class="detail-row">\n          <ion-col col-12 class="detail-col">\n            <b>Phone Number</b>\n          </ion-col>\n\n          <ion-col col-12 class="detail-col">\n            {{ request.phone }}\n          </ion-col>\n        </ion-row>\n\n        <ion-row class="detail-row">\n          <ion-col col-12 class="detail-col">\n            <b>Purpose</b>\n          </ion-col>\n\n          <ion-col col-12 class="detail-col">\n            {{ request.purpose }}\n          </ion-col>\n        </ion-row>\n\n      </div>\n\n    </ion-grid>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/reserved/reserved.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ReservedPage);
    return ReservedPage;
}());

//# sourceMappingURL=reserved.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WarningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the WarningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WarningPage = (function () {
    function WarningPage(navCtrl, navParams, fire, toastCtrl, loadingCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        // Status page
        this.status = {};
        // Data from status page
        this.status = this.navParams.get('status');
        // Data from Request Page
        this.requests = this.navParams.get('requests');
        // From flag
        this.from = this.navParams.get('from');
        // Data from req page
        this.data = this.navParams.get('data');
    }
    WarningPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WarningPage');
    };
    WarningPage.prototype.cancel = function () {
        if (this.from == 1) {
            // Dismiss the popover
            this.viewCtrl.dismiss();
        }
        else if (this.from == 2) {
            // Dismiss the popover
            this.viewCtrl.dismiss(this.data);
        }
    };
    WarningPage.prototype.selected = function () {
        var _this = this;
        // Initialising toast and loading instance
        var toast = this.toastCtrl.create({
            duration: 2000,
            position: 'bottom'
        });
        var loading = this.loadingCtrl.create({
            content: 'Please wait'
        });
        if (this.from == 1) {
            // Presenting loading controller
            loading.present();
            // Remove the data
            this.fire.removeField('requests', this.status.reqId)
                .then(function (response) {
                // Dismissing the loading controller
                loading.dismiss();
                // Display the toast
                toast.setMessage("Deleted successfully...!");
                toast.present();
                // Dismiss the popover
                _this.viewCtrl.dismiss();
            })
                .catch(function (error) {
                // Dismissing the loading controller
                loading.dismiss();
                // Display the toast
                toast.setMessage("Something is wrong. Please try again later...!");
                toast.present();
                // Dismiss the popover
                _this.viewCtrl.dismiss();
            });
        }
        else if (this.from == 2) {
            // Present loading
            loading.present();
            // Data to update
            var path = 'requests/' + this.requests.reqId + '/status';
            var data = (_a = {},
                _a[path] = 3,
                _a);
            this.fire.updateField(data)
                .then(function (response) {
                // dismiss the loading
                loading.dismiss();
                // show toast message
                toast.setMessage("Request was successfully rejected.");
                toast.present();
                // Dismiss the popover
                _this.viewCtrl.dismiss();
            })
                .catch(function (error) {
                // dismiss the loading
                loading.dismiss();
                // show toast message
                toast.setMessage("Some error has occured. Please try again");
                toast.present();
                // Dismiss the popover
                _this.viewCtrl.dismiss();
            });
        }
        var _a;
    };
    WarningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-warning',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/warning/warning.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <ion-title class="toolbar-title.toolbar-title-md"><b>Warning</b></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-3 class="gap1">\n        <ion-icon name="custom-alert"></ion-icon>\n      </ion-col>\n      <ion-col class="c1" col-9>Are you sure you want to delete the order?</ion-col>\n    </ion-row>\n\n  </ion-grid>\n</ion-content>\n<ion-footer no-border class="l1">\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 class="c2 c3" (click)="cancel()">\n        <ion-label outline><b class="l">Cancel</b></ion-label>\n      </ion-col>\n      <ion-col class="c2" (click)="selected()">\n        <ion-label><b class="l2">Yes</b></ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/warning/warning.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], WarningPage);
    return WarningPage;
}());

//# sourceMappingURL=warning.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseServices = (function () {
    function FirebaseServices(fbAuth, fbDatabase) {
        this.fbAuth = fbAuth;
        this.fbDatabase = fbDatabase;
        // integer values for three sorting types
        this.orderByChild = 1;
        this.orderByKey = 2;
        this.orderByValue = 3;
        // integer values for five filtering methods
        this.limitToFirst = 1;
        this.limitToLast = 2;
        this.startAt = 3;
        this.endAt = 4;
        this.equalTo = 5;
    }
    // get the nodes under the parent as json object
    FirebaseServices.prototype.readOnce = function (parent) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent)
                .once("value")
                .then(function (snapshot) {
                resolve(snapshot.val());
            })
                .catch(function (error) {
                reject('Something is wrong');
            });
        });
    };
    // write data to database
    FirebaseServices.prototype.writeInDatabase = function (parent, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent)
                .set(data)
                .then(function (message) {
                resolve("Data written successfully");
            })
                .catch(function (error) {
                reject("Data written failed");
            });
        });
    };
    // update a field or append a child to the parent
    FirebaseServices.prototype.updateField = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref()
                .update(data)
                .then(function () {
                resolve("Field updated successfully");
            })
                .catch(function (error) {
                reject("Field updation failed");
            });
        });
    };
    // remove a field
    FirebaseServices.prototype.removeField = function (parent, child) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent).child(child)
                .remove()
                .then(function () {
                resolve("Field removed successfully");
            })
                .catch(function () {
                reject("Field removal failed");
            });
        });
    };
    // orderBy Method
    FirebaseServices.prototype.orderData = function (method, parent, child) {
        var _this = this;
        if (child === void 0) { child = null; }
        return new Promise(function (resolve, reject) {
            if (method == _this.orderByChild) {
                _this.fbDatabase.database.ref(parent)
                    .orderByChild(child)
                    .once("value")
                    .then(function (snapshop) {
                    resolve(snapshop);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.orderByKey) {
                _this.fbDatabase.database.ref(parent)
                    .orderByKey()
                    .once("value")
                    .then(function (snapshop) {
                    resolve(snapshop);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.orderByValue) {
                _this.fbDatabase.database.ref(parent)
                    .orderByValue()
                    .once("value")
                    .then(function (snapshop) {
                    resolve(snapshop);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    // filter the data 
    FirebaseServices.prototype.filterData = function (method, parent, limit, orderByMethod, orderByChild, equalToString) {
        var _this = this;
        if (limit === void 0) { limit = null; }
        if (orderByMethod === void 0) { orderByMethod = null; }
        if (orderByChild === void 0) { orderByChild = null; }
        if (equalToString === void 0) { equalToString = null; }
        return new Promise(function (resolve, reject) {
            if (method == _this.limitToFirst) {
                _this.fbDatabase.database.ref(parent)
                    .limitToFirst(limit)
                    .once("value")
                    .then(function (snapshot) {
                    resolve(snapshot.val());
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.limitToLast) {
                _this.fbDatabase.database.ref(parent)
                    .limitToLast(limit)
                    .once("value")
                    .then(function (snapshot) {
                    resolve(snapshot.val());
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.startAt) {
                if (orderByMethod == null) {
                    reject("orderBy Method missing");
                }
                else {
                    if (orderByMethod == _this.orderByChild) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByChild(orderByChild)
                            .startAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByKey) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByKey()
                            .startAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByValue) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByValue()
                            .startAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                }
            }
            else if (method == _this.endAt) {
                if (orderByMethod == null) {
                    reject("orderBy Method missing");
                }
                else {
                    if (orderByMethod == _this.orderByChild) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByChild(orderByChild)
                            .endAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByKey) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByKey()
                            .endAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByValue) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByValue()
                            .endAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                }
            }
            else if (method == _this.equalTo) {
                if (orderByMethod == null) {
                    reject("orderBy Method missing");
                }
                else {
                    if (orderByMethod == _this.orderByChild) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByChild(orderByChild)
                            .equalTo(equalToString)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByKey) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByKey()
                            .equalTo(equalToString)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByValue) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByValue()
                            .equalTo(equalToString)
                            .once("value")
                            .then(function (snapshot) {
                            resolve(snapshot);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                }
            }
        });
    };
    // login with email and password
    FirebaseServices.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbAuth.auth.signInWithEmailAndPassword(username, password)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // sign up with username and password
    FirebaseServices.prototype.signUp = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbAuth.auth.createUserWithEmailAndPassword(username, password)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    FirebaseServices = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], FirebaseServices);
    return FirebaseServices;
}());

//# sourceMappingURL=fireBaseService.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_calendar__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_detail__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_page_transitions__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reserved_reserved__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the BookNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookNewPage = (function () {
    function BookNewPage(fire, navCtrl, navParams, popoverCtrl, loading, toast, nativePageTransitions) {
        this.fire = fire;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.loading = loading;
        this.toast = toast;
        this.nativePageTransitions = nativePageTransitions;
        // Seat Count
        this.sCount = 0;
        // Initializing Loading Controller
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        });
        // Initializing Toast Controller
        this.toastCtrl = this.toast.create({
            duration: 3000
        });
        // Getting the Seat count from Status page
        this.sCount = this.navParams.get('sCount').count;
        this.sCount = Number(this.sCount);
        console.log(this.sCount);
        this.firebaseFunctions();
    }
    BookNewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookNewPage');
    };
    //passing data to calendar
    BookNewPage.prototype.calendar = function (aud) {
        var _this = this;
        this.fire.readOnce('requests')
            .then(function (response) {
            _this.blurClass = 'blur';
            var popover = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__calendar_calendar__["a" /* CalendarPage */], { aud: aud, data: response });
            popover.onDidDismiss(function (data) {
                _this.blurClass = false;
                if (data != undefined) {
                    // See if the date has events
                    if (data.hasEvent) {
                        // Native slide page transitions
                        var options = {
                            direction: 'left',
                            duration: 350,
                            slowdownfactor: -1,
                            iosdelay: 50
                        };
                        _this.nativePageTransitions.slide(options);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__reserved_reserved__["a" /* ReservedPage */], { getData: data, aud: aud, data: response });
                    }
                    else {
                        // Native slide page transitions
                        var options = {
                            direction: 'left',
                            duration: 350,
                            slowdownfactor: -1,
                            iosdelay: 50
                        };
                        _this.nativePageTransitions.slide(options);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__detail_detail__["a" /* DetailPage */], { getData: data, aud: aud, data: response });
                    }
                }
            });
            popover.present();
        });
    };
    //getting data from firebase
    BookNewPage.prototype.firebaseFunctions = function () {
        var _this = this;
        // Presenting loading controller
        this.loadingCtrl.present();
        this.fire.readOnce('auditorium')
            .then(function (response) {
            console.log("Read Once Called");
            var obj = Object.entries(response);
            //local array to store array of objects
            var arr = [];
            //loop through the received object
            for (var i = 0; i < obj.length; i++) {
                arr.push(obj[i][1]);
            }
            //assigning arr to global audinfo
            _this.audinfo = _this.seatSort(arr);
            // Dismissing the loading controller
            _this.loadingCtrl.dismiss();
        })
            .catch(function (error) {
            console.log(error);
            // Dismissing the loading controller
            _this.loadingCtrl.dismiss();
            // Display the toast
            _this.toastCtrl.setMessage("Something went wrong ...please try again");
            _this.toastCtrl.present();
        });
    };
    // Sort the array of objects according to the seat count
    BookNewPage.prototype.seatSort = function (displayArray) {
        // Sorting in Ascending order
        displayArray.sort(function (a, b) {
            return (a.sCount - b.sCount);
        });
        // Array to store the sorted list
        var sArr = [];
        // Length of the array
        var length = displayArray.length;
        // Index variable for sorting function
        var index = 0;
        // Flag for completion of a cycle
        var flag = 0;
        // Sort according the seat count
        for (var i = 0; i < length; i++) {
            // Check if this is a first cycle
            if (flag == 0) {
                // Check If the Auditorium seat count is less than the entered seat count
                if (this.sCount <= displayArray[i].sCount) {
                    sArr.push(displayArray[i]);
                }
                else {
                    index = i;
                }
                // If the 1st cycle is gonna end, set the length and reset the i variable 
                if (i == length - 1 && index != 0) {
                    length = index + 1;
                    i = -1;
                    flag = 1;
                }
            }
            else if (flag == 1) {
                sArr.push(displayArray[i]);
            }
        }
        console.log(sArr);
        return sArr;
    };
    BookNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-book-new',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/book-new/book-new.html"*/'<!--\n  Generated template for the BookNewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header no-border [ngClass]="blurClass">\n\n  <ion-navbar>\n\n    <ion-title class="toolbar-title.toolbar-title-md"><b>Book New</b></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding [ngClass]="blurClass">\n\n  <ion-grid>\n\n    <div class="div1">\n      <ion-row (click)="calendar(aud)" *ngFor="let aud of audinfo" class="margin-bottom">\n\n        <ion-col>\n          <ion-avatar class="img1 imgPicDisplay imgDistance">\n\n          </ion-avatar>\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-row class=" leftDistance distFromTop "><b>{{ aud.name }}</b></ion-row>\n\n          <ion-row class=" leftDistance textDistance ">{{ aud.dept }}</ion-row>\n\n          <ion-row class=" leftDistance textDistance ">\n\n            <ion-badge class="badge" item-end>{{ aud.sCount }}</ion-badge>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/book-new/book-new.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], BookNewPage);
    return BookNewPage;
}());

//# sourceMappingURL=book-new.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__status_status__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_page_transitions__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reserved_reserved__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailPage = (function () {
    function DetailPage(fire, formBuilder, popoverCtrl, alertCtrl, navCtrl, platform, navParams, loading, toast, afAuth, nativePageTransitions) {
        var _this = this;
        this.fire = fire;
        this.formBuilder = formBuilder;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.loading = loading;
        this.toast = toast;
        this.afAuth = afAuth;
        this.nativePageTransitions = nativePageTransitions;
        this.mobileNum = '';
        this.department = 'Mech';
        //getting fn and an values
        this.foren = 1;
        this.aftern = 1;
        // public event = {
        //   month: '1990-02-19',
        //   timeStarts: '07:43',
        //   timeEnds: '1990-02-20'
        // }
        // Button check status
        this.anStatus = 0;
        this.fnStatus = 0;
        this.credentialForm = this.formBuilder.group({
            text1: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(10)
                ])],
            purpose: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(8),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20)
                ])]
        });
        // Initializing Loading Controller
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        });
        // Initializing Toast Controller
        this.toastCtrl = this.toast.create({
            duration: 3000
        });
        this.fire.readOnce('users/' + this.afAuth.auth.currentUser.uid)
            .then(function (response) {
            _this.userId = response['userId'];
        })
            .catch(function (error) {
        });
        this.firebaseFunctions();
        // getting value from calendar page
        //for getting the date,month,time
        this.calenDateData = this.navParams.get('getData');
        //for seperating the values from the array of date, time , month 
        this.date = this.calenDateData.date;
        this.oldMonth = this.calenDateData.month;
        this.month = Number(this.oldMonth);
        this.month = this.month + 1;
        this.year = this.calenDateData.year;
        this.findata = String(this.date + '/' + this.month + '/' + this.year);
        console.log(this.findata);
        //getting aud values of aud from calendar page
        this.aud = navParams.get('aud');
        console.log(this.aud);
        // seperating the values needed from the array
        this.audname = this.aud.name;
        this.auddept = this.aud.dept;
        this.audid = String(this.aud.audID);
        console.log(this.audid);
        // for-after-noon border color back to normal when visiting page again 
        document.documentElement.style.setProperty("--button-clicked-an", '1px solid #000');
        document.documentElement.style.setProperty("--button-clicked-fn", '1px solid #000');
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage.prototype.dept = function () {
        var _this = this;
        // for dropdown -radio alert
        var alert = this.alertCtrl.create();
        alert.setTitle('Choose dept');
        alert.addInput({
            type: 'radio',
            label: 'Mech',
            value: 'Mech',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'IT',
            value: 'IT',
        });
        alert.addInput({
            type: 'radio',
            label: 'Biomed',
            value: 'Bio-med',
        });
        alert.addInput({
            type: 'radio',
            label: 'Civil',
            value: 'Civil',
        });
        alert.addInput({
            type: 'radio',
            label: 'CSE',
            value: 'CSE',
        });
        alert.addInput({
            type: 'radio',
            label: 'ECE',
            value: 'ECE',
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.department = data;
            }
        });
        alert.present();
    };
    // clicking book
    DetailPage.prototype.stat = function () {
        var _this = this;
        var phoneNumber = this.credentialForm.controls['text1'].value;
        var purpose = this.credentialForm.controls['purpose'].value;
        if ((this.anStatus == 1) || (this.fnStatus == 1) && (phoneNumber != '') && (purpose.trim() != '')) {
            // Req Id Generation
            var write = this.audname + phoneNumber.substring(3, 6) + 'wr' + this.foren + this.aftern;
            // Data to write
            var data = {
                'AN': this.anStatus,
                'FN': this.fnStatus,
                'audName': this.audname,
                'audId': this.audid,
                'date': this.findata,
                'dept': this.department,
                'phone': phoneNumber,
                'reqId': write,
                'userId': this.userId,
                'status': 0,
                'purpose': purpose
            };
            // Presenting loading controller
            this.loadingCtrl.present();
            // Write the request to database
            this.fire.writeInDatabase('requests/' + write, data)
                .then(function (response) {
                console.log(response);
                // Dismissing the loading controller
                _this.loadingCtrl.dismiss();
                //Display the toast
                _this.toastCtrl.setMessage("Yah...! Request successfully sent");
                _this.toastCtrl.present();
                _this.changeRequestCount();
            })
                .catch(function (error) {
                console.log(error);
                // Dismissing the loading controller
                _this.loadingCtrl.dismiss();
                // Display the toast
                _this.toastCtrl.setMessage("Something went wrong ....please try again");
                _this.toastCtrl.present();
            });
            // Native slide page transitions
            var options = {
                direction: 'left',
                duration: 350,
                slowdownfactor: -1,
                iosdelay: 50
            };
            this.nativePageTransitions.slide(options);
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__status_status__["a" /* StatusPage */]);
        }
        else {
            this.toastCtrl.setMessage("Enter all the fields correctly..");
            this.toastCtrl.present();
        }
    };
    // AN button trigger
    DetailPage.prototype.mycolorAn = function () {
        // Check the Initial state
        if (this.anStatus == 0) {
            // If checked, change it to 1 and set the border color as Green
            document.documentElement.style.setProperty("--button-clicked-an", '2px solid #35AE59');
            this.anStatus = 1;
            // this.anpassStatus=this.anStatus;
        }
        else {
            // If Unchecked, Change it to 0 and set the border as normal
            document.documentElement.style.setProperty("--button-clicked-an", '1px solid #000');
            this.anStatus = 0;
        }
    };
    // Fn button trigger
    DetailPage.prototype.mycolorFn = function () {
        // Check the Initial state
        if (this.fnStatus == 0) {
            // If checked, change it to 1 and set the border color as Green
            document.documentElement.style.setProperty("--button-clicked-fn", '2px solid  #35AE59');
            this.fnStatus = 1;
        }
        else {
            // If Unchecked, Change it to 0 and set the border as normal
            document.documentElement.style.setProperty("--button-clicked-fn", '1px solid #000');
            this.fnStatus = 0;
        }
    };
    DetailPage.prototype.firebaseFunctions = function () {
        var _this = this;
        this.fire.readOnce('requests')
            .then(function (response) {
            // Flags for AN & FN
            var flagAN = '0';
            var flagFN = '0';
            var core = '0';
            console.log("Read Once Called");
            var obj = Object.entries(response);
            for (var i = 0; i < obj.length; i++) {
                if ((_this.audid == obj[i][1].audId) && (_this.findata == obj[i][1].date)) {
                    core = '1';
                    if ((obj[i][1]['status'] == '1')) {
                        if (flagAN == '0') {
                            flagAN = obj[i][1].AN;
                        }
                        if (flagFN == '0') {
                            flagFN = obj[i][1].FN;
                        }
                        if (flagFN == '1' && flagAN == '1') {
                            document.documentElement.style.setProperty("--rocolor", ' #ff0000 ');
                        }
                    }
                    else if (obj[i][1].status == '0') {
                        if (_this.statusrec != 1) {
                            document.documentElement.style.setProperty("--rocolor", ' #FFFF00 ');
                        }
                    }
                }
                if (_this.statusrec == 1) {
                    break;
                }
            }
            if (core == '0') {
                document.documentElement.style.setProperty("--rocolor", '  #35AE59 ');
            }
            if ((flagAN == '0' && flagFN == '1') || (flagAN == '1' && flagFN == '0')) {
                document.documentElement.style.setProperty("--rocolor", ' #FFFF00 ');
            }
            if (flagFN == '1') {
                _this.foren = 0;
            }
            else {
                _this.foren = 1;
            }
            if (flagAN == '1') {
                _this.aftern = 0;
            }
            else {
                _this.aftern = 1;
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DetailPage.prototype.cal = function () {
        var _this = this;
        this.fire.readOnce('requests')
            .then(function (response) {
            _this.blurClass = 'blur';
            //passing data to calendar page
            var pop = _this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__calendar_calendar__["a" /* CalendarPage */], { aud: _this.aud, data: _this.navParams.get('data') });
            pop.onDidDismiss(function (data) {
                _this.blurClass = false;
                if (data != undefined) {
                    // See if the date has events
                    if (data.hasEvent) {
                        // Native slide page transitions
                        var options = {
                            direction: 'left',
                            duration: 350,
                            slowdownfactor: -1,
                            iosdelay: 50
                        };
                        _this.nativePageTransitions.slide(options);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__reserved_reserved__["a" /* ReservedPage */], { getData: data, aud: _this.aud, data: response });
                    }
                    else {
                        // get the data from popup page and assign it to calendar data
                        _this.calenDateData = data;
                        //for seperating the values from the array of date, time , month 
                        _this.date = _this.calenDateData.date;
                        _this.oldMonth = _this.calenDateData.month;
                        _this.month = Number(_this.oldMonth);
                        _this.month = _this.month + 1;
                        _this.year = _this.calenDateData.year;
                        _this.findata = String(_this.date + '/' + _this.month + '/' + _this.year);
                        // for-after-noon border color back to normal when visiting page again 
                        document.documentElement.style.setProperty("--button-clicked-an", '1px solid #000');
                        document.documentElement.style.setProperty("--button-clicked-fn", '1px solid #000');
                        _this.firebaseFunctions();
                    }
                }
            });
            pop.present();
        });
    };
    // TO change the request count in booked aud
    DetailPage.prototype.changeRequestCount = function () {
        var _this = this;
        // Read the current value in the request of aud
        this.fire.readOnce('auditorium/' + this.aud.audID)
            .then(function (response) {
            // Count of requests
            var count = response['requests'];
            // Path string and data to update
            var path = 'auditorium/' + _this.aud.audID + '/requests';
            var data = (_a = {},
                _a[path] = count + 1,
                _a);
            // Update function
            _this.fire.updateField(data)
                .then(function (response) {
            })
                .catch(function (error) {
                // Show toast message
                _this.toastCtrl.setMessage("Some error has occured. Please try again");
                _this.toastCtrl.present();
            });
            var _a;
        })
            .catch(function (error) {
        });
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/detail/detail.html"*/'<!--\n  Generated template for the DetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border [ngClass]="blurClass">\n  <ion-navbar>\n\n    <ion-title class="toolbar-title.toolbar-title-md"><b>One more step...</b></ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding [ngClass]="blurClass">\n  <!-- Auditorium picture details -->\n\n  <div class="one">\n\n    <!-- Starting grid aud pic details -->\n\n    <ion-grid>\n\n      <ion-row>\n\n        <!--aud image -->\n        <ion-col>\n          <ion-avatar class="image imgPicDisplay ">\n            <!--image-->\n          </ion-avatar>\n        </ion-col>\n\n        <!--aud image details -->\n        <ion-col col-6>\n          <ion-row class="leftDistance name-distance"><b>{{ audname }}</b> </ion-row>\n          <ion-row class="leftDistance dept-distance ">{{ auddept }}</ion-row>\n        </ion-col>\n\n        <!--green round details  -->\n        <ion-col col-2>\n          <ion-avatar class="avail-display">\n          </ion-avatar>\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <!-- Ending grid of aud pic details -->\n\n    <!--Starting grid booking details -->\n\n    <ion-grid>\n\n      <!--Date display details  -->\n\n      <ion-row row-12>\n\n        <ion-col>\n          <ion-item (click)="cal()" class="but button-display">\n            <ion-label class="common"> {{ findata }}</ion-label>\n            <ion-icon class="icon-display" name="custom-calendar" item-end></ion-icon>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n\n      <!-- Starting of form -->\n\n      <form [formGroup]="credentialForm">\n\n        <!-- Fore-after-noon details -->\n\n        <ion-row row-12>\n\n          <ion-col col-6 *ngIf="!foren">\n            <ion-item class="but-unchecked button-display">\n              <ion-label class="fore-after-noon">FN</ion-label>\n            </ion-item>\n          </ion-col>\n\n          <ion-col col-6 *ngIf="foren">\n            <ion-item class="but-checked-fn button-display" (click)="mycolorFn()">\n              <ion-label class="fore-after-noon">FN</ion-label>\n            </ion-item>\n          </ion-col>\n\n          <ion-col col-6 *ngIf="!aftern">\n            <ion-item class="button-display but-unchecked">\n              <ion-label class="fore-after-noon" id="bocolor">AN</ion-label>\n            </ion-item>\n          </ion-col>\n\n          <ion-col col-6 *ngIf="aftern">\n            <ion-item class="button-display but-checked-an" (click)="mycolorAn()">\n              <ion-label class="fore-after-noon" id="bocolor">AN</ion-label>\n            </ion-item>\n          </ion-col>\n\n        </ion-row>\n\n        <!-- Department details -->\n\n        <ion-row>\n\n          <ion-col>\n            <ion-item (click)="dept()" class="but book-display">\n              <ion-label class="dept-display common">{{ department }}</ion-label>\n              <ion-icon class="icon-display" name="custom-aw" item-end></ion-icon>\n            </ion-item>\n          </ion-col>\n\n        </ion-row>\n\n        <!-- Mobile number details -->\n\n        <ion-row>\n\n          <ion-col>\n            <ion-item class="but button-display">\n              <ion-input formControlName="text1" placeholder="Mobilenumber" class="common" [(ngModel)]="mobileNum">\n              </ion-input>\n            </ion-item>\n\n            <ion-item\n              *ngIf="!credentialForm.controls.text1.valid && (credentialForm.controls.text1.dirty || submitAttempt)">\n              <p>Enter valid Phone number</p>\n            </ion-item>\n          </ion-col>\n\n        </ion-row>\n\n        <!-- Purpose details  -->\n        <ion-row>\n          <ion-col>\n            <ion-item class="but button-display">\n              <ion-input formControlName="purpose" placeholder="Purpose" class="common"> </ion-input>\n            </ion-item>\n\n            <ion-item\n              *ngIf="!credentialForm.controls.purpose.valid && (credentialForm.controls.purpose.dirty || submitAttempt)">\n              <p>Minimum length should be 8 &<br>Maximum length should be 25</p>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n\n        <!-- Book button details -->\n        <ion-row>\n          <ion-col>\n            <button ion-button class="but book-display" (click)="stat()" full\n              [disabled]="!(anStatus || fnStatus) || !credentialForm.valid">\n              <ion-label class="book-label">Book</ion-label>\n            </button>\n          </ion-col>\n\n        </ion-row>\n\n      </form>\n\n      <!-- Completion of form -->\n\n    </ion-grid>\n\n    <!-- Ending grid booking details -->\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/detail/detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_page_transitions__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditPage = (function () {
    function EditPage(navCtrl, navParams, fire, form, loading, toast, alert, nativePageTransitions) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.form = form;
        this.loading = loading;
        this.toast = toast;
        this.alert = alert;
        this.nativePageTransitions = nativePageTransitions;
        // Getting the data from source page
        this.aud = this.navParams.get('data');
        console.log(this.aud);
        // Form Validation
        this.credentialForm = this.form.group({
            name: [this.aud.name, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])],
            sCount: [this.aud.sCount, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])]
        });
        this.Department = this.aud.dept;
        // Initializing Loading Controller
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        });
        // Initializing Toast Controller
        this.toastCtrl = this.toast.create({
            duration: 3000
        });
    }
    EditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditPage');
    };
    // Drop-down using alert component
    EditPage.prototype.Dept = function () {
        var _this = this;
        var alert = this.alert.create();
        alert.setTitle('Departments');
        alert.addInput({
            type: 'radio',
            label: 'Mech',
            value: 'Mech',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'IT',
            value: 'IT'
        });
        alert.addInput({
            type: 'radio',
            label: 'Cse',
            value: 'CSE'
        });
        alert.addInput({
            type: 'radio',
            label: 'Civil',
            value: 'Civil'
        });
        alert.addInput({
            type: 'radio',
            label: 'ECE',
            value: 'ECE'
        });
        alert.addInput({
            type: 'radio',
            label: 'EEE',
            value: 'EEE'
        });
        alert.addInput({
            type: 'radio',
            label: 'BME',
            value: 'BME'
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('Radio data:', data);
                _this.testRadioOpen = false;
                _this.testRadioResult = data;
                _this.Department = data;
            }
        });
        alert.present().then(function () {
            _this.testRadioOpen = true;
        });
    };
    // Saving process of edit page
    EditPage.prototype.save = function () {
        var _this = this;
        // Presenting loading controller
        this.loadingCtrl.present();
        // Getting the field values
        var dept = this.Department;
        var name = this.credentialForm.controls['name'].value;
        var sCount = this.credentialForm.controls['sCount'].value;
        // Condition to check, If the field are empty
        if (dept.trim() == '' || name.trim() == '' || sCount.trim() == '') {
            // Dismissing the loading controller
            this.loadingCtrl.dismiss();
            // Display the toast
            this.toastCtrl.setMessage("Fill all the fields...");
            this.toastCtrl.present();
        }
        else {
            // Keys
            var deptKey = 'auditorium/' + this.aud.audID + '/dept';
            var nameKey = 'auditorium/' + this.aud.audID + '/name';
            var sCountKey = 'auditorium/' + this.aud.audID + '/sCount';
            var data = (_a = {},
                _a[deptKey] = dept,
                _a[nameKey] = name,
                _a[sCountKey] = sCount,
                _a);
            // Update the info.
            this.fire.updateField(data)
                .then(function (response) {
                // Dismissing the loading controller
                _this.loadingCtrl.dismiss();
                // Display the toast
                _this.toastCtrl.setMessage("Auditorium name and dept Updated Successfully...!");
                _this.toastCtrl.present();
            })
                .catch(function (error) {
                // Dismissing the loading controller
                _this.loadingCtrl.dismiss();
                // Display the toast
                _this.toastCtrl.setMessage("Something is wrong. Please try again later...!");
                _this.toastCtrl.present();
            });
            // Native slide page transitions
            var options = {
                direction: 'left',
                duration: 350,
                slowdownfactor: -1,
                iosdelay: 50
            };
            this.nativePageTransitions.slide(options);
            this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */]);
            this.navCtrl.popToRoot();
        }
        var _a;
    };
    EditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-Edit',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/Edit/Edit.html"*/'<!--\n  Generated template for the EditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!-- header -->\n\n<ion-header no-border>\n  <ion-navbar class="toolbar-title.toolbar-title-md">\n\n    <ion-title><b>Let\'s edit this...</b></ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<!-- content -->\n\n<ion-content padding>\n  <form [formGroup]="credentialForm">\n    <ion-grid>\n      <ion-row>\n\n        <ion-item>\n          <ion-img src="assets/imgs/AuditImageView.jpeg"></ion-img>\n        </ion-item>\n\n        <ion-item class="round-border width">\n          <ion-input type="text" placeholder=\'Name\' formControlName="name">\n          </ion-input>\n        </ion-item>\n\n        <ion-item (click)="Dept()" class="round-border width">\n          <ion-label>{{Department}}\n          </ion-label>\n          <ion-icon name="custom-aw" class="resize-icon" item-right></ion-icon>\n        </ion-item>\n\n        <ion-item class="round-border width">\n          <ion-input type="tel" placeholder=\'Seat Count\' formControlName="sCount">\n          </ion-input>\n        </ion-item>\n\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <!--create button-->\n  <div text-center (click)="save()">\n    <button ion-button color="secondary" round class="create-button">\n      Save\n    </button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/Edit/Edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], EditPage);
    return EditPage;
}());

//# sourceMappingURL=Edit.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_page_transitions__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreatePage = (function () {
    function CreatePage(navCtrl, navParams, fire, loading, toast, form, alert, nativePageTransitions) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.loading = loading;
        this.toast = toast;
        this.form = form;
        this.alert = alert;
        this.nativePageTransitions = nativePageTransitions;
        this.Department = "Mech";
        // Form Validation
        this.credentialForm = this.form.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])],
            dept: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])],
            sCount: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])]
        });
        // Initializing Loading Controller
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        });
        // Initializing Toast Controller
        this.toastCtrl = this.toast.create({
            duration: 3000
        });
    }
    CreatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreatePage');
    };
    //Drop-down using alert component
    CreatePage.prototype.Dept = function () {
        var _this = this;
        var alert = this.alert.create();
        alert.setTitle('Departments');
        alert.addInput({
            type: 'radio',
            label: 'Mech',
            value: 'Mech',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'IT',
            value: 'IT'
        });
        alert.addInput({
            type: 'radio',
            label: 'Cse',
            value: 'CSE'
        });
        alert.addInput({
            type: 'radio',
            label: 'Civil',
            value: 'Civil'
        });
        alert.addInput({
            type: 'radio',
            label: 'ECE',
            value: 'ECE'
        });
        alert.addInput({
            type: 'radio',
            label: 'EEE',
            value: 'EEE'
        });
        alert.addInput({
            type: 'radio',
            label: 'BME',
            value: 'BME'
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('Radio data:', data);
                _this.testRadioOpen = false;
                _this.testRadioResult = data;
                _this.Department = data;
            }
        });
        alert.present().then(function () {
            _this.testRadioOpen = true;
        });
    };
    // Saving process of edit page
    CreatePage.prototype.save = function () {
        var _this = this;
        // Presenting loading controller
        this.loadingCtrl.present();
        // Getting the field values
        var dept = this.Department;
        var name = this.credentialForm.controls['name'].value;
        var sCount = this.credentialForm.controls['sCount'].value;
        // Condition to check, If the field are empty
        if (dept.trim() == '' || name.trim() == '' || sCount.trim() == '') {
            // Dismissing the loading controller
            this.loadingCtrl.dismiss();
            // Display the toast
            this.toastCtrl.setMessage("Fill all the fields...");
            this.toastCtrl.present();
        }
        else {
            // AudID Generation
            var audId = name.slice(0, 3) + 'cs' + dept;
            // Data to add
            var data = {
                audID: audId,
                name: name,
                dept: dept,
                requests: 0,
                sCount: sCount
            };
            //write in Database
            this.fire.writeInDatabase('auditorium/' + audId, data)
                .then(function (response) {
                // Dismissing the loading controller
                _this.loadingCtrl.dismiss();
                // Display the toast
                _this.toastCtrl.setMessage("Auditorium name and dept Created Successfully...!");
                _this.toastCtrl.present();
            })
                .catch(function (error) {
                // Dismissing the loading controller
                _this.loadingCtrl.dismiss();
                // Display the toast
                _this.toastCtrl.setMessage("Something is wrong. Please try again later...!");
                _this.toastCtrl.present();
            });
            // console.log('save button clicked');
            // Native slide page transitions
            var options = {
                direction: 'left',
                duration: 350,
                slowdownfactor: -1,
                iosdelay: 50
            };
            this.nativePageTransitions.slide(options);
            this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */]);
            this.navCtrl.popToRoot();
        }
    };
    CreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/create/create.html"*/'<!--\n  Generated template for the CreatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!-- header -->\n<ion-header no-border>\n  <ion-navbar class="toolbar-title.toolbar-title-md">\n   \n    <ion-title class="toolbar-title.toolbar-title-md"><b>Let\'s create one...</b></ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<!-- content -->\n<ion-content padding>\n  <form [formGroup]="credentialForm">\n    <ion-grid>\n      <ion-row>\n\n        <ion-item>\n          <ion-img src="assets/imgs/AuditImageView.jpeg"></ion-img>\n        </ion-item>\n        <ion-item class="round-border width">\n          <ion-input type="text" placeholder=\'Name\' formControlName="name">\n          </ion-input>\n        </ion-item>\n\n        <ion-item (click)="Dept()" class="round-border width">\n          <ion-label>{{Department}}</ion-label>\n          <ion-icon name="custom-aw" class="resize-icon" item-right></ion-icon>\n        </ion-item>\n\n        <ion-item class="round-border width">\n          <ion-input type="tel" placeholder=\'Seat Count\' formControlName="sCount">\n          </ion-input>\n        </ion-item>\n\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n\n<ion-footer no-border>\n  <!--create button-->\n  <div text-center (click)="save()">\n    <button ion-button color="secondary" round class="create-button">\n      Save\n    </button>\n  </div>\n</ion-footer>'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/create/create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], CreatePage);
    return CreatePage;
}());

//# sourceMappingURL=create.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__warning_warning__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RequestPage = (function () {
    function RequestPage(navCtrl, navParams, alerCtrl, fire, popoverCtrl, toastCtrl, loadingCtrl, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alerCtrl = alerCtrl;
        this.fire = fire;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.afDatabase = afDatabase;
        this.present = 0;
        // geting data from dashboard page
        this.reqdata = navParams.get('data');
        // from data geting audId from database
        // console.log(this.reqdata.audID);
        this.readData();
    }
    RequestPage.prototype.readData = function () {
        var _this = this;
        // loading
        var loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        // toast message
        var toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        // here read function is to get data from database 
        this.afDatabase.database.ref('requests')
            .on("value", function (response) {
            loading.dismiss();
            console.log("Read Once Called");
            var obj = Object.entries(response.val());
            console.log(obj);
            var arr = [];
            var count = 0;
            // Loop to get all the audid in request from database
            for (var i = 0; i < obj.length; i++) {
                var array = (obj[i][1]['audId']);
                // to check audid in dash page and audid in req from db
                if (_this.reqdata.audID == array) {
                    // to check whether the status is 0 if audid matches
                    if (obj[i][1]['status'] == '0') {
                        arr.push(obj[i][1]);
                        var p = obj[i][1];
                        console.log(p);
                        _this.present = 1;
                        count = count + 1;
                    }
                    else {
                        // this.toast.setMessage("Some error has occured. Please try again...");
                        // this.toast.present();
                        if (_this.present == 1) {
                            _this.present = 1;
                        }
                        else {
                            _this.present = 0;
                        }
                    }
                }
            }
            _this.display = arr;
            // to update request count
            var reqcount = 'auditorium/' + _this.reqdata.audID + '/requests';
            var data = (_a = {},
                _a[reqcount] = count,
                _a);
            _this.fire.updateField(data)
                .then(function (response) {
            })
                .catch(function (error) {
            });
            var _a;
        }, function (error) {
            toast.setMessage("Some error has occured. Please try again");
            toast.present();
        });
    };
    RequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequestPage');
    };
    RequestPage.prototype.conform = function (redata) {
        var _this = this;
        // loading
        var loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        // toast message
        var toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        // Change the accepted status as 1
        var path = 'requests/' + redata.reqId + '/status';
        var data = (_a = {},
            _a[path] = '1',
            _a);
        // Get the Selected request info
        var anStatus = redata.AN;
        var fnStatus = redata.FN;
        var dateSelected = redata.date;
        // show loading
        loading.present();
        this.fire.updateField(data)
            .then(function (response) {
            // Dismiss loading & Show Toast Message
            loading.dismiss();
            toast.setMessage("Request accepted successfully...");
            toast.present();
            // Reloads after updation   
            // this.navCtrl.setRoot(DashboardPage);
            // Compare the selected info with other 
            for (var i = 0; i < _this.display.length; i++) {
                if (dateSelected == _this.display[i].date) {
                    if (anStatus == _this.display[i].AN || fnStatus == _this.display[i].FN) {
                        if (_this.display[i].reqId != redata.reqId) {
                            // Set status as 2 for affected requests
                            var path_1 = 'requests/' + _this.display[i].reqId + '/status';
                            var data_1 = (_a = {},
                                _a[path_1] = 2,
                                _a);
                            _this.fire.updateField(data_1)
                                .then(function (response) {
                            })
                                .catch(function (error) {
                            });
                        }
                    }
                }
            }
            var _a;
        })
            .catch(function (error) {
            // dismiss the loading
            loading.dismiss();
            // Dismiss loading & Show Toast Message
            toast.setMessage("Some error has occured. Please try again...");
            toast.present();
        });
        var _a;
    };
    // tick popup 
    RequestPage.prototype.doConfirm = function (redata) {
        var _this = this;
        var confirm = this.alerCtrl.create({
            title: 'Are you sure?',
            message: 'Do you conform the request?',
            buttons: [
                {
                    text: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'confirm',
                    handler: function () {
                        _this.conform(redata);
                    }
                }
            ]
        });
        confirm.present();
    };
    RequestPage.prototype.cancel = function (redata) {
        var _this = this;
        this.blurClass = 'blur';
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__warning_warning__["a" /* WarningPage */], { requests: redata, from: 2, data: this.reqdata });
        popover.dismiss(function () {
            {
                _this.blurClass = false;
            }
        });
        popover.present();
    };
    RequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-request',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/request/request.html"*/'<!--\n  Generated template for the RequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--header-->\n<!--header-->\n<ion-header no-border [ngClass]="blurClass">\n\n  <ion-navbar class="toolbar-title.toolbar-title-md">\n    <ion-title class="toolbar-title.toolbar-title-md"><b>Requests</b></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n<!--content-->\n<ion-content padding [ngClass]="blurClass">\n\n\n  <!--grid for rows and cols(1row & 3cols)-->\n  <ion-grid>\n    <div *ngIf="present">\n      <div *ngFor="let redata of display">\n        <ion-row align-items-center>\n          <!--col 1 & 3rows for text-->\n          <ion-col col-8 class="space">\n            <ion-row>\n              <p class="font-style1">{{ redata.audName }}</p>\n            </ion-row>\n\n            <ion-row>\n              <p class="font-style1 space0">{{ redata.dept }} - {{ redata.phone }}</p>\n            </ion-row>\n\n            <ion-row>\n              <ion-col>\n                <p class="date">{{ redata.date }}</p>\n              </ion-col>\n\n              <ion-col *ngIf="redata.AN == \'1\'">\n                <p class="Noon-align">AN</p>\n              </ion-col>\n\n              <ion-col *ngIf="redata.FN == \'1\'">\n                <p class="Noon-align">FN</p>\n              </ion-col>\n            </ion-row>\n\n          </ion-col>\n\n          <!--col 2 for done icon-->\n          <ion-col col-2>\n            <div class="done-cancel-icon">\n              <ion-icon (click)="doConfirm(redata)"> <img src="../../assets/imgs/done.svg"> </ion-icon>\n            </div>\n          </ion-col>\n\n          <!--col 3 for cancel icon-->\n          <ion-col col-2>\n            <div class="done-cancel-icon">\n              <ion-icon (click)="cancel(redata)"> <img src="../../assets/imgs/cancel.svg"> </ion-icon>\n            </div>\n          </ion-col>\n        </ion-row>\n      </div>\n    </div>\n  </ion-grid>\n\n  <div class="notfound" *ngIf="!present">\n    <p>Request not found</p>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/request/request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], RequestPage);
    return RequestPage;
}());

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__status_status__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_page_transitions__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, fbService, toastCtrl, loadingCtrl, nativePageTransitions) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.fbService = fbService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.nativePageTransitions = nativePageTransitions;
        this.credentialForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8)
                ])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signIn = function () {
        var _this = this;
        // loading instance
        var loading = this.loadingCtrl.create({
            content: 'please wait, logging in'
        });
        // toast instance
        var toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        var email = this.credentialForm.controls['email'].value;
        var password = this.credentialForm.controls['password'].value;
        loading.present();
        this.fbService.login(email, password)
            .then(function (response) {
            loading.dismiss();
            // Get the UID of Logged in user
            var uid = response['uid'];
            // get the user type and navigate to according to it.
            _this.fbService.readOnce('users/' + uid)
                .then(function (response) {
                // Check the user type and navigate to the apt page.
                if (response['type'] == 'user') {
                    // Native slide page transitions
                    var options = {
                        direction: 'left',
                        duration: 350,
                        slowdownfactor: -1,
                        iosdelay: 50
                    };
                    _this.nativePageTransitions.slide(options);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__status_status__["a" /* StatusPage */]);
                }
                else if (response['type'] == 'admin') {
                    // Native slide page transitions
                    var options = {
                        direction: 'left',
                        duration: 350,
                        slowdownfactor: -1,
                        iosdelay: 50
                    };
                    _this.nativePageTransitions.slide(options);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard__["a" /* DashboardPage */]);
                }
            })
                .catch(function (error) {
            });
        })
            .catch(function (error) {
            toast.present();
            loading.dismiss();
            if (error.message == "The password is invalid or the user does not have a password.") {
                toast.setMessage("Invalid username or password");
                toast.present();
            }
            else {
                toast.setMessage("Some error has occured. Please try again");
                toast.present();
            }
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/login/login.html"*/'\n\n<ion-content padding>\n  <div class = "one">\n  <form [formGroup]="credentialForm">\n  <ion-grid>\n\n      <ion-row>\n        <ion-item class="round-border width">\n            <ion-input type="text" \n            placeholder="UserID or Email"\n            formControlName="email">\n          </ion-input>\n        </ion-item>\n\n        <ion-item \n        class="warning-on-input"\n        *ngIf="!credentialForm.controls.email.valid && (credentialForm.controls.email.dirty || submitAttempt)">\n          <p>Enter valid Email</p>\n        </ion-item>\n    \n        <ion-item class="round-border width">\n          <ion-input type="password" \n          formControlName="password"\n          placeholder=\'Password\'>\n      \n        </ion-input>\n        </ion-item>\n\n        <ion-item\n        class="warning-on-input"\n        *ngIf="!credentialForm.controls.password.valid && (credentialForm.controls.password.dirty || submitAttempt)">\n          <p>Password length should be 8 characters long</p>\n      </ion-item>\n      \n        <button ion-button block \n        class=\'width btn-prop\' \n        (click)="signIn()"\n        [disabled]="!credentialForm.valid">Login</button>\n      </ion-row>  \n\n  </ion-grid>\n</form>\n</div>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AdminHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for mo re info on
 * Ionic pages and navigation.
 */
var AdminHistoryPage = (function () {
    function AdminHistoryPage(navCtrl, navParams, fire, toast, load, alert, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toast = toast;
        this.load = load;
        this.alert = alert;
        this.afDatabase = afDatabase;
        // emptyFlag 
        this.emptyFlag = true;
    }
    AdminHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminHistoryPage');
    };
    //To get  the date from date picker and to modify the date format
    AdminHistoryPage.prototype.dateChanged = function () {
        // to split the date,month,year from currentformat
        this.split = this.date.split("-");
        // converting date from number to string to seperate
        this.splitDate = this.split[2].toString();
        if ((this.splitDate.charAt(0)) == '0') {
            this.splitDate = this.splitDate.charAt(1);
        }
        // converting month from number to string to seperate
        this.splitMonth = this.split[1].toString();
        if ((this.splitMonth.charAt(0)) == '0') {
            this.splitMonth = this.splitMonth.charAt(1);
        }
        //concatenating the date according to our format
        this.finaldate = this.splitDate + "/" + this.splitMonth + "/" + this.split[0];
        console.log(this.finaldate);
        this.firebaseFunctions();
    };
    //variable name to store the objects from data
    AdminHistoryPage.prototype.firebaseFunctions = function () {
        var _this = this;
        // Initializing Loading Controller
        var loadingCtrl = this.load.create({
            content: 'Please wait...'
        });
        // Initializing Toast Controller
        var toastCtrl = this.toast.create({
            duration: 3000
        });
        this.afDatabase.database.ref('requests')
            .on("value", function (response) {
            console.log("Read Once Called");
            //objects is stored in obj
            // this.dataret = response;
            var obj = Object.entries(response.val());
            // Local array to store the array of objects
            var undoArr = [];
            for (var j = 0; j < obj.length; j++) {
                _this.req = obj[j][1];
                console.log(_this.req);
            }
            var arr = [];
            // Loop through the received object
            for (var i = 0; i < obj.length; i++) {
                if (_this.finaldate == obj[i][1]['date'])
                    arr.push(obj[i][1]);
            }
            // Check and update the empty flag
            if (arr.length == 0) {
                _this.emptyFlag = true;
            }
            else {
                _this.emptyFlag = false;
            }
            // Assigining arr to global datar
            _this.historyInfo = arr;
        }, function (error) {
            // Display the toast
            toastCtrl.setMessage("Something went wrong ...please try again");
            toastCtrl.present();
        });
    };
    AdminHistoryPage.prototype.showConfirm = function (clickedData) {
        var _this = this;
        var confirm = this.alert.create({
            title: 'Warning',
            message: 'Do you agree to undo?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Agree clicked');
                        console.log(clickedData);
                        if (clickedData.status == '2') {
                            var path = 'requests/' + clickedData.reqId + '/status';
                            var data = (_a = {},
                                _a[path] = '0',
                                _a);
                            _this.fire.updateField(data)
                                .then(function (response) {
                            })
                                .catch(function (error) {
                            });
                        }
                        else if (clickedData.status == '3') {
                            var path = 'requests/' + clickedData.reqId + '/status';
                            var data = (_b = {},
                                _b[path] = '0',
                                _b);
                            _this.fire.updateField(data)
                                .then(function (response) {
                            })
                                .catch(function (error) {
                            });
                        }
                        else if (clickedData.status == '1') {
                            var path = 'requests/' + clickedData.reqId + '/status';
                            var data = (_c = {},
                                _c[path] = '0',
                                _c);
                            _this.fire.updateField(data)
                                .then(function (response) {
                            })
                                .catch(function (error) {
                            });
                            for (var i = 0; i < _this.historyInfo.length; i++) {
                                if (clickedData.date == _this.historyInfo[i].date) {
                                    if (clickedData.AN == _this.historyInfo[i].AN || clickedData.AN != _this.historyInfo[i].AN
                                        && clickedData.FN == _this.historyInfo[i].FN || clickedData.FN != _this.historyInfo[i].FN) {
                                        if (_this.historyInfo[i].reqId != clickedData.reqId) {
                                            if (_this.historyInfo[i].status == 2) {
                                                var path_1 = 'requests/' + _this.historyInfo[i].reqId + '/status';
                                                var data_1 = (_d = {},
                                                    _d[path_1] = 0,
                                                    _d);
                                                _this.fire.updateField(data_1)
                                                    .then(function (response) {
                                                })
                                                    .catch(function (error) {
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var _a, _b, _c, _d;
                    }
                }
            ]
        });
        confirm.present();
    };
    AdminHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin-history',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/admin-history/admin-history.html"*/'<!--\n  Generated template for the AdminHistoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- header -->\n<ion-header no-border>\n  <ion-navbar hideBackButton>\n\n    <ion-title class="toolbar-title.toolbar-title-md"><b>History</b></ion-title>\n\n    <ion-buttons left>\n      <button ion-button icon-only menuToggle color="dark">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<!-- content -->\n<ion-content padding>\n\n  <!-- Date picker -->\n  <ion-item (click)="datetime.open()">\n    <ion-label>Date</ion-label>\n    <ion-datetime #datetime displayFormat="D/M/YYYY" [(ngModel)]="date" (ionChange)="dateChanged()"></ion-datetime>\n  </ion-item>\n\n\n  <!-- History Details -->\n  <div class="total-alignment">\n    <ion-grid>\n      <ion-row class="detail-spacing" *ngFor="let data of historyInfo">\n\n        <ion-col col-2>\n          <ion-avatar class="img1 image-size" style=" border: 1px solid black;">\n            <!--image-->\n          </ion-avatar>\n        </ion-col>\n\n        <ion-col col-10>\n          <ion-row class="space-orientation"><b>{{data.audName}}-{{data.dept}}</b>\n          </ion-row>\n          <ion-row class="top-orientation space-orientation">\n            <ion-col col-7>{{data.date}}</ion-col>\n            <ion-col class="undo-spacing" col-3>\n              <ion-icon *ngIf="data.status != 0" (click)="showConfirm(data)" class="space-orientation" name="undo">\n              </ion-icon>\n            </ion-col>\n          </ion-row>\n          <ion-row *ngIf="data.status == 3"><button\n              class="transformation rejected-BG button-size top-orientation space-orientation " ion-button\n              round>Rejected</button></ion-row>\n          <ion-row *ngIf="data.status == 2"><button\n              class="transformation rejected-BG button-size top-orientation space-orientation " ion-button\n              round>Rejected</button></ion-row>\n          <ion-row *ngIf="data.status == 0"><button\n              class="transformatsion waiting-BG button-size top-orientation space-orientation" ion-button\n              round>Waiting</button></ion-row>\n          <ion-row *ngIf="data.status == 1"><button\n              class="transformation accepted-BG button-size top-orientation space-orientation" ion-button\n              round>Accepted</button></ion-row>\n\n        </ion-col>\n\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/admin-history/admin-history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], AdminHistoryPage);
    return AdminHistoryPage;
}());

//# sourceMappingURL=admin-history.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(fire, alertCtrl, navCtrl, navParams, fbAuth, fb, loading, toastCtrl, formBuilder) {
        this.fire = fire;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbAuth = fbAuth;
        this.fb = fb;
        this.loading = loading;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        //enabling the save button
        this.profupdate = 0;
        // Get the user details from status page
        this.user = this.navParams.get('response');
        this.detailForm = this.formBuilder.group({
            name: [this.user['name'], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required
                ])],
            phone: [this.user['phone'], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].maxLength(10)
                ])]
        });
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.changePwd = function () {
        var _this = this;
        // Toast controller
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        var prompt = this.alertCtrl.create({
            inputs: [
                {
                    name: 'old',
                    placeholder: 'Current password'
                },
                {
                    name: 'new',
                    placeholder: 'New password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        // Local scoped user crdentials
                        var user = _this.fbAuth.auth.currentUser;
                        // Reauthenticate to check if the old 
                        // password entered is correct.
                        _this.fire.login(user['email'], data.old)
                            .then(function (response) {
                            //update password if login is successful
                            //checking new password characters length for 6
                            if (data.new.length >= 6) {
                                user.updatePassword(data.new)
                                    .then(function (response) {
                                    // Display the toast message
                                    toast.setMessage("Password changed successfully");
                                    toast.present();
                                })
                                    .catch(function (error) {
                                    // Display the toast message
                                    toast.setMessage("Some problem occured...Please try again later");
                                    toast.present();
                                });
                            }
                            else {
                                // Display the toast message
                                toast.setMessage("Password should be minimum of 6 characters");
                                toast.present();
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            // Display the toast message
                            toast.setMessage("Enter the correct old password");
                            toast.present();
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ProfilePage.prototype.profileUpdate = function () {
        this.profupdate = 1;
        console.log(this.profupdate);
    };
    ProfilePage.prototype.save = function () {
        var _this = this;
        // Toast controller
        var toast = this.toastCtrl.create({
            duration: 3000
        });
        var conformAlert = this.alertCtrl.create({
            title: 'Conformation',
            message: 'Are you sure want to save this?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Sure',
                    handler: function (none) {
                        var name = _this.detailForm.controls['name'].value;
                        var phone = _this.detailForm.controls['phone'].value;
                        // Keys
                        var nameKey = 'users/' + _this.fbAuth.auth.currentUser.uid + '/name';
                        var phoneKey = 'users/' + _this.fbAuth.auth.currentUser.uid + '/phone';
                        var data = (_a = {},
                            _a[nameKey] = name,
                            _a[phoneKey] = phone,
                            _a);
                        // Update the info.
                        _this.fire.updateField(data)
                            .then(function (response) {
                            // Display the toast
                            toast.setMessage("user name and phone Updated Successfully...!");
                            toast.present();
                        })
                            .catch(function (error) {
                            // Display the toast
                            toast.setMessage("Something is wrong. Please try again later...!");
                            toast.present();
                        });
                        var _a;
                    }
                }
            ]
        });
        // present the alert
        conformAlert.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n  <ion-navbar hideBackButton>\n    <ion-title class="toolbar-title.toolbar-title-md"><b>Profile</b></ion-title>\n\n    <!-- Hamburger icon -->\n    <ion-buttons left class="menu">\n      <button ion-button icon-only menuToggle color="dark">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <!-- For profile pic creation -->\n\n  <ion-grid>\n    <ion-row>\n      <ion-avatar class="image imgPicDisplay ">\n        <!--image-->\n      </ion-avatar>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid>\n\n    <form [formGroup]="detailForm">\n      <!-- For name display -->\n      <ion-row row-12 class="common">\n        <ion-col>\n          <ion-item class="but button-display" (click)="profileUpdate()">\n            <ion-input placeholder="Name" formControlName="name">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!detailForm.controls.name.valid && (detailForm.controls.name.dirty || submitAttempt)">\n            <p>Name should be minimun of 6 characters long</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <!-- For number display -->\n      <ion-row row-12>\n        <ion-col>\n          <ion-item class="but button-display" (click)="profileUpdate()">\n            <ion-input type="number" placeholder="Mobilenumber" formControlName="phone">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!detailForm.controls.phone.valid && (detailForm.controls.phone.dirty || submitAttempt)">\n            <p>Phone Number must have length of 10 numbers</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <!-- For change password display -->\n      <ion-row row-12>\n\n\n        <ion-col>\n          <button ion-button class="but password-display" (click)="changePwd()" full>\n            <ion-label>Change password</ion-label>\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row row-12>\n        <ion-col>\n          <button ion-button class="but save" (click)="save()" full [disabled]="!(profupdate)|| !detailForm.valid">\n            <ion-label>Save</ion-label>\n          </button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(447);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_status_status__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Edit_Edit__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_create_create__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__firebaseconfig__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_book_new_book_new__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_detail_detail__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_warning_warning__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_request_request__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic3_calendar_en__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_profile_profile__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_database__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_login__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_calendar_calendar__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_common_http__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_admin_history_admin_history__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_native_page_transitions__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_reserved_reserved__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_status_status__["a" /* StatusPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_Edit_Edit__["a" /* EditPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_create__["a" /* CreatePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_status_status__["a" /* StatusPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_book_new_book_new__["a" /* BookNewPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_warning_warning__["a" /* WarningPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_request_request__["a" /* RequestPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_admin_history_admin_history__["a" /* AdminHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_reserved_reserved__["a" /* ReservedPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_16_ionic3_calendar_en__["a" /* CalendarModule */],
                __WEBPACK_IMPORTED_MODULE_23__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    mode: 'md'
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_18_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__firebaseconfig__["a" /* Audi */].Auditor)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_status_status__["a" /* StatusPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_Edit_Edit__["a" /* EditPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_create__["a" /* CreatePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_status_status__["a" /* StatusPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_book_new_book_new__["a" /* BookNewPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_warning_warning__["a" /* WarningPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_status_status__["a" /* StatusPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_request_request__["a" /* RequestPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_admin_history_admin_history__["a" /* AdminHistoryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_reserved_reserved__["a" /* ReservedPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_15__services_fireBaseService__["a" /* FirebaseServices */],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_20_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_18_angularfire2__["a" /* AngularFireModule */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_status_status__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_dashboard_dashboard__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_admin_history_admin_history__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_page_transitions__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, angularFire, fbService, toastCtrl, loadingCtrl, afAuth, alertCtrl, fire, nativePageTransitions) {
        var _this = this;
        this.angularFire = angularFire;
        this.fbService = fbService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.nativePageTransitions = nativePageTransitions;
        platform.ready().then(function () {
            _this.angularFire.authState.subscribe(function (user) {
                if (user) {
                    // Get the UID of Logged user
                    var uid = user.uid;
                    // get the user type and navigate according to it.
                    _this.fbService.readOnce('users/' + uid)
                        .then(function (response) {
                        // Check the user type and navigate to the apt page.
                        if (response['type'] == 'user') {
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_status_status__["a" /* StatusPage */];
                            _this.pages = [
                                { title: 'Status', component: __WEBPACK_IMPORTED_MODULE_4__pages_status_status__["a" /* StatusPage */], icon: "logo-buffer", color: '' }
                            ];
                        }
                        else if (response['type'] == 'admin') {
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_dashboard_dashboard__["a" /* DashboardPage */];
                            _this.pages = [
                                { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_5__pages_dashboard_dashboard__["a" /* DashboardPage */], icon: "logo-buffer", color: '' },
                                { title: 'History', component: __WEBPACK_IMPORTED_MODULE_9__pages_admin_history_admin_history__["a" /* AdminHistoryPage */], icon: "time", color: '' }
                            ];
                        }
                    })
                        .catch(function (error) {
                    });
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                }
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    //navigation to pages
    MyApp.prototype.navPages = function (pages) {
        // Native slide page transitions
        var options = {
            direction: 'left',
            duration: 350,
            slowdownfactor: -1,
            iosdelay: 50
        };
        this.nativePageTransitions.slide(options);
        this.nav.insert(0, pages.component);
        this.nav.popToRoot();
    };
    // logout for both user and admin
    MyApp.prototype.logout = function () {
        var _this = this;
        // loading  
        var loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        // toast
        var toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        // Conformation alert
        var alert = this.alertCtrl.create({
            title: 'Oops..!',
            message: 'Are you sure want to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        // show loading
                        loading.present();
                        // Present loading
                        _this.afAuth.auth.signOut()
                            .then(function (response) {
                            loading.dismiss();
                            // Dismiss loading and set login page as root
                            // Native slide page transitions
                            var options = {
                                direction: 'left',
                                duration: 350,
                                slowdownfactor: -1,
                                iosdelay: 50
                            };
                            _this.nativePageTransitions.slide(options);
                            _this.nav.insert(0, __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                            _this.nav.popToRoot();
                        })
                            .catch(function (error) {
                            loading.dismiss();
                            // Dismiss loading and show error toast message
                            _this.toast.setMessage("Some error has occured. Please try again");
                            _this.toast.present();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    // navigate to profile page
    MyApp.prototype.navToProfile = function () {
        var _this = this;
        var user = this.afAuth.auth.currentUser;
        this.fire.readOnce('users/' + user['uid'])
            .then(function (response) {
            // Native slide page transitions
            var options = {
                direction: 'left',
                duration: 350,
                slowdownfactor: -1,
                iosdelay: 50
            };
            _this.nativePageTransitions.slide(options);
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__["a" /* ProfilePage */], { response: response });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/app/app.html"*/'\n<ion-menu [content]="content">\n\n  <ion-content>\n    <!-- item for profile -->\n    <ion-item no-lines>\n      <ion-avatar class="avatar">\n        <img class="avatar-size"\n          src="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9">\n      </ion-avatar>\n      <button ion-button color="primary" block text-capitalize=“false” menuClose\n      (click)="navToProfile()"><span>Profile</span></button>\n    </ion-item>\n\n    <!-- item to show menu items like history etc., and ngfor to display menu dynamicaly -->\n    <ion-item no-lines *ngFor="let p of pages" menuClose>\n      <ion-row (click) = navPages(p)>\n        <ion-col col-1 class="icons">\n          <ion-icon [name]="p.icon" [color]="p.color"></ion-icon>\n        </ion-col>\n        <ion-col col-8>\n          <h2>{{p.title}}</h2>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n\n    <!-- item for logout -->\n    <ion-item no-lines menuClose>\n      <ion-row (click)= logout() menuClose>\n        <ion-col col-1 class = "icons">\n           <ion-icon name="md-log-out" color="danger"></ion-icon>\n        </ion-col>\n        <ion-col col-8>\n          <h2>Logout</h2>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_8__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Audi; });
var Audi = {
    Auditor: {
        apiKey: "AIzaSyCCc7OjgEVYuD7OWgc2Chgvks1uN7aoN50",
        authDomain: "audbook2k19.firebaseapp.com",
        databaseURL: "https://audbook2k19.firebaseio.com",
        projectId: "audbook2k19",
        storageBucket: "",
        messagingSenderId: "306454376311",
        appId: "1:306454376311:web:ca51873d1ed656d3ae7b72"
    }
};
//# sourceMappingURL=firebaseconfig.js.map

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 301,
	"./af.js": 301,
	"./ar": 302,
	"./ar-dz": 303,
	"./ar-dz.js": 303,
	"./ar-kw": 304,
	"./ar-kw.js": 304,
	"./ar-ly": 305,
	"./ar-ly.js": 305,
	"./ar-ma": 306,
	"./ar-ma.js": 306,
	"./ar-sa": 307,
	"./ar-sa.js": 307,
	"./ar-tn": 308,
	"./ar-tn.js": 308,
	"./ar.js": 302,
	"./az": 309,
	"./az.js": 309,
	"./be": 310,
	"./be.js": 310,
	"./bg": 311,
	"./bg.js": 311,
	"./bm": 312,
	"./bm.js": 312,
	"./bn": 313,
	"./bn.js": 313,
	"./bo": 314,
	"./bo.js": 314,
	"./br": 315,
	"./br.js": 315,
	"./bs": 316,
	"./bs.js": 316,
	"./ca": 317,
	"./ca.js": 317,
	"./cs": 318,
	"./cs.js": 318,
	"./cv": 319,
	"./cv.js": 319,
	"./cy": 320,
	"./cy.js": 320,
	"./da": 321,
	"./da.js": 321,
	"./de": 322,
	"./de-at": 323,
	"./de-at.js": 323,
	"./de-ch": 324,
	"./de-ch.js": 324,
	"./de.js": 322,
	"./dv": 325,
	"./dv.js": 325,
	"./el": 326,
	"./el.js": 326,
	"./en-SG": 327,
	"./en-SG.js": 327,
	"./en-au": 328,
	"./en-au.js": 328,
	"./en-ca": 329,
	"./en-ca.js": 329,
	"./en-gb": 330,
	"./en-gb.js": 330,
	"./en-ie": 331,
	"./en-ie.js": 331,
	"./en-il": 332,
	"./en-il.js": 332,
	"./en-nz": 333,
	"./en-nz.js": 333,
	"./eo": 334,
	"./eo.js": 334,
	"./es": 335,
	"./es-do": 336,
	"./es-do.js": 336,
	"./es-us": 337,
	"./es-us.js": 337,
	"./es.js": 335,
	"./et": 338,
	"./et.js": 338,
	"./eu": 339,
	"./eu.js": 339,
	"./fa": 340,
	"./fa.js": 340,
	"./fi": 341,
	"./fi.js": 341,
	"./fo": 342,
	"./fo.js": 342,
	"./fr": 343,
	"./fr-ca": 344,
	"./fr-ca.js": 344,
	"./fr-ch": 345,
	"./fr-ch.js": 345,
	"./fr.js": 343,
	"./fy": 346,
	"./fy.js": 346,
	"./ga": 347,
	"./ga.js": 347,
	"./gd": 348,
	"./gd.js": 348,
	"./gl": 349,
	"./gl.js": 349,
	"./gom-latn": 350,
	"./gom-latn.js": 350,
	"./gu": 351,
	"./gu.js": 351,
	"./he": 352,
	"./he.js": 352,
	"./hi": 353,
	"./hi.js": 353,
	"./hr": 354,
	"./hr.js": 354,
	"./hu": 355,
	"./hu.js": 355,
	"./hy-am": 356,
	"./hy-am.js": 356,
	"./id": 357,
	"./id.js": 357,
	"./is": 358,
	"./is.js": 358,
	"./it": 359,
	"./it-ch": 360,
	"./it-ch.js": 360,
	"./it.js": 359,
	"./ja": 361,
	"./ja.js": 361,
	"./jv": 362,
	"./jv.js": 362,
	"./ka": 363,
	"./ka.js": 363,
	"./kk": 364,
	"./kk.js": 364,
	"./km": 365,
	"./km.js": 365,
	"./kn": 366,
	"./kn.js": 366,
	"./ko": 367,
	"./ko.js": 367,
	"./ku": 368,
	"./ku.js": 368,
	"./ky": 369,
	"./ky.js": 369,
	"./lb": 370,
	"./lb.js": 370,
	"./lo": 371,
	"./lo.js": 371,
	"./lt": 372,
	"./lt.js": 372,
	"./lv": 373,
	"./lv.js": 373,
	"./me": 374,
	"./me.js": 374,
	"./mi": 375,
	"./mi.js": 375,
	"./mk": 376,
	"./mk.js": 376,
	"./ml": 377,
	"./ml.js": 377,
	"./mn": 378,
	"./mn.js": 378,
	"./mr": 379,
	"./mr.js": 379,
	"./ms": 380,
	"./ms-my": 381,
	"./ms-my.js": 381,
	"./ms.js": 380,
	"./mt": 382,
	"./mt.js": 382,
	"./my": 383,
	"./my.js": 383,
	"./nb": 384,
	"./nb.js": 384,
	"./ne": 385,
	"./ne.js": 385,
	"./nl": 386,
	"./nl-be": 387,
	"./nl-be.js": 387,
	"./nl.js": 386,
	"./nn": 388,
	"./nn.js": 388,
	"./pa-in": 389,
	"./pa-in.js": 389,
	"./pl": 390,
	"./pl.js": 390,
	"./pt": 391,
	"./pt-br": 392,
	"./pt-br.js": 392,
	"./pt.js": 391,
	"./ro": 393,
	"./ro.js": 393,
	"./ru": 394,
	"./ru.js": 394,
	"./sd": 395,
	"./sd.js": 395,
	"./se": 396,
	"./se.js": 396,
	"./si": 397,
	"./si.js": 397,
	"./sk": 398,
	"./sk.js": 398,
	"./sl": 399,
	"./sl.js": 399,
	"./sq": 400,
	"./sq.js": 400,
	"./sr": 401,
	"./sr-cyrl": 402,
	"./sr-cyrl.js": 402,
	"./sr.js": 401,
	"./ss": 403,
	"./ss.js": 403,
	"./sv": 404,
	"./sv.js": 404,
	"./sw": 405,
	"./sw.js": 405,
	"./ta": 406,
	"./ta.js": 406,
	"./te": 407,
	"./te.js": 407,
	"./tet": 408,
	"./tet.js": 408,
	"./tg": 409,
	"./tg.js": 409,
	"./th": 410,
	"./th.js": 410,
	"./tl-ph": 411,
	"./tl-ph.js": 411,
	"./tlh": 412,
	"./tlh.js": 412,
	"./tr": 413,
	"./tr.js": 413,
	"./tzl": 414,
	"./tzl.js": 414,
	"./tzm": 415,
	"./tzm-latn": 416,
	"./tzm-latn.js": 416,
	"./tzm.js": 415,
	"./ug-cn": 417,
	"./ug-cn.js": 417,
	"./uk": 418,
	"./uk.js": 418,
	"./ur": 419,
	"./ur.js": 419,
	"./uz": 420,
	"./uz-latn": 421,
	"./uz-latn.js": 421,
	"./uz.js": 420,
	"./vi": 422,
	"./vi.js": 422,
	"./x-pseudo": 423,
	"./x-pseudo.js": 423,
	"./yo": 424,
	"./yo.js": 424,
	"./zh-cn": 425,
	"./zh-cn.js": 425,
	"./zh-hk": 426,
	"./zh-hk.js": 426,
	"./zh-tw": 427,
	"./zh-tw.js": 427
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 591;

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Edit_Edit__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_create__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__request_request__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_page_transitions__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, fire, toastCtrl, loadingCtrl, afDatabase, afAuth, nativePageTransitions) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.nativePageTransitions = nativePageTransitions;
        this.firebaseFunctions();
        this.updateCount();
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage.prototype.firebaseFunctions = function () {
        var _this = this;
        // loading
        var loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        var toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        // loading control
        loading.present();
        // fb function to get dept and aud name from db
        this.afDatabase.database.ref('auditorium')
            .on('value', function (response) {
            //objects is stored in var 
            var obj = Object.entries(response.val());
            // Local array to store the array of objects
            var arr = [];
            // Loop through the received object
            for (var i = 0; i < obj.length; i++) {
                arr.push(obj[i][1]);
            }
            // Assigining arr to global dataret
            _this.dataret = arr;
            // loading dismiss
            loading.dismiss();
        });
    };
    DashboardPage.prototype.edit = function (data) {
        // Native slide page transitions
        var options = {
            direction: 'left',
            duration: 350,
            slowdownfactor: -1,
            iosdelay: 50
        };
        this.nativePageTransitions.slide(options);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__Edit_Edit__["a" /* EditPage */], { data: data });
    };
    DashboardPage.prototype.create = function () {
        // Native slide page transitions
        var options = {
            direction: 'left',
            duration: 350,
            slowdownfactor: -1,
            iosdelay: 50
        };
        this.nativePageTransitions.slide(options);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__create_create__["a" /* CreatePage */]);
    };
    DashboardPage.prototype.req = function (data) {
        // Native slide page transitions
        var options = {
            direction: 'left',
            duration: 350,
            slowdownfactor: -1,
            iosdelay: 50
        };
        this.nativePageTransitions.slide(options);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__request_request__["a" /* RequestPage */], { data: data });
    };
    DashboardPage.prototype.updateCount = function () {
        var _this = this;
        this.fire.readOnce('auditorium')
            .then(function (response) {
            var auds = Object.entries(response);
            console.log(auds);
            auds.forEach(function (element) {
                // here readonce function is to get data from database 
                _this.fire.readOnce('requests')
                    .then(function (response) {
                    var obj = Object.entries(response);
                    var count = 0;
                    // Loop to get all the audid in request from database
                    for (var i = 0; i < obj.length; i++) {
                        var array = (obj[i][1].audId);
                        // to check audid in dash page and audid in req from db
                        if (element[1].audID == array) {
                            // to check whether the status is 0 if audid matches
                            if (obj[i][1].status == '0') {
                                count = count + 1;
                            }
                        }
                    }
                    // to update request count
                    var reqcount = 'auditorium/' + element[1].audID + '/requests';
                    var data = (_a = {},
                        _a[reqcount] = count,
                        _a);
                    _this.fire.updateField(data)
                        .then(function (response) {
                    })
                        .catch(function (error) {
                        // show toast message
                        var toast = _this.toastCtrl.create({
                            duration: 3000
                        });
                        toast.setMessage("Some error has occured. Please try again");
                        toast.present();
                    });
                    var _a;
                })
                    .catch(function (error) {
                    // show toast message
                    var toast = _this.toastCtrl.create({
                        duration: 3000
                    });
                    toast.setMessage("Some error has occured. Please try again");
                    toast.present();
                });
            });
        })
            .catch(function (error) {
            // show toast message
            var toast = _this.toastCtrl.create({
                duration: 3000
            });
            toast.setMessage("Some error has occured. Please try again");
            toast.present();
        });
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/dashboard/dashboard.html"*/'<!--header-->\n<ion-header no-border>\n\n  <ion-navbar hideBackButton class="toolbar-title.toolbar-title-md">\n\n    <ion-title><b>Dashboard</b></ion-title>\n\n    <ion-buttons left>\n      <button ion-button icon-only menuToggle color="dark">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n\n\n<!--content-->\n<ion-content padding>\n\n  <!--grid for rows and cols(1row & 3cols)-->\n  <ion-grid>\n\n    <ion-row align-items-start *ngFor="let data of dataret">\n      <!--col 1 for image-->\n      <ion-col col-2>\n        <ion-card (click)="req(data)">\n          <img src="../../assets/imgs/AuditImageView@2x.png">\n        </ion-card>\n      </ion-col>\n      <!-- col 3 for text & notifi (1 col-> (2rows) -> (1row(2col)) & 1row(1col) ) -->\n      <ion-col col-9 (click)="req(data)">\n        <div class="margin-left">\n          <ion-row>\n            <ion-col col-12>\n              <p class="font-style">{{ data.name }}</p>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-10>\n              <p class="font-lighter">{{ data.dept }}</p>\n            </ion-col>\n            <ion-col col-2>\n              <span class="notification-circle">\n                <p class="notify-nums">{{ data.requests }}</p>\n              </span>\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-col>\n      <!--col 3 for pen icon-->\n      <ion-col col-1 (click)="edit(data)">\n        <div class="pen-icon">\n          <ion-icon> <img src="../../assets/imgs/icon.svg"> </ion-icon>\n        </div>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n</ion-content>\n\n\n\n<ion-footer no-border>\n  <!--create button-->\n  <div text-center (click)="create()">\n    <button ion-button color="secondary" round class="create-button">\n      <ion-icon name="add" class="add-icon"></ion-icon> Create New\n    </button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__book_new_book_new__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__warning_warning__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_page_transitions__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StatusPage = (function () {
    function StatusPage(alertctrl, navCtrl, navParams, loading, toast, popoverCtrl, fire, afAuth, alertCtrl, fbAuth, afDatabase, nativePageTransitions) {
        var _this = this;
        this.alertctrl = alertctrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.toast = toast;
        this.popoverCtrl = popoverCtrl;
        this.fire = fire;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.fbAuth = fbAuth;
        this.afDatabase = afDatabase;
        this.nativePageTransitions = nativePageTransitions;
        // Initializing Loading Controller
        this.loadingCtrl = this.loading.create({
            content: 'Please wait...'
        });
        // Initializing Toast Controller
        this.toastCtrl = this.toast.create({
            duration: 3000
        });
        //read the userId from database
        this.fire.readOnce('users/' + this.afAuth.auth.currentUser.uid)
            .then(function (response) {
            // get the userId and call the firebase functions
            _this.userId = response['userId'];
            _this.firebaseFunctions();
        })
            .catch(function (error) {
        });
    }
    StatusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StatusPage');
    };
    //variable name to store the objects from data
    StatusPage.prototype.firebaseFunctions = function () {
        var _this = this;
        // Presenting loading controller
        this.loadingCtrl.present();
        this.afDatabase.database.ref('requests')
            .on("value", function (response) {
            //objects is stored in obj
            // this.dataret = response;
            var obj = Object.entries(response.val());
            // Local array to store the array of objects
            var arr = [];
            // Loop through the received object
            for (var i = 0; i < obj.length; i++) {
                //condition to compare the IDs to display the Status
                if (_this.userId == obj[i][1]['userId']) {
                    arr.push(obj[i][1]);
                }
            }
            // Assigining arr to global datar
            _this.statusinfo = arr;
            // Dismissing the loading controller
            _this.loadingCtrl.dismiss();
        }, function (error) {
            // Dismissing the loading controller
            _this.loadingCtrl.dismiss();
            // Display the toast
            _this.toastCtrl.setMessage("Something went wrong ...please try again");
            _this.toastCtrl.present();
        });
    };
    StatusPage.prototype.alert = function (data) {
        var _this = this;
        this.blurClass = 'blur';
        // Pass the data to Warning popover
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__warning_warning__["a" /* WarningPage */], { status: data, from: 1 });
        popover.onDidDismiss(function (data) {
            _this.blurClass = false;
        });
        popover.present();
    };
    StatusPage.prototype.next1 = function () {
        var _this = this;
        // Prompt alert for get the seat count from user
        var seatAlert = this.alertCtrl.create({
            title: "Seat Count",
            message: 'Enter the expected Seat count',
            inputs: [
                {
                    name: 'count',
                    placeholder: 'Count'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Continue',
                    handler: function (data) {
                        // Pass the seat count to Book New Page
                        // Native slide page transitions
                        var options = {
                            direction: 'left',
                            duration: 350,
                            slowdownfactor: -1,
                            iosdelay: 50
                        };
                        _this.nativePageTransitions.slide(options);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__book_new_book_new__["a" /* BookNewPage */], { sCount: data });
                    }
                }
            ]
        });
        seatAlert.present();
    };
    StatusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-status',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/audbook/src/pages/status/status.html"*/'<!-- header -->\n<ion-header no-border [ngClass]="blurClass">\n  <ion-navbar hideBackButton>\n    <ion-title class="toolbar-title.toolbar-title-md"><b>Status</b></ion-title>\n    <ion-buttons left class="menu">\n      <button ion-button icon-only menuToggle color="dark">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<!-- content -->\n<ion-content padding [ngClass]="blurClass">\n  <div class="change">\n  </div>\n  <div class="one">\n    <ion-grid>\n      <ion-row class="gap" *ngFor="let data of statusinfo">\n\n        <ion-col col-2>\n          <ion-avatar class="img1 com1" style=" border: 1px solid black;">\n            <!--image-->\n          </ion-avatar>\n        </ion-col>\n\n        <ion-col col-10>\n          <ion-row class="adjust2"><b>{{data.audName}}-{{data.dept}}</b>\n          </ion-row>\n          <ion-row class="adjust1 adjust2">\n            <ion-col col-7>{{data.date}}</ion-col>\n            <ion-col class="gap1" col-3>\n              <ion-icon *ngIf="data.status != 1" (click)="alert(data)" class="adjust2" name="custom-delete"\n                color="danger"></ion-icon>\n            </ion-col>\n          </ion-row>\n          <ion-row *ngIf="data.status == 2"><button class="b b3 com2 adjust1 adjust2 " ion-button\n              round>Rejected</button></ion-row>\n          <ion-row *ngIf="data.status == 0"><button class="b b1 com2 adjust1 adjust2" ion-button round>Waiting</button>\n          </ion-row>\n          <ion-row *ngIf="data.status == 1"><button class="b b2 com2 adjust1 adjust2" ion-button round>Accepted</button>\n          </ion-row>\n          <ion-row *ngIf="data.status == 3"><button class="b b3 com2 adjust1 adjust2 " ion-button\n              round>Rejected</button></ion-row>\n        </ion-col>\n\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n\n<!-- footer -->\n\n<ion-footer no-border [ngClass]="blurClass">\n  <button (click)="next1()" class="b b2 com3 " ion-button round>+ BookNew</button>\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/audbook/src/pages/status/status.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], StatusPage);
    return StatusPage;
}());

//# sourceMappingURL=status.js.map

/***/ })

},[428]);
//# sourceMappingURL=main.js.map