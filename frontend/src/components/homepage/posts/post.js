import './post.scss';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import testImage from '../../../images/icon.png';
import getPosts from '../../../services/getRequests';
const Post = (prop) => {
    const [data, getData] = useState('');
    let animation = prop.propId;
    let form = prop.propForm;
    let getPostId = prop.getPost;
    let postId = prop.posts;
    let getPutId = prop.getUpdates;
    let postRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {

        getPosts
            .then((data) => {
                console.log(data.status, 'RESPONSE');

                const dataArray = data.data;
                let posts = dataArray.map((data) => {
                    return (<div className="postContainer" data-id={data._id} key={data._id}><div className="postTitle">{data.title}</div>
                        <div className="postContent">
                            <div className="postText"><p>{data.message}</p></div><div className="postImage" ><img alt="" src={data.image !== undefined ? data.image : testImage} />
                            </div>
                        </div>
                        <div className="postButtonsContainer"><button className='modifications' onClick={(ev) => {

                            if (ev.detail >= 1 && form !== 'modify' && window.innerWidth > 992 && form !== 'animate') {
                                animation('modify');
                                getPostId(ev.target.closest('.postContainer').getAttribute('data-id'));
                                ev.target.textContent = 'Modifying';
                            }

                            if (ev.detail >= 1 && form !== 'update' && window.innerWidth > 992 && form !== 'animate') {
                                animation('update');
                                getPutId(ev.target.closest('.postContainer').getAttribute('data-id'));
                                ev.target.textContent = 'Modifying';
                            }
                            if (ev.detail >= 1 && form !== 'modify' && form === 'animate') {
                                ev.preventDefault();
                            }
                            if (ev.detail >= 1 && form === 'modify' && ev.target.textContent === 'Modifying') {
                                ev.target.textContent = 'Modify';
                                animation('unanimate');
                            }

                            if (ev.detail >= 1 && form === 'update' && ev.target.textContent === 'Modifying') {
                                ev.target.textContent = 'Modify';
                                animation('unanimate');
                                getPutId('modifying');
                            }
                            if (ev.detail >= 1 && window.innerWidth <= 992 && ev.target.textContent === 'Modify') {
                                animation('removed');
                                getPostId(ev.target.closest('.postContainer').getAttribute('data-id'));
                            }
                        }}>Modify</button><button className="delete" onClick={(ev) => {

                            let deletionActivation = prop.deleteState;
                            deletionActivation(true);
                            if (ev.detail >= 1) {
                                getPostId(ev.target.closest('.postContainer').getAttribute('data-id'));
                            }

                        }}>Delete</button><button className="likes">Like</button></div>
                        <div className="postInformations"><span className="postDate">{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(data.date)}</span></div>
                    </div >)
                })
                getData(posts);
                if (form === 'removed') {
                    navigate('/modifications/' + postId);
                }
            }
            )
            .catch((error) => {
                console.error(error);
            })

    }, [animation, form, navigate, postRef, getPostId, postId, prop.deleteState, getPutId]);

    return data;
}
export default Post;