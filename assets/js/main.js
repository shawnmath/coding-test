// Main function after DOM load
document.addEventListener("DOMContentLoaded", LatestNewsMod);

function LatestNewsMod(){
	// Store DOM elems, set vars
	var list_items = document.querySelectorAll(".item"),	
		controls = document.querySelectorAll(".controls > div"),
		next = document.getElementById("next"),
		prev = document.getElementById("prev"),
		gradientTop = document.querySelector(".gradient-top"),
		gradientBottom = document.querySelector(".gradient-bottom"),
		content = document.querySelector(".content ul"),
		contentWrapper = document.querySelector(".content"),
		scrollItems = null,
		itemNumber = 0,
		scrollPositions = {}, // list items object storing offset top positions
		numOfScrollItems = null,
		numOfLinksOnPage = 6; // edit to change number of links on a page

	// Populate scrollPositions object
	for(var i = 0; i < list_items.length; i++){
		if( i%numOfLinksOnPage == 0 ){			
			scrollPositions[ "scrollToItem" + (i/numOfLinksOnPage) ] = list_items[i].offsetTop;
			list_items[i].classList.add("scrollItem");
		}
	}	

	// Get number of items in scrollPositions object
	numOfScrollItems = Object.keys(scrollPositions).length;

	//Adjust last scrollItem value so last item positions to bottom of content wrapper
	var lastScrollItem = "scrollToItem" + (numOfScrollItems - 1)
	scrollPositions[lastScrollItem] = content.offsetHeight - contentWrapper.offsetHeight + 15;	

	// Add click events for controls
	[].forEach.call(controls, function(control){
		control.addEventListener("click",function(e){									
			// Determine if control is next or prev button 
			// & iterate itemNumber (used to get top position value from scrollPositions object)
			var isNext = e.target.className === "next";
			isNext ? itemNumber++ : itemNumber--;

			// Toggle button classes based on first or last page
			if( itemNumber == ( numOfScrollItems - 1) ){
				prev.className = "scroll_nav active full";
				next.className = "scroll_nav";				
			} else if( itemNumber == 0 ) {
				prev.className = "scroll_nav";
				next.className = "scroll_nav active full";
			} else {
				var showCtrls = document.querySelectorAll(".scroll_nav");			
				[].forEach.call(showCtrls, function(el){
					el.className = "scroll_nav active half";
				});				
			}

			// Toggle gradient			
			if( itemNumber == ( numOfScrollItems - 1) ){
				gradientBottom.style.display = "none";
				gradientTop.style.display = "block";
			} else {
				gradientBottom.style.display = "block";
				gradientTop.style.display = "none";
			}

			// Reset itemNumber if scrollPosition object does not exist
			if( scrollPositions["scrollToItem" + itemNumber] === undefined ){
				itemNumber = isNext ? scrollItems.length - 1 : 0;
				return;
			};			

			// Set content top postion to scrollPositions object value
			content.style.top = "-" + scrollPositions["scrollToItem" + itemNumber] + "px";
		});
	});	
}


