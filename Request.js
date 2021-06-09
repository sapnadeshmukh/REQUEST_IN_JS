const axios = require('axios')
const fs = require('fs')
// const { resolve } = require('path')

var id_list=[]
var course_list=[]
var list_for_slug=[];


axios.get("https://saral.navgurukul.org/api/courses").then((resp) => {
    const str = JSON.stringify(resp.data,null,4)


    const promise = new Promise ((resolve,reject)=>{
        setTimeout(()=>{

        fs.writeFile("datajson.json", str,(err) => {
            resolve ("data wrote.....")})

        } , 2000)
    })


    const prom1 = new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            fs.readFile("datajson.json",(err, str) => {
                resolve(JSON.parse(str))
            })

        },4000)

    })
    async function show(){
        let num1 = await promise
        // console.log(num1)

        let num2 = await prom1
        // console.log(num2)
        let dict_data1=num2["availableCourses"];
        console.log(dict_data1)
        let index=0;
        while (index <dict_data1.length){
            let dic1=dict_data1[index];
            console.log(index,dic1["name"],dic1 ["id"])
            id_list.push(dic1["id"])
            course_list.push(dic1["name"])
            index=index+1
        }



       
        
        let readlinesync = require("readline-sync");
        let user = readlinesync.question("enter  course id:---");
        let parentsFile="exercise_"+user+".json"
        console.log(parentsFile)
        console.log(id_list[user])


        
        axios.get( "http://saral.navgurukul.org/api/courses/"+id_list[user]+"/exercises" ).then((resp) => {

        
            const str1 = JSON.stringify(resp.data,null,4)
            // console.log(str1)


            const promise1 = new Promise ((resolve,reject)=>{
                setTimeout(()=>{
        
                fs.writeFile(parentsFile, str1,(err) => {
                    resolve ("data wrote again.....")})
        
                } , 1000)
            })


            const prom2 = new Promise ((resolve,reject)=>{
                setTimeout(()=>{
                    fs.readFile(parentsFile,(err, str1) => {
                        resolve(JSON.parse(str1))
                    })
        
                },4000)
        
            })

            async function getParent(){
                let num3 = await promise1
                let num4 = await prom2
                // console.log(num4)

                let listFromDict=(num4["data"])
                console.log("COURSE NAME:---",course_list[user])
                let index=0
                let i=0;
                    while (i<listFromDict.length){
                        console.log(index,"ParentExercise:---",listFromDict[i]["name"])
                        list_for_slug.push(listFromDict[i]["slug"])
                        index++;
                        var b=listFromDict[i]["childExercises"]
                        // console.log(b);
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
                
                    console.log("************************slug********************************************");
                    let count =0
                    for (i in list_for_slug){
                        console.log(count,":",list_for_slug[i]);
                        count++;
                    }
                    var slugUser = readlinesync.question("enter slug id:---");
                    var slug_of_user=list_for_slug[slugUser]
                    console.log(slug_of_user)
                    axios.get( "http://saral.navgurukul.org/api/courses/"+id_list[user]+"/exercise/getBySlug?slug="+slug_of_user )
                    .then((resp) => {

                    const str2 = JSON.stringify(resp.data,null,4)
                    // console.log(str2)

                    const promise2 = new Promise ((resolve,reject)=>{
                        setTimeout(()=>{
                
                        fs.writeFile("slug.json", str2,(err) => {
                            resolve ("data wrote again.....")})
                
                        } , 1000)
                    })



                    const prom3 = new Promise ((resolve,reject)=>{
                        setTimeout(()=>{
                            fs.readFile("slug.json",(err, str2) => {
                                resolve(JSON.parse(str2))
                            })
                
                        },4000)
                
                    })


                    async function getSlug(){
                        let num7 = await promise2
                        let num8 = await prom3
                        console.log(num8["content"])






                    }

                    getSlug()
                
                    

        })
                    
        


                
        

    
               
            }
            getParent()
           
        
            
    })

        
    

    }show()
    
})

