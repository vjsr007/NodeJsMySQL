﻿var webroot="";
var _names = 	{
					Sistema:"NodeJsMySQL"
				};
var App = {};
(function (self) {
    "use strict";
    
    self.mensajeSinRegistros = $('<div style="text-align:center;height:20px;padding-top:5px">Sin registros que mostrar</div>');

    self.dontBlock = false;

    var NoAutencticadoReditect = webroot + "Login/Index";

    var init = function () {
        ///<summary>Ejecución al realizar $.ready()</summary>
        $("#cmbIdioma").change(function (e) {
            e.preventDefault();
            window.location = $('#' + $(this).val()).attr('href');
        });
    };

    var configBlockUI = function () {
        $.blockUI.defaults.css = {
            padding: '6px 0',
            margin: '-18px 0 0 -83px',
            width: '240px',
            height: '20x',
            top: '50%',
            left: '45%',
            border: 'none',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            baseZ: 100000
        };

        // styles for the overlay 
        $.blockUI.defaults.overlayCSS = {
            backgroundColor: '#286090',
            opacity: 0.3,
            cursor: 'wait',
            position: 'realtive',
            baseZ: 100000
        };

        $.blockUI.defaults.message = '<label style="float:left; margin-left: 30px; margin-right: 10px; font-size: 12px; font-weight: normal;">Un momento por favor</label><marquee style="height: 20px; width: 30px; float:left;">. . .</marquee>';

    }

    var configAjax = function () {
        $(document).ajaxSend(function (evt, request, settings) {

        }).ajaxStart(function (evt) {
            if (!self.dontBlock) {
                $.blockUI();
            }
        }).ajaxStop(function () {
            $('*').each(function () {
                if ($(this).css('cursor') == 'wait') $(this).css('cursor', 'default');
            });

            $.unblockUI();
        }).ajaxSuccess(function (e, xhr, settings, data) {
            try { var data = $.parseJSON(data) } catch (e) { };
            if (data.NoAutenticado) {
                Utils.mostrarMensaje("", "Se ha perdido la sesión se redirigirá al inicio de sesión", null, function () {
                    window.location = NoAutencticadoReditect;
                });

                return false;
            }
            if (data.NoAutorizado) {
                Utils.mostrarMensaje("", "No tiene acceso a la siguiente función: " + settings.url);

                return false;
            }
            if (data.error) {
                throw new Error(data)

                return false;
            }			
        }).ajaxError(function (e, jqxhr, settings, thrownError) {
            $.unblockUI();

            Utils.mostrarMensaje("Error: " + settings.url, thrownError);

            e.preventDefault();

            return true;
        });
    }

    var load = function () {
        handledError();

        //<summary>Cargar al momento</summary>
        $(init);

        configBlockUI();
        
        configAjax();

        initAngular();
    }

    var initAngular = function () {
        self.Angular = angular
            .module("Catalogos", [])
            .directive('paintedUsers', function () {
                return function ($scope, element, attrs) {
                    if ($scope.$last) {
                        $scope.bindingUI();
                    }
                };
            })
            .filter('getById', function () {
                return function (input, id, property) {
                    var i = 0, len = input.length;
                    for (; i < len; i++) {
                        if (+input[i][property] == +id) {
                            return input[i];
                        }
                    }
                    return null;
                }
            });
    }

    var handledError = function () {
        window.onerror = function (message) {
            $.unblockUI();
            Utils.mostrarMensaje(_names.Sistema, JSON.stringify(message));
        };
    }

    load();

})(App);