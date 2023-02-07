const d = new Date()
setInterval(timeAndDate,1000)
function timeAndDate(){
    document.getElementById('date').value =d.toLocaleDateString()
    document.getElementById('time').value =d.getHours() + ":" 
    + d.getMinutes() + ":" + d.getSeconds();
}

const btn=document.getElementById("btn")
const form=document.getElementById("form")
