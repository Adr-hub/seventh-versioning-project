import './post.scss';
import axiosGetRequest from 'axios'
import testImage from '../../../images/icon.png';
const Post = () => {
    axiosGetRequest('http://localhost:4200/homepage/all')

        .then((data) => {
            console.log(data.status, 'RESPONSE');
            if (data.status === 201) {
                const dataArray = data.data;
                dataArray.map((data) => {
                    return (<div className="postContainer" key={data._id}><div className="postTitle">{data.title}</div>
                        <div className="postContent">
                            <div className="postText"><p>{data.message}</p></div><div className="postImage"><img alt="" src={testImage} />
                            </div>
                        </div>
                        <div className="postInformations"><span className="postDescription">{data.description}</span><span className="postDate">{data.date}</span></div>
                    </div>)
                })
            }

        })
        .catch((error) => {
            console.error(error);


        })

}
export default Post;