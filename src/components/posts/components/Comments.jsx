import { useState } from 'react'


import Test from '../../../assets/test.jpg'
//styles
import styles from '../Post.module.css'

//components
import Button from '../../common/Button'
import TextArea from '../../common/TextArea'

export default function Comments({ theme, classname }) {
    const [comment, setComment] = useState('')

    return (
        <div className={`${styles.commentsContainer} ${styles[classname]}`}>
            <hr className={`${styles.commentsHr} ${styles[theme]}`} />
            <h2>Comments</h2>
            <hr className={`${styles.commentsHr} ${styles[theme]}`} />
            <div className={styles.comments}>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>
                <div className={`${styles.comment} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='user icon' />
                    <div className={styles.commentContent}>
                        <a href='/'>Kostadin</a>
                        <p>dsadsaasdasdsdasdasdsadsaasddasssssssssssssssssssssssssssssssssssssssssssssssssadsasadsasd</p>
                    </div>
                    <p>1 day ago</p>
                </div>

            </div>

            <hr className={`${styles.commentsHr} ${styles[theme]}`} />
            <div className={`${styles.inputContainer} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='current user icon' />
                <TextArea value={comment} setValue={setComment} placeholder='Write a comment' theme={theme} />
                <Button theme={theme} text={"Post a comment"} />
            </div>
        </div>
    )
}
