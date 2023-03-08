import { Link } from 'react-router-dom'

//helper
import { formatDate } from '../utils/format-date'

//custom hooks
import { useThemeContext, useDocument } from '@features/hooks'

import { PostDocument, UserDocument } from '@types'

//icons
import { LocationIcon } from '@assets'

//components
import LikesAndCommentsIcons from '@features/posts/feed/components/likes-and-comments-icons'


//styles
import styles from './post.module.css'


interface PostProps {
	post: PostDocument
}

export default function Post({ post }: PostProps) {
	const { theme } = useThemeContext()

	const { document: creatorData, error } = useDocument<UserDocument>('users', post.creatorID)

	const hasLocation = post.location.length > 0
	if (error) return <p className='error'>{error}</p>

	return (
		<>
			{creatorData ?
				<div data-testid='post' className={`${styles.post} ${styles[theme]}`}>
					<div className={styles.postTop}>
						<div className={`${styles.user} ${styles[theme]}`}>
							<img loading='lazy' className='profile-image' src={creatorData.photoURL} alt='profile-image' />
							<div className={styles.userInfo}>
								<div className={`${styles.userNameLocation} ${styles[theme]}`}>
									<Link to={`/profile/${creatorData.id}`} >{creatorData.displayName}</Link>
									{hasLocation ?
										<>
											<img src={LocationIcon} alt='location icon' />
											<p>{post.location}</p>
										</> : null}
								</div>
								<div className={styles.timeAndLocation}>
									<p className={styles.timestamp}>{formatDate(post.createdAt)}</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.postMiddle}>
						<p className={`${styles.postText} ${styles[theme]}`}>{post.postTitle}</p>
						<img
							loading='lazy'
							className={styles.postImage}
							src={post.photoURL}
							alt="post image" />
					</div>
					<LikesAndCommentsIcons post={post} />
				</div> : null}
		</>
	)
}
