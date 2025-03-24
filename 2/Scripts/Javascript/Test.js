function Test_Bar_Dynamic_State(State){
    if (State == "Loading"){
        Element_Attribute_Set('Test_Bar_Dynamic', 'State', 'Loading');
    } else if (State == "Progress") {
        Element_Attribute_Set('Test_Bar_Dynamic', 'State', 'Progress');
    }
}

function Test_Bar_Dynamic_Progress(Progress){
    Element_Attribute_Set('Test_Bar_Dynamic_Bar', 'style', `width: ${Progress}`);
}