/**
 * change the theme for the page to the one clicked on
 * 
 * @param {string} theme is the theme we are switching to
 */
function changeTheme(theme) {
	document.body.style.background = '';
	var link = document.getElementById('theme');
	var url = '/stylesheets/' + theme + "_theme.css";
	link.href = url;

	var _ctheme = document.getElementById('colorful-theme');
	var _itheme = document.getElementById('light-theme');
	var _dtheme = document.getElementById('dark-theme');
	var _dytheme = document.getElementById('dynamic-theme');
	switch (theme) {
		case 'colorful':
			_ctheme.classList.add('current-theme');
			_itheme.classList.remove('current-theme');
			_dtheme.classList.remove('current-theme');
			_dytheme.classList.remove('current-theme');
			break;
		case 'dark':
			_dtheme.classList.add('current-theme');
			_itheme.classList.remove('current-theme');
			_ctheme.classList.remove('current-theme'); 
			_dytheme.classList.remove('current-theme');
			break;
		case 'dynamic':
			_dytheme.classList.add('current-theme');
			_itheme.classList.remove('current-theme');
			_dtheme.classList.remove('current-theme');
			_ctheme.classList.remove('current-theme');
			changeBgGradient(document.getElementById('current-track-image'));
			break;
		default:
			_itheme.classList.add('current-theme');
			_ctheme.classList.remove('current-theme');
			_dtheme.classList.remove('current-theme');
			_dytheme.classList.remove('current-theme');
	}
}