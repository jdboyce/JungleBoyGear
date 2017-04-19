

if (navigator.userAgent.match(/IEMobile\/10\.0|IEMobile\/11\.0/)) {
    var msViewportStyle = document.createElement("style")
    msViewportStyle.appendChild(
      document.createTextNode(
        "@-ms-viewport{width:auto!important}"
      )
    )
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}


(function ($)
{
    "use strict";

    //$(window).load(function () {
    //    $(".header-selectors-wrapper select").each(function () {
    //        var outerelement = $("<div class='header-selectors-replace'>");
    //        var innerelement = $("<span>");
    //        outerelement.append(innerelement);
    //        innerelement.text($(this).children("option:selected").text());
    //        $(this).css({ opacity: 0 }).parent().append(outerelement);
    //    });
    //    var headerselected = false;
    //    $(".header-arrow").click(function () {
    //        $(".master-wrapper-header-bottom,.master-wrapper-content").toggle();
    //        headerselected = !headerselected;
    //        if (headerselected)
    //            $(this).addClass("selected");
    //        else
    //            $(this).removeClass("selected");
    //    });
    //    var headerobject = $('.master-wrapper-sticky-header');
    //    var scrollTimer = null;
    //    var wincache = $(window);
    //    var completed = true;
    //    wincache.bind("scroll resize", function (event) {
    //        util.settimer();
    //    });
    //    var util = {
    //        settimer: function () {
    //            if (completed) {
    //                completed = false;
    //                scrollTimer = setTimeout(function () {
    //                    util.setposition();
    //                }, 200);
    //            }
    //        },
    //        setposition: function () {
    //            headerobject.css('left', -wincache.scrollLeft());
    //            completed = true;
    //        }
    //    };
    //    $(".top-menu > li").hover(function () {
    //        if ($(this).hasClass("megamenu"))
    //            $(this).children("ul,.block").css({ "left": -($(this).position().left + $(this).parent().position().left), "width": "960px" });
    //        $(this).children("ul,.block").show();
    //        $(this).children("a").addClass("navhover");
    //    }, function () {
    //        $(this).children("ul,.block").hide();
    //        $(this).children("a").removeClass("navhover");
    //    });
    //});

    $(document).ready(function () {

        var config = ThemeXConfiguration;

        if (config != null && config.hideproductselectors)
            $('.product-selectors').addClass('hide');

        var util = {
            addIcon: function (object, classes) {
                $('<i class="' + classes + '" style="margin-right:10px;width:30px;height:30px;padding-top:7px;text-align:center;margin-top:-7px;margin-left:0px;"></i>').insertBefore(object);
            },
            addIconInline: function (object, classes) {
                $(object).prepend('<i class="' + classes + '" style="margin-right:7px;"></i>');
            },
            addIconCircle: function (object, classes) {
                $('<span class="icon-stack pull-left"><i class="icon-circle icon-large icon-stack-base"></i><i class="icon-envelope"></i></span>').insertBefore(object);
            }
        };
        //util.addIcon('.block-popular-tags .title', 'icon-tags icon-2x pull-left');
        //util.addIcon('.block-recently-viewed-products .title', 'icon-eye-open icon-2x pull-left');
        //util.addIcon('.block-poll .title', 'icon-comments icon-2x pull-left');
        //util.addIcon('.master-wrapper-footer .block-info .title', 'icon-info-sign icon-2x pull-left');
        //util.addIconInline('.master-wrapper-footer .block-info li a', 'icon-caret-right');
        //util.addIcon('.block-newsletter .title', 'icon-envelope icon-2x pull-left');

        //util.addIconInline('.footer-poweredby', 'icon-gear');

        //util.addIcon('.add-to-cart-button', 'icon-shopping-cart icon-large');
        $('.add-to-cart-button, .product-box-add-to-cart-button').each(function () {
            var onclick = $(this).attr('onclick');
            $('<div class="button-cart-outer aniicon"><a class="button-cart hoverpop" onclick="' + onclick + '"><span class="glyphicons cart-in carticon"></span><div class="carttext">' + $(this).attr('value') + '</div></a></div>').insertBefore($(this));
        });

        // YAMM click in dropdown
        $(document).on('click', '.yamm .dropdown-menu', function (e) {
            e.stopPropagation();
        });


        var navbartogglestate = 1;
        $('.navbar-collapse').on('show.bs.collapse', function (e) {
            var navcolumnright = $('.navcolumn-right, .navcolumn-left');
            if (navcolumnright.length) {
                if (navbartogglestate == 1) {
                    navcolumnright.addClass('open');
                    e.preventDefault();
                }
                navbartogglestate++;
            }
        });

        $('.navbar-collapse').on('hide.bs.collapse', function (e) {
            var navcolumnright = $('.navcolumn-right, .navcolumn-left');
            if (navcolumnright.length) {
                navcolumnright.removeClass('open');
                navbartogglestate = 1;
            }
        });

        $('.navbar-nav .dropdown').on('shown.bs.dropdown', function () {
            var c = $(this).parent().children("li");
            c.removeClass("openhide").not(".open").addClass("openhide");
            $(this).find(".plussign").removeClass("plussign").addClass("minussign");
        });

        $('.navbar-nav .dropdown').on('hidden.bs.dropdown', function () {
            var c = $(this).parent().children("li");
            c.removeClass("openhide");
            $(this).find(".minussign").removeClass("minussign").addClass("plussign");
        });

        header_size();
        scroll_top_fade();
        $('a[href*=#]').not('[href*=#tabs-]').smoothscroll();

        //var inboxtable = $('#pm-inbox-table');
        //$('input[type="checkbox"], input[type="radio"]').each(function () {
        //    var $this = $(this);
        //    if (!inboxtable.length)
        //        $this.bootstrapSwitch();
        //});
        //$('input[type="checkbox"], input[type="radio"]').bootstrapSwitch();
        var colorsquares = $('.color-squares');
        $('input[type="checkbox"], input[type="radio"]').each(function () {
            var $this = $(this), omit = false;
            if (colorsquares.length) {
                if($this.prev().hasClass("color-container"))
                    omit = true;
            }
            if (!omit)
                $this.bootstrapSwitch();
        });


        //var last = 0;
        //var delay = 0;
        //$.waypoints.settings.scrollThrottle = 50;
        //var waypointsoptions1 = { offset: '100%', triggerOnce: true };
        //$('.aniicon').waypoint(function (direction) {
        //    var now = new Date().getTime();
        //    if (now - last > 800)
        //        delay = 0;
        //    last = now;
        //    var $this = $(this);
        //    setTimeout(function () {
        //        $this.addClass("anistart");
        //    }, delay);
        //    delay += 15;
        //}, waypointsoptions1);

        $(".product-grid, .sub-category-grid, .manufacturer-grid, .home-page-category-grid").each(function (i, item) {
            $(".item-box", $(item)).wrapAll("<div class='isotoperow' />");
        });

        var isotopelist = [];
        isotopelist.push({
            element: $('.isotoperow')
            //options: { animationEngine: 'css' },
            //mode: 1
        });
        for (var i in isotopelist) {
            var item = isotopelist[i];
            item.element.isotope(item.options);
            item.element.isotope('on', 'layoutComplete', function (isoInstance, laidOutItems) {
                  $.waypoints('refresh');
            });
        }
        //$(window).smartresize(function () {
        //    for (var i in isotopelist) {
        //        var item = isotopelist[i];
        //        if (item.mode == 1) {
        //            //if ($(this).width() < 768)
        //            item.element.isotope(item.options);
        //        }
        //    }
        //});

        // Random Footer Top Images
        //var footerimageclass = 'image' + Math.floor((Math.random() * 9) + 1);
        //$('.master-wrapper-footer-top').addClass(footerimageclass);


        var last = 0;
        var delay = 0;
        $.waypoints.settings.scrollThrottle = 50;
        var waypointsoptions1 = { offset: '100%', triggerOnce: true };
        $('.aniicon').waypoint(function (direction) {
            var now = new Date().getTime();
            if (now - last > 800)
                delay = 0;
            last = now;
            var $this = $(this);
            setTimeout(function () {
                $this.addClass("anistart");
            }, delay);
            delay += 15;
        }, waypointsoptions1);

        // Crap workaround for isotope changes height - find another solution
        //setTimeout(function () {
        //    $.waypoints('refresh');
        //}, 1000);

        setTimeout(function () {
            $('.startstyles').removeClass('startstyles');
        }, 0);

        //var t1 = new Date().getTime();
        $('select').each(function () {
            $(this).selectpicker({
                width: 'auto'
            });
        });
        //$('body').prepend('<div>' + (new Date().getTime() - t1) + '</div>');

        if (window.Checkout !== undefined) {
            var function_chained = window.Checkout.setStepResponse;
            window.Checkout.setStepResponse = function (response) {
                var ret = function_chained(response);
                $('select').not('.selectpickeradded').each(function () {
                    $(this).selectpicker({
                        width: 'auto'
                    });
                });
                addfootable();
                $('input[type="checkbox"], input[type="radio"]').bootstrapSwitch();
                return ret;
            };
        }

        $(document).ajaxComplete(function (event, request, settings) {
            var active = $(event.target.activeElement);
            if (active.hasClass('btn')) {
                var refreshafter = false;
                $('select').each(function () {
                    var $this = $(this);
                    if (refreshafter) {
                        $this.selectpicker('refresh');
                        return false;
                    }
                    if (active.is($this.next().children().first()))
                        refreshafter = true;
                });
            }
        });

        var waypointsoptions2 = { offset: '100%', triggerOnce: true };
        $('.product-item, .sub-category-item, .manufacturer-item, .category-item').waypoint(function (direction) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass("anistart");
            }, 0);
        }, waypointsoptions2);


        $(".rating").each(function (i, item) {
            var $this = $(this);
            var top = $this.children('div');
            top.addClass('rating-top');
            var bottom = $('<div class="rating-bottom"></div>');
            $this.prepend(bottom);
            bottom.append('<span class="glyphicons star-empty"></span>');
            bottom.append('<span class="glyphicons star-empty"></span>');
            bottom.append('<span class="glyphicons star-empty"></span>');
            bottom.append('<span class="glyphicons star-empty"></span>');
            bottom.append('<span class="glyphicons star-empty"></span>');
            top.append('<span class="glyphicons star"></span>');
            top.append('<span class="glyphicons star"></span>');
            top.append('<span class="glyphicons star"></span>');
            top.append('<span class="glyphicons star"></span>');
            top.append('<span class="glyphicons star"></span>');
        });
        
        $('input[type="file"]').each(function (i, item) {
            var $this = $(this);
            $this.wrapAll('<span class="btn btn-primary btn-file">Browse...</span>');
            var $filename = $('<span class="btn btn-file"></span>');
            $this.parent().after($filename);
            $this.change(function () {
                var input = $(this),
                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                $filename.text(label);
            });
        });

        addfootable();

        // AjaxCart.success_process override
        AjaxCart.success_process = function (response) {
            if (response.updatetopcartsectionhtml) {
                $("body").trigger("NopCartAdded", response);
                $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
            }
            if (response.updatetopwishlistsectionhtml) {
                $("body").trigger("NopWishListAdded", response);
                $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
            }
            if (response.updateflyoutcartsectionhtml) {
                $(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
            }
            if (response.message) {
                //display notification
                if (response.success == true) {
                    //success
                    if (AjaxCart.usepopupnotifications == true) {
                        displayPopupNotification(response.message, 'success', true);
                    }
                    else {
                        //specify timeout for success messages
                        displayBarNotification(response.message, 'success', 3500);
                    }
                }
                else {
                    //error
                    if (AjaxCart.usepopupnotifications == true) {
                        displayPopupNotification(response.message, 'error', true);
                    }
                    else {
                        //no timeout for errors
                        displayBarNotification(response.message, 'error', 0);
                    }
                }
                return false;
            }
            if (response.redirect) {
                location.href = response.redirect;
                return true;
            }
            return false;
        };


        $("body").on("NopCartAdded", function (event, data) {
            $("#cartheaderbutton").addClass("active highlight");
        });
        $("body").on("NopWishListAdded", function (event) {
            $("#wishlistheaderbutton").addClass("active highlight");
        });


        setTimeout(function () {
            $(".navbar-nav").find(".dropdown-menu .active").each(function () {
                $(this).parents("li").addClass("active");
            });
        }, 100);


    });


    function addfootable() {
        $('table.footable:not(.footable-loaded)').footable({
            breakpoints: {
                phone: 600,
                tablet: 800
            }
        });
    }



    function header_size() {
        var win = $(window),
        header = $('.navbar'),
        isMobile = 'ontouchstart' in document.documentElement,
        scrollTimer = null,
        ismax = true,
        set_height = function () {
            var st = win.scrollTop()
            if (st < 30) {
                if(!ismax)
                    header.removeClass('navbar-small');
                ismax = true;
            }
            else {
                if (ismax)
                    header.addClass('navbar-small');
                ismax = false;
            }
        }
        if (!header.length) return false;
        //if (isMobile) return false;
        win.scroll(function () {
            if (scrollTimer)
                clearTimeout(scrollTimer);
            scrollTimer = setTimeout(set_height, 0);
        });
        set_height();
    }



    function scroll_top_fade() {
        var win = $(window),
            timeo = false,
            scroll_top = $('#scroll-top-link'),
            scrollTimer = null,
            isVisible = false,
            set_status = function () {
                var st = win.scrollTop();
                if (st < 400) {
                    if (isVisible)
                        scroll_top.removeClass('pop_class');
                    isVisible = false;
                }
                else {
                    if (!isVisible)
                        scroll_top.addClass('pop_class');
                    isVisible = true;
                }
            };

        win.scroll(function () {
            if (scrollTimer)
                clearTimeout(scrollTimer);
            scrollTimer = setTimeout(set_status, 0);
        });
        set_status();
    }



})(jQuery);








(function ($) {
    $.fn.smoothscroll = function (variables) {
        var fixedMainPadding = 0;
        return this.each(function () {
            $(this).click(function (e) {
                var newHash = this.hash,
                    clicked = $(this),
                    data = clicked.data();
                if (newHash != '' && newHash != '#' && newHash != '#prev' && newHash != '#next' && !$(this).is('.comment-reply-link, #cancel-comment-reply-link, .no-scroll')) {
                    var container = $(this.hash);
                    if (container.length) {
                        var target = container.offset().top - fixedMainPadding,
                            oldLocation = window.location.href.replace(window.location.hash, ''),
                            newLocation = this,
                            duration = data.duration || 800,
                            easing = data.easing || 'easeOutQuint';

                        if (oldLocation + newHash == newLocation) {
                            $('html:not(:animated),body:not(:animated)').animate({ scrollTop: target }, duration, easing, function () {
                                if (window.history.replaceState)
                                    window.history.replaceState("", "", newLocation);
                            });
                            return false;
                        }
                    }
                }
            });
        });
    };
})(jQuery);
