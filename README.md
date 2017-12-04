## Custom jQuery Select [![Version](https://img.shields.io/badge/Version-1.2-orange.svg)](https://github.com/williankeller/jquery-custom-select/blob/master/CONTRIBUTING.md) [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

This plug-in allow you customize your form select select options easily and with a small library.

You can define some setting to start or just use the default options, follow:


#### Example One:
Simple and standard use, just define the current select class.
This use will transform all the selects that contains the `select-one` class into a custom select.
```javascript
$('.select-one').customSelect();
```

#### Example Two:
Adding a custom title to your select *(default - )*:
This setup will add a custom title inside your custom select.
```javascript
$('.select-two').customSelect({
  defaultText: 'Select your option here'
});
```

#### Example three:
Changing click element *(default p)*.
This setup will replace the tag click element, example, if you need the click became a div or a heading.
```javascript
$('.select-three').customSelect({
  defaultElement: 'h5',
});
```

#### Example Four:
Allow you to define an animation speed, that means you can set values to your dropdown open fast or slowly *(default 100 - here using 600)*.
```javascript
$('.select-four').customSelect({
  animationSpeed: 600
});
```

#### Example Five
Submit form when select an option *(default false)*.
If exist an element with the submit type, it will be hidden automatically and the form will be submitted automatically when option is changed.
```javascript
$('.select-five').customSelect({
  autoFormSubmit: true
});
```

#### Example Six
This option allow your select options to display a search filter, this way you might find your option just typing the initial word *(default false)*.
```javascript
$('.select-six').customSelect({
  searchField: true,
  searchText: 'Search your option here...', // optional
});
```

See this page for live example: https://williankeller.github.io/jquery-custom-select/
