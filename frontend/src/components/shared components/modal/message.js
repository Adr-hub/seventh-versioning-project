import './message.scss';
const Message = (prop) => {
    let toDelete = prop.deleteState;
    let cancel = prop.cancelState;

    return (<div className='modal'><p>Do you really want to delete this post ?</p><div className='deletionButtons'><button onClick={(ev) => {
        cancel(true)
        toDelete(false);
    }}>Cancel</button><button className='deleteButton' onClick={(ev) => {
        cancel(false);
        toDelete(false);

    }}>Delete</button></div></div >)
}
export default Message;