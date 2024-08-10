// Check for if country exists in localstorage
if("data" in localStorage && "country" in localStorage){
    let data=JSON.parse(localStorage.getItem("data"))
}else{
    window.location.href="index.html";
};


// Declaration variables
const countryContent=document.getElementById("content")
const backbtn=document.querySelector("main .container a");
const countryOfName=localStorage.getItem("country")
const darkBtn=document.querySelector(".switch");


// Dark Mode Party
if("theme" in localStorage && localStorage.theme==="dark"){
    document.documentElement.classList.add("dark")
}


// Function 
function addIcon(img){
    const icon=document.getElementById("icon");
    icon.setAttribute("href",img);
}
function getCountryInfo(){
    let data=JSON.parse(localStorage.getItem("data"));
    for(i=0;i<data.length;i++){
        let countryName=data[i].name;
        if(countryName.toLowerCase()===countryOfName.toLowerCase()){
            return data[i]
        }
    }
}
addInfoOfCountry()
function addInfoOfCountry(){
    let country= getCountryInfo();
    let Borders=getBorderCountry(country);
    let icon=country.flags.svg
    addIcon(icon)

    countryContent.innerHTML=`
    <img src="${country.flags.png}" class="country-img h-full w-full sm:w-[450px] lg:w-[600px] rounded-md" alt="Hero-Image">
                <div class="country-content flex-1 align-top">
                    <h2 class="font-[900] text-[26px] mb-[30px]">${country.name}</h2>
                    <div class="country-detaill flex flex-col sm:flex-row gap-[40px] sm:gap-0 justify-between mb-[50px]">
                        <div class="">
                            <p class="font-[300] mb-2"><span class="font-[600]">Native Name: </span>${country.nativeName}</p>
                            <p class="font-[300] mb-2"><span class="font-[600]">Population: </span>${country.population}</p>
                            <p class="font-[300] mb-2"><span class="font-[600]">Region: </span>${country.region}</p>
                            <p class="font-[300] mb-2"><span class="font-[600]">Sub Region: </span>${country.subregion}</p>
                            <p class="font-[300]"><span class="font-[600]">Capital: </span>${country.capital}</p>
                        </div>
                        <div class="">
                            <p class="font-[300] mb-2"><span class="font-[600]">Top Level Domain: </span>${country.topLevelDomain}</p>
                            <p class="font-[300] mb-2"><span class="font-[600]">Currencies: </span>${country.currencies[0].code}</p>
                            <p class="font-[300] mb-2"><span class="font-[600]">Languages: </span>${getLuanguaOfCountry(country)}</p>
                        </div>
                    </div>
                    <div class="border-country flex sm:items-center gap-4 flex-col sm:flex-row">
                        <p class="font-[600]">Border Countries:</p>
                        <ul class="flex gap-2 flex-wrap items-center ">
                        ${insertBordersCountry(Borders)}
                        </ul>
                    </div>
                </div>`


};
function getLuanguaOfCountry(country){
    let data=""
    let luanguages=country.languages;
    luanguages.forEach(luanguage => {
        data+=`${luanguage.name} `;
    });
    return data;
}
function getBorderCountry(country){
    let bordersCountry=[];
    let countryBorders=country.borders;
    console.log(countryBorders,country);
    
    let data=JSON.parse(localStorage.getItem("data"))
    if(countryBorders){
        countryBorders.forEach(border=>{
        data.forEach(country=>{
            let countryCode=country.alpha3Code;
            if(countryCode.includes(border)){
                bordersCountry.push(country.name);

            }
        })
    })
    }
    

    
    return bordersCountry

}
function addtoLocaleStorage(name,data){
    localStorage.setItem(name,data);
}
function insertBordersCountry(Borders){
    let BordersCounty="";
    Borders.forEach(border=>{
        BordersCounty+=`
        <li onclick="getCountry(this)" class="w-fit px-5 py-1 rounded-lg bg-white dark:bg-[hsl(209,23%,22%)] shadow-lg cursor-pointer">${border}</li>`
    })
    console.log(BordersCounty);
    
    return BordersCounty;
}
function getCountry(event){
    const countryName=event.innerHTML;
    addtoLocaleStorage("country",countryName);
    location.href="country.html";
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
darkBtn.addEventListener("click",darkModeSwitcher);
backbtn.addEventListener("click",()=>{
    localStorage.removeItem("country")
    location.href="index.html";
})
