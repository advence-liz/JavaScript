/*!
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 *
 * Copyright (c) 2012-2014, Chris Dance and PaperCut Software http://www.papercut.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:  chris.dance@papercut.com
 * Version: 1.9.0
 * Date:    13th August 2014
 */
(function($) {
  
    $.fn.areYouSure = function (options) {
        $form = $(this);
        var settings = $.extend(
          {
              'message': 'You have unsaved changes!',
              'dirtyClass': 'dirty',
              'change': null,
              'silent': false,
              'addRemoveFieldsMarksDirty': false,
              'fieldEvents': 'change keyup propertychange input',
              'fieldSelector': "input[type!=file],textarea,[data-type]",
              'submitSelector': ""
          }, options);

        var getValue = function ($field) {
            if ($field.hasClass('ays-ignore')
                || $field.hasClass('aysIgnore')
                || $field.attr('data-ays-ignore')) {
                return null;
            }

            if ($field.is(':disabled')) {
                return 'ays-disabled';
            }

            var val;
            var type =$field.attr('data-type')?$field.attr('data-type'): $field.attr('type') ;
            if ($field.is('select')) {
                type = 'select';
            }

            switch (type) {
                case 'checkbox':
                case 'radio':
                    val = $field.is(':checked');
                    break;
                case 'money':
                    val = ($field.val()-0).toFixed(2);
                    break;
                case 'select':
                    val = '';
                    $field.find('option').each(function (o) {
                        var $option = $(this);
                        if ($option.is(':selected')) {
                            val += $option.val();
                        }
                    });
                    break;
                case 'dropdown':
                    val = $field.find('input').val();
                    break;
                case 'uploader':
                    val = $field.attr('data-value');
                    break;
                default:
                    val = $field.val();
            }
            return val;
        };

        var storeOrigValue = function ($field) {
            $field.data('ays-orig', getValue($field));
        };

        var checkForm = function (evt) {

            var isFieldDirty = function ($field) {
                if ($field.attr('data-type') == 'table') {
                    return $field.attr('data-value') == "true";
                }
                var origValue = $field.data('ays-orig');
                if (undefined === origValue) {
                    return false;
                }
                return (getValue($field) != origValue);
            };
            var $subForm = ($(this).hasClass('form-for-check'))
                ? $(this)
                : $(this).parents('.form-for-check');
            // Test on the target first as it's the most likely to be dirty
            if (isFieldDirty($(evt.target))) {
                setDirtyStatus($subForm,true);
                return;
            }

            $fields = $subForm.find(settings.fieldSelector);

            if (settings.addRemoveFieldsMarksDirty) {
                // Check if field count has changed
                var origCount = $subForm.data("ays-orig-field-count");
                if (origCount != $fields.length) {
                    setDirtyStatus($subForm,true);
                    return;
                }
            }

            // Brute force - check each field
            var isDirty = false;
            $fields.each(function () {
                $field = $(this);
                if (isFieldDirty($field)) {
                    isDirty = true;
                    return false; // break
                }
            });

            setDirtyStatus($subForm,isDirty);
        };

        var initForm = function ($subForm) {
            var fields = $subForm.find(settings.fieldSelector);
            $(fields).each(function () { storeOrigValue($(this)); });
            $(fields).unbind(settings.fieldEvents, checkForm);
            $(fields).bind(settings.fieldEvents, checkForm);
            $(fields).each(function () {
                if ($(this).attr('data-type') == 'dropdown') {
                    $(this).bind('valueChanged', checkForm);
                }
            })
            $subForm.data("ays-orig-field-count", $(fields).length);
            setDirtyStatus($subForm,false);
        };

        var setDirtyStatus = function ( $subForm,isDirty) {
            var changed = isDirty != $subForm.hasClass(settings.dirtyClass);
            $subForm.toggleClass(settings.dirtyClass, isDirty);

            // Fire change event if required
            if (changed) {
                if (settings.change) settings.change.call($subForm, $subForm);

                if (isDirty) $subForm.trigger('dirty.areYouSure', [$subForm]);
                if (!isDirty) $subForm.trigger('clean.areYouSure', [$subForm]);
                $subForm.trigger('change.areYouSure', [$subForm]);
            }
        };

        var rescan = function () {
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () {
                var $field = $(this);
                if (!$field.data('ays-orig')) {
                    storeOrigValue($field);
                    $field.bind(settings.fieldEvents, checkForm);
                }
            });
            // Check for changes while we're here
            $form.trigger('checkform.areYouSure');
        };

        var reinitialize = function () {
            initForm($(this));
        }

        if (!settings.silent && !window.aysUnloadSet) {
            window.aysUnloadSet = true;
            window.onbeforeunload= function () {
                $dirtyForms = $('.form-for-check').filter('.' + settings.dirtyClass);
                if ($dirtyForms.length == 0) {
                    return;
                }
                // Prevent multiple prompts - seen on Chrome and IE
                if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
                    if (window.aysHasPrompted) {
                        return;
                    }
                    window.aysHasPrompted = true;
                    window.setTimeout(function () { window.aysHasPrompted = false; }, 900);
                }
                return settings.message;
            };
        }

        return this.each(function (elem) {
            var $submitButtons = $(settings.submitSelector);

            if (!$submitButtons.data('hasremoveFunc')) {
                $submitButtons.on('click', function () {
                    $('.form-for-check').removeClass(settings.dirtyClass);
                }).data('hasremoveFunc', true);
            }
            $form.bind('reset', function () { setDirtyStatus($(this),false); });
            // Add a custom events
            $form.bind('rescan.areYouSure', rescan);
            $form.bind('reinitialize.areYouSure', reinitialize);
            $form.bind('checkform.areYouSure', checkForm);
            initForm($form);
        });
    };
})(jQuery);
