//TODO - Selectors
const tabList = document.querySelector('[role = "tablist"]');
const tabs = tabList.querySelectorAll('[role = "tab"]');




//TODO - All the Events

//e = event -it's just a parameter if incase need
tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
})

//TODO - Functions

let tabFocus = 0
function changeTabFocus(e) {
    //setting up the keyboard key map
    const keydownLeft = 37;
    const keydownRight = 39;



    // setting the tabindex = -1 when key-37/39 pressed
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);


        //if keydownRight pressed, move to the next tab on the right else other way around

        if (e.keyCode === keydownRight) {
            tabFocus++;

            //setting up tab to go back to index 0 
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }

        } else if (e.keyCode === keydownLeft) {
            tabFocus--;

            //setting up tab to go back to index end
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

    }



    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");

    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;

    //for tech - mainContaienr would be div.num-article
    const mainContainer = tabContainer.parentNode;

    //actual main container for tech tab
    const mainContainer2 = mainContainer.parentNode

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);



    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`])

    hideContent(mainContainer2, 'picture')
    showContent(mainContainer2, [`#${targetImage}`])

}


function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}