// declaration variables
const filterBtn=document.querySelector(".filter-header");
const filterContent=document.querySelector(".filter-content");
const darkBtn=document.querySelector(".switch");
const countries=document.getElementById("main-countries");
const regionOfFilters=document.getElementsByTagName("li");
const searchBar=document.getElementById("country-search")



// Dark Mode Party
if("theme" in localStorage && localStorage.theme==="dark"){
    document.documentElement.classList.add("dark")
}


// functions
(async function getData(){
    const response= await fetch("./data/data.json");
    if(response.ok){
        let data= await response.json()
        localStorage.setItem("data",JSON.stringify(data));
        insertData(data);
        
    }
})();
function filterByRegion(item){
    let articles="";
    let data=JSON.parse(localStorage.getItem("data"));
    data.forEach(country=>{
        if(country.region===item){
            articles+=addcountry(country)
        }
    })
    countries.innerHTML=articles;


}

function insertData(data){
    let articles="";
    data.forEach(country => {
        articles+=addcountry(country)
        
    });
    countries.innerHTML=articles;
}
function addcountry(country){
    return `
                <article onclick="passCountryName(this)" class="bg-white dark:bg-[hsl(209,23%,22%)] shadow-md w-[250px]">
                    <img class="object-cover w-full h-[130px]" src="${country.flags.png}" alt="">
                    <div class="article-content p-5">
                        <h2 class="font-[900] mb-2">${country.name}</h2>
                        <p class="font-[300]"><span class="font-[600]">Population:</span> ${country.population}</p>
                        <p class="font-[300]"><span class="font-[600]">Region:</span> ${country.region}</p>
                        <p class="font-[300]"><span class="font-[600]">Capital:</span> ${country.capital}</p>
                    </div>
                </article>`
}
function searchForCountry(){
    let articles="" 
    const countrySearch=document.getElementById("country-search").value.toLowerCase();
    let data=JSON.parse(localStorage.getItem("data"));
    data.forEach(country=>{
        let mycountry=country.name.toLowerCase();
        if(mycountry.includes(countrySearch)){
            articles+=addcountry(country)
        }

    })
    countries.innerHTML=articles;
    

}
function passCountryName(event){
    let countryName=event.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
    localStorage.setItem("country",countryName);
    window.location.href="country.html"
    

}
// dark mode Switcher
function darkModeSwitcher(){
    const html=document.documentElement;
    
    if(html.classList.contains("dark")){
        localStorage.setItem("theme","light");
        html.classList.remove("dark")
    }else{
        html.classList.add("dark")
        localStorage.setItem("theme","dark");
        
    }
}
// Events
for(i=0;i<regionOfFilters.length;i++){
    regionOfFilters[i].addEventListener("click",function(event){
        let item=event.target.innerText
        filterByRegion(item)
        filterContent.classList.remove("active");
    })
}
// filter 
filterBtn.addEventListener("click",()=>{
    filterContent.classList.toggle("active")

})
darkBtn.addEventListener("click",darkModeSwitcher);
searchBar.addEventListener("input",searchForCountry);

