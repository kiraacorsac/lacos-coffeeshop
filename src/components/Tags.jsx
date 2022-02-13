import style from "./Tags.module.css"
import { useState } from "react";


export default function Tags(props) {
    const allTagsList = [];
    const existingTagsListRender = new Set([]);
    const [existingTagsList, setExistingTagsList] = useState(new Set([]));
    // let existingTagsListAray = [...existingTagsList]
    // let newExistingTagsListSet = new Set(existingTagsListAray)
    for (const food of props.data) {
    console.log("Food existing :",typeof food) 
    for (const tag of food.tags) { 
        console.log("item existing :",tag)
        // if (allTagsList == tag) {console.log("Tag included:",tag)} else {
        //     allTagsList.pusch(<Tags tag={tag} key={tag}/>);
        // }

   //     let newTag = tag.stringify()
   //existingTagsListRender.pusch(<div className={style.tag}>{tag},</div>)}
    }}
        // let newExistingTagsList = new Set(existingTagsList); // slice for sets
        // newExistingTagsList.add(tag); // push for set
        // setExistingTagsList(newExistingTagsList);
   
     //   food.pusch(food.tags);}
      
  //       setExistingTagsList(newExistingTagsListSet)
        //  console.log("allTagsList :",allTagsList);
           
  
    // for (const atag of allTagsList) {
    //         console.log("atag existing :",atag)   }      

    //existingTagsListRender.push(<Tags key={tag}/>
        // )}
        // console.log("Tag list :",existingTagsListRender)  }

    return <div className={style.tags}> Tags: 
    {allTagsList}
    </div>
    }
