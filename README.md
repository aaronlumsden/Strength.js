Strength.js
===========

The ultimate jQuery password input plugin. Featuring secure strength indicator and hide/show password

### Documentation

Strength.js provides a toggle feature for password input fields that allows the user to view or asterisk the password. It also features a strength indicator to show how secure a users password is.

#### ..:: Demo
For a demo visit http://git.aaronlumsden.com/strength.js/


The password secuirty indicator is marked on 4 scores. These are

*   Password must contain 8 characters or more
*   Password must contain 1 lowercase letter
*   Password must contain 1 uppercase letter
*   Password must contain 1 number

#### ..:: Getting Started

##### Include the relevant files

Firstly include jQuery and the strength.css and strength.js files. Place these before `&lt;/head&gt;` section

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="strength.js"></script>
	<script type="text/javascript" src="js.js"></script>
					

##### Create a password input field

You must give your password input a unique ID.

	<input id="myPassword" type="password" name="" value="">

##### Initiate the plugin

Once you have created your password input field you will need to initiate the plugin.

At its most basic level you can initiate the plugin like:

						
	$(document).ready(function ($) {

        $("#myPassword").strength();

    });
					

If you want to initiate the plugin with options then you can do so like:

								
	$('#myPassword').strength({
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show password',
            strengthButtonTextToggle: 'Hide Password'
        });		

#### ..:: Options

<table>
							<thead>
								<tr>
									<th>Variable</th>
									<th>Default Value</th>
									<th>Description</th>
									<th>Valid Options</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>strengthClass</td>
									<td>strength</td>
									<td>The CSS class that you want your input field to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthMeterClass</td>
									<td>strength_meter</td>
									<td>The CSS class that you want your input field to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonClass</td>
									<td>button_strength</td>
									<td>The CSS class that you want the toggle button to have</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonText</td>
									<td>Show Password</td>
									<td>The text that you want to show for the toggle button</td>
									<td></td>
								</tr>
								<tr>
									<td>strengthButtonTextToggle</td>
									<td>Hide Password</td>
									<td>The toggled text that you want to show for the toggle button</td>
									<td></td>
								</tr>

							</tbody>
						</table>
