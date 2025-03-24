window.addEventListener("DOMContentLoaded", Initial_Start);

var App_Path = window.location.pathname;
var App_CurrentPageName = App_Path.split("/").pop();

// Start of initialization
var App_Properties = {};
var Page_Properties = {};
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

function Initial_Properties_Set(){
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
    
    Element_InnerHTML_Set("Panel_Toggle_Left_Text", Page_Properties.Panels.Left.Title);
    Element_InnerHTML_Set("Panel_Toggle_Right_Text", Page_Properties.Panels.Right.Title);
}