
let custominput = []


const savebtn = document.getElementById("saveinput_btn")
let inputEl = document.getElementById("input_box")
const closebtn = document.getElementById("close_btn")
const ullist = document.getElementById("ul_list")
const deletebtn = document.getElementById("delete_btn")

const linksfromlocalstorage =  JSON.parse(localStorage.getItem("my leads"))
if(linksfromlocalstorage){
   custominput = linksfromlocalstorage
   render(custominput)
}
const tabbtn = document.getElementById("tab_btn")
tabbtn.addEventListener("click",()=>{
     chrome.tabs.query({active : true, currentWindow : true}, (tabs)=>{
        if(tabs[0].url === "chrome://newtab/"){
            alert("please add non-empty tab");
        }
        else{
            custominput.push(tabs[0].url)
            localStorage.setItem("my leads",JSON.stringify(custominput))
            render(custominput) 
        }     
    })

})
function render(cix){
    let listitems = ""
    for(i=0;i<cix.length;i++)
    {
        // listitems += "<li> <a target = '_blank' href='" + custominput[i] +"'target = '_blank' >" + custominput[i] + "</a></li> "
        // document.createElement("li")
        // li.textContent = custominput[i]
        // ullist.append(li)
        listitems += `  
        <li> <div class="links_wrapper">
            <a target = '_blank' href=${cix[i]}>
                ${cix[i]}
                </a>
            </li> </div>`
        
    }
    ullist.innerHTML = listitems
    }

deletebtn.addEventListener("dblclick",function(){
   localStorage.clear()
   custominput = []
   render(custominput)

 })
savebtn.addEventListener("click",function()
{
    let conLink = "https://" + inputEl.value;
    if(conLink == "https://"){
        alert("please enter valid url");
    }
    else{
    custominput.push(conLink)
    inputEl.value = ""
    localStorage.setItem("my leads", JSON.stringify(custominput))
    render(custominput)
    }
})



