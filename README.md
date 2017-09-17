## Custom jQuery Select

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
Submit form when select an option *(default false)*.
If exist an element with the submit type, it will be hidden automatically and the form will be submitted automatically when option is changed.
```javascript
$('.select-four').customSelect({
  autoFormSubmit: true,
});
```

See this page for live example: https://williankeller.github.io/jquery-custom-select/
