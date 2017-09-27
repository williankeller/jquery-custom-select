(function ($, window, document) {
  "use strict";

  /**
   * Define global function to set a custom select.
   *
   * Basic usage:
   * $('select').customSelect();
   *
   * @param {Object} options
   * @return {jQuery}
   */
  $.fn.customSelect = function (options) {

    /**
     * Default configuration parameters.
     *
     * @type {Object}
     */
    var defaults = {
      // Submit form when select option is selected.
      autoFormSubmit: false,
      // Default element type to receive the default text (a, div, p, h).
      defaultElement: 'p',
      // Default text to display in checkbox.
      defaultText: '-',
      // Class to wrapper all the custom select elements.
      classContainer: '.custom-select-container',
      // Class to define current selected option text.
      classCurrent: '.custom-select-current',
      // Class to list of select options.
      classOptions: '.custom-select-options'
    };
    // Merging settings.
    var settings = $.extend({}, defaults, options);

    /**
     * Build the custom select elements.
     *
     * @param {DOM} element
     * @returns {Boolean}
     */
    var buildCustomSelect = function (element) {
      // Hide select options.
      $(element).hide();

      // Build the custom select container.
      $('<div/>', {
        'class': settings.classContainer.replace('.', '')
      }).insertAfter(element);

      // Build custom option to display selected value.
      var $container = $(element).next(settings.classContainer);
      $('<' + settings.defaultElement + '/>', {
        'class': settings.classCurrent.replace('.', ''),
        'text': settings.defaultText
      }).appendTo($container);

      // Build area to append the list of values.
      $('<ul/>', {
        'class': settings.classOptions.replace('.', ''),
        'role': 'menu'
      }).appendTo($container);

      // Build the list of settings and append at the created ul block.
      var $options = $container.find(settings.classOptions);
      $(element).find('option').each(function () {
        $('<li/>', {
          'data-option': $(this).val(),
          'text': $(this).text()
        }).appendTo($options);
      });

      // Hide button if auto submit is true.
      if (settings.autoFormSubmit === true) {
        $(element)
          .closest('form')
          .find('[type=submit]')
          .hide();
      }
    };

    var toggleSelectOptions = function (element) {
      // If is already open, action to close.
      if (element.hasClass('expanded')) {
        element
          .removeClass('expanded')
          .next()
          .removeClass('opened')
          .slideUp(100);
      }
      // Otherwise, add parameters to display options.
      else {
        element
          .addClass('expanded')
          .next()
          .addClass('opened')
          .slideDown(100);
      }
    };

    /**
     * Define click action to custom created element.
     *
     * @param {DOM} element
     * @returns {Boolean}
     */
    var clickSelectValues = function (element) {
      // DOM element variables.
      var $element = $(element),
        $container = $element.next(settings.classContainer),
        $select = $container.find(settings.classCurrent);

      // Detect custom click select action.
      $select.on('click', function () {
        var $this = $(this);

        toggleSelectOptions($this);
      });
      return false;
    };

    /**
     * Define click action to custom created list of new elements.
     *
     * @param {DOM} element
     * @returns {Boolean}
     */
    var clickSelectOption = function (element) {
      // DOM element variables.
      var $element = $(element),
        $container = $element.next(settings.classContainer),
        $options = $container.find(settings.classOptions);

      // Detect click action.
      $options.find('li').on('click', function () {
        var $this = $(this);

        // Select current option under the old select box.
        $element.find('option').filter(function () {
          return ($(this).val().toString()) === ($this.data('option').toString());
        }).prop('selected', true);

        // Find select option.
        var $select = $this.parent().prev();
        // Hide select options.
        toggleSelectOptions($select);

        // Check if form should be submited when change select.
        if (settings.autoFormSubmit === false) {
          // If false, just set current selection.
          $this
            .parent()
            .prev()
            .text($this.text());
        }
        // If true, submit select form.
        else {
          $element
            .closest('form')
            .submit();
        }
      });
      return false;
    };

    /**
     * Return to render and build to each matched elements.
     *
     * @see buildCustomSelect
     * @see clickSelectValues
     * @see clickSelectOption
     *
     * @param {DOM} elements
     * @returns {DOM}
     */
    var init = function (elements) {
      // Tracks all elements passed in the function.
      elements.each(function () {

        // Build the custom select elements.
        buildCustomSelect(this);

        // Define click action to custom created element.
        clickSelectValues(this);

        // Define click action to custom created list of elements.
        clickSelectOption(this);
      });
      return elements;
    };

    /**
     * Return to render and build to each matched elements.
     */
    return init(this);
  };
})(jQuery, window, document);
