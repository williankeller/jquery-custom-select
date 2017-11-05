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
      // Add search field when open the dropdown.
      searchField: false,
      // Default element type to receive the default text (a, div, p, h).
      defaultElement: 'p',
      // Default text to display in checkbox.
      defaultText: '-',
      // Animation custom select speed.
      animationSpeed: 100,
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

    /**
     * Open or close custom select and options.
     *
     * @param {DOM} element
     * @returns {Boolean}
     */
    var toggleSelectOptions = function (element) {
      // If is already open, action to close.
      if (element.hasClass('expanded')) {
        element
          .removeClass('expanded')
          .next()
          .removeClass('opened')
          .slideUp(settings.animationSpeed);
      }
      // Otherwise, add parameters to display options.
      else {
        element
          .addClass('expanded')
          .next()
          .addClass('opened')
          .slideDown(settings.animationSpeed);
      }
      return false;
    };

    /**
     * Funtion to reach the required element.
     *
     * @param {DOM} element
     * @param {string} find
     * @returns {Object} List of parameters made.
     */
    var elementFinder = function (element, find) {
      // Intance variables.
      var $element = $(element),
        $container = $element.next(settings.classContainer),
        $finder = $container.find(find);

      return {
        element: $element,
        container: $container,
        data: $finder
      };
    };

    /**
     * Define click action to custom created element.
     *
     * @param {DOM} element
     * @returns {Boolean}
     */
    var clickSelectValues = function (element) {
      // Find DOM element.
      var finder = elementFinder(element, settings.classCurrent);

      // Detect custom click select action.
      finder.data.on('click', function () {
        var $this = $(this);

        // Open or close custom select and options.
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
      // Find DOM element.
      var finder = elementFinder(element, settings.classOptions);

      // Detect click action.
      finder.data.find('li').on('click', function () {
        var $this = $(this);

        // Select current option under the old select box.
        finder.element.find('option').filter(function () {
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
          finder.element
            .closest('form')
            .submit();
        }
      });
      return false;
    };

    /**
     * Function to search string in filter.
     *
     * @param {Object} filter
     * @returns {Boolean}
     */
    searchListContent = function (filter) {
      // Search input and start on keyup.
      $(filter).find('input').on('keyup', function () {
        // Instance query.
        var currentQuery = $(this).val().toLowerCase();

        if (currentQuery !== "") {
          // Hidden all itens on start typing.
          $(filter)
            .find('li')
            .not('.field-search')
            .addClass('hidden');

          // List items.
          $(filter).find('li').each(function () {
            // Instance current text.
            var keyword = $(this).text().toLowerCase();

            // Find by string.
            if (keyword.indexOf(currentQuery) >= 0) {
              $(this).removeClass('hidden');
            }
            ;
          });
        } else {
          // Remove class hidden by default.
          $(filter).find('li').removeClass('hidden');
        }
        ;
      });
      return false;
    }
    ;

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
