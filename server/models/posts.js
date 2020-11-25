
const mongoose= require('mongoose');

const PostsSchema = mongoose.Schema({

    title:{
        type: String
    },

    description:{
        type: String
    },
    author:{
        type: String
    },

    image:{
        // type: Buffer
        type: String
    }
},{
    timestamps: true
    
    
}
);
const Posts = mongoose.model('Posts', PostsSchema);

module.exports= Posts;
