//	https://chrisbuttery.com/articles/fade-in-fade-out-with-javascript/

// fade out
function fadeOut(el){
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// fade in
function fadeIn(el){
  el.style.opacity = 0;
  el.style.display = null;

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function selectTable(name) {
	//get the button
	var newButton = document.getElementById('selector-'+name);
	//if its active return
	if (newButton.classList.contains('is-active')) {
		return;
	}
	//remove active from previous button
	var oldButtons = document.getElementsByClassName('category-selector is-active')
	if (oldButtons.length > 0)
	oldButtons[0].classList.toggle('is-active')

	//add active to new button
	newButton.classList.toggle('is-active')

	//hide all category
	var oldCategories = document.querySelectorAll('[id^=category-]')
	for (var i = 0; i < oldCategories.length; i++) {
		fadeOut(oldCategories[i])
	}

	//show new category
	var newCategory = document.getElementById('category-'+name)
	fadeIn(newCategory)

	//set the hash for next time
	window.location.hash = '#'+name;
}

var categories = document.getElementsByClassName('category-selector')
for (var i = 0; i < categories.length; i++) {
	categories[i].addEventListener('click', function(e) { 
		selectTable(e.target.id.split('-')[1])
	})
}
var startCategory = (window.location.hash.substring(1) == '!' ? 'General' : window.location.hash.substring(1)) || 'General';
selectTable(startCategory);
