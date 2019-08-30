if (localStorage.getItem('theme') === 'dark') {
	addDarkStyle()
}

function addDarkStyle() {
	var darkstyle = document.getElementById('darkstyle');
	if (!darkstyle) {
		var theme = document.createElement('link');
		theme.id = 'darkstyle';
		theme.rel = 'stylesheet';
		theme.href = '/css/dark.css';
		document.head.appendChild(theme);
	}
}

function setActiveStyleSheet(theme) {
	localStorage.setItem('theme', theme)
	document.getElementById('darkstyle').disabled = theme !== 'dark';
}

function togglestyle() {
        var theme = localStorage.getItem('theme');
        if(theme === 'light') {
		addDarkStyle()
                setActiveStyleSheet('dark');
        } else {
                setActiveStyleSheet('light');
        }
}
