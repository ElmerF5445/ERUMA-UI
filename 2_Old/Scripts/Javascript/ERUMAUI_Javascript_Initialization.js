window.addEventListener("DOMContentLoaded", Initial_Start);

var App_Path = window.location.pathname;
var App_CurrentPageName = App_Path.split("/").pop();

// Start of initialization
var App_Properties = {};
var App_Navigation = {};
var Page_Properties = {};
var Page_Navigation = {};
function Initial_Start(){
    App_Properties = Data_Import_FromPath("Assets/Resource_Files/App_Properties.json", "JSON");
    console.log(App_Properties);
    Initial_Fetch_Properties();
    console.log(Page_Properties);
    Initial_Properties_Set();
}

function Initial_Fetch_Properties(){
    for (a = 0; a < App_Properties.App_Pages.length; a++){
        if (App_Properties.App_Pages[a].Page_File == App_CurrentPageName){
            Page_Properties = App_Properties.App_Pages[a].Page_Properties;
            break;
        }
    }
}


var Style_Properties = document.querySelector(":root");
function Initial_Properties_Set(Configuration){
    Element_InnerText_Set("Window_Title", `${Page_Properties.Window.Title.Primary} ${Page_Properties.Window.Title.Separator} ${Page_Properties.Window.Title.Secondary}`);
    Element_Attribute_Set("Window_Icon", "href", Page_Properties.Window.Title.Icon);
    if (Page_Properties.Header.Enabled == true){
        if (Element_isntNull("Header") == true){
            Element_Attribute_Set("Header", "State", "Enabled");
            Element_InnerHTML_Set("Header_Navigation_Title", Page_Properties.Header.Navigation.Title);
            Element_Attribute_Set("Header_Navigation_Icon", "src", Page_Properties.Header.Navigation.Icon);
        }
    } else {
        if (Element_isntNull("Header") == true){
            Element_Attribute_Set("Header", "State", "Disabled");
        }
    }

    if (Page_Properties.Panels.Left.Enabled == true){
        Element_Attribute_Set("Panel_Left", "State", Page_Properties.Panels.Left.State);
        Element_Attribute_Set("Panel_Toggle_Left", "State", Page_Properties.Panels.Left.State);
    } else {
        Element_Attribute_Set("Panel_Left", "State", "Disabled");
        Element_Attribute_Set("Panel_Toggle_Left", "State", "Disabled");
    }
    if (Page_Properties.Panels.Right.Enabled == true){
        Element_Attribute_Set("Panel_Right", "State", Page_Properties.Panels.Right.State);
        Element_Attribute_Set("Panel_Toggle_Right", "State", Page_Properties.Panels.Right.State);
    } else {
        Element_Attribute_Set("Panel_Right", "State", "Disabled");
        Element_Attribute_Set("Panel_Toggle_Right", "State", "Disabled");
    }

    Style_Properties.style.setProperty("--Panel-Left-Width-Expanded", Page_Properties.Panels.Left.Width.Expanded);
    Style_Properties.style.setProperty("--Panel-Left-Width-Collapsed", Page_Properties.Panels.Left.Width.Collapsed);
    Style_Properties.style.setProperty("--Panel-Right-Width-Expanded", Page_Properties.Panels.Right.Width.Expanded);
    Style_Properties.style.setProperty("--Panel-Right-Width-Collapsed", Page_Properties.Panels.Right.Width.Collapsed);
    
    Element_InnerHTML_Set("Panel_Toggle_Left_Text", Page_Properties.Panels.Left.Title);
    Element_InnerHTML_Set("Panel_Toggle_Right_Text", Page_Properties.Panels.Right.Title);

    

    if (Configuration == null || Configuration == "Startup"){
        Initial_Ribbon_Setup();
    } else if (Configuration == "Update") {
        console.log("Updated settings");
    }
    
    
}

function Initial_Ribbon_Setup(){
    App_Navigation = Data_Import_FromPath(Page_Properties.Navigation.Resource, "JSON");
    for (a = 0; a < App_Navigation.App_Pages.length; a++){
        if (App_Navigation.App_Pages[a].Page_File == App_CurrentPageName){
            Page_Navigation = App_Navigation.App_Pages[a];
            break;
        }
    }
    if (Page_Properties.Ribbon.Enabled == true){
        Element_Clear("Ribbon");
        for (a = 0; a < Page_Navigation.Ribbon.length; a++){
            var Ribbon_Section = Page_Navigation.Ribbon[a];
            var Ribbon_Section_Element = Element_Create("div");
            Ribbon_Section_Element.setAttribute("class", "Ribbon_Section");
            Ribbon_Section_Element.setAttribute("id", Ribbon_Section.ID);
            console.log(Ribbon_Section);
            
            var Item_InnerHTML;
            for (b = 0; b < Ribbon_Section.Contents.length; b++){
                var Item = Ribbon_Section.Contents[b];
                console.log(Item);
                Item_InnerHTML = `
                    <button class="Ribbon_Section_Item" onclick="${Item.Onclick}">
                        <img src="${Item.Icon}" draggable="false" loading="lazy" class="Ribbon_Section_Item_Icon"/>
                        <p class="Ribbon_Section_Item_Text">
                            ${Item.Name}
                        </p>
                    </button>
                `;
                // Ribbon_Section_Element.innerHTML += Item_InnerHTML;
                Ribbon_Section_Element.innerHTML += Item_InnerHTML;
                console.log(Ribbon_Section_Element.innerHTML);
                console.log(Ribbon_Section_Element);
            }
            Element_Append("Ribbon", Ribbon_Section_Element);
        }
    }
    Initial_Navigation_Setup();
}

function Initial_Navigation_Setup(){
    if (Page_Properties.Navigation.Enabled == true){
        Element_Attribute_Set("Panel_Toggle_Left", "Config", "WithNavigation");
        Element_Attribute_Set("Panels", "Config", "WithNavigation");
        Element_Attribute_Set("Navigation", "Visibility", "Visible");
        // Element_Clear("Navigation_List");
        Element_Clear_ExceptFirst("Navigation");
        for (a = 0; a < Page_Navigation.Navigation_Bar.length; a++){
            var Item = Page_Navigation.Navigation_Bar[a];
            var Item_Slide = Page_Navigation.Slides.find(slide => slide.ID === Item.Links.Slide);
            console.log(Item_Slide);
            var Item_InnerHTML = `
                <button class="Navigation_Button" Target_Panel_Left="${Item_Slide.Panels.Left.Linked_ID}" Target_Panel_Center="${Item_Slide.Panels.Center.Linked_ID}" Target_Panel_Right="${Item_Slide.Panels.Right.Linked_ID}" Target_Ribbon="${Item.Links.Ribbon}" Title_Header="${Item_Slide.Name}" Title_Panel_Left="${Item_Slide.Panels.Left.Title}" Title_Panel_Right="${Item_Slide.Panels.Right.Title}" id="${Item.ID}" Enable_Panel_Left="${Item_Slide.Panels.Left.Enabled}" Enable_Panel_Right="${Item_Slide.Panels.Right.Enabled}" State_Panel_Left="${Item_Slide.Panels.Left.State}" State_Panel_Right="${Item_Slide.Panels.Right.State}" Width_Expanded_Panel_Left="${Item_Slide.Panels.Left.Width.Expanded}" Width_Collapsed_Panel_Left="${Item_Slide.Panels.Left.Width.Collapsed}" Width_Expanded_Panel_Right="${Item_Slide.Panels.Right.Width.Expanded}" Width_Collapsed_Panel_Right="${Item_Slide.Panels.Right.Width.Collapsed}" onclick="Navigation_Navigate(this.id)">
                    <div class="Navigation_Button_Background"></div>
                    <div class="Navigation_Button_Pill"></div>
                    <img src="${Item.Icon}" draggable="false" loading="lazy" class="Navigation_Button_Icon"/>
                    <p class="Navigation_Button_Text">
                        ${Item.Name}
                    </p>
                </button>
            `
            var Item_Element = Element_Create("span");
            Item_Element.innerHTML = Item_InnerHTML;
            Element_Append_Direct("Navigation", Item_InnerHTML);
        }
        Element_Get_ByTag("Navigation", "button")[1].click();
        console.log(App_Navigation);
    }
    Initial_Finalize();
}

function Initial_Finalize(){
    setTimeout(LoadingScreen_Hide, 3000);
}