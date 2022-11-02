import './post.scss';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../images/icon.png';
import postService from '../../../services/postService';
const Post = (prop) => {
    const [data, getData] = useState('');
    let animation = prop.propId;
    let form = prop.propForm;
    let getPostId = prop.getPost;
    let getPutId = prop.getUpdates;
    const navigate = useNavigate();


    useEffect(() => {
        postService.getPosts()
            .then((data) => {
                console.log(data.status, 'RESPONSE');

                getData(data.data);

            }
            )
            .catch((error) => {

                console.error(error);
                window.localStorage.clear();
                navigate('/intranet', { replace: true });

            })

    }, [navigate]);


    if (data.length !== 0) {

        let posts = data.map((data) => {

            return (<div className="postContainer" data-id={data._id} key={data._id}><div className="postTitle">{data.title}</div>
                <div className="postContent">
                    <div className="postText"><p>{data.message}</p></div><div className="postImage" ><img alt={data.image !== undefined ? "Le post intitulé : '" + data.title + "' joint ce contenu additionnel." : "Groupomania"} src={data.image !== undefined ? data.image : defaultImage} />
                    </div>
                </div>
                <div className="postButtonsContainer">

                    {data.employeeId === window.localStorage.getItem('employee-id') || window.localStorage.getItem('admin') === '1' ?
                        <button className='modifications' onClick={(ev) => {

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
                            }
                            if (ev.detail >= 1 && window.innerWidth <= 992 && ev.target.textContent === 'Modify') {
                                animation('removed');
                                getPostId(ev.target.closest('.postContainer').getAttribute('data-id'));

                                navigate('/modifications/' + ev.target.closest('.postContainer').getAttribute('data-id'));

                            }
                        }}>Modify</button>

                        : undefined}
                    {data.employeeId === window.localStorage.getItem('employee-id') || window.localStorage.getItem('admin') === '1' ?
                        <button className="delete" onClick={(ev) => {

                            let deletionActivation = prop.deleteState;
                            deletionActivation(true);
                            if (ev.detail >= 1) {
                                getPostId(ev.target.closest('.postContainer').getAttribute('data-id'));
                            }

                        }}>Delete</button>

                        : undefined}

                    <button className="likes" onClick={(ev) => {

                        if (ev.detail >= 1 && window.localStorage.getItem('admin') === null) {

                            let id = ev.target.closest('.postContainer').getAttribute('data-id');

                            postService.postLikes(id)

                                .then((res) => {
                                    console.log(res.status, 'Clicked like button !')
                                    ev.target.textContent = res.data.likeCount !== undefined || res.data.likeCount !== 0 ? res.data.likeCount + ' 🤍' : 0 + ' 🤍';

                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                        }


                    }}>{data.likes.length !== undefined ? data.likes.length : ''} 🤍</button></div>
                <div className="postInformations"><span className="postDate">{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(data.date)}</span></div>
            </div >)

        });


        return posts;
    }

    else {

        return <div className='zeroPost'> There are no posts !</div>
    }

}
export default Post;