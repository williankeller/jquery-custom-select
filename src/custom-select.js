(function ($) {
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
      // Change the placeholder text of the search field.
      searchText: 'Search your option here...',
      // Class to wrapper the search input field.
      searchClass: '.custom-select-search',

      // Default element type to receive the default text (a, div, p, h).
      defaultElement: 'div',
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
     * Function to search string in list of options.
     *
     * @param {Object} filter
     * @returns {Boolean}
     */
    var searchListContent = function () {
      var filter = $(settings.searchClass);
      var option = filter.parent();

      // Search input and start on keyup.
      filter.find('input').on('keyup', function () {
        // Instance query.
        var currentQuery = $(this).val().toLowerCase();

        if (currentQuery !== "") {
          // Hidden all itens on start typing.
          option.find('li').not(settings.searchClass).addClass('hidden');

          // List items.
          option.find('li').each(function () {
            // Instance current text.
            var keyword = $(this).text().toLowerCase();

            // Find by string.
            if (keyword.indexOf(currentQuery) >= 0) {
              $(this).removeClass('hidden');
            }
          });
        }
        // Remove class hidden by default.
        else {
          option.find('li').removeClass('hidden');
        }
      });
    };

    /**
     * Build custom select filter field.
     *
     * @param {Object} element
     * @returns {Boolean}
     */
    var buildCustomSearch = function (element) {
      // Display search field if is enabled.
      if (settings.searchField === true) {
        // Create search option list.
        $('<li/>', {
          'data-option': '__search__',
          'class': settings.searchClass.replace('.', '')
        }).appendTo(element);
        // Create input and append to search filter.
        $('<input>', {
          'typen': 'text',
          'placeholder': settings.searchText
        }).appendTo(settings.searchClass);

        // Function to search string in list of options.
        searchListContent();
      }
      return false;
    };

    /**
     * Hide form submit button if enabled.
     *
     * @param {Object} element
     * @returns {Boolean}
     */
    var formToSubmit = function (element) {
      // Hide button if auto submit is true.
      if (settings.autoFormSubmit === true) {
        $(element)
          .closest('form')
          .find('[type=submit]')
          .hide();
      }
      return false;
    };

    /**
     * Set select option text to custom label.
     *
     * @param {DOM} element
     * @param {Object} option
     */
    var setSelectText = function (element, option) {
      // Find DOM element.
      var finder = elementFinder(element, settings.classCurrent);
      // Define value to current text.
      finder.data.text($(option).text());
    };

    /**
     * Build list of options structure.
     *
     * @param {Object} container
     * @returns {undefined}
     */
    var buildCustomList = function (container) {
      // Build custom option to display selected value.
      $('<' + settings.defaultElement + '/>', {
        'class': settings.classCurrent.replace('.', ''),
        'text': settings.defaultText
      }).appendTo(container);

      // Build area to append the list of values.
      $('<ul/>', {
        'class': settings.classOptions.replace('.', ''),
        'role': 'menu'
      }).appendTo(container);
    };

    /**
     * Build cutom options and append to select.
     *
     * @param {DOM} element
     * @param {Object} option
     */
    var buildCustomOptions = function (element, options) {
      // Build the list of settings and append at the created ul block.
      $(element).find('option').each(function () {
        $('<li/>', {
          'data-option': $(this).val(),
          'text': $(this).text()
        }).appendTo(options);

        // If currrent option is selected.
        if ($(this).attr('selected')) {
          // Set select option text to custom label.
          setSelectText(element, this);
        }
      });
    };

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

      // Instance container created before.
      var $container = $(element).next(settings.classContainer);

      // Build list of options structure.
      buildCustomList($container);

      var $options = $container.find(settings.classOptions);

      // Build custom select filter field.
      buildCustomSearch($options);

      // Build cutom options and append to select.
      buildCustomOptions(element, $options);

      // Hide form submit button if enabled.
      formToSubmit(element);
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
     * Click action to the custom created select element.
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
     * Click action to custom created list options of new elements.
     *
     * @param {DOM} element
     * @returns {Boolean}
     */
    var clickSelectOption = function (element) {
      // Find DOM element.
      var finder = elementFinder(element, settings.classOptions);

      // Detect click action.
      finder.data.find('li').on('click', function () {
        var $select = $(this).parent().prev(),
          option = $(this).data('option').toString();

        // Check if is an option with the search filter.
        if (option === '__search__') {
          // Kill function to not set the click action.
          return false;
        }

        // Select current option under the old input select box.
        finder.element.find('option').filter(function () {
          return ($(this).val().toString()) === option;
        }).prop('selected', true);

        // Hide select options.
        toggleSelectOptions($select);

        // Check if form should be submited when change select.
        if (settings.autoFormSubmit === false) {
          // If false, just set current selection.
          setSelectText(element, this);
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
})(jQuery);
