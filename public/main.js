let editor = document.querySelector("#editor");
ace.edit(editor, {
    theme: "ace/theme/cobalt",
    mode: "ace/mode/javascript",
  });
$(document).ready(function () {
    

var textCode = $('#code');
var property = $('#property');
var aceEditor = ace.edit("editor");
let parsedCode;
fetch(`/api/v1/getPage/${id}`).then((code)=>{
    return code.json()
}).then((parsedCode)=>{
    let pageName = document.getElementById("pageName");
    let fileName = document.getElementById("fileName");
    let pageContent = document.getElementById("pageContent");
    pageName.value = `${parsedCode.WebPages.pageName}`;
    fileName.value = `${parsedCode.WebPages.fileName}`;
    pageContent.value = `${parsedCode.WebPages.pageContent}`;
})
aceEditor.setTheme("ace/theme/cobalt");
aceEditor.getSession().setMode("ace/mode/jade");
aceEditor.getSession().on('change', function () {
  
        textCode.val(aceEditor.getSession().getValue());
       let code = aceEditor.getSession().getValue();
    
       return code
   
}
);

if(url="/admin/sections/update/editor"){
    aceEditor.getSession().on('change', function () {
     
        fetch(`/api/v1/getsection/${id}`).then((code)=>{
            return code.json()
        }).then((parsedCode)=>{
            let sectionName = document.getElementById("sectionName");
            let fileName = document.getElementById("fileName");
            let sectionContent = document.getElementById("sectionContent");
            console.log(parsedCode.Section.ssectionContent)
            sectionName.value = `${parsedCode.Section.sectionName}`;
            fileName.value = `${parsedCode.Section.fileName}`;
            sectionContent.value = `${parsedCode.Section.sectionContent}`;
        })
    

    
    });
}
else if(url="/admin/pages/update/editor"){
    aceEditor.getSession().on('change', function () {
        fetch(`/api/v1/getPage/${id}`).then((code)=>{
            return code.json()
        }).then((parsedCode)=>{
            let pageName = document.getElementById("pageName");
            let fileName = document.getElementById("fileName");
            let pageContent = document.getElementById("pageContent");
            pageName.value = `${parsedCode.WebPages.pageName}`;
            fileName.value = `${parsedCode.WebPages.fileName}`;
            pageContent.value = `${parsedCode.WebPages.pageContent}`;
        })
})}



// aceEditor.getSession().setValue('<%= event_trigger.code %>');
textCode.val(aceEditor.getSession().getValue());
            
    //This function called when the button is clicked
    $("#cancel").click(function () {
        
        // val() method is used to get the values from 
       // textarea and stored in txt variable
        window.location = `/admin/pages/update/${id}`;
    });
});
