# Strength.js

The ultimate jQuery password input plugin. Featuring secure strength indicator and hide/show password

## Documentation

Strength.js provides a toggle feature for password input fields that allows the user to view or asterisk the password. It also features a strength indicator to show how secure a users password is.

The password security indicator is marked on 4 scores. These are:

* Password must contain 8 characters or more
* Password must contain 1 lowercase letter
* Password must contain 1 uppercase letter
* Password must contain 1 number

### Getting Started

#### Include the relevant files

Firstly include jQuery and the strength.css and strength.js files. Place these before `&lt;/head&gt;` section

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="strength.js"></script>
<script type="text/javascript" src="js.js"></script>
```

#### Create a password input field

You must give your password input a unique ID.

```html
<input id="myPassword" type="password" name="" value="">
```

#### Initiate the plugin

Once you have created your password input field you will need to initiate the plugin.

At its most basic level you can initiate the plugin like:

```javascript
$(document).ready(function ($) {
    $("#myPassword").strength();
});
```

If you want to initiate the plugin with options then you can do so like:

```javascript
$('#myPassword').strength({
    strengthClass: 'strength',
    strengthMeterClass: 'strength_meter',
    strengthButtonClass: 'button_strength',
    strengthButtonText: 'Show password',
    strengthButtonTextToggle: 'Hide Password',
    veryWeakLevelText: 'very weak',
    weakLevelText: 'weak',
    mediumLevelText: 'medium',
    strongLevelText: 'strong',
    strengthMeterText: 'Strength'
});
```

### Options

|Variable                 |Default Value    | Description                                                  |
|-------------------------|-----------------|--------------------------------------------------------------|
|strengthClass            | strength        | The CSS class that you want your input field to have         |
|strengthMeterClass       | strength_meter  | The CSS class that you want your input field to have         |
|strengthButtonClass      | button_strength | The CSS class that you want the toggle button to have        |
|strengthButtonText       | Show Password   | The text that you want to show for the toggle button         |
|strengthButtonTextToggle | Hide Password   | The toggled text that you want to show for the toggle button |
|veryWeakLevelText        | very weak       | Very weak password level label                               |
|weakLevelText            | weak            | Weak password level label                                    |
|mediumLevelText          | medium          | Medium password level label                                  |
|strongLevelText          | strong          | Strong password level label                                  |
|strengthMeterText        | Strength        | The text that show on strength meter                         |