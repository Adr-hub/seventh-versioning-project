import './post.scss';
import { useState, useEffect } from 'react'
import testImage from '../../../images/icon.png';
import getPosts from '../../../services/getRequests';
const Post = () => {
    const [data, getData] = useState('');
    useEffect(() => {
        getPosts
            .then((data) => {
                console.log(data.status, 'RESPONSE');

                const dataArray = data.data;
                let posts = dataArray.map((data) => {
                    return (<div className="postContainer" key={data._id}><div className="postTitle">{data.title}</div>
                        <div className="postContent">
                            <div className="postText"><p>{data.message}</p></div><div className="postImage"><img alt="" src={data.image !== undefined ? data.image : testImage} />
                            </div>
                        </div>
                        <div className="postInformations"><span className="postDate">{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(data.date)}</span></div>
                    </div>)
                })
                getData(posts);

            }

            )
            .catch((error) => {
                console.error(error);
            })

    }, []);


    return data;
}
export default Post;