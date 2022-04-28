import { PortableText } from "@portabletext/react";
import {writeClient} from "../../client";
import { nanoid } from 'nanoid'
import { blocks } from "../../simonswebsitecms/schemas/deserializer";


export default async function handler(req, res){
    console.log(process.env.SANITY_API_TOKEN)
    switch(req.method){
        case "POST":
            //JSON arrives as string so we make JS object
            console.log(req.body)
           const newPost = await JSON.parse(req.body);
            console.log('newPost parsed')
            //use Sanity client to make new doc
            try {
                await writeClient
                .create({
                    _type: "post", // look at this later
                    title: newPost.title,
                    body: 
                        [{_key: nanoid(),
                            markDefs: [],
                            _type: 'block',
                            children:
                             [{_key:nanoid(),
                                text: newPost.text,
                            _type: 'span'}]}]
                })
                .then((res)=>{
                    console.log(`Post created, doc ID is ${res._id}`)
                })
                res
                .status(200)
                .json({msg: `Post created, doc ID is ${res._id}`}) 
            }
            catch(err){
                console.log(err)
                return(
                res.status(500).json({msg: 'Error, check console'}))
            }
            break
    }
}
