
const fs=require('fs')
const  axios =require('axios').default;
console.log("**********WELCOME TO SARAL PAGE*********************")
var id_list=[];
var course_id=[];
var list_for_slug=[];
function sendGetRequest() {
        const path = "./MainDataCourses.json"
        if (fs.existsSync(path)) {
            console.log("From caching:---");
            let rawdata1 = fs.readFileSync("MainDataCourses.json");
            let student1 = JSON.parse(rawdata1);
            console.log(student1);
            let dict_data1=student1["availableCourses"];
            console.log(dict_data1)
            let index=0;
            while (index <student1.length){
                let dic1=student1[index];
                console.log(index,dic1["name"],dic1 ["id"])
                id_list.push(dic1["id"])
                course_id.push(dic1["name"])
                index=index+1
            }
        }else{
            console.log("Non cashing:---")
            axios.get("http://saral.navgurukul.org/api/courses").then(response =>{
                let main_data=(response.data)
                const jsondata=JSON.stringify(main_data,null,4)
                fs.writeFileSync("MainDataCourses.json",jsondata)
                let rawdata = fs.readFileSync("MainDataCourses.json");
                let student = JSON.parse(rawdata);
                console.log(student);
                let dataInlist=student["availableCourses"]
                console.log(dataInlist)

                var index=0;
                var l=dataInlist
                while (index <l.length){
                    var dic=l[index];
                    console.log(index,dic["name"],dic ["id"])
                    id_list.push(dic["id"])
                    course_id.push(dic["name"])
                    index=index+1}
            
            });
        }
    }
sendGetRequest();
console.log("*************************ParentExercise**********************************")
let readlinesync = require("readline-sync");
let user = readlinesync.question("enter  course id:---");
function parentExercise(user) {
    var str = user.toString();
    let parentsFile="exercise_"+str+".json"
    if (fs.existsSync(parentsFile)) {
        console.log("parentExcersises From caching:--")
        let rawdata2 = fs.readFileSync(parentsFile);
        let student2 = JSON.parse(rawdata2);
        console.log(student2)
        let listFromDict=(student2["data"])
        console.log("COURSE NAME:---",course_id[user])
        let index=0
        let i=0;
            while (i<listFromDict.length){
                console.log(index,"ParentExercise:---",listFromDict[i]["name"])
                list_for_slug.push(listFromDict[i]["slug"])
                index++;
                var b=listFromDict[i]["childExercises"]
                console.log(b);
                if (b.length > 0){
                    let count=0
                    let j=0;
                    for (j in b){
                        console.log("    ",count,b[j]["name"])
                        count++;
                    }
                       
                    

                }else{
                    console.log("child_exercise not available")}
                i++;

            }

    }
    else{
        console.log("without cashing")
        axios.get(" http://saral.navgurukul.org/api/courses/"+id_list[user]+"/exercises ").then(response =>{
            let parentdata=(response.data)
            console.log(typeof(parentdata));
            const jsondata1=JSON.stringify(parentdata,null,4)
            fs.writeFileSync(parentsFile,jsondata1)
            let rawdata2 = fs.readFileSync(parentsFile);
            let student3 = JSON.parse(rawdata2);

            // console.log(student3)
            let listFromDictNew=(student3["data"])
            console.log(listFromDictNew)
            console.log("COURSE NAME:---",course_id[user])
            let index=0
            let i=0;
            while (i<listFromDictNew.length){
                console.log(index,"ParentExercise:---",listFromDictNew[i]["name"])
                list_for_slug.push(listFromDictNew[i]["slug"])
                index++;
                var b=listFromDictNew[i]["childExercises"]
                if (b.length > 0){
                    let count=0
                    let j=0;
                    for (j in b){
                        console.log("       ",count,b[j]["name"])
                        count++;
                    }
                }else{
                    console.log("child_exercise not available")
                }
                i++;
            }
        })
    }}
parentExercise(user)

console.log("************************slug********************************************");
let count =0
for (i in list_for_slug){
    console.log(count,":",list_for_slug[i]);
    count++;
}
var slugUser = readlinesync.question("enter slug id:---");
function getSlug(slugUser){
    var slug_of_user=list_for_slug[slugUser]
    console.log(slug_of_user)
    axios.get("http://saral.navgurukul.org/api/courses/"+id_list[user] +"/exercise/getBySlug?slug=" +slug_of_user)
    .then((response) => {
        var response_of_content=response.data
        const jsondata4=JSON.stringify(response_of_content,4)
        fs.writeFileSync("freshSlug.json",jsondata4)
            var rawdata4 = fs.readFileSync("freshSlug.json");
            var student4 = JSON.parse(rawdata4);
            var contentOfDict=student4["content"]
        
            console.log(contentOfDict)  
    })
}
getSlug(slugUser);


        