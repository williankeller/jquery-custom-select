(function ($) {

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
      defaultElement: '<p/>',
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
     * @param {Object} element
     * @returns {Boolean}
     */
    var buildCustomSelect = function (element) {
      var $select = $(element);

      // Build the custom select container.
      $('<div/>', {
        'class': settings.classContainer.replace('.', '')
      }).insertAfter($select);

      // Hide select options.
      $select.hide();

      // Build the custom option to display selected value.
      $(settings.defaultElement, {
        'class': settings.classCurrent.replace('.', ''),
        'text': settings.defaultText
      }).appendTo(settings.classContainer);

      // Build area to append the list of values. 
      $('<ul/>', {
        'class': settings.classOptions.replace('.', ''),
        'role': 'menu'
      }).appendTo(settings.classContainer);

      // Build the list of settings and append at the created ul block.
      $select.find('option').each(function () {
        $('<li/>', {
          'data-option': $(this).val(),
          'text': $(this).text()
        }).appendTo(settings.classOptions);
      });

      // Hide button if auto submit is true.
      if (settings.autoFormSubmit === true) {
        $(element)
          .closest('form')
          .find('input[type=submit]')
          .hide();
      }
    };

    /**
     * Define click action to custom created element.
     *
     * @returns {Boolean}
     */
    var clickSelectValues = function () {
      // Detect custom select action.
      $(settings.classCurrent).on('click', function () {
        // If is already open, action to close.
        if ($(settings.classOptions).hasClass('opened')) {
          $(this)
            .removeClass('expanded')
            .next()
            .removeClass('opened')
            .slideUp();
        }
        // Otherwise, add parameters to display options.
        else {
          $(this)
            .addClass('expanded')
            .next()
            .addClass('opened')
            .slideDown();
        }
      });
      return false;
    };

    /**
     * Define click action to custom created list of elements.
     *
     * @param {Object} element
     * @returns {Boolean}
     */
    var clickSelectOption = function (element) {
      // Detect click action.
      $(settings.classOptions).find('li').on('click', function () {
        var $this = $(this);

        // Select current option under the old select box.
        $(element).find('option').filter(function () {
          return ($(this).val().toString()) === ($this.data('option').toString());
        }).prop('selected', true);

        // Hide select options.
        $(this)
          .parent()
          .removeClass('opened')
          .slideUp()
          .prev()
          .removeClass('expanded');

        // Check if form should be submited when change select.
        if (settings.autoFormSubmit === false) {
          // If false, just set current selection.
          $(this)
            .parent()
            .prev()
            .text($this.text());
        }
        // If true, submit select form.
        else {
          $(element)
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
     */
    return this.each(function () {
      // Build the custom select elements.
      buildCustomSelect(this);
      // Define click action to custom created element.
      clickSelectValues();
      // Define click action to custom created list of elements.
      clickSelectOption(this);
    });
  };
})(jQuery);
