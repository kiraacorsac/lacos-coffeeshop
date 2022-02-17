import { useState } from "react";
import TagInput from "./TagInput";

//TODO: add rest of the inputs
//TODO: style
export default function NewFood(props) {

    const [tagSet, setTagSet] = useState(new Set());

    return <div>
        <input type="text" placeholder="Name"/>
        <TagInput tagListState={[tagSet, setTagSet]}  />

    </div>

}