function btnFolding() {
    // 아코디언
    $(".btnFolding").each(function () {
        var $self = $(this);
        var target = $($self.attr("data-target"));

        if ($self.hasClass("show")) {
            $self.children(".blind").html("닫힘");
            $self.attr("aria-expanded", "true");
        } else {
            $self.children(".blind").html("펼침");
            $self.attr("aria-expanded", "false");
        }
        $self.on("click", function () {
            if ($self.hasClass("faq")) {
                $self
                    .closest(".faq_list")
                    .siblings(".faq_list")
                    .find(".folding_cont")
                    .slideUp(0);
                $self
                    .closest(".faq_list")
                    .siblings(".faq_list")
                    .find(".faq")
                    .removeClass("show")
                    .attr("aria-expanded", "false");
                var clickBtnOffsetTop = $self.offset().top;
                $("html, body").animate({ scrollTop: clickBtnOffsetTop }, 500);
            }
            if ($self.hasClass("show")) {
                target.slideUp(200);
                $self.removeClass("show");
                $self.attr("aria-expanded", "false");
                $self.children(".blind").html("펼침");
                $self.closest(".asList").removeClass("expanded");
                $self.closest(".tab_year").addClass("reduction"); // 2022-11-14 계좌별 금액
            } else {
                $self.addClass("show");
                $self.attr("aria-expanded", "true");
                target.slideDown(200);
                $self.children(".blind").html("닫힘");
                $self.closest(".asList").addClass("expanded");
                $self.closest(".tab_year").removeClass("reduction"); // 2022-11-14 계좌별 금액
            }
        });
    });
}



function dragSort() {
    $(".asList").sortable({
        axis: "y",
        handle: ".btnHandle",
        scroll: false,
    });
   
    
    $(".accItem").each(function () {
        if ($(this).hasClass("blockLink")) {
            $(this)
                .children("a")
                .click(function () {
                    return false;
                });
        }
    });
}


function setDatepicker(target) {
    var widgetHeader = target
        .datepicker("widget")
        .find(".ui-datepicker-header");
    var prevYrBtn = $(
        '<a class="ui-datepicker-prevY" data-handler="prevY"><span class="ui-icon">Prev Year</span></a>'
    );
    var nextYrBtn = $(
        '<a class="ui-datepicker-nextY" data-handler="nextY"><span class="ui-icon">Next Year</span></a>'
    );
    nextYrBtn.appendTo(widgetHeader);
    prevYrBtn.prependTo(widgetHeader);
    prevYrBtn.unbind("click").bind("click", function () {
        $.datepicker._adjustDate(target, -1, "Y");
    });
    nextYrBtn.unbind("click").bind("click", function () {
        $.datepicker._adjustDate(target, +1, "Y");
    });
    if (target.hasClass("bg_dim")) {
        $("body").append('<div class="dim"></div>');
    }
}

// S :   calendar
var $focusReturn2;
function beforeShow(input, e){
    var self = $(input);
    var title = self.attr("data-title");
    setTimeout(function () {
        self.prop("readonly", true);
        setDatepicker(self);
        if (typeof title !== "undefined") {
            $(".ui-datepicker-header").prepend(
                '<p class="ui_datepicker_tit" tabindex="0">' +
                    title +
                    "</p>"
            );
        }
        $("#ui-datepicker-div")
            .attr({ tabindex: "0", "aria-hidden": "false" })
            .focus();
        $focusReturn2 = self.siblings(".ui-datepicker-trigger");
        $(".ui-datepicker-year").attr("title", "년도선택");
        $(".ui-datepicker-month").attr("title", "월선택");

        if (!$(".dim").length) {
            $(".wrap").append('<div class="dim"></div>');
        }
    }, 1);

    // 220502 레이어 높이가 달력보다 높은 case 때문에 생성
    $(".layer_inner").css({ opacity: "0" });
}

function onChangeMonthYear(){
    var self = $(this);
    var title = self.attr("data-title");
    setTimeout(function () {
        setDatepicker(self);
        if (typeof title !== "undefined") {
            $(".ui-datepicker-header").append(
                '<p class="ui_datepicker_tit" tabindex="0">' +
                    title +
                    "</p>"
            );
        }
        $(".ui-datepicker-year").attr("title", "년도선택");
        $(".ui-datepicker-month").attr("title", "월선택");
    }, 1);
}


function calendar() {
    // 2022-06-28 달력 toggle인경우 추가
    
    if ($(".datepicker").parents().hasClass("jsToggleDatepicker")) {
        $(".datepicker").datepicker({
            showOn: "button",
            showAnim: "slideDown",
            showOtherMonths: true,
            changeYear: false,
            changeMonth: false,
            dateFormat: "yy.mm.dd",
            buttonText: "달력열기",
            showMonthAfterYear: true,
            showButtonPanel: false,
            yearSuffix: "년",
            dayNames: [
                "일요일",
                "월요일",
                "화요일",
                "수요일",
                "목요일",
                "금요일",
                "토요일",
            ],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
            ],
            beforeShow: function (input, e) {
                var self = $(input);
                self.prop("readonly", true);
                setTimeout(function () {
                    setDatepicker(self);
                }, 1);

                self.parents(".jsToggleDatepicker")
                    .find(".togglePickerArea")
                    .append($("#ui-datepicker-div"));
                $("#ui-datepicker-div")
                    .attr({ tabindex: "0", "aria-hidden": "false" })
                    .focus();
                $focusReturn2 = self.siblings(".ui-datepicker-trigger");

                // 2022-07-19 B1101 기간정보 캘린더 활성화시 필터 비활성 JS
                if ($(".filterItem .radioTabWrap").length) {
                    $(".filterItem .radioTabWrap")
                        .hide()
                        .siblings(".btnToggle")
                        .removeClass("on")
                        .attr("aria-expanded", "false");
                }
            },
            onChangeMonthYear: function () {
                var self = $(this);
                setTimeout(function () {
                    setDatepicker(self);
                }, 1);
            },
            onClose: function (input, e) {
                var self = $(this);
                self.prop("readonly", false);
                $("#ui-datepicker-div").attr({
                    tabindex: "-1",
                    "aria-hidden": "true",
                });
                $focusReturn2.focus();
            },
        });
        $(".datepicker").datepicker("setDate", "today"); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        function setDatepicker(target) {
            var widgetHeader = target
                .datepicker("widget")
                .find(".ui-datepicker-header");
            var prevYrBtn = $(
                '<a class="ui-datepicker-prevY" data-handler="prevY"><span class="ui-icon">Prev Year</span></a>'
            );
            var nextYrBtn = $(
                '<a class="ui-datepicker-nextY" data-handler="nextY"><span class="ui-icon">Next Year</span></a>'
            );
            nextYrBtn.prependTo(widgetHeader);
            prevYrBtn.prependTo(widgetHeader);
            prevYrBtn.unbind("click").bind("click", function () {
                $.datepicker._adjustDate(target, -1, "Y");
            });
            nextYrBtn.unbind("click").bind("click", function () {
                $.datepicker._adjustDate(target, +1, "Y");
            });
        }
    } else {
        $(".datepicker").datepicker({
            showOn: "button",
            showAnim: "slideDown",
            showOtherMonths: false,
            changeYear: true,
            changeMonth: true,
            dateFormat: "yy.mm.dd",
            buttonText: "달력열기",
            showMonthAfterYear: true,
            showButtonPanel: true,
            yearSuffix: ".",
            dayNames: [
                "일요일",
                "월요일",
                "화요일",
                "수요일",
                "목요일",
                "금요일",
                "토요일",
            ],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            monthNames: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
            ],
            monthNamesShort: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
            ],
            closeText: "닫기",
            beforeShow: beforeShow,
            onChangeMonthYear: onChangeMonthYear,
            onClose: function (input, e) {
                var self = $(this);
                setTimeout(function () {
                    self.prop("readonly", false);
                    $("body").children(".dim").remove();
                    $("#ui-datepicker-div").attr({
                        tabindex: "-1",
                        "aria-hidden": "true",
                    });
                    $focusReturn2.focus();
                    $(".wrap > .dim").remove();
                }, 1);

                // 220502 레이어 높이가 달력보다 높은 case 때문에 생성
                $(".layer_inner").css({ opacity: "1" });
            },
        });
        //초기값을 오늘 날짜로 설정
        $(".datepicker").datepicker("setDate", "today"); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        
    }
    // [S] 2022-07-19 B1101 datepicker input 활성화 체크
    if ($(".dateItem .datepicker").length) {
        $(document)
            .on("focusout", ".dateItem .datepicker", function () {
                $(this).closest(".dateItem").removeClass("on"); // 캘린더 활성화시 라인 연하게
            })
            .on("focus", ".dateItem .datepicker", function () {
                $(this)
                    .closest(".dateItem")
                    .addClass("on")
                    .siblings()
                    .removeClass("on"); // 캘린더 활성화시 라인 진하게
            });
    }
    // [E] 2022-07-19 B1101 datepicker input 활성화 체크

    // [S] 2023-01-05 x,y input focus 활성화
    if ($(".selPeriod input").length) {
        $(document)
            .on("focus", ".dateItem input", function () {
                $(".dateItem").parent(".selPeriod").addClass("on");
            })
            .on("focusout", ".dateItem input", function () {
                $(".selPeriod").removeClass("on");
            });
    } else if ($(".inp_line input").length) {
        $(document)
            .on("focus", ".inp_line input", function () {
                $(this).closest(".inp_line").addClass("on");
            })
            .on("focusout", ".inp_line input", function () {
                $(this).closest(".inp_line").removeClass("on");
            });
    }
    // [E] 2023-01-05 x,y input focus 활성화
}

function changeInputFocus() {
    // [S] 2023-03-03 challenge input focus 활성화
    if ($(".total_amount input").length) {
        $(document)
            .on("focus", ".total_amount input", function () {
                $(".input_amount").parent(".total_amount").addClass("on");
            })
            .on("focusout", ".total_amount input", function () {
                $(".total_amount").removeClass("on");
            });
    }
    // [E] 2023-03-03 challenge input focus 활성화
}

$(document).ready(function () {
    "use strict";

    // 아코디언
    btnFolding();

    // 목록편집
    dragSort();

    // 달력
    calendar();

    //change input focus활성화
    changeInputFocus();
});
